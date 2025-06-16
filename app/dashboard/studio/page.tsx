'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/hooks/use-toast';

interface RoomCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  onClick: () => void;
  variant: 'create' | 'join';
  loading?: boolean;
  isNavigating?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  onClick,
  variant,
  loading = false,
  isNavigating = false
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (loading || isNavigating) return;
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    onClick();
  };

  return (
    <div 
      className={`
        relative bg-background border border-foreground/10 rounded-2xl p-8 w-80 
        transition-all duration-300 cursor-pointer group overflow-hidden
        ${loading || isNavigating ? 'opacity-75 cursor-not-allowed' : 'hover:bg-background/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-foreground/10'}
        ${isClicked ? 'scale-98' : ''}
      `}
      onClick={handleClick}
    >
      {/* Loading overlay */}
      {(loading || isNavigating) && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-3 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            <span className="text-sm text-foreground/70 animate-pulse">
              {variant === 'create' ? 'Creating room...' : 'Joining room...'}
            </span>
          </div>
        </div>
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
      
      {/* Icon */}
      <div className={`
        w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl
        bg-background border border-foreground/20 text-foreground transition-transform duration-300
        ${!loading && !isNavigating ? 'group-hover:scale-110 group-hover:rotate-3' : ''}
      `}>
        {icon}
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-foreground text-center mb-3">
        {title}
      </h2>
      
      {/* Description */}
      <p className="text-foreground/70 text-center text-sm leading-relaxed mb-6">
        {description}
      </p>
      
      {/* Button */}
      <button 
        className={`
          w-full py-3 px-6 rounded-lg font-medium text-background bg-foreground transition-all duration-300
          ${!loading && !isNavigating ? 'hover:bg-foreground/80 hover:-translate-y-0.5 hover:shadow-lg' : ''}
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center space-x-2
        `}
        disabled={loading || isNavigating}
      >
        {loading || isNavigating ? (
          <>
            <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            <span>{loading ? 'Processing...' : 'Loading...'}</span>
          </>
        ) : (
          <span>{buttonText}</span>
        )}
      </button>
    </div>
  );
};

const RoomPage: React.FC = () => {
  const router = useRouter();
  const [createLoading, setCreateLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCreateRoom = async () => {
    if (createLoading || isNavigating) return;
    
    setCreateLoading(true);
    setIsNavigating(true);
    
    try {
      // Add a small delay to ensure loading state is visible
      await new Promise(resolve => setTimeout(resolve, 100));
      
      startTransition(() => {
        router.push('/dashboard/studio/create');
      });
      
      // Keep loading state active for a bit after navigation starts
      // This ensures the user sees feedback even if navigation is quick
      setTimeout(() => {
        setCreateLoading(false);
        setIsNavigating(false);
      }, 1000);
      
    } catch (error) {
      console.error('Failed to create room:', error);
      toast({
        title: "Room Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive"
      });
      setCreateLoading(false);
      setIsNavigating(false);
    }
  };

  const handleJoinRoom = async () => {
    if (joinLoading || isNavigating) return;
    
    setJoinLoading(true);
    setIsNavigating(true);
    
    try {
      // Add a small delay to ensure loading state is visible
      await new Promise(resolve => setTimeout(resolve, 100));
      
      startTransition(() => {
        router.push('/dashboard/studio/join');
      });
      
      // Keep loading state active for a bit after navigation starts
      setTimeout(() => {
        setJoinLoading(false);
        setIsNavigating(false);
      }, 1000);
      
    } catch (error) {
      console.error('Failed to join room:', error);
      toast({
        title: "Room Error",
        description: "Failed to join room. Please try again.",
        variant: "destructive"
      });      
      setJoinLoading(false);
      setIsNavigating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      {/* Global loading indicator */}
      {isNavigating && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-background border border-foreground/20 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg">
            <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            <span className="text-sm text-foreground/70">Navigating...</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Create Room Card */}
        <RoomCard
          title="Create Room"
          description="Start a new room and invite others to join your session"
          icon="+"
          buttonText="Create New Room"
          onClick={handleCreateRoom}
          variant="create"
          loading={createLoading}
          isNavigating={isNavigating && createLoading}
        />

        {/* Join Room Card */}
        <RoomCard
          title="Join Room"
          description="Enter an existing room using a room code or invitation link"
          icon="→"
          buttonText="Join Existing Room"
          onClick={handleJoinRoom}
          variant="join"
          loading={joinLoading}
          isNavigating={isNavigating && joinLoading}
        />
      </div>
      
      {/* Optional: Add a subtle background pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/10" />
      </div>
    </div>
  );
};

export default RoomPage;