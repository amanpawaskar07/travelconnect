import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BuddyCard = ({ buddy, onSwipe, onChatOpen, isActive }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    onSwipe('right', buddy.id);
  };

  const handlePass = () => {
    onSwipe('left', buddy.id);
  };

  const handleDetailsToggle = () => {
    setShowDetails(!showDetails);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-accent';
  };

  const getCompatibilityBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 80) return 'bg-warning/10';
    return 'bg-accent/10';
  };

  return (
    <div className={`bg-background rounded-2xl shadow-soft-md border border-subtle overflow-hidden transition-all duration-300 hover-lift ${
      isActive ? 'ring-2 ring-primary/20' : ''
    }`}>
      {/* Profile Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={buddy.avatar}
          alt={buddy.name}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface animate-pulse flex items-center justify-center">
            <Icon name="User" size={48} className="text-text-secondary" />
          </div>
        )}
        
        {/* Verification Badge */}
        {buddy.verified && (
          <div className="absolute top-4 left-4 bg-success text-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} />
            <span className="font-caption text-xs font-medium">Verified</span>
          </div>
        )}

        {/* Compatibility Score */}
        <div className={`absolute top-4 right-4 ${getCompatibilityBg(buddy.compatibilityScore)} backdrop-blur-sm rounded-full px-3 py-1`}>
          <span className={`font-caption text-sm font-semibold ${getCompatibilityColor(buddy.compatibilityScore)}`}>
            {buddy.compatibilityScore}% Match
          </span>
        </div>

        {/* Online Status */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
          <span className="font-caption text-xs text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
            {buddy.lastActive}
          </span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        {/* Basic Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-heading font-bold text-xl text-text-primary mb-1">
              {buddy.name}, {buddy.age}
            </h3>
            <div className="flex items-center space-x-2 text-text-secondary mb-2">
              <Icon name="MapPin" size={14} />
              <span className="font-body text-sm">{buddy.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="font-body text-sm font-medium text-text-primary">
                  {buddy.rating}
                </span>
              </div>
              <span className="font-body text-sm text-text-secondary">
                ({buddy.reviewCount} reviews)
              </span>
            </div>
          </div>
          <button
            onClick={handleDetailsToggle}
            className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
          >
            <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={20} />
          </button>
        </div>

        {/* Travel Style Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {buddy.travelStyle.map((style) => (
            <span
              key={style}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full font-caption text-xs font-medium"
            >
              {style}
            </span>
          ))}
        </div>

        {/* Languages */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageCircle" size={16} className="text-text-secondary" />
          <span className="font-body text-sm text-text-secondary">
            Speaks: {buddy.languages.join(', ')}
          </span>
        </div>

        {/* Upcoming Trips */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="font-body text-sm font-medium text-text-primary">
              Upcoming Trips
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {buddy.upcomingTrips.map((trip) => (
              <span
                key={trip}
                className="bg-secondary/10 text-secondary-700 px-3 py-1 rounded-full font-caption text-xs"
              >
                {trip}
              </span>
            ))}
          </div>
        </div>

        {/* Mutual Connections */}
        {buddy.mutualConnections > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="font-body text-sm text-text-secondary">
              {buddy.mutualConnections} mutual connection{buddy.mutualConnections !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Detailed Info */}
        {showDetails && (
          <div className="border-t border-subtle pt-4 mt-4 space-y-4">
            {/* Bio */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                About
              </h4>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {buddy.bio}
              </p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {buddy.interests.map((interest) => (
                  <span
                    key={interest}
                    className="bg-surface text-text-primary px-2 py-1 rounded-lg font-caption text-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Travel History */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                Been To
              </h4>
              <div className="flex flex-wrap gap-2">
                {buddy.travelHistory.map((destination) => (
                  <span
                    key={destination}
                    className="bg-accent/10 text-accent-700 px-2 py-1 rounded-lg font-caption text-xs"
                  >
                    {destination}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h4 className="font-heading font-semibold text-sm text-text-primary mb-2">
                Badges
              </h4>
              <div className="flex flex-wrap gap-2">
                {buddy.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-lg"
                  >
                    <Icon name="Award" size={12} />
                    <span className="font-caption text-xs font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={handlePass}
            className="flex-1 bg-surface hover:bg-accent/10 text-text-primary hover:text-accent border border-subtle hover:border-accent/30 font-body font-medium py-3 px-4 rounded-xl transition-all duration-200 hover-lift flex items-center justify-center space-x-2"
          >
            <Icon name="X" size={18} />
            <span>Pass</span>
          </button>
          <button
            onClick={() => onChatOpen(buddy)}
            className="flex-1 bg-secondary hover:bg-secondary-600 text-white font-body font-medium py-3 px-4 rounded-xl transition-all duration-200 hover-lift flex items-center justify-center space-x-2"
          >
            <Icon name="MessageCircle" size={18} />
            <span>Chat</span>
          </button>
          <button
            onClick={handleLike}
            className="flex-1 bg-primary hover:bg-primary-700 text-white font-body font-medium py-3 px-4 rounded-xl transition-all duration-200 hover-lift flex items-center justify-center space-x-2"
          >
            <Icon name="Heart" size={18} />
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuddyCard;