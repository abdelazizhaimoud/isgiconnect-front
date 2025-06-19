import React, { useRef, useState, useEffect } from 'react';
import { 
  RiNewspaperLine, 
  RiUser3Line, 
  RiGroupLine, 
  RiImageLine,
  RiGroup3Line, 
  RiVideoLine, 
  RiCalendarLine, 
  RiFileLine, 
  RiAnchorLine, 
  RiChat1Line, 
  RiTodoLine, 
  RiNotification2Line, 
  RiMusicLine, 
  RiMailLine, 
  RiCloudyLine, 
  RiGiftLine, 
  RiBriefcaseLine 
} from '@remixicon/react';
import { useSelector, useDispatch } from 'react-redux';
import { set_view } from './Store/actions';
import { useNavigate, useLocation } from 'react-router-dom';

function LeftSideBar() {
    const dispatch = useDispatch();
    const toggle = useSelector(state => state.toggle);
    const scrollRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [menuItems, setMenuItems] = useState([
        { icon: <RiNewspaperLine size={20} />, text: "Newsfeed", path: '/student/dashboard' },
        { icon: <RiBriefcaseLine size={20} />, text: "Job Board", path: '/student/dashboard/jobs' },
        { icon: <RiUser3Line size={20} />, text: "Profile", path: '/student/dashboard/profile' },
        { icon: <RiGroupLine size={20} />, text: "Friend Lists", path: '/student/dashboard/friends' },
        { icon: <RiGroup3Line size={20} />, text: "Group", path: '/student/dashboard/group' },
        { icon: <RiChat1Line size={20} />, text: "Chat", path: '/student/dashboard/chat' }
    ]);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Effect for handling scrollbar visibility
    useEffect(() => {
        const element = scrollRef.current;
        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(element.scrollTimeout);
            element.scrollTimeout = setTimeout(() => setIsScrolling(false), 1000);
        };
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
                if (element.scrollTimeout) {
                    clearTimeout(element.scrollTimeout);
                }
            }
        };
    }, []);

    // This useEffect is removed as it was causing bugs with navigation
    // by overwriting the menuItems array and removing path properties.
    // The visual toggling is handled in the JSX directly.

    useEffect(() => {
        const path = location.pathname;
        if (path === '/friends') setActiveItem(3);
    }, [location]);

    const getScrollbarStyles = () => {
        if (!isScrolling) return '';
        return `[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:rounded-full 
                [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:rounded-full`;
    };

    const handleItemClick = (item, index) => {
        setActiveItem(index);

        if (item.path) {
            navigate(item.path);
        }

        // Close sidebar on mobile after navigation
        if (isMobile && !toggle) {
            setTimeout(() => {
                dispatch({ type: 'TOGGLE_SIDEBAR' });
            }, 200);
        }
    };

    return (
        <div className={`
            h-full bg-white select-none transition-all duration-300 ease-out overflow-hidden
            shadow-lg md:shadow-[0px_0px_20px_0px_rgba(44,101,144,0.1)]
            ${isMobile 
                ? `fixed left-0 top-0 z-50 w-[280px] ${toggle ? '-translate-x-full' : 'translate-x-0'}` 
                : `relative ${toggle ? 'w-[75px]' : 'w-[250px]'}`
            }
            ${isMobile ? 'py-4' : 'py-6'}
        `}>
            {/* Mobile Header */}
            {isMobile && (
                <div className="px-4 pb-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src='/images/Logo.svg' className="w-8 h-8" />
                        <span className="font-[Poppins] text-lg font-semibold text-gray-700">
                            ISGI CONNECT
                        </span>
                    </div>
                    <button 
                        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            
            <div 
                ref={scrollRef}
                className={`
                    h-full flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth 
                    transition-all duration-300 ease-out
                    ${isMobile 
                        ? 'px-4 gap-2 max-h-[calc(100vh-100px)]' 
                        : `px-2.5 gap-4 max-h-[800px] ${toggle ? 'w-[75px]' : 'w-[250px]'}`
                    }
                    ${getScrollbarStyles()}
                `}
            >
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleItemClick(item, index)}
                        className={`
                            flex items-center cursor-pointer text-sm font-normal tracking-wider 
                            rounded-lg transition-all duration-300 font-[Montserrat]
                            ${isMobile 
                                ? 'p-3 gap-3 hover:bg-blue-50 hover:text-blue-500 active:bg-blue-100' 
                                : `p-2.5 scale-90 ${toggle 
                                    ? 'justify-center hover:[&>svg]:text-blue-400' 
                                    : 'gap-2.5 hover:bg-blue-50 hover:text-blue-400 hover:[&>svg]:text-blue-400 active:bg-blue-100'
                                }`
                            }
                            ${!toggle && activeItem === index 
                                ? 'text-blue-400 bg-blue-50 shadow-sm' 
                                : 'text-gray-500 bg-white'
                            }
                            ${isMobile && activeItem === index 
                                ? 'text-blue-500 bg-blue-50 shadow-sm border-l-4 border-blue-500' 
                                : ''
                            }
                        `}
                    >
                        <div className={`
                            transition-all duration-300 flex-shrink-0
                            ${activeItem === index ? 'text-blue-400' : 'text-gray-500'}
                            ${toggle && !isMobile ? 'mr-0' : 'mr-3'}
                        `}>
                            {item.icon}
                        </div>
                        {(!toggle || isMobile) && (
                            <span className={`
                                menu-text transition-all duration-300 min-w-0 flex-1
                                ${isMobile ? 'text-base' : 'text-sm'}
                                ${activeItem === index ? 'font-medium' : 'font-normal'}
                            `}>
                                {item.text}
                            </span>
                        )}
                        
                        {/* Mobile chevron indicator */}
                        {isMobile && (
                            <svg 
                                className={`
                                    w-4 h-4 transition-transform duration-300 flex-shrink-0
                                    ${activeItem === index ? 'text-blue-400 rotate-90' : 'text-gray-400'}
                                `} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </div>
                ))}
                
                {/* Mobile Footer */}
                {isMobile && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 text-center">
                            ISGI Connect v2.0
                        </div>
                    </div>
                )}
            </div>
            
            {/* Desktop Tooltip for collapsed state */}
            {toggle && !isMobile && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .menu-item-tooltip {
                            position: relative;
                        }
                        
                        .menu-item-tooltip:hover::after {
                            content: attr(data-tooltip);
                            position: absolute;
                            left: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            background: #1f2937;
                            color: white;
                            padding: 8px 12px;
                            border-radius: 6px;
                            font-size: 12px;
                            white-space: nowrap;
                            z-index: 1000;
                            margin-left: 8px;
                            opacity: 0;
                            animation: fadeIn 0.2s ease-out forwards;
                        }
                        
                        .menu-item-tooltip:hover::before {
                            content: '';
                            position: absolute;
                            left: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            border: 6px solid transparent;
                            border-right-color: #1f2937;
                            z-index: 1000;
                            margin-left: 2px;
                            opacity: 0;
                            animation: fadeIn 0.2s ease-out forwards;
                        }
                        
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }

                        /* Hide scrollbar but keep functionality */
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .hide-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `
                }}/>
            )}
        </div>
    );
}

export default LeftSideBar;