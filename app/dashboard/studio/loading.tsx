import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}) => {
  const baseClasses = 'animate-pulse bg-gray-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

interface LoadingProps {
  variant?: 'cards' | 'list' | 'profile' | 'default';
}

const Loading: React.FC<LoadingProps> = ({ variant = 'cards' }) => {
  if (variant === 'cards') {
    return (
      <div className="min-h-screen bg-[#0f0f23] text-[#cccccc] flex items-center justify-center gap-8 p-8">
        {/* Card Skeletons */}
        {[1, 2].map((index) => (
          <div key={index} className="bg-[#1a1a2e] border border-gray-700 rounded-2xl p-10 w-80 space-y-6">
            {/* Icon Skeleton */}
            <div className="flex justify-center">
              <Skeleton variant="circular" width={64} height={64} />
            </div>
            
            {/* Title Skeleton */}
            <div className="flex justify-center">
              <Skeleton variant="text" className="h-6 w-32" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-3/4 mx-auto" />
            </div>
            
            {/* Button Skeleton */}
            <Skeleton variant="rectangular" className="h-12 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="min-h-screen bg-[#0f0f23] text-[#cccccc] p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-[#1a1a2e] border border-gray-700 rounded-lg p-6 flex items-center space-x-4">
              <Skeleton variant="circular" width={48} height={48} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="h-4 w-1/4" />
                <Skeleton variant="text" className="h-3 w-3/4" />
              </div>
              <Skeleton variant="rectangular" className="h-8 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div className="min-h-screen bg-[#0f0f23] text-[#cccccc] p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1a2e] border border-gray-700 rounded-2xl p-8 space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <Skeleton variant="circular" width={120} height={120} />
            </div>
            
            {/* Name */}
            <div className="flex justify-center">
              <Skeleton variant="text" className="h-8 w-48" />
            </div>
            
            {/* Bio */}
            <div className="space-y-2">
              <Skeleton variant="text" className="h-4 w-full" />
              <Skeleton variant="text" className="h-4 w-5/6 mx-auto" />
              <Skeleton variant="text" className="h-4 w-4/6 mx-auto" />
            </div>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 pt-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="text-center space-y-2">
                  <Skeleton variant="text" className="h-6 w-12 mx-auto" />
                  <Skeleton variant="text" className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
            
            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <Skeleton variant="rectangular" className="h-12 flex-1 rounded-lg" />
              <Skeleton variant="rectangular" className="h-12 flex-1 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default loading with spinner
  return (
    <div className="min-h-screen bg-[#0f0f23] text-[#cccccc] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;