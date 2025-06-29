import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SocialFeed = ({ data, onRefresh }) => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleComment = (post) => {
    navigate('/social-feed', { state: { post, action: 'comment' } });
  };

  const handleShare = (post) => {
    console.log('Share post:', post);
  };

  const handleUserClick = (user) => {
    navigate('/social-feed', { state: { user } });
  };

  const renderPost = (post) => {
    const isLiked = likedPosts.has(post.id);
    const isSaved = savedPosts.has(post.id);

    switch (post.type) {
      case 'destination_recommendation':
        return (
          <div key={post.id} className="bg-surface rounded-2xl overflow-hidden shadow-soft border border-subtle">
            <div className="relative h-64">
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-3 left-3">
                <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Trending
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading font-bold text-white text-xl mb-2">
                  {post.title}
                </h3>
                <p className="font-body text-white/90 text-sm">
                  {post.description}
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors duration-200 ${
                      isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                    }`}
                  >
                    <Icon name="Heart" size={20} className={isLiked ? 'fill-current' : ''} />
                    <span className="font-body text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  
                  <button
                    onClick={() => handleComment(post)}
                    className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="MessageCircle" size={20} />
                    <span className="font-body text-sm">{post.comments}</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="Share" size={20} />
                  </button>
                </div>
                
                <button
                  onClick={() => handleSave(post.id)}
                  className={`transition-colors duration-200 ${
                    isSaved ? 'text-secondary-600' : 'text-text-secondary hover:text-secondary-600'
                  }`}
                >
                  <Icon name="Bookmark" size={20} className={isSaved ? 'fill-current' : ''} />
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-subtle">
                <span className="font-caption text-xs text-text-secondary">
                  {post.timestamp}
                </span>
              </div>
            </div>
          </div>
        );

      case 'buddy_activity':
        return (
          <div key={post.id} className="bg-surface rounded-2xl overflow-hidden shadow-soft border border-subtle">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <button onClick={() => handleUserClick(post.user)}>
                  <Image
                    src={post.userAvatar}
                    alt={post.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
                <div className="flex-1">
                  <div className="font-body text-sm text-text-primary">
                    <button
                      onClick={() => handleUserClick(post.user)}
                      className="font-semibold hover:text-primary transition-colors duration-200"
                    >
                      {post.user}
                    </button>
                    <span className="text-text-secondary"> {post.action} </span>
                    <span className="font-semibold text-primary">{post.location}</span>
                  </div>
                  <div className="font-caption text-xs text-text-secondary">
                    {post.timestamp}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-56">
              <Image
                src={post.image}
                alt={post.location}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <Icon name="MapPin" size={14} className="inline mr-1" />
                  {post.location}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors duration-200 ${
                      isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                    }`}
                  >
                    <Icon name="Heart" size={20} className={isLiked ? 'fill-current' : ''} />
                  </button>
                  
                  <button
                    onClick={() => handleComment(post)}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="MessageCircle" size={20} />
                  </button>
                  
                  <button
                    onClick={() => handleShare(post)}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="Share" size={20} />
                  </button>
                </div>
                
                <button
                  onClick={() => handleSave(post.id)}
                  className={`transition-colors duration-200 ${
                    isSaved ? 'text-secondary-600' : 'text-text-secondary hover:text-secondary-600'
                  }`}
                >
                  <Icon name="Bookmark" size={20} className={isSaved ? 'fill-current' : ''} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'travel_tip':
        return (
          <div key={post.id} className="bg-surface rounded-2xl shadow-soft border border-subtle p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-body font-semibold text-text-primary">
                  {post.author}
                </div>
                <div className="font-caption text-xs text-text-secondary">
                  {post.timestamp}
                </div>
              </div>
              <div className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs font-semibold">
                Pro Tip
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                {post.title}
              </h3>
              <p className="font-body text-text-secondary">
                {post.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                  }`}
                >
                  <Icon name="Heart" size={20} className={isLiked ? 'fill-current' : ''} />
                  <span className="font-body text-sm">{post.likes + (isLiked ? 1 : 0)}</span>
                </button>
                
                <button
                  onClick={() => handleComment(post)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="MessageCircle" size={20} />
                </button>
                
                <button
                  onClick={() => handleShare(post)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="Share" size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Bookmark" size={16} />
                  <span className="font-body text-sm">{post.saves + (isSaved ? 1 : 0)}</span>
                </div>
                <button
                  onClick={() => handleSave(post.id)}
                  className={`transition-colors duration-200 ${
                    isSaved ? 'text-secondary-600' : 'text-text-secondary hover:text-secondary-600'
                  }`}
                >
                  <Icon name="Bookmark" size={20} className={isSaved ? 'fill-current' : ''} />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {data.map(renderPost)}
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Compass" size={32} className="text-primary" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
            No updates yet
          </h3>
          <p className="font-body text-text-secondary mb-4">
            Follow more travelers to see their adventures in your feed
          </p>
          <button
            onClick={() => navigate('/social-feed')}
            className="bg-primary hover:bg-primary-700 text-white font-body font-semibold py-2 px-6 rounded-xl transition-all duration-200 hover-lift"
          >
            Discover People
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;