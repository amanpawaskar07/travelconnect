import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PostCard = ({ post, onInteraction, className = '' }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleLike = () => {
    onInteraction(post.id, 'like');
  };

  const handleBookmark = () => {
    onInteraction(post.id, 'bookmark');
  };

  const handleShare = () => {
    onInteraction(post.id, 'share');
    console.log('Share post:', post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onInteraction(post.id, 'comment');
      setCommentText('');
      console.log('Comment added:', commentText);
    }
  };

  const handleImageNavigation = (direction) => {
    if (!post.content.images || post.content.images.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === post.content.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? post.content.images.length - 1 : prev - 1
      );
    }
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'photo': return 'Camera';
      case 'video': return 'Video';
      case 'tip': return 'Lightbulb';
      case 'review': return 'Star';
      default: return 'MessageCircle';
    }
  };

  const getPostTypeColor = () => {
    switch (post.type) {
      case 'photo': return 'text-primary';
      case 'video': return 'text-accent';
      case 'tip': return 'text-warning-600';
      case 'review': return 'text-secondary-600';
      default: return 'text-text-secondary';
    }
  };

  return (
    <article className={`bg-background border-b border-subtle lg:border lg:rounded-xl lg:shadow-soft ${className}`}>
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {post.user.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={10} color="white" strokeWidth={3} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-body font-semibold text-text-primary truncate">
                {post.user.name}
              </h3>
              <Icon 
                name={getPostTypeIcon()} 
                size={14} 
                className={getPostTypeColor()}
              />
            </div>
            <div className="flex items-center space-x-2 text-text-secondary">
              <span className="font-caption text-xs">
                {formatTimeAgo(post.timestamp)}
              </span>
              {post.content.location && (
                <>
                  <span className="text-xs">•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span className="font-caption text-xs truncate">
                      {post.content.location}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-surface rounded-full transition-colors duration-200">
          <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="font-body text-text-primary whitespace-pre-line mb-3">
          {post.content.text}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="font-caption text-xs text-primary hover:text-primary-700 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media Content */}
      {post.content.images && post.content.images.length > 0 && (
        <div className="relative">
          <div className="aspect-square lg:aspect-video overflow-hidden">
            <Image
              src={post.content.images[currentImageIndex]}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Navigation */}
          {post.content.images.length > 1 && (
            <>
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Icon name="ChevronRight" size={16} />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {post.content.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {post.content.video && (
        <div className="aspect-video bg-black">
          <div className="w-full h-full flex items-center justify-center">
            <button className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200">
              <Icon name="Play" size={24} color="white" />
            </button>
          </div>
        </div>
      )}

      {/* Engagement Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-all duration-200 hover-lift ${
                post.engagement.liked ? 'text-accent' : 'text-text-secondary hover:text-accent'
              }`}
            >
              <Icon 
                name={post.engagement.liked ? 'Heart' : 'Heart'} 
                size={20} 
                fill={post.engagement.liked ? 'currentColor' : 'none'}
                strokeWidth={post.engagement.liked ? 0 : 2}
              />
              <span className="font-body text-sm">{post.engagement.likes}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="MessageCircle" size={20} />
              <span className="font-body text-sm">{post.engagement.comments}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="Share" size={20} />
              <span className="font-body text-sm">{post.engagement.shares}</span>
            </button>
          </div>

          <button
            onClick={handleBookmark}
            className={`transition-colors duration-200 ${
              post.engagement.bookmarked ? 'text-secondary-600' : 'text-text-secondary hover:text-secondary-600'
            }`}
          >
            <Icon 
              name="Bookmark" 
              size={20} 
              fill={post.engagement.bookmarked ? 'currentColor' : 'none'}
              strokeWidth={post.engagement.bookmarked ? 0 : 2}
            />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-subtle pt-3 mt-3">
            <div className="flex items-center space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-surface border border-subtle rounded-full px-4 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="p-2 text-primary hover:text-primary-700 disabled:text-text-secondary disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;