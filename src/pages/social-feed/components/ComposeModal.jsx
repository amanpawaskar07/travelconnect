import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ComposeModal = ({ onClose, onPost }) => {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [postType, setPostType] = useState('photo');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef();

  const postTypes = [
    { id: 'photo', label: 'Photo', icon: 'Camera', color: 'text-primary' },
    { id: 'video', label: 'Video', icon: 'Video', color: 'text-accent' },
    { id: 'tip', label: 'Travel Tip', icon: 'Lightbulb', color: 'text-warning-600' },
    { id: 'review', label: 'Review', icon: 'Star', color: 'text-secondary-600' }
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTag = tagInput.trim().startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`;
      setTags(prev => [...prev, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!postText.trim() && selectedImages.length === 0) return;

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: {
          id: 'current-user',
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
          verified: false,
          location: location || 'Your Location'
        },
        timestamp: new Date(),
        type: postType,
        content: {
          text: postText,
          images: selectedImages,
          location: location
        },
        engagement: {
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
          bookmarked: false
        },
        tags: tags
      };

      onPost(newPost);
      setIsPosting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-soft-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-full transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Post Type Selection */}
          <div className="mb-6">
            <label className="block font-body font-medium text-text-primary mb-3">
              Post Type
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPostType(type.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    postType === type.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-subtle hover:border-primary/30 text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name={type.icon} size={16} className={postType === type.id ? 'text-primary' : type.color} />
                  <span className="font-body text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="mb-6">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share your travel experience, tips, or thoughts..."
              className="w-full h-32 p-4 border border-subtle rounded-xl resize-none font-body text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="font-caption text-xs text-text-secondary">
                {postText.length}/500 characters
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-1 hover:bg-surface rounded transition-colors duration-200"
                  title="Add emoji"
                >
                  <Icon name="Smile" size={16} className="text-text-secondary hover:text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block font-body font-medium text-text-primary mb-2">
              Location (Optional)
            </label>
            <div className="relative">
              <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location..."
                className="w-full pl-10 pr-4 py-3 border border-subtle rounded-xl font-body text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          {/* Image Upload */}
          {(postType === 'photo' || postType === 'review') && (
            <div className="mb-6">
              <label className="block font-body font-medium text-text-primary mb-2">
                Photos
              </label>
              
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 border-2 border-dashed border-subtle hover:border-primary/50 rounded-xl text-center transition-all duration-200 hover:bg-primary/5"
              >
                <Icon name="Upload" size={24} className="text-text-secondary mx-auto mb-2" />
                <p className="font-body text-sm text-text-secondary">
                  Click to upload photos
                </p>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <label className="block font-body font-medium text-text-primary mb-2">
              Tags
            </label>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-caption text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-primary-700 transition-colors duration-200"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add tags (e.g., Tokyo, Food, Adventure)"
                className="flex-1 px-4 py-2 border border-subtle rounded-lg font-body text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <button
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className="px-4 py-2 bg-primary hover:bg-primary-700 disabled:bg-text-secondary disabled:cursor-not-allowed text-white rounded-lg font-body text-sm transition-all duration-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-subtle">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-text-secondary" />
              <span className="font-caption text-sm text-text-secondary">Public</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-subtle hover:bg-surface text-text-primary rounded-lg font-body text-sm transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={(!postText.trim() && selectedImages.length === 0) || isPosting}
              className="px-6 py-2 bg-primary hover:bg-primary-700 disabled:bg-text-secondary disabled:cursor-not-allowed text-white rounded-lg font-body text-sm transition-all duration-200 flex items-center space-x-2"
            >
              {isPosting && <Icon name="Loader2" size={16} className="animate-spin" />}
              <span>{isPosting ? 'Posting...' : 'Post'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;