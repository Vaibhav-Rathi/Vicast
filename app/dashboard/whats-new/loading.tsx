import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-2 h-6 w-96 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          {/* Badge Skeleton */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full mb-6">
            <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
          
          {/* Title Skeleton */}
          <div className="space-y-4 mb-6">
            <div className="h-10 w-80 bg-gray-200 rounded mx-auto"></div>
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto"></div>
          </div>
          
          {/* Description Skeleton */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="h-6 w-full bg-gray-200 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>

        {/* Main Features Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-background rounded-xl shadow-lg p-8 border">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="px-3 py-1 bg-gray-200 rounded-full">
                  <div className="w-12 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
              
              {/* Title */}
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
              
              {/* Description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
              </div>
              
              {/* Highlights */}
              <div className="space-y-2">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Demo Section Skeleton */}
        <div className="bg-gray-200 rounded-2xl p-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
            <div className="h-6 w-96 bg-gray-300 rounded mb-8 mx-auto"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 w-40 bg-gray-300 rounded-lg"></div>
              <div className="h-12 w-40 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Update Timeline Skeleton */}
        <div className="bg-background rounded-xl shadow-lg p-8 mb-12 border">
          <div className="flex items-center mb-8">
            <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
            <div className="h-7 w-40 bg-gray-200 rounded"></div>
          </div>
          
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-start space-x-4 pb-6 border-b last:border-b-0">
                <div className="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats Skeleton */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="h-12 w-16 bg-gray-200 rounded mb-2 mx-auto"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-12 w-20 bg-gray-200 rounded mb-2 mx-auto"></div>
            <div className="h-4 w-36 bg-gray-200 rounded mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-gray-200 rounded mb-2 mx-auto"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;