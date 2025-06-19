// Content.jsx (Main Component)
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../api/getUser';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import SimpleCreatePost from './CreatePost';
import PostCard from './ContentCard';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import { LoadingState, EmptyState } from './LoadingEmptyStates';

function Content() {
  return (
    <>
      <PostsFeed />
    </>
  );
}

function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch posts on component mount and page change
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${currentPage}`);
      
      if (response.data.success) {
        setPosts(response.data.data.data);
        setTotalPages(response.data.data.last_page);
        setPaginationData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePostCreated = (newPost) => {
    // If we're on page 1, add the new post to the top of the list
    if (currentPage === 1) {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } else {
      // If we're on another page, go back to page 1 to see the new post
      setCurrentPage(1);
    }
  };

  const handlePostUpdated = () => {
    fetchPosts(); // Refetch posts after an update
  };

  const handlePostDeleted = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    
    // If we're left with no posts on the current page and it's not the first page,
    // go to the previous page
    if (posts.length === 1 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="h-full flex-1 flex justify-center py-2 px-2 sm:py-4 sm:px-4 
                    bg-gray-50 overflow-auto">
      <div className={`
        w-full max-w-7xl flex gap-4 xl:gap-6
        ${isMobile ? 'flex-col px-0' : 'flex-row px-2'}
      `}>
        {/* Main Content Area */}
        <div className={`
          flex flex-col
          ${isMobile ? 'w-full' : 'flex-1 max-w-2xl xl:max-w-3xl'}
        `}>
          {/* Create Post Component */}
          <SimpleCreatePost onPostCreated={handlePostCreated} isLoading={isLoading} />
          
          {/* Posts List */}
          {isLoading ? (
            <LoadingState />
          ) : posts && posts.length > 0 ? (
            <>
              <div className="space-y-4 lg:space-y-6">
                {posts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onDelete={handlePostDeleted}
                    onUpdate={handlePostUpdated}
                    formatDate={formatDate} 
                  />
                ))}
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                paginationData={paginationData}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
        
        {/* Sidebar - Hidden on mobile and tablet */}
        {!isMobile && (
          <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;