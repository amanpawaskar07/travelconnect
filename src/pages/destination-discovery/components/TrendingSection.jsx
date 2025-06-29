import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TrendingSection = ({ destinations }) => {
  const navigate = useNavigate();
  
  const trendingDestinations = destinations
    .sort((a, b) => a.trendingRank - b.trendingRank)
    .slice(0, 5);

  const handleDestinationClick = (destination) => {
    console.log('Navigate to trending destination:', destination.id);
    // In real app: navigate(`/destination/${destination.id}`);
  };

  const handleViewAllTrending = () => {
    console.log('View all trending destinations');
    // In real app: navigate('/trending-destinations');
  };

  if (trendingDestinations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent to-accent-600 rounded-xl">
            <Icon name="TrendingUp" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-text-primary">
              Trending Now
            </h2>
            <p className="font-body text-sm text-text-secondary">
              Popular destinations this week
            </p>
          </div>
        </div>

        <button
          onClick={handleViewAllTrending}
          className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-primary-50 text-primary rounded-xl border border-subtle hover:border-primary/30 transition-all duration-200 hover-lift"
        >
          <span className="font-body text-sm font-semibold">View All</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>

      {/* Trending Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Featured Trending - Large Card */}
        <div className="lg:col-span-2">
          {trendingDestinations[0] && (
            <div
              onClick={() => handleDestinationClick(trendingDestinations[0])}
              className="group relative h-80 bg-background rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 hover-lift cursor-pointer border border-subtle hover:border-primary/20"
            >
              <Image
                src={trendingDestinations[0].image}
                alt={trendingDestinations[0].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Trending Badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-accent to-accent-600 text-white px-3 py-2 rounded-full">
                  <Icon name="Crown" size={16} strokeWidth={2.5} />
                  <span className="font-body text-sm font-bold">
                    #1 Trending
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-white/80" />
                  <span className="font-caption text-sm text-white/80">
                    {trendingDestinations[0].country}
                  </span>
                </div>
                
                <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-secondary-200 transition-colors duration-200">
                  {trendingDestinations[0].name}
                </h3>
                
                <p className="font-body text-sm text-white/90 mb-3 line-clamp-2">
                  {trendingDestinations[0].description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning-400" fill="currentColor" />
                      <span className="font-body text-sm font-semibold text-white">
                        {trendingDestinations[0].rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} className="text-white/80" />
                      <span className="font-caption text-sm text-white/80">
                        {trendingDestinations[0].communityVisits.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Icon name="TrendingUp" size={12} className="text-white" />
                    <span className="font-caption text-xs text-white font-semibold">
                      Hot
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Other Trending - Smaller Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-2 gap-4">
          {trendingDestinations.slice(1, 5).map((destination, index) => (
            <div
              key={destination.id}
              onClick={() => handleDestinationClick(destination)}
              className="group relative h-36 lg:h-40 bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 hover-lift cursor-pointer border border-subtle hover:border-primary/20"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              {/* Ranking Badge */}
              <div className="absolute top-2 left-2">
                <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center">
                  <span className="font-body text-xs font-bold">
                    #{destination.trendingRank}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-heading font-semibold text-sm text-white mb-1 line-clamp-1 group-hover:text-secondary-200 transition-colors duration-200">
                  {destination.name}
                </h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning-400" fill="currentColor" />
                    <span className="font-caption text-xs text-white/90">
                      {destination.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} className="text-white/80" />
                    <span className="font-caption text-xs text-white/80">
                      {destination.communityVisits > 1000 
                        ? `${Math.round(destination.communityVisits / 1000)}k` 
                        : destination.communityVisits}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-4 border border-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
              Most Searched
            </span>
          </div>
          <div className="font-heading font-bold text-lg text-text-primary">
            {trendingDestinations[0]?.name.split(',')[0]}
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
              Community Visits
            </span>
          </div>
          <div className="font-heading font-bold text-lg text-text-primary">
            {trendingDestinations.reduce((sum, dest) => sum + dest.communityVisits, 0).toLocaleString()}
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Star" size={16} className="text-warning-500" />
            <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
              Avg Rating
            </span>
          </div>
          <div className="font-heading font-bold text-lg text-text-primary">
            {(trendingDestinations.reduce((sum, dest) => sum + dest.rating, 0) / trendingDestinations.length).toFixed(1)}
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Globe" size={16} className="text-secondary-600" />
            <span className="font-caption text-xs text-text-secondary uppercase tracking-wide">
              Regions
            </span>
          </div>
          <div className="font-heading font-bold text-lg text-text-primary">
            {new Set(trendingDestinations.map(dest => dest.region)).size}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;