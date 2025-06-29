import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickFilterChips = () => {
  const location = useLocation();
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterConfig, setFilterConfig] = useState(null);

  const filterConfigurations = {
    '/destination-discovery': {
      title: 'Discover Filters',
      filters: [
        { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
        { id: 'budget', label: 'Budget Friendly', icon: 'DollarSign' },
        { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
        { id: 'culture', label: 'Culture', icon: 'Building' },
        { id: 'nature', label: 'Nature', icon: 'Trees' },
        { id: 'food', label: 'Food & Drink', icon: 'UtensilsCrossed' },
        { id: 'nightlife', label: 'Nightlife', icon: 'Moon' },
        { id: 'family', label: 'Family Friendly', icon: 'Users' }
      ]
    },
    '/social-feed': {
      title: 'Feed Filters',
      filters: [
        { id: 'following', label: 'Following', icon: 'UserCheck' },
        { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
        { id: 'recent', label: 'Recent', icon: 'Clock' },
        { id: 'photos', label: 'Photos', icon: 'Camera' },
        { id: 'videos', label: 'Videos', icon: 'Video' },
        { id: 'tips', label: 'Travel Tips', icon: 'Lightbulb' },
        { id: 'reviews', label: 'Reviews', icon: 'Star' },
        { id: 'nearby', label: 'Nearby', icon: 'MapPin' }
      ]
    },
    '/travel-buddy-matching': {
      title: 'Buddy Filters',
      filters: [
        { id: 'online', label: 'Online Now', icon: 'Circle' },
        { id: 'verified', label: 'Verified', icon: 'CheckCircle' },
        { id: 'same-destination', label: 'Same Destination', icon: 'MapPin' },
        { id: 'similar-interests', label: 'Similar Interests', icon: 'Heart' },
        { id: 'age-range', label: 'Age Range', icon: 'Users' },
        { id: 'travel-style', label: 'Travel Style', icon: 'Backpack' }
      ]
    }
  };

  useEffect(() => {
    const config = filterConfigurations[location.pathname];
    setFilterConfig(config);
    setActiveFilters([]);
  }, [location.pathname]);

  const handleFilterToggle = (filterId) => {
    setActiveFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  if (!filterConfig) {
    return null;
  }

  return (
    <div className="sticky top-32 lg:top-28 z-70 bg-background/95 backdrop-blur-soft border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-sm text-text-primary">
            {filterConfig.title}
          </h3>
          {activeFilters.length > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-sm font-body text-accent hover:text-accent-700 transition-colors duration-200"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Desktop Filter Grid */}
        <div className="hidden lg:flex flex-wrap gap-2">
          {filterConfig.filters.map((filter) => {
            const isActive = activeFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterToggle(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 hover-lift
                  ${isActive
                    ? 'bg-primary text-white border-primary shadow-soft'
                    : 'bg-surface hover:bg-primary-50 text-text-primary border-subtle hover:border-primary/30'
                  }`}
              >
                <Icon 
                  name={filter.icon} 
                  size={16} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="font-body text-sm whitespace-nowrap">
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {filterConfig.filters.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterToggle(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200 flex-shrink-0
                    ${isActive
                      ? 'bg-primary text-white border-primary shadow-soft'
                      : 'bg-surface hover:bg-primary-50 text-text-primary border-subtle'
                    }`}
                >
                  <Icon 
                    name={filter.icon} 
                    size={16} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="font-body text-sm">
                    {filter.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Count */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="font-caption text-sm text-text-secondary">
              {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
            </span>
          </div>
        )}
      </div>

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

export default QuickFilterChips;