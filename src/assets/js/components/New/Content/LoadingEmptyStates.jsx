// components/LoadingState.jsx
import React from 'react';
import styled from 'styled-components';

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-300 rounded-full animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 font-[Poppins] mb-2">
          Loading content...
        </h3>
        <p className="text-sm text-gray-500 font-[Montserrat]">
          Please wait while we fetch the latest posts
        </p>
      </div>

      {/* Loading Skeleton Cards */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// components/EmptyState.jsx
export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 
                    text-center bg-white rounded-xl shadow-md">
      {/* Empty State Icon */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center 
                      justify-center mb-6">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" 
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>

      {/* Empty State Content */}
      <div className="px-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 font-[Poppins] mb-3">
          No Content Available
        </h3>
        <p className="text-gray-500 font-[Montserrat] mb-8 leading-relaxed">
          It looks like there are no posts to display right now. Be the first to share something 
          with the community or check back later for new content!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                           font-medium transition-colors duration-200 font-[Montserrat]">
            Create First Post
          </button>
          <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg 
                           font-medium transition-colors duration-200 font-[Montserrat]">
            Refresh Page
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-12 flex justify-center space-x-2">
        <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};