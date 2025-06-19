import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenuLine, RiHomeLine, RiGroupLine, RiNotification4Line, RiMailLine, RiArrowDropDownLine, RiSearchLine, RiFileUserLine, RiProfileLine, RiAccountBoxLine, RiLockLine, RiLoginBoxLine, RiCloseLine, RiChat1Line } from '@remixicon/react';
import { FaBell, FaUserFriends, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggle_side_bar, set_user } from './Store/actions';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/getUser';
import eventBus from '../../../../utils/eventBus';

function Header({ user }) {
    const [canToggle, setCanToggle] = useState(true)
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false)

    const [receivedRequests, setReceivedRequests] = useState([]);
    // Search states
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const [showSearchFilters, setShowSearchFilters] = useState(false)
    const [searchFilters, setSearchFilters] = useState({
        content_type: '',
        category: '',
        user_id: '',
        sort: 'latest'
    })
    const searchTimeoutRef = useRef(null)

    // Existing dropdown states
    const [FirstfriendRequestFlag, setFirstfriendRequestFlag] = useState(false)
    const friendRequestRef = useRef()
    const friendRequestButtonRef = useRef()
    const [friendRequestToggle, setFriendRequestToggle] = useState(false)

    const [FirstNotificationsFlag, setFirstNotificationsFlag] = useState(false)
    const NotificationsRef = useRef()
    const NotificationsButtonRef = useRef()
    const [notificationsToggle, setNotificationsToggle] = useState(false)

    const [FirstDropDownFlag, setFirstDropDownFlag] = useState(false)
    const DropDownRef = useRef()
    const DropDownButtonRef = useRef()
    const [DropDownToggle, setDropDownToggle] = useState(false)

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    // Handle responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleSideBarToggle = () => {
        if (canToggle) {
            dispatcher(toggle_side_bar())
            setCanToggle(false)
            setTimeout(() => { setCanToggle(true) }, 300)
        }
    }

    // Search functionality (keeping original logic)
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
        }

        if (value.trim().length >= 2) {
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(value.trim(), searchFilters)
            }, 300)
        } else {
            setSearchResults([])
            setShowSearchResults(false)
        }
    }

    const performSearch = async (query, filters = searchFilters) => {
        if (!query || query.length < 2) return

        setSearchLoading(true)
        setShowSearchResults(true)

        try {
            const params = new URLSearchParams({
                q: query,
                per_page: 10,
                sort: filters.sort || 'latest'
            })

            if (filters.content_type) params.append('content_type', filters.content_type)
            if (filters.category) params.append('category', filters.category)
            if (filters.user_id) params.append('user_id', filters.user_id)

            const response = await axiosClient.get(`/api/posts/search?${params}`)

            if (response.data && response.data.data && response.data.data.posts) {
                setSearchResults(response.data.data.posts)
            } else {
                setSearchResults([])
            }
        } catch (error) {
            console.error('Search error:', error)
            setSearchResults([])
        } finally {
            setSearchLoading(false)
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim().length >= 2) {
            performSearch(searchQuery.trim(), searchFilters)
            setShowSearchResults(false)
        }
    }

    const handleFilterChange = (filterName, value) => {
        const newFilters = {
            ...searchFilters,
            [filterName]: value
        }
        setSearchFilters(newFilters)
        
        if (searchQuery.trim().length >= 2) {
            performSearch(searchQuery.trim(), newFilters)
        }
    }

    const handleClearFilters = () => {
        const defaultFilters = {
            content_type: '',
            category: '',
            user_id: '',
            sort: 'latest'
        }
        setSearchFilters(defaultFilters)
        
        if (searchQuery.trim().length >= 2) {
            performSearch(searchQuery.trim(), defaultFilters)
        }
    }

    const handleApplyFilters = () => {
        setShowSearchFilters(false)
        if (searchQuery.trim().length >= 2) {
            performSearch(searchQuery.trim(), searchFilters)
        }
    }

    const handleSearchResultClick = (post) => {
        console.log('Post clicked:', post)
        setShowSearchResults(false)
        setSearchQuery('')
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        setSearchResults([])
        setShowSearchResults(false)
        setShowSearchFilters(false)
    }

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setShowSearchResults(false)
                setShowSearchFilters(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    // All the existing useEffects for dropdowns...
    useEffect(() => {
        const element = friendRequestRef.current;
        const element2 = friendRequestButtonRef.current;
        const handleClick = (event) => {
            if (element && (event.target === element || element.contains(event.target))) {
                setFriendRequestToggle(true);
            } else if (element2 && (element2.contains(event.target) || event.target === element2)) {
                setFriendRequestToggle(prev => !prev);
            }
            else {
                setFriendRequestToggle(false);
            }
        };
        if (element && element2) {
            document.addEventListener('click', handleClick);
        }
        return () => {
            if (element && element2) {
                document.removeEventListener('click', handleClick);
            }
        };
    }, []);

    useEffect(() => {
        if (friendRequestToggle) {
            const fetchReceivedRequests = async () => {
                try {
                    const response = await axiosClient.get('/api/friend-requests/received');
                    if (response.data.status === 'success') {
                        setReceivedRequests(response.data.data);
                    }
                } catch (error) {
                    console.error('Error fetching received requests:', error);
                }
            };
            fetchReceivedRequests();
        }
    }, [friendRequestToggle]);

    // (Other useEffects remain the same...)
    useEffect(() => {
        const element = NotificationsRef.current;
        const element2 = NotificationsButtonRef.current;
        const handleClick = (event) => {
            if (element && (event.target === element || element.contains(event.target))) {
                setNotificationsToggle(true);
            } else if (element2 && (element2.contains(event.target) || event.target === element2)) {
                setNotificationsToggle(prev => !prev);
            }
            else {
                setNotificationsToggle(false);
            }
        };
        if (element && element2) {
            document.addEventListener('click', handleClick);
        }
        return () => {
            if (element && element2) {
                document.removeEventListener('click', handleClick);
            }
        };
    }, []);

    useEffect(() => {
        const element = DropDownRef.current;
        const element2 = DropDownButtonRef.current;
        const handleClick = (event) => {
            if (element && (event.target === element || element.contains(event.target))) {
                setDropDownToggle(true);
            } else if (element2 && (element2.contains(event.target) || event.target === element2)) {
                setDropDownToggle(prev => !prev);
            }
            else {
                setDropDownToggle(false);
            }
        };
        if (element && element2) {
            document.addEventListener('click', handleClick);
        }
        return () => {
            if (element && element2) {
                document.removeEventListener('click', handleClick);
            }
        };
    }, []);

    // Animation useEffects
    useEffect(() => {
        if (!FirstfriendRequestFlag) {
            setFirstfriendRequestFlag(true)
            return;
        }
        const friendRequest = friendRequestRef.current;
        if (friendRequest) {
            if (friendRequestToggle) {
                friendRequest.classList.remove('hide');
                friendRequest.classList.remove('OUT');
                friendRequest.classList.add('IN');
            } else {
                friendRequest.classList.remove('IN');
                void friendRequest.offsetWidth;
                friendRequest.classList.add('OUT');
            }
        }
    }, [friendRequestToggle]);

    useEffect(() => {
        if (!FirstNotificationsFlag) {
            setFirstNotificationsFlag(true)
            return;
        }
        const Notifications = NotificationsRef.current;
        if (Notifications) {
            if (notificationsToggle) {
                Notifications.classList.remove('hide');
                Notifications.classList.remove('OUT');
                Notifications.classList.add('IN');
            } else {
                Notifications.classList.remove('IN');
                void Notifications.offsetWidth;
                Notifications.classList.add('OUT');
            }
        }
    }, [notificationsToggle]);

    useEffect(() => {
        if (!FirstDropDownFlag) {
            setFirstDropDownFlag(true)
            return;
        }
        const DropDown = DropDownRef.current;
        if (DropDown) {
            if (DropDownToggle) {
                DropDown.classList.remove('hide');
                DropDown.classList.remove('OUT');
                DropDown.classList.add('IN');
            } else {
                DropDown.classList.remove('IN');
                void DropDown.offsetWidth;
                DropDown.classList.add('OUT');
            }
        }
    }, [DropDownToggle]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await axiosClient.get("/sanctum/csrf-cookie");

        await axiosClient.post('/api/logout')
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    dispatcher(set_user(null));
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Logout error:', error);
                setIsLoggingOut(false);
            });
    };

    const handleConfirmRequest = async (requestId) => {
        try {
            const response = await axiosClient.post('/api/friend-requests/accept', {
                request_id: requestId
            });
            if (response.data.status === 'success') {
                setReceivedRequests(prev => prev.filter(req => req.id !== requestId));
                eventBus.dispatch('friends:updated');
            }
        } catch (error) {
            console.error('API call error confirming request:', error);
        }
    };

    const handleDeleteRequest = async (requestId) => {
        try {
            const response = await axiosClient.post('/api/friend-requests/reject', {
                request_id: requestId
            });
            if (response.data.status === 'success') {
                setReceivedRequests(prev => prev.filter(req => req.id !== requestId));
            }
        } catch (error) {
            console.error('API call error deleting request:', error);
        }
    };

return (
    <div className="w-full h-[75px] min-h-[73px] bg-white shadow-lg flex items-center justify-center z-30 relative">
        
        {/* Dropdowns - Responsive positioning */}
        {/* Friend Request Dropdown */}
        <div ref={friendRequestRef} className={`
            hide max-h-[415px] w-[90vw] sm:w-[500px] absolute top-[75px] 
            ${isMobile ? 'left-2 right-2' : 'right-[190px]'} 
            rounded-md overflow-hidden flex-col shadow-xl bg-white border border-gray-200 z-50
        `}>
            <div className="w-full h-[60px] px-5 flex items-center justify-between bg-blue-500 flex-shrink-0">
                <div className="h-[30px] font-[Poppins] font-normal text-[16.8px] text-white">
                    Friend Request
                </div>
                <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center 
                               font-[Poppins] font-bold text-xs text-blue-500">
                    {receivedRequests.length}
                </div>
            </div>

            {receivedRequests.length > 0 ? (
                receivedRequests.map(request => (
                    <div key={request.id} className="w-full min-h-[70px] p-[15px] flex-shrink-0 bg-white 
                                                    flex justify-between border-b border-gray-100">
                        <div className="flex flex-1 min-w-0">
                            <img src={request.sender_avatar_url} 
                                 className="h-10 w-10 rounded-md select-none flex-shrink-0" />
                            <div className="flex-1 pl-4 flex justify-center flex-col min-w-0">
                                <div className="font-[Poppins] font-normal text-gray-700 
                                               text-sm flex items-center truncate">
                                    {request.sender_name}
                                </div>
                                <div className="font-[Montserrat] font-normal text-blue-400 
                                               text-xs flex items-center">
                                    {request.created_at}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => handleConfirmRequest(request.id)}
                                 className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded-md bg-blue-400 text-white 
                                           font-[Montserrat] flex items-center justify-center cursor-pointer 
                                           hover:bg-blue-500 active:bg-blue-600 transition-colors">
                                Confirm
                            </button>
                            <button onClick={() => handleDeleteRequest(request.id)}
                                 className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded-md bg-gray-400 text-white 
                                           font-[Montserrat] flex items-center justify-center cursor-pointer 
                                           hover:bg-gray-500 active:bg-gray-600 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full h-[70px] p-[15px] flex-shrink-0 bg-white border-b border-gray-100">
                    <div className="h-full w-full flex items-center justify-center font-[Montserrat] 
                                   text-sm font-normal text-blue-500 cursor-pointer select-none 
                                   hover:text-blue-700 active:text-blue-800">
                        No new friend requests.
                    </div>
                </div>
            )}
        </div>

        {/* Notifications Dropdown */}
        <div ref={NotificationsRef} className={`
            hide w-[90vw] sm:w-[300px] max-h-[340px] absolute top-[75px] 
            ${isMobile ? 'left-2 right-2' : 'right-[120px]'} 
            rounded-md overflow-hidden flex-col shadow-xl bg-white border border-gray-200 z-50
        `}>
            {/* Notifications content remains the same */}
            <div className="w-full h-[60px] px-5 flex items-center justify-between bg-blue-500 flex-shrink-0">
                <div className="h-[30px] font-[Poppins] font-normal text-[16.8px] text-white">
                    All Notifications
                </div>
                <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center 
                               font-[Poppins] font-bold text-xs text-blue-500">
                    4
                </div>
            </div>
        </div>

        {/* Profile Dropdown */}
        <div ref={DropDownRef} className={`
            hide w-[90vw] sm:w-[300px] max-h-[490px] absolute top-[75px] 
            ${isMobile ? 'left-2 right-2' : 'right-[15px]'} 
            rounded-md overflow-hidden flex-col shadow-xl bg-white border border-gray-200 z-50
        `}>
            <div className="w-full h-[76px] px-5 flex items-center justify-between bg-blue-500 flex-shrink-0">
                <div className="h-[30px] font-[Poppins] font-normal text-[16.8px] text-white">
                    Hello {user?.name || 'User'}!
                </div>
            </div>
            
            {/* Profile menu items */}
            <div className="w-full h-[76px] p-[15px] flex-shrink-0 bg-white flex justify-between 
                           border-b border-gray-100/50 select-none cursor-pointer hover:bg-gray-50 
                           transition-colors">
                <div className="h-[45px] w-[45px] flex items-center justify-center rounded-md 
                               transition-colors bg-blue-50 flex-shrink-0">
                    <RiFileUserLine color='#50B5FF' />
                </div>
                <div className="flex-1 pl-4 flex justify-center flex-col min-w-0">
                    <div className="font-[Poppins] font-normal text-gray-700 
                                   text-sm flex items-center">
                        My Profile
                    </div>
                    <div className="font-[Montserrat] font-normal text-blue-400 
                                   text-xs flex items-center">
                        View personal profile details.
                    </div>
                </div>
            </div>

            <div className="h-[60px] flex items-center justify-center bg-white">
                <button onClick={handleLogout} 
                     className="w-[115px] h-8 rounded-md bg-red-400 cursor-pointer text-white 
                               font-[Montserrat] font-normal text-sm flex items-center justify-center 
                               select-none hover:bg-red-500 active:bg-red-600 transition-colors">
                    {isLoggingOut ? (
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent 
                                       animate-spin" />
                    ) : (
                        <>
                            Sign Out
                            <RiLoginBoxLine className="ml-1" size={16} />
                        </>
                    )}
                </button>
            </div>
        </div>

        {/* Main Header Content */}
        <div className="h-full w-full flex items-center justify-center px-2 sm:px-4">
            <nav className="flex justify-between items-center w-full max-w-[98%] h-full">
                {/* Logo Section */}
                <div className="flex items-center gap-2 sm:gap-4 select-none min-w-0">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 cursor-pointer flex-shrink-0">
                        <img src='/images/Logo.svg' className="h-full w-full" />
                    </div>
                    {!isMobile && (
                        <div className="hidden sm:flex items-center justify-center cursor-pointer">
                            <span className="font-[Poppins] text-sm sm:text-lg text-gray-600 whitespace-nowrap">
                                ISGI CONNECT
                            </span>
                        </div>
                    )}
                    <button onClick={handleSideBarToggle} 
                         className="flex items-center justify-center rounded cursor-pointer p-1 
                                   transition-colors hover:bg-gray-200 active:bg-gray-300">
                        <RiMenuLine color='#777d74' size={20} />
                    </button>
                </div>

                {/* Search Bar - Responsive */}
                <div className={`
                    flex-1 max-w-lg mx-4 relative search-container
                    ${isMobile ? 'hidden' : 'flex items-center justify-center'}
                `}>
                    <form onSubmit={handleSearchSubmit} 
                          className="w-full h-10 rounded-xl border-none outline-none flex 
                                    bg-blue-50 relative focus-within:shadow-md transition-shadow">
                        <input
                            placeholder='Rechercher...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                            className="w-full h-full border-none outline-none bg-blue-50 
                                      px-4 pr-16 text-sm font-[Montserrat] rounded-xl 
                                      text-gray-700 placeholder-gray-400"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 
                                       flex items-center gap-1">
                            {!isMobile && (
                                <button type="button" onClick={() => setShowSearchFilters(!showSearchFilters)} 
                                     className="flex items-center cursor-pointer p-1 rounded 
                                               hover:bg-blue-100 transition-colors">
                                    <RiMenuLine color='#50b5ff' size={16} />
                                </button>
                            )}
                            {searchQuery && (
                                <button type="button" onClick={handleClearSearch} 
                                     className="flex items-center cursor-pointer p-1 rounded 
                                               hover:bg-red-100 transition-colors">
                                    <RiCloseLine color='#dc2626' size={16} />
                                </button>
                            )}
                            <button type="submit"
                                 className="flex items-center cursor-pointer p-1 rounded 
                                           hover:bg-blue-100 transition-colors">
                                <RiSearchLine color='#50b5ff' size={16} />
                            </button>
                        </div>
                    </form>

                    {/* Search Filters - Responsive */}
                    {showSearchFilters && (
                        <div className={`
                            absolute top-[58px] bg-white rounded-xl shadow-lg z-50 border border-gray-200 p-4
                            ${isMobile ? 'left-0 right-0 w-[calc(100vw-1rem)]' : 'left-0 w-full min-w-[400px]'}
                        `}>
                            <div className={`flex gap-3 mb-3 ${isMobile ? 'flex-col' : 'items-center'}`}>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="font-[Montserrat] text-xs font-medium text-gray-600">
                                        Type de contenu
                                    </label>
                                    <select
                                        value={searchFilters.content_type}
                                        onChange={(e) => handleFilterChange('content_type', e.target.value)}
                                        className="px-2 py-1.5 border border-gray-300 rounded-md 
                                                  font-[Montserrat] text-xs text-gray-700 bg-gray-50 
                                                  outline-none transition-all focus:border-blue-500 
                                                  focus:bg-white"
                                    >
                                        <option value="">Tous les types</option>
                                        <option value="article">Article</option>
                                        <option value="blog-post">Blog Post</option>
                                        <option value="news">News</option>
                                        <option value="tutorial">Tutorial</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="font-[Montserrat] text-xs font-medium text-gray-600">
                                        Catégorie
                                    </label>
                                    <select
                                        value={searchFilters.category}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        className="px-2 py-1.5 border border-gray-300 rounded-md 
                                                  font-[Montserrat] text-xs text-gray-700 bg-gray-50 
                                                  outline-none transition-all focus:border-blue-500 
                                                  focus:bg-white"
                                    >
                                        <option value="">Toutes les catégories</option>
                                        <option value="programming">Programmation</option>
                                        <option value="technology">Technologie</option>
                                        <option value="design">Design</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end mt-2 pt-3 border-t border-gray-100">
                                <button onClick={handleClearFilters}
                                        className="px-3 py-1.5 rounded-md font-[Montserrat] text-xs 
                                                  font-medium cursor-pointer transition-all border-none 
                                                  bg-gray-100 text-gray-600 hover:bg-gray-200">
                                    Effacer
                                </button>
                                <button onClick={handleApplyFilters}
                                        className="px-3 py-1.5 rounded-md font-[Montserrat] text-xs 
                                                  font-medium cursor-pointer transition-all border-none 
                                                  bg-blue-500 text-white hover:bg-blue-600">
                                    Appliquer
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Search Results - Responsive */}
                    {showSearchResults && (
                        <div className={`
                            absolute top-[58px] max-h-[400px] bg-white rounded-xl shadow-lg 
                            overflow-y-auto z-50 border border-gray-200
                            ${isMobile ? 'left-0 right-0 w-[calc(100vw-1rem)]' : 'left-0 w-full min-w-[400px]'}
                        `}>
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 
                                           font-[Poppins] text-sm text-gray-600 flex justify-between 
                                           items-center">
                                <span>Résultats</span>
                                {searchResults.length > 0 && (
                                    <span>{searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}</span>
                                )}
                            </div>

                            {searchLoading ? (
                                <div className="py-5 px-4 text-center text-blue-500 font-[Montserrat] 
                                               text-sm flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 
                                                   border-t-transparent animate-spin" />
                                    Recherche...
                                </div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((post) => (
                                    <div
                                        key={post.id}
                                        onClick={() => handleSearchResultClick(post)}
                                        className="px-4 py-3 border-b border-gray-100 cursor-pointer 
                                                  transition-colors hover:bg-gray-50 last:border-b-0"
                                    >
                                        <div className="font-[Poppins] text-sm font-medium text-gray-800 
                                                       mb-1 leading-5 line-clamp-2">
                                            {post.content?.substring(0, 60)}
                                            {post.content?.length > 60 ? '...' : ''}
                                        </div>
                                        <div className="flex items-center gap-2 font-[Montserrat] 
                                                       text-xs text-gray-600 flex-wrap">
                                            <span className="text-blue-500 font-medium">
                                                {post.author?.name || 'Utilisateur'}
                                            </span>
                                            <span>•</span>
                                            <span>{post.likes_count || 0} ❤️</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-5 px-4 text-center text-gray-600 font-[Montserrat] text-sm">
                                    Aucun résultat trouvé
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Search Button */}
                {isMobile && (
                    <button 
                        onClick={() => setShowSearchFilters(!showSearchFilters)}
                        className="flex items-center justify-center w-10 h-10 rounded-full 
                                  hover:bg-gray-100 transition-colors md:hidden">
                        <RiSearchLine color='#50b5ff' size={20} />
                    </button>
                )}

                {/* Navigation Icons - Responsive */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Profile Image & Name - Hidden on small screens */}
                    {!isMobile && (
                        <div className="hidden lg:flex items-center gap-3 mr-4">
                            <img src='/images/user/1.jpg' 
                                 className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer" />
                            <div className="font-[Poppins] cursor-pointer text-gray-600 text-sm truncate max-w-[100px]">
                                {user?.name || 'User'}
                            </div>
                        </div>
                    )}
                    
                    {/* Navigation Icons */}
                    <div className="flex items-center gap-1">
                        <Link to='/student/dashboard' className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 
                                      rounded cursor-pointer transition-colors hover:bg-gray-200 active:bg-gray-300">
                            <RiHomeLine color='#50b5ff' size={isMobile ? 18 : 20} />
                        </Link>
                        
                        <button ref={friendRequestButtonRef} 
                             className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 
                                       rounded cursor-pointer transition-colors hover:bg-gray-200 active:bg-gray-300">
                            <RiGroupLine color='#50b5ff' size={isMobile ? 18 : 20} />
                        </button>
                        
                        <button ref={NotificationsButtonRef} 
                             className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 
                                       rounded cursor-pointer transition-colors hover:bg-gray-200 active:bg-gray-300">
                            <RiNotification4Line color='#50b5ff' size={isMobile ? 18 : 20} />
                        </button>
                        
                        {!isMobile && (
                            <>
                                <Link to='/emails' className="flex items-center justify-center w-10 h-10 
                                              rounded cursor-pointer transition-colors hover:bg-gray-200 active:bg-gray-300">
                                    <RiMailLine color='#50b5ff' size={20} />
                                </Link>
                                
                                <Link to='/chat' className="flex items-center justify-center w-10 h-10 
                                              rounded cursor-pointer transition-colors hover:bg-gray-200 active:bg-gray-300">
                                    <RiChat1Line color='#50b5ff' size={20} />
                                </Link>
                            </>
                        )}
                    </div>
                    
                    {/* Profile Dropdown Button */}
                    <button ref={DropDownButtonRef} className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 
                                  rounded cursor-pointer transition-colors hover:bg-gray-200 active:bg-gray-300">
                        <RiArrowDropDownLine color='#50b5ff' size={isMobile ? 18 : 20} />
                    </button>
                </div>
            </nav>
        </div>

        {/* Mobile Search Overlay */}
        {isMobile && showSearchFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                 onClick={() => setShowSearchFilters(false)}>
                <div className="absolute top-[75px] left-2 right-2 bg-white rounded-xl shadow-lg p-4"
                     onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            placeholder='Rechercher des posts, articles, utilisateurs...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="flex-1 h-10 border border-gray-300 rounded-lg px-4 
                                      text-sm font-[Montserrat] outline-none focus:border-blue-500"
                        />
                        <button onClick={() => setShowSearchFilters(false)}
                                className="flex items-center justify-center w-10 h-10 rounded-lg 
                                          hover:bg-gray-100 transition-colors">
                            <RiCloseLine color='#666' size={20} />
                        </button>
                    </div>
                    
                    {/* Mobile Search Results */}
                    {showSearchResults && searchResults.length > 0 && (
                        <div className="max-h-[300px] overflow-y-auto border-t border-gray-200 pt-4">
                            {searchResults.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => {
                                        handleSearchResultClick(post);
                                        setShowSearchFilters(false);
                                    }}
                                    className="p-3 border-b border-gray-100 cursor-pointer 
                                              hover:bg-gray-50 transition-colors"
                                >
                                    <div className="font-[Poppins] text-sm font-medium text-gray-800 mb-1">
                                        {post.content?.substring(0, 80)}
                                        {post.content?.length > 80 ? '...' : ''}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Par {post.author?.name || 'Utilisateur'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Custom CSS for dropdown animations */}
        <style dangerouslySetInnerHTML={{
            __html: `
                .hide {
                    display: none;
                }
                
                .IN {
                    display: flex !important;
                    animation: slideDown 0.3s ease-out forwards;
                }
                
                .OUT {
                    animation: slideUp 0.3s ease-in forwards;
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `
        }} />
    </div>
);
}

export default Header