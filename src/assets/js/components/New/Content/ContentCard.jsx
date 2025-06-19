// components/PostCard.jsx
import React, { useState } from 'react';
import { RiHeartLine, RiHeartFill, RiChat3Line, RiShareLine, RiMoreFill, RiSendPlane2Fill, RiPencilLine, RiDeleteBinLine, RiFlag2Line } from '@remixicon/react';
import axiosClient from '../../../api/getUser';
import { toast } from 'react-toastify';
import EditPost from './EditPost';

const PostCard = ({ post, formatDate, onDelete, onUpdate }) => {
  // State management
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const [hasReported, setHasReported] = useState(post.has_reported || false);
  const [previousReport, setPreviousReport] = useState(post.previous_report || null);
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(!!post.liked);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Comment system states
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const isAuthenticated = Boolean(localStorage.getItem('user') || localStorage.getItem('token'));
  const isOwner = post.is_owner;

  let currentUserId = null;
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    currentUserId = user?.id;
  } catch (e) {}

  const images = post.images ? (typeof post.images === 'string' ? JSON.parse(post.images) : post.images) : [];

  const handleUpdate = (updatedPost) => {
    if (onUpdate) {
      onUpdate(updatedPost);
    }
    setIsEditing(false);
  };

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    const prevLiked = isLiked;
    const prevLikesCount = likesCount;
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setIsLiked(false);
      setLikesCount(likesCount > 0 ? likesCount - 1 : 0);
    }

    try {
      let res;
      if (!prevLiked) {
        res = await axiosClient.post(`/api/posts/${post.id}/like`);
      } else {
        res = await axiosClient.delete(`/api/posts/${post.id}/like`);
      }
      setIsLiked(!!res.data.data.liked);
      setLikesCount(res.data.data.likes_count);
    } catch (error) {
      setIsLiked(prevLiked);
      setLikesCount(prevLikesCount);
      toast.error(error.response?.data?.message || 'Failed to update like');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    if (!isAuthenticated && (!authorName.trim() || !authorEmail.trim())) return;
    
    const newComment = {
      id: 'temp-' + Date.now(),
      content: commentText.trim(),
      author: isAuthenticated 
        ? { id: currentUserId, name: JSON.parse(localStorage.getItem('user'))?.name }
        : { name: authorName.trim() },
      created_at: new Date().toISOString(),
      user : isAuthenticated 
      ? { id: currentUserId, name: JSON.parse(localStorage.getItem('user'))?.name }
      : { name: authorName.trim() }
    };
    
    setComments([newComment, ...comments]);
    setCommentsCount(prevCount => prevCount + 1);
    setCommentText("");
    if (!isAuthenticated) {
      setAuthorName("");
      setAuthorEmail("");
    }
    
    setCommentLoading(true);
    try {
      const payload = { content: commentText.trim() };
      if (!isAuthenticated) {
        payload.author_name = authorName.trim();
        payload.author_email = authorEmail.trim();
      }
      const res = await axiosClient.post(`/api/posts/${post.id}/comments`, payload);
      toast.success("Comment posted!");
    } catch (error) {
      setComments(prev => prev.filter(c => c.id !== newComment.id));
      setCommentsCount(prevCount => prevCount - 1);
      toast.error(error.response?.data?.message || "Failed to post comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setShowMenu(false);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await axiosClient.delete(`/api/posts/${post.id}`);
      toast.success('Post deleted successfully');
      if (typeof onDelete === 'function') onDelete(post.id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const handleReport = async () => {
    setReportLoading(true);
    try {
      const response = await axiosClient.post(`/api/posts/${post.id}/report`, { 
        reason: reportReason,
        post_id: post.id
      });
      const updatedPost = {
        ...post,
        has_reported: true,
        previous_report: {
          reason: reportReason,
          post_id: post.id,
          created_at: new Date().toISOString()
        }
      };
      setHasReported(true);
      setPreviousReport({
        reason: reportReason,
        post_id: post.id,
        created_at: new Date().toISOString()
      });
      if (typeof onUpdate === 'function') {
        onUpdate(updatedPost);
      }
      toast.success('Post reported successfully');
      setShowReportModal(false);
      setReportReason('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to report post');
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg 
                      transition-shadow duration-300 mb-4 lg:mb-6 overflow-hidden">
        {isEditing && (
          <EditPost 
            post={post} 
            onClose={() => setIsEditing(false)} 
            onUpdate={handleUpdate}
          />
        )}
        
        {/* Post Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.user?.profile?.avatar_url || '/images/user/01.jpg'} 
              alt={post.user?.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-200 object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base font-[Poppins] 
                           hover:text-blue-500 cursor-pointer transition-colors">
                {post.user?.name || 'Unknown'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-[Montserrat]">
                {formatDate(post.created_at)}
              </p>
            </div>
          </div>
          
          {/* More Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(v => !v)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="More options"
            >
              <RiMoreFill className="w-5 h-5 text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border 
                             border-gray-200 z-30 min-w-[140px] py-1">
                {isOwner ? (
                  <>
                    <button 
                      onClick={() => { setIsEditing(true); setShowMenu(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 
                               hover:bg-gray-50 transition-colors"
                    >
                      <RiPencilLine className="w-4 h-4" /> Edit
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 
                               hover:bg-red-50 transition-colors"
                    >
                      <RiDeleteBinLine className="w-4 h-4" /> Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setShowReportModal(true); setShowMenu(false); }}
                    disabled={hasReported}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors
                              ${hasReported 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-red-600 hover:bg-red-50'
                              }`}
                  >
                    <RiFlag2Line className="w-4 h-4" />
                    {hasReported ? 'Already Reported' : 'Report Post'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 sm:px-6 pb-4">
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-[Montserrat]">
            {post.content}
          </p>
        </div>

        {/* Post Images */}
        {images.length > 0 && (
          <div className="mx-4 sm:mx-6 mb-4">
            {images.map((image, index) => (
              <div key={index} className="mb-2">
                <img
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  className="w-full max-h-[400px] object-contain cursor-pointer 
                           hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="px-4 sm:px-6 pb-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag.id} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs 
                               hover:bg-blue-100 hover:text-blue-600 cursor-pointer 
                               transition-colors duration-200">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={handleLike}
              disabled={likeLoading}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all
                        ${isLiked 
                          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                          : 'text-gray-500 hover:bg-gray-100'
                        }`}
            >
              {isLiked ? <RiHeartFill className="w-5 h-5" /> : <RiHeartLine className="w-5 h-5" />}
              <span className="text-sm font-medium">{likesCount}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 
                       hover:bg-gray-100 transition-colors"
            >
              <RiChat3Line className="w-5 h-5" />
              <span className="text-sm font-medium">{commentsCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 
                             hover:bg-gray-100 transition-colors">
              <RiShareLine className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
            {/* Comment Input */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 pt-4">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-full 
                         text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              
              {!isAuthenticated && (
                <>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full sm:w-32 px-4 py-2 border border-gray-300 rounded-full 
                             text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-full 
                             text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </>
              )}
              
              <button
                onClick={handleCommentSubmit}
                disabled={commentLoading || !commentText.trim() || 
                         (!isAuthenticated && (!authorName.trim() || !authorEmail.trim()))}
                className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center 
                         justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-colors flex-shrink-0"
              >
                <RiSendPlane2Fill className="w-4 h-4" />
              </button>
            </div>
            
            {/* Comments List */}
            <div className="max-h-80 overflow-y-auto space-y-3">
              {comments.length > 0 ? (
                comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-800">
                        {comment.user?.name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <RiChat3Line className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
                         hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                         transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {hasReported ? 'Previous Report' : 'Report Post'}
            </h3>
            {hasReported ? (
              <>
                <p className="text-gray-600 mb-4">You have already reported this post:</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="font-medium text-sm mb-2">Reason:</div>
                  <div className="text-sm text-gray-700">{previousReport?.reason || 'No reason provided'}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Reported on: {formatDate(previousReport?.created_at)}
                  </div>
                </div>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
                           hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">Please describe the reason for reporting this post:</p>
                <textarea
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  placeholder="Describe the issue..."
                  rows={4}
                  disabled={reportLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none 
                           focus:outline-none focus:border-blue-500 transition-colors mb-6"
                />
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowReportModal(false)}
                    disabled={reportLoading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
                             hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleReport}
                    disabled={reportLoading || !reportReason.trim()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                             disabled:opacity-50 transition-colors"
                  >
                    {reportLoading ? 'Reporting...' : 'Report'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;