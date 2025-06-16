'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
}

interface ProfileResponse {
  user: UserData;
}

interface ErrorResponse {
  error: string;
}

// Skeleton component for loading state
const SettingsSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
      
      {/* Profile Information Skeleton */}
      <div className="bg-background border rounded-lg p-6 mb-8">
        <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
        
        <div className="space-y-4">
          <div>
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div>
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div>
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Password Section Skeleton */}
      <div className="bg-background border rounded-lg p-6">
        <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
        
        <div className="space-y-4">
          <div>
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div>
            <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div>
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function SettingsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    verified: false
  });
  
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateLocalStorage = (userData: UserData) => {
    localStorage.setItem('user_firstName', userData.firstName);
    localStorage.setItem('user_lastName', userData.lastName);
    localStorage.setItem('user_email', userData.email);
    localStorage.setItem('verification_status', userData.verified ? 'verified' : 'unverified');
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        router.push('/signin');
        return;
      }

      const response = await axios.post<ProfileResponse>('/api/profile', { token });

      if (response.status === 200) {
        const { user } = response.data;
        setUserData(user);
        setProfileForm({
          firstName: user.firstName,
          lastName: user.lastName || ''
        });
        updateLocalStorage(user);
      } else {
        router.push('/signin');
      }
    } catch (error: any) {
      console.error('Failed to fetch user data:', error);
      if (error.response?.status === 401) {
        router.push('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await axios.post<ProfileResponse>('/api/settings/update-details', {
        token,
        firstName: profileForm.firstName,
        lastName: profileForm.lastName
      });

      const { user } = response.data;
      setUserData(user);
      updateLocalStorage(user);
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data as ErrorResponse;
        setProfileMessage({ 
          type: 'error', 
          text: errorData?.error || 'Failed to update profile' 
        });
      } else {
        setProfileMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[^a-zA-Z0-9]/.test(password)) return "Password must contain at least one special character";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    return null;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      setPasswordLoading(false);
      return;
    }

    // Validate password requirements
    const passwordError = validatePassword(passwordForm.newPassword);
    if (passwordError) {
      setPasswordMessage({ type: 'error', text: passwordError });
      setPasswordLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await axios.post('/api/settings/password-change', {
        token,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });

      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data as ErrorResponse;
        setPasswordMessage({ 
          type: 'error', 
          text: errorData?.error || 'Failed to change password' 
        });
      } else {
        setPasswordMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post('/api/resend-verification', { token });
      setProfileMessage({ type: 'success', text: 'Verification email sent!' });
    } catch (error) {
      setProfileMessage({ type: 'error', text: 'Failed to send verification email' });
    }
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">Account Settings</h1>
        
        {/* Profile Information Section */}
        <div className="bg-background border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
          
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  value={userData.email}
                  className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  disabled
                  readOnly
                />
                {userData.verified ? (
                  <span className="text-green-600 text-sm font-medium whitespace-nowrap">✓ Verified</span>
                ) : (
                  <span className="text-orange-500 text-sm font-medium whitespace-nowrap">⚠️ Unverified</span>
                )}
              </div>
              {!userData.verified && (
                <button
                  type="button"
                  className="mt-2 text-sm text-purple-600 hover:underline"
                  onClick={handleResendVerification}
                >
                  Resend verification email
                </button>
              )}
            </div>
            
            {profileMessage.text && (
              <div className={`p-3 rounded-md ${
                profileMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {profileMessage.text}
              </div>
            )}
            
            <button
              type="submit"
              disabled={profileLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
        
        {/* Password & Security Section */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Password & Security</h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                minLength={8}
              />
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">Password must contain:</p>
                <ul className="text-sm text-gray-500 list-disc list-inside">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            {passwordMessage.text && (
              <div className={`p-3 rounded-md ${
                passwordMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {passwordMessage.text}
              </div>
            )}
            
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}