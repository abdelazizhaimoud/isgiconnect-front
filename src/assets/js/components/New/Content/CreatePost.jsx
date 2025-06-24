// components/SimpleCreatePost.jsx
import React, { useState, useRef } from 'react';
import { RiImageAddLine, RiCloseLine, RiEmotionHappyLine } from '@remixicon/react';
import { toast } from 'react-toastify';
import axios from '../../../api/getUser';

const SimpleCreatePost = ({ onPostCreated, isLoading = false }) => {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      toast.error('Please write something or add an image');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('content_type_id', 1); // Assuming 1 is for regular posts
      formData.append('status', 'published');
      
      // Add images
      selectedImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image.file);
      });

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });

      toast.success('Post created successfully!');
      
      // Reset form
      setContent('');
      setSelectedImages([]);
      setIsFocused(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data.data);
      }
      
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create post';
      toast.error(errorMessage);
      
      if (error.response?.status === 419) {
        window.location.reload();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow 
                    duration-300 mb-4 lg:mb-6 overflow-hidden flex flex-col min-h-[140px]">
      
      {/* Main Input Section */}
      <div className="p-4 sm:p-6 flex-1 min-h-0">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <img 
            src="/images/user/01.jpg" 
            alt="Your Avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-200 
                       object-cover flex-shrink-0 mt-1"
          />
          
          <div className="flex-1 min-w-0 h-full flex flex-col">
            {/* Textarea */}
            <div className="flex-1 min-h-0">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !content && !selectedImages.length && setIsFocused(false)}
                placeholder="What's on your mind?"
                disabled={isSubmitting}
                className="w-full h-full resize-none border-none outline-none font-[Montserrat] 
                           text-sm sm:text-base text-gray-800 placeholder-gray-400 
                           bg-gray-50 rounded-xl px-4 py-3 sm:px-5 sm:py-4 
                           transition-all duration-300 focus:bg-white focus:shadow-md"
              />
            </div>

            {/* Image Preview - Scrollable if needed */}
            {selectedImages.length > 0 && (
              <div className="mt-4 max-h-32 overflow-y-auto">
                <div className={`grid gap-2 rounded-lg
                                ${selectedImages.length === 1 ? 'grid-cols-1' : ''}
                                ${selectedImages.length === 2 ? 'grid-cols-2' : ''}
                                ${selectedImages.length === 3 ? 'grid-cols-3' : ''}
                                ${selectedImages.length >= 4 ? 'grid-cols-2 sm:grid-cols-3' : ''}
                              `}>
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full 
                                 flex items-center justify-center hover:bg-red-600 transition-colors
                                 opacity-0 group-hover:opacity-100 duration-200"
                      >
                        <RiCloseLine className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions Bar - Fixed at bottom */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between h-12">
          {/* Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-blue-500 
                       hover:bg-blue-50 rounded-lg transition-all duration-200 group
                       border border-transparent hover:border-blue-200 h-[42px]"
            >
              <RiImageAddLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Photo</span>
            </button>
            
            <button
              disabled={isSubmitting}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-yellow-500 
                       hover:bg-yellow-50 rounded-lg transition-all duration-200 group
                       border border-transparent hover:border-yellow-200 h-[42px]"
            >
              <RiEmotionHappyLine className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Feeling</span>
            </button>
          </div>

          {/* Post Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!content.trim() && selectedImages.length === 0)}
            className="px-8 py-2.5 bg-blue-500 hover:bg-blue-600 text-white 
                     rounded-full font-semibold text-sm transition-all duration-300
                     hover:shadow-lg hover:-translate-y-0.5
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     disabled:hover:shadow-none focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 min-w-[100px] h-[42px]
                     flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent 
                               rounded-full animate-spin"></div>
                <span className="text-white font-medium">Posting...</span>
              </div>
            ) : (
              <span className="text-white font-semibold">Post</span>
            )}
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};

export default SimpleCreatePost;