'use client';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Schedule {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: string;
  createdById: string;
  createdBy: User;
  participants: string[];
  createdAt: string;
}

interface FormData {
  title: string;
  description: string;
  scheduledAt: string;
  participants: string[];
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY = 'scheduled_podcasts_cache';

const ScheduledPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start with true
  const [showForm, setShowForm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<string>('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ show: boolean; schedule: Schedule | null }>({
    show: false,
    schedule: null
  });
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    scheduledAt: '',
    participants: []
  });
  const [participantInput, setParticipantInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Refs for caching
  const lastFetchTime = useRef<number>(0);
  const fetchInProgress = useRef<boolean>(false);

  // Get token from localStorage
  const getToken = useCallback((): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || '';
    }
    return '';
  }, []);

  // Load cached data
  const loadCachedData = useCallback((): boolean => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { schedules: cachedSchedules, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        
        // Check if cache is still valid
        if (now - timestamp < CACHE_DURATION) {
          setSchedules(cachedSchedules);
          lastFetchTime.current = timestamp;
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
    return false;
  }, []);

  // Save data to cache
  const saveToCache = useCallback((schedulesData: Schedule[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        schedules: schedulesData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, []);

  // Fetch existing schedules with caching
  const fetchSchedules = useCallback(async (forceRefresh = false): Promise<void> => {
    // Check if we're already fetching
    if (fetchInProgress.current && !forceRefresh) return;

    const now = Date.now();
    // Skip if cache is still valid and not forcing refresh
    if (!forceRefresh && now - lastFetchTime.current < CACHE_DURATION && schedules.length > 0) {
      return;
    }

    fetchInProgress.current = true;

    // Only show loading on initial load or force refresh
    if (forceRefresh || schedules.length === 0) {
      setLoading(true);
    }

    try {
      const token = getToken();
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch(`/api/podcast/schedule?token=${token}`);
      const data = await response.json();

      if (data.success) {
        setSchedules(data.data);
        saveToCache(data.data);
        lastFetchTime.current = now;
        setError(''); // Clear any previous errors
      } else {
        setError(data.error || 'Failed to fetch schedules');
      }
    } catch (err: any) {
      console.error('Failed to fetch schedules:', err);
      // Only show error if we don't have cached data
      if (schedules.length === 0) {
        setError('Failed to fetch schedules');
      }
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  }, [getToken, saveToCache, schedules.length]);

  // Create new schedule
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = getToken();
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch('/api/podcast/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Schedule created successfully!');
        setFormData({
          title: '',
          description: '',
          scheduledAt: '',
          participants: []
        });
        setParticipantInput('');
        setShowForm(false);
        // Force refresh to get the new schedule
        await fetchSchedules(true);
      } else {
        setError(data.error || 'Failed to create schedule');
      }
    } catch (err: any) {
      setError('Failed to create schedule');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, getToken, fetchSchedules]);

  // Delete schedule after confirmation
  const handleDelete = useCallback(async (): Promise<void> => {
    if (!deleteConfirmation.schedule) return;

    const scheduleId = deleteConfirmation.schedule.id;
    setDeleteLoading(scheduleId);
    setError('');
    setSuccess('');
    setDeleteConfirmation({ show: false, schedule: null });

    try {
      const token = getToken();
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await fetch('/api/podcast/schedule', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          scheduleId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Schedule deleted successfully!');
        // Update local state immediately for better UX
        setSchedules(prev => prev.filter(s => s.id !== scheduleId));
        // Save updated data to cache
        const updatedSchedules = schedules.filter(s => s.id !== scheduleId);
        saveToCache(updatedSchedules);
        // Background refresh
        fetchSchedules(false);
      } else {
        setError(data.error || 'Failed to delete schedule');
        // Revert on error
        fetchSchedules(true);
      }
    } catch (err: any) {
      setError('Failed to delete schedule');
      fetchSchedules(true);
    } finally {
      setDeleteLoading('');
    }
  }, [deleteConfirmation.schedule, getToken, schedules, saveToCache, fetchSchedules]);

  // Memoized functions
  const showDeleteConfirmation = useCallback((schedule: Schedule): void => {
    setDeleteConfirmation({ show: true, schedule });
  }, []);

  const hideDeleteConfirmation = useCallback((): void => {
    setDeleteConfirmation({ show: false, schedule: null });
  }, []);

  const addParticipant = useCallback((): void => {
    if (participantInput.trim() && !formData.participants.includes(participantInput.trim())) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participantInput.trim()]
      }));
      setParticipantInput('');
    }
  }, [participantInput, formData.participants]);

  const removeParticipant = useCallback((participant: string): void => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p !== participant)
    }));
  }, []);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Format date for display
  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleString();
  }, []);

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Load data on component mount
  useEffect(() => {
    // Try to load from cache first
    const hasCachedData = loadCachedData();
    
    if (hasCachedData) {
      setLoading(false);
      // Still fetch in background to get latest data
      fetchSchedules(false);
    } else {
      // No cache, fetch immediately
      fetchSchedules(true);
    }
  }, []);

  // Memoized sorted schedules (upcoming first)
  const sortedSchedules = useMemo(() => {
    return [...schedules].sort((a, b) => 
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  }, [schedules]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="p-6 bg-card border border-border rounded-lg animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-muted rounded w-32"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          </div>
          <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
            <div className="flex gap-1">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          </div>
          <div className="mt-4 h-3 bg-muted rounded w-40"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scheduled Podcasts</h1>
            <p className="text-muted-foreground mt-2">Manage your upcoming podcast sessions</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchSchedules(true)}
              className="px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
              disabled={loading}
            >
              {loading && schedules.length > 0 ? (
                <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
              ) : (
                'Refresh'
              )}
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {showForm ? 'Cancel' : 'Schedule New'}
            </button>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-between">
            <p className="text-destructive">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-destructive hover:text-destructive/80"
            >
              ×
            </button>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-between">
            <p className="text-green-600">{success}</p>
            <button
              onClick={() => setSuccess('')}
              className="text-green-600 hover:text-green-500"
            >
              ×
            </button>
          </div>
        )}

        {/* Create Schedule Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">Schedule New Podcast</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  placeholder="Enter podcast title"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground h-24 resize-none"
                  placeholder="Enter podcast description"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Scheduled Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  required
                  disabled={isSubmitting}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Participants
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={participantInput}
                    onChange={(e) => setParticipantInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                    placeholder="Enter participant name/email"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Add
                  </button>
                </div>
                {formData.participants.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.participants.map((participant, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                      >
                        {participant}
                        <button
                          type="button"
                          onClick={() => removeParticipant(participant)}
                          className="text-accent-foreground hover:text-destructive"
                          disabled={isSubmitting}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Schedule'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Schedules List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Upcoming Schedules</h2>
          
          {loading && schedules.length === 0 ? (
            <LoadingSkeleton />
          ) : !loading && schedules.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-2">No schedules found</div>
              <p className="text-muted-foreground">Create your first podcast schedule to get started</p>
            </div>
          ) : (
            sortedSchedules.map((schedule) => (
              <div key={schedule.id} className="p-6 bg-card border border-border rounded-lg transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-card-foreground">{schedule.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(schedule.scheduledAt)}
                    </span>
                    <button
                      onClick={() => showDeleteConfirmation(schedule)}
                      disabled={deleteLoading === schedule.id}
                      className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {deleteLoading === schedule.id ? (
                        <>
                          <div className="w-3 h-3 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
                
                {schedule.description && (
                  <p className="text-muted-foreground mb-3">{schedule.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Created by:</span>
                    <span className="text-sm font-medium text-foreground">
                      {schedule.createdBy.firstName} {schedule.createdBy.lastName}
                    </span>
                  </div>
                  
                  {schedule.participants.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Participants:</span>
                      <div className="flex flex-wrap gap-1">
                        {schedule.participants.slice(0, 3).map((participant, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
                          >
                            {participant}
                          </span>
                        ))}
                        {schedule.participants.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{schedule.participants.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  Created on {formatDate(schedule.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmation.show && deleteConfirmation.schedule && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">Delete Schedule</h3>
                    <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4">
                <p className="text-foreground mb-4">
                  Are you sure you want to delete the schedule{' '}
                  <span className="font-semibold text-card-foreground">"{deleteConfirmation.schedule.title}"</span>?
                </p>
                
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scheduled for:</span>
                    <span className="text-foreground font-medium">
                      {formatDate(deleteConfirmation.schedule.scheduledAt)}
                    </span>
                  </div>
                  {deleteConfirmation.schedule.participants.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="text-foreground font-medium">
                        {deleteConfirmation.schedule.participants.length} participant(s)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-muted/30 flex gap-3 justify-end">
                <button
                  onClick={hideDeleteConfirmation}
                  className="px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive hover:bg-destructive/90 rounded-lg transition-colors"
                >
                  Delete Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledPage;