import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function RightSideBar() {
  const [isVisible, setIsVisible] = useState(true); // Default to visible on desktop
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0); // Initialize with 0, will be updated by effect
  const headerRef = useRef(null);

  // Effect to determine header height for proper sidebar positioning
  useEffect(() => {
    // Find the header's actual container div by its specific classes in Dashboard.jsx
    const headerContainer = document.querySelector('.flex-shrink-0.z-30.relative');
    if (headerContainer) {
      headerRef.current = headerContainer;
      setHeaderHeight(headerContainer.offsetHeight);
      
      // Observe header height changes (e.g., if a mobile header breakpoint changes height)
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          setHeaderHeight(entries[0].contentRect.height);
        }
      });
      observer.observe(headerContainer);
      
      return () => {
        if (headerRef.current) {
          observer.unobserve(headerRef.current);
        }
      };
    } else {
        // Fallback for header height if the specific div is not found or has no height yet
        // A reasonable default based on Dashboard component (e.g., 64px or 75px for height-[75px])
        setHeaderHeight(75); 
    }
  }, []);

  // Handle responsive behavior (RightSideBar should be hidden on smaller screens)
  useEffect(() => {
    const checkScreenSize = () => {
      // The breakpoint for this RightSideBar to disappear is 'lg' (1024px) based on Dashboard parent
      const mobile = window.innerWidth < 1024; 
      setIsMobile(mobile);
      if (mobile) {
        setIsVisible(false); // Ensure it's hidden if we switch to mobile, for consistent behavior
      } else {
        setIsVisible(true); // Ensure it's visible by default on desktop when screen expands
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  // Sample friend data (from your original code)
  const friends = [
    { id: 1, name: "Anna Sthesia", role: "Admin", avatar: "/01.jpg", status: "online" },
    { id: 2, name: "Paul Molive", role: "Admin", avatar: "/02.jpg", status: "online" },
    { id: 3, name: "Anna Mull", role: "Admin", avatar: "/03.jpg", status: "online" },
    { id: 4, name: "Paige Turner", role: "Admin", avatar: "/04.jpg", status: "offline" },
    { id: 5, name: "Bob Frapples", role: "Admin", avatar: "/05.jpg", status: "online" },
    { id: 6, name: "Barb Ackue", role: "Admin", avatar: "/06.jpg", status: "idle" },
    { id: 7, name: "Greta Life", role: "Admin", avatar: "/07.jpg", status: "online" },
    { id: 8, name: "Ira Membrit", role: "Admin", avatar: "/08.jpg", status: "online" },
    { id: 9, name: "Pete Sariya", role: "Admin", avatar: "/09.jpg", status: "online" },
    { id: 10, name: "Monty Carlo", role: "Admin", avatar: "/10.jpg", status: "idle" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-emerald-400';
      case 'idle': return 'bg-orange-400';
      default: return 'bg-gray-500';
    }
  };

  // If on a mobile/tablet screen size, don't render the RightSideBar at all
  if (isMobile) {
    return null;
  }

  // Common 'top' positioning for the toggle buttons (e.g., top-6 from the sidebar's top edge)
  // This matches a value that should place it generally near the existing button's position.
  const buttonTopPos = 'top-6'; 

  return (
    <>
      {/* 
        'Open' Button (only visible when sidebar is hidden)
        This button remains fixed at the screen's right edge to allow reopening the sidebar.
      */}
      {!isVisible && (
        <button
          onClick={toggleSidebar}
          className={`
            fixed ${buttonTopPos} right-0 w-11 h-14 bg-blue-500 hover:bg-blue-600
            border-none rounded-l-full flex items-center justify-center cursor-pointer
            z-50 shadow-lg text-white text-xl transition-all duration-300
            hover:scale-105 active:scale-95 pr-1
          `}
          aria-label="Open sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Main Sidebar Container */}
      <div 
        className={`
          fixed right-0 transition-all duration-500 ease-in-out z-40
          ${isVisible ? 'translate-x-0' : 'translate-x-full'} /* Controls sidebar slide */
          w-64 xl:w-72
          ${isVisible ? 'shadow-xl' : 'shadow-none'} /* Remove shadow when hidden */
        `}
        style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`
        }}
      >
        {/* 
          'Close' Button (only visible when sidebar is open)
          This button is absolute relative to the sidebar container, making it slide with the sidebar.
        */}
        {isVisible && (
            <button
              onClick={toggleSidebar}
              className={`
                absolute ${buttonTopPos} -left-11 w-11 h-14 bg-blue-500 hover:bg-blue-600
                border-none rounded-l-full flex items-center justify-center cursor-pointer
                z-50 shadow-lg text-white text-xl transition-all duration-300
                hover:scale-105 active:scale-95 pr-1
              `}
              aria-label="Close sidebar"
            >
              <ChevronRight size={20} />
            </button>
        )}

        {/* Sidebar Content Area */}
        <div className="relative w-full h-full bg-white shadow-xl border-l border-gray-100 
                        flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 xl:p-6 border-b border-gray-100 flex-shrink-0">
            <h3 className="text-lg xl:text-xl font-semibold text-gray-800 font-[Poppins]">
              Team
            </h3>
            <p className="text-xs xl:text-sm text-gray-500 mt-1">
              {friends.filter(f => f.status === 'online').length} online
            </p>
          </div>

          {/* Friends List */}
          <div className="flex-1 overflow-y-auto p-3 xl:p-4 space-y-2 xl:space-y-3 
                          scrollbar-thin scrollbar-thumb-gray-200">
            {friends.map((friend, index) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 xl:gap-4 p-2 xl:p-3 rounded-lg cursor-pointer 
                           transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02]
                           hover:shadow-sm group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar with Status */}
                <div className="relative flex-shrink-0">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 xl:w-12 xl:h-12 rounded-full object-cover 
                               border-2 border-gray-100 transition-all duration-300 
                               group-hover:border-blue-200"
                  />
                  <span
                    className={`
                      absolute -bottom-0.5 -right-0.5 w-3 h-3 xl:w-4 xl:h-4 
                      ${getStatusColor(friend.status)} rounded-full border-2 border-white 
                      transition-all duration-300 group-hover:scale-110
                    `}
                  />
                </div>

                {/* Friend Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm xl:text-base 
                                 font-[Poppins] transition-colors duration-300 
                                 group-hover:text-blue-500 truncate">
                    {friend.name}
                  </div>
                  <div className="text-xs xl:text-sm text-gray-500 font-[Montserrat] 
                                 transition-colors duration-300 group-hover:text-gray-600">
                    {friend.role}
                  </div>
                </div>

                {/* Online indicator pulse */}
                {friend.status === 'online' && (
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 xl:p-6 border-t border-gray-100 flex-shrink-0">
            <button className="w-full py-2 xl:py-3 px-4 bg-blue-50 hover:bg-blue-100 
                              text-blue-600 rounded-lg transition-colors duration-300 
                              font-[Montserrat] text-sm font-medium">
              View All Members
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile overlay - (Currently disabled because RightSideBar returns null on mobile) */}
      {/* This ensures the backdrop behaves as expected if RightSideBar were enabled on mobile screens later */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* Custom CSS for animations and scrollbar (from your original code) */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
            opacity: 0;
          }
          
          .scrollbar-thin {
            scrollbar-width: thin;
          }
          
          .scrollbar-thumb-gray-200::-webkit-scrollbar {
            width: 6px;
          }
          
          .scrollbar-thumb-gray-200::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .scrollbar-thumb-gray-200::-webkit-scrollbar-thumb {
            background-color: #e5e7eb;
            border-radius: 3px;
          }
          
          .scrollbar-thumb-gray-200::-webkit-scrollbar-thumb:hover {
            background-color: #d1d5db;
          }
          
          /* Responsive adjustments */
          @media (max-width: 1280px) {
            .xl\\:w-72 {
              width: 16rem; /* Adjusted for consistency, if xl:w-72 was not applied as 28rem */
            }
          }
        `
      }} />
    </>
  );
}

export default RightSideBar;