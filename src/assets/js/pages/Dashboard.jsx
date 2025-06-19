import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Header from '../components/New/Header'
import RightSideBar from '../components/New/RightSideBar' // This component will be updated
import LeftSideBar from '../components/New/LeftSideBar'


import auth from '../secured/auth.js'
import Loader from '../components/New/Loader.jsx'

import { Outlet } from 'react-router-dom'



function Dashboard() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const User = useSelector(store => store.user)
   const toggle = useSelector(state => state.toggle) // Get sidebar toggle state
   
   const [isLoading, setIsLoading] = useState(true);
   const [isMobile, setIsMobile] = useState(false);
   
   // Handle responsive behavior
   useEffect(() => {
      const checkScreenSize = () => {
         setIsMobile(window.innerWidth < 768);
      };
      
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      
      return () => window.removeEventListener('resize', checkScreenSize);
   }, []);
   
   useEffect(() => {
      const checkAuth = async () => {
         const authResult = await auth(dispatch);
         if (authResult) {
            setIsLoading(false);
         } else {
            navigate('/login');
            setIsLoading(false);
         }
      };
      
      checkAuth();
   }, [navigate, dispatch]);
   
   useEffect(() => {
      console.log(User);
   }, [User]);
   
   return isLoading ? (
      <Loader />
   ) : (
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
         {/* Global Font Styles */}
         <style dangerouslySetInnerHTML={{
            __html: `
               @font-face {
                  font-family: 'remixicon';
                  src: url('/fonts/remixicon.ttf');
               }
               @font-face {
                  font-family: 'Montserrat';
                  src: url('/fonts/Montserrat/static/Montserrat-Regular.ttf');
               }
               @font-face {
                  font-family: 'Poppins';
                  src: url('/fonts/Poppins/Poppins-Regular.ttf');
               }
               
               /* Global input styles */
               input {
                  color: #00000099;
                  font-size: 14px;
                  font-family: 'Montserrat', sans-serif;
               }
               
               input::placeholder {
                  color: #a3a3a3c8;
               }
               
               /* Hide scrollbars but keep functionality */
               .hide-scrollbar::-webkit-scrollbar {
                  display: none;
               }
               .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
               }
            `
         }} />

         {/* Header - Fixed at top */}
         {/* THIS IS THE DIV RightSideBar.jsx observes for height: */}
         <div className="flex-shrink-0 z-30 relative"> 
            <Header user={User} />
         </div>

         {/* Main Content Area */}
         <div className="flex-1 flex relative overflow-hidden">
            {/* Left Sidebar */}
            <div className={`
               flex-shrink-0 z-20 transition-all duration-300 ease-out
               ${isMobile 
                  ? `fixed left-0 top-[75px] h-[calc(100vh-75px)] ${toggle ? 'translate-x-0' : '-translate-x-full'}` 
                  : 'relative'
               }
               ${toggle ? 'w-[75px]' : 'w-[250px]'}
            `}>
               <LeftSideBar />
            </div>

            {/* Mobile Overlay */}
            {isMobile && !toggle && (
               <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                  onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
               />
            )}

            {/* Main Content */}
            <div className={`
               flex-1 flex flex-col overflow-hidden transition-all duration-300
               ${isMobile ? 'w-full' : ''}
            `}>
               <div className="flex-1 overflow-auto hide-scrollbar">
                  <Outlet />
               </div>
            </div>

            {/* Right Sidebar - Hidden on mobile (via RightSideBar's internal logic) */}
            <div className={`
               flex-shrink-0 z-20 hidden lg:block
               ${isMobile ? 'hidden' : 'block'} 
            `}>
               <RightSideBar />
            </div>
         </div>

         {/* Mobile Bottom Navigation (Optional) */}
         {isMobile && (
            <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-2 
                           flex justify-around items-center md:hidden z-30">
               <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
               </button>
               <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
               </button>
               <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5v5zM4 19l5-5-5-5v10z" />
                  </svg>
               </button>
               <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
               </button>
            </div>
         )}
      </div>
   )
}

export default Dashboard