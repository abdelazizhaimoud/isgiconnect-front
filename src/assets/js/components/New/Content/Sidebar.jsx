// components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  const trendingCategories = [
    { name: 'Technology', count: 45, color: 'bg-red-500', icon: 'TECH' },
    { name: 'Business', count: 32, color: 'bg-green-500', icon: 'BIZ' },
    { name: 'Science', count: 28, color: 'bg-purple-500', icon: 'SCI' },
    { name: 'Design', count: 24, color: 'bg-blue-500', icon: 'UX' },
    { name: 'Health', count: 19, color: 'bg-pink-500', icon: 'MED' }
  ];

  const popularTags = [
    { name: 'javascript', color: 'bg-yellow-500' },
    { name: 'react', color: 'bg-blue-600' },
    { name: 'programming', color: 'bg-green-600' },
    { name: 'tutorial', color: 'bg-red-500' },
    { name: 'webdev', color: 'bg-purple-600' },
    { name: 'design', color: 'bg-pink-600' },
    { name: 'nodejs', color: 'bg-green-700' },
    { name: 'css', color: 'bg-blue-500' }
  ];

  return (
    <div className="w-full space-y-4 lg:space-y-6">
      {/* Trending Categories Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 font-[Poppins]">
            Trending Categories
          </h3>
        </div>
        
        <div className="p-4 lg:p-6 space-y-4">
          {trendingCategories.map((category, index) => (
            <div key={index} className="flex items-center space-x-4 group cursor-pointer">
              <div className={`w-12 h-12 lg:w-14 lg:h-14 ${category.color} rounded-full 
                             flex items-center justify-center flex-shrink-0 
                             group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white text-xs font-bold font-[Montserrat]">
                  {category.icon}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm lg:text-base font-[Poppins] 
                             group-hover:text-blue-600 transition-colors duration-200 truncate">
                  {category.name}
                </h4>
                <p className="text-xs lg:text-sm text-gray-500 font-[Montserrat]">
                  {category.count} articles
                </p>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
          
          <button className="w-full mt-4 py-2.5 lg:py-3 bg-blue-50 hover:bg-blue-100 
                           text-blue-600 rounded-lg font-medium text-sm transition-colors 
                           duration-200 font-[Montserrat]">
            View All Categories
          </button>
        </div>
      </div>

      {/* Popular Tags Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 font-[Poppins]">
            Popular Tags
          </h3>
        </div>
        
        <div className="p-4 lg:p-6">
          <div className="flex flex-wrap gap-2 lg:gap-3 mb-4">
            {popularTags.map((tag, index) => (
              <span
                key={index}
                className={`${tag.color} text-white px-3 py-1.5 rounded-full text-xs lg:text-sm 
                           font-medium cursor-pointer hover:scale-105 transition-transform 
                           duration-200 font-[Montserrat]`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
          
          <button className="w-full py-2.5 lg:py-3 bg-blue-50 hover:bg-blue-100 
                           text-blue-600 rounded-lg font-medium text-sm transition-colors 
                           duration-200 font-[Montserrat]">
            Explore All Tags
          </button>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md 
                      hover:shadow-lg transition-shadow duration-300 text-white overflow-hidden">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl font-semibold mb-4 font-[Poppins]">
            Community Stats
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-100 text-sm font-[Montserrat]">Total Posts</span>
              <span className="font-bold text-lg font-[Poppins]">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100 text-sm font-[Montserrat]">Active Users</span>
              <span className="font-bold text-lg font-[Poppins]">567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100 text-sm font-[Montserrat]">Comments Today</span>
              <span className="font-bold text-lg font-[Poppins]">89</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-100 font-[Montserrat]">
                12 users online now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Connections Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 font-[Poppins]">
            Suggested Connections
          </h3>
        </div>
        
        <div className="p-4 lg:p-6 space-y-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center space-x-3 group">
              <img
                src={`/images/user/0${index + 2}.jpg`}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover 
                         group-hover:border-blue-300 transition-colors duration-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm font-[Poppins] truncate">
                  User {index + 1}
                </h4>
                <p className="text-xs text-gray-500 font-[Montserrat]">
                  {Math.floor(Math.random() * 50) + 10} mutual friends
                </p>
              </div>
              <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white 
                               rounded-full text-xs font-medium transition-colors duration-200">
                Follow
              </button>
            </div>
          ))}
          
          <button className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 
                           text-gray-600 rounded-lg font-medium text-sm transition-colors 
                           duration-200 font-[Montserrat]">
            See More Suggestions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;