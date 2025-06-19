import React, { useState, useRef, useEffect } from 'react';
import { RiImageAddLine, RiCloseLine } from '@remixicon/react';
import { toast } from 'react-toastify';
import axios from '../../../api/getUser';

const EditPost = ({ post, onClose, onUpdate }) => {
  const [content, setContent] = useState(post.content || '');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Parse existing images on component mount
  useEffect(() => {
    if (post.images && post.images.length > 0) {
      const parsedImages = typeof post.images === 'string' ? JSON.parse(post.images) : post.images;
      setImages(parsedImages.map(img => ({
        ...img,
        isExisting: true,
        isDeleted: false
      })));
    }
  }, [post.images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file,
      isNew: true
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const imageToRemove = images[index];
    if (imageToRemove.isNew) {
      // If it's a newly added image, just remove it from the array
      setImages(images.filter((_, i) => i !== index));
    } else {
      // If it's an existing image, mark it as deleted
      const updatedImages = [...images];
      updatedImages[index] = { ...updatedImages[index], isDeleted: true };
      setImages(updatedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('content', content);
    formData.append('_method', 'PUT');

    // Add new images
    images.forEach((image) => {
      if (image.isNew) {
        formData.append('images[]', image.file);
      }
    });

    // Add kept existing images (not deleted)
    const keptExistingImages = images
      .filter(img => img.isExisting && !img.isDeleted)
      .map(img => ({
        alt: img.alt || '',
        url: img.url,
        width: img.width,
        height: img.height,
      }));

    if (keptExistingImages.length > 0) {
      formData.append('existing_images', JSON.stringify(keptExistingImages));
    }

    // Collect URLs of images marked for removal
    const removedImageUrls = images
      .filter(img => img.isExisting && img.isDeleted)
      .map(img => img.url);
    
    if (removedImageUrls.length > 0) {
      formData.append('removed_image_urls', JSON.stringify(removedImageUrls));
    }

    try {
      const response = await axios.post(`/api/posts/${post.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate(response.data.data);
      onClose();
      toast.success('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 font-[Poppins]">
            Edit Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <RiCloseLine className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Text Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-[Montserrat]">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg resize-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         font-[Montserrat] text-sm sm:text-base transition-all duration-200"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 font-[Montserrat]">
                  Images
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 
                           text-blue-600 rounded-lg transition-colors duration-200 text-sm"
                >
                  <RiImageAddLine className="w-4 h-4" />
                  <span>Add Images</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />

              {/* Image Preview Grid */}
              {images.filter(image => !image.isDeleted).length > 0 && (
                <div className={`grid gap-3
                               ${images.filter(img => !img.isDeleted).length === 1 ? 'grid-cols-1' : ''}
                               ${images.filter(img => !img.isDeleted).length === 2 ? 'grid-cols-2' : ''}
                               ${images.filter(img => !img.isDeleted).length >= 3 ? 'grid-cols-2 sm:grid-cols-3' : ''}
                             `}>
                  {images
                    .map((image, originalIndex) => ({ image, originalIndex }))
                    .filter(({ image }) => !image.isDeleted)
                    .map(({ image, originalIndex }) => (
                      <div key={originalIndex} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${originalIndex}`}
                          className="w-full h-24 sm:h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(originalIndex)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                                   flex items-center justify-center hover:bg-red-600 transition-colors
                                   opacity-0 group-hover:opacity-100 duration-200"
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                        {/* Existing image indicator */}
                        {image.isExisting && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white 
                                         text-xs rounded-full opacity-0 group-hover:opacity-100 
                                         transition-opacity duration-200">
                            Original
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 
                     rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors 
                     duration-200 font-medium font-[Montserrat]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !content.trim()}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white 
                     rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors 
                     duration-200 font-medium font-[Montserrat] flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full 
                               animate-spin mr-2"></div>
                Updating...
              </>
            ) : (
              'Update Post'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;