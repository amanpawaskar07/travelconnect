import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AlbumViewer = ({ album, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const memories = album.memories || [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (memories.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-100 flex items-center justify-center">
        <div className="bg-background rounded-2xl p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Camera" size={32} className="text-text-secondary" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
            No memories yet
          </h3>
          <p className="font-body text-text-secondary mb-6">
            This album is waiting for its first memories to be added.
          </p>
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-body font-semibold transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentMemory = memories[currentIndex];

  return (
    <div className="fixed inset-0 bg-black z-100">
      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 z-110 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <Icon name="X" size={24} color="white" />
            </button>
            <div>
              <h2 className="font-heading font-semibold text-lg text-white">
                {album.title}
              </h2>
              <p className="font-body text-sm text-white/70">
                {currentIndex + 1} of {memories.length}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleInfo}
              className={`p-2 rounded-full transition-colors duration-200 ${
                showInfo ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
              }`}
            >
              <Icon name="Info" size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={20} color="white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
              <Icon name="Share" size={20} color="white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
              <Icon name="Download" size={20} color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Image/Video Display */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="relative max-w-full max-h-full">
            {currentMemory.type === 'photo' ? (
              <Image
                src={currentMemory.url}
                alt={currentMemory.caption}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={currentMemory.url}
                controls
                className="max-w-full max-h-full"
              />
            )}
          </div>

          {/* Navigation Arrows */}
          {memories.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              >
                <Icon name="ChevronLeft" size={24} color="white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              >
                <Icon name="ChevronRight" size={24} color="white" />
              </button>
            </>
          )}

          {/* Like Button */}
          <button className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-200">
            <Icon name="Heart" size={20} color="white" />
            <span className="font-caption text-sm text-white">{currentMemory.likes}</span>
          </button>
        </div>

        {/* Info Panel */}
        {showInfo && !isFullscreen && (
          <div className="w-80 bg-background border-l border-subtle overflow-y-auto">
            <div className="p-6">
              {/* Memory Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg text-text-primary">
                    Memory Details
                  </h3>
                  <button
                    onClick={toggleInfo}
                    className="p-1 hover:bg-surface rounded-full transition-colors duration-200"
                  >
                    <Icon name="X" size={16} className="text-text-secondary" />
                  </button>
                </div>

                {currentMemory.caption && (
                  <div className="mb-4">
                    <p className="font-body text-text-primary leading-relaxed">
                      {currentMemory.caption}
                    </p>
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  {currentMemory.location && (
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="MapPin" size={16} />
                      <span className="font-body">{currentMemory.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Calendar" size={16} />
                    <span className="font-body">{formatDate(currentMemory.date)}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Heart" size={16} />
                    <span className="font-body">{currentMemory.likes} likes</span>
                  </div>
                </div>

                {/* Tags */}
                {currentMemory.tags && currentMemory.tags.length > 0 && (
                  <div className="mt-4">
                    <p className="font-caption text-sm text-text-secondary mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {currentMemory.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-subtle pt-6">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 p-3 bg-surface hover:bg-primary-50 rounded-xl transition-colors duration-200">
                    <Icon name="Heart" size={16} className="text-text-secondary" />
                    <span className="font-body text-sm text-text-primary">Like</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 bg-surface hover:bg-primary-50 rounded-xl transition-colors duration-200">
                    <Icon name="MessageCircle" size={16} className="text-text-secondary" />
                    <span className="font-body text-sm text-text-primary">Comment</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 bg-surface hover:bg-primary-50 rounded-xl transition-colors duration-200">
                    <Icon name="Share" size={16} className="text-text-secondary" />
                    <span className="font-body text-sm text-text-primary">Share</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 bg-surface hover:bg-primary-50 rounded-xl transition-colors duration-200">
                    <Icon name="Download" size={16} className="text-text-secondary" />
                    <span className="font-body text-sm text-text-primary">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {memories.length > 1 && !isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {memories.map((memory, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex 
                    ? 'border-white shadow-soft' 
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                <Image
                  src={memory.url}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AlbumViewer;