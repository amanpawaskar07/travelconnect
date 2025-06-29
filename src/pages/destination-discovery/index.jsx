import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import MapView from './components/MapView';
import TrendingSection from './components/TrendingSection';
import AdvancedFilters from './components/AdvancedFilters';

const DestinationDiscovery = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock destinations data
  const mockDestinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      country: "Greece",
      region: "Europe",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      averageCost: "$150-200/day",
      climate: "Mediterranean",
      activities: ["Beach", "Culture", "Photography"],
      isBookmarked: false,
      communityVisits: 1247,
      description: "Stunning sunsets and white-washed buildings overlooking the Aegean Sea",
      trendingRank: 3,
      accessibility: "Moderate",
      visaRequired: false,
      bestSeason: "April-October"
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      country: "Japan",
      region: "Asia",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 3521,
      averageCost: "$120-180/day",
      climate: "Temperate",
      activities: ["Culture", "Temples", "Gardens"],
      isBookmarked: true,
      communityVisits: 2156,
      description: "Ancient temples, traditional gardens, and rich cultural heritage",
      trendingRank: 1,
      accessibility: "Good",
      visaRequired: true,
      bestSeason: "March-May, September-November"
    },
    {
      id: 3,
      name: "Banff National Park, Canada",
      country: "Canada",
      region: "North America",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 1892,
      averageCost: "$100-150/day",
      climate: "Continental",
      activities: ["Nature", "Hiking", "Adventure"],
      isBookmarked: false,
      communityVisits: 987,
      description: "Pristine wilderness with turquoise lakes and snow-capped mountains",
      trendingRank: 5,
      accessibility: "Moderate",
      visaRequired: false,
      bestSeason: "June-September"
    },
    {
      id: 4,
      name: "Marrakech, Morocco",
      country: "Morocco",
      region: "Africa",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 2134,
      averageCost: "$60-100/day",
      climate: "Desert",
      activities: ["Culture", "Markets", "Architecture"],
      isBookmarked: true,
      communityVisits: 1543,
      description: "Vibrant souks, stunning architecture, and rich Berber culture",
      trendingRank: 7,
      accessibility: "Challenging",
      visaRequired: false,
      bestSeason: "October-April"
    },
    {
      id: 5,
      name: "Bali, Indonesia",
      country: "Indonesia",
      region: "Asia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 4267,
      averageCost: "$40-80/day",
      climate: "Tropical",
      activities: ["Beach", "Culture", "Wellness"],
      isBookmarked: false,
      communityVisits: 3421,
      description: "Tropical paradise with ancient temples and vibrant culture",
      trendingRank: 2,
      accessibility: "Good",
      visaRequired: true,
      bestSeason: "April-October"
    },
    {
      id: 6,
      name: "Patagonia, Chile",
      country: "Chile",
      region: "South America",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1456,
      averageCost: "$80-120/day",
      climate: "Subantarctic",
      activities: ["Adventure", "Nature", "Hiking"],
      isBookmarked: false,
      communityVisits: 743,
      description: "Dramatic landscapes with glaciers, mountains, and pristine wilderness",
      trendingRank: 9,
      accessibility: "Challenging",
      visaRequired: false,
      bestSeason: "November-March"
    },
    {
      id: 7,
      name: "Reykjavik, Iceland",
      country: "Iceland",
      region: "Europe",
      image: "https://images.unsplash.com/photo-1539066834-3fa5463d4e3e?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 1789,
      averageCost: "$180-250/day",
      climate: "Subarctic",
      activities: ["Nature", "Northern Lights", "Geothermal"],
      isBookmarked: true,
      communityVisits: 1234,
      description: "Land of fire and ice with stunning natural phenomena",
      trendingRank: 4,
      accessibility: "Good",
      visaRequired: false,
      bestSeason: "June-August, September-March"
    },
    {
      id: 8,
      name: "Cape Town, South Africa",
      country: "South Africa",
      region: "Africa",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 2345,
      averageCost: "$70-110/day",
      climate: "Mediterranean",
      activities: ["Nature", "Wine", "Culture"],
      isBookmarked: false,
      communityVisits: 1876,
      description: "Stunning coastline, world-class wines, and rich history",
      trendingRank: 6,
      accessibility: "Good",
      visaRequired: false,
      bestSeason: "November-March"
    }
  ];

  useEffect(() => {
    setDestinations(mockDestinations);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter destinations based on search query
    if (query.trim() === '') {
      setDestinations(mockDestinations);
    } else {
      const filtered = mockDestinations.filter(dest =>
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.country.toLowerCase().includes(query.toLowerCase()) ||
        dest.region.toLowerCase().includes(query.toLowerCase())
      );
      setDestinations(filtered);
    }
  };

  const handleBookmark = (destinationId) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === destinationId
          ? { ...dest, isBookmarked: !dest.isBookmarked }
          : dest
      )
    );
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    // Apply filters to destinations
    let filtered = mockDestinations;
    
    if (filters.length > 0) {
      filtered = mockDestinations.filter(dest => {
        return filters.some(filter => {
          switch (filter) {
            case 'budget':
              return parseInt(dest.averageCost.split('-')[0].replace('$', '')) < 100;
            case 'adventure':
              return dest.activities.includes('Adventure') || dest.activities.includes('Nature');
            case 'culture':
              return dest.activities.includes('Culture');
            case 'nature':
              return dest.activities.includes('Nature') || dest.activities.includes('Beach');
            case 'popular':
              return dest.trendingRank <= 5;
            default:
              return true;
          }
        });
      });
    }
    
    setDestinations(filtered);
  };

  const loadMore = () => {
    setLoading(true);
    // Simulate loading more destinations
    setTimeout(() => {
      setLoading(false);
      // In real app, would load more data
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <div className="sticky top-16 lg:top-28 z-60 bg-background/95 backdrop-blur-soft border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onVoiceSearch={() => console.log('Voice search activated')}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* View Toggle and Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary">
              Discover Destinations
            </h1>
            <div className="hidden lg:flex items-center space-x-2 text-text-secondary">
              <Icon name="MapPin" size={16} />
              <span className="font-body text-sm">
                {destinations.length} destinations found
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
            >
              <Icon name="SlidersHorizontal" size={20} />
            </button>
            
            <div className="flex items-center bg-surface rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ?'bg-primary text-white shadow-soft' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name="Grid3X3" size={18} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'map' ?'bg-primary text-white shadow-soft' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name="Map" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center space-x-2 mb-6">
            <Icon name="Filter" size={16} className="text-primary" />
            <span className="font-body text-sm text-text-secondary">
              {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body capitalize"
                >
                  {filter}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleFilterChange([])}
              className="text-sm font-body text-accent hover:text-accent-700 transition-colors duration-200"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Advanced Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <AdvancedFilters
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Trending Section */}
            <TrendingSection destinations={destinations.filter(d => d.trendingRank <= 5)} />

            {/* Content View */}
            {viewMode === 'grid' ? (
              <div className="space-y-6">
                {/* Destinations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {destinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>

                {/* Loading Skeleton */}
                {loading && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-surface rounded-xl p-4 animate-pulse">
                        <div className="w-full h-48 bg-primary-100 rounded-lg mb-4" />
                        <div className="h-4 bg-primary-100 rounded mb-2" />
                        <div className="h-3 bg-primary-100 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !loading && (
                  <div className="text-center py-8">
                    <button
                      onClick={loadMore}
                      className="px-8 py-3 bg-primary hover:bg-primary-700 text-white font-body font-semibold rounded-xl transition-all duration-200 hover-lift shadow-soft"
                    >
                      Load More Destinations
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <MapView destinations={destinations} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="lg:hidden fixed inset-0 z-100 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-subtle p-4 flex items-center justify-between">
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Advanced Filters
              </h3>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-4">
              <AdvancedFilters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowAdvancedFilters(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDiscovery;