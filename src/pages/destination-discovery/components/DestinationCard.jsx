import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const DestinationCard = ({ destination, onBookmark }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    console.log('Navigate to destination details:', destination.id);
    // In real app: navigate(`/destination/${destination.id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onBookmark(destination.id);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    console.log('Share destination:', destination.name);
  };

  const getCostColor = (cost) => {
    const avgCost = parseInt(cost.split('-')[0].replace('$', ''));
    if (avgCost < 80) return 'text-success';
    if (avgCost < 150) return 'text-warning-600';
    return 'text-accent';
  };

  const getAccessibilityColor = (level) => {
    switch (level) {
      case 'Good': return 'text-success';
      case 'Moderate': return 'text-warning-600';
      case 'Challenging': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-background rounded-2xl shadow-soft hover:shadow-soft-md transition-all duration-300 hover-lift cursor-pointer overflow-hidden border border-subtle hover:border-primary/20"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-primary-100 animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-primary-300" />
          </div>
        )}
        
        <Image
          src={destination.image}
          alt={destination.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              destination.isBookmarked
                ? 'bg-accent text-white shadow-soft'
                : 'bg-white/80 text-text-primary hover:bg-white'
            }`}
          >
            <Icon 
              name={destination.isBookmarked ? "Bookmark" : "BookmarkPlus"} 
              size={16} 
              strokeWidth={destination.isBookmarked ? 0 : 2}
              fill={destination.isBookmarked ? "currentColor" : "none"}
            />
          </button>
          
          <button
            onClick={handleShareClick}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-text-primary hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <Icon name="Share" size={16} />
          </button>
        </div>

        {/* Trending Badge */}
        {destination.trendingRank <= 5 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-accent to-accent-600 text-white px-3 py-1 rounded-full text-xs font-body font-semibold">
              <Icon name="TrendingUp" size={12} />
              <span>#{destination.trendingRank} Trending</span>
            </div>
          </div>
        )}

        {/* Community Visits */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-caption">
            <Icon name="Users" size={12} />
            <span>{destination.communityVisits.toLocaleString()} visited</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-1">
              {destination.name}
            </h3>
            <p className="font-body text-sm text-text-secondary">
              {destination.country} • {destination.region}
            </p>
          </div>
          
          {destination.visaRequired && (
            <div className="ml-2 p-1 bg-warning-100 rounded-full" title="Visa Required">
              <Icon name="FileText" size={14} className="text-warning-600" />
            </div>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning-500" fill="currentColor" />
            <span className="font-body font-semibold text-sm text-text-primary">
              {destination.rating}
            </span>
          </div>
          <span className="font-caption text-xs text-text-secondary">
            ({destination.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-text-secondary mb-3 line-clamp-2">
          {destination.description}
        </p>

        {/* Activities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {destination.activities.slice(0, 3).map((activity) => (
            <span
              key={activity}
              className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded-full"
            >
              {activity}
            </span>
          ))}
          {destination.activities.length > 3 && (
            <span className="px-2 py-1 bg-surface text-text-secondary text-xs font-caption rounded-full">
              +{destination.activities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-3 border-t border-subtle">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} className={getCostColor(destination.averageCost)} />
              <span className={`font-body text-sm font-semibold ${getCostColor(destination.averageCost)}`}>
                {destination.averageCost}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Accessibility" size={14} className={getAccessibilityColor(destination.accessibility)} />
              <span className={`font-caption text-xs ${getAccessibilityColor(destination.accessibility)}`}>
                {destination.accessibility}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Calendar" size={14} />
            <span className="font-caption text-xs">
              {destination.bestSeason.split(',')[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;