import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ActivitySuggestions = ({ trip, onClose, onAddActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);

  const categories = [
    { id: 'all', label: 'All', icon: 'Grid3X3' },
    { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
    { id: 'culture', label: 'Culture', icon: 'Building' },
    { id: 'food', label: 'Food', icon: 'UtensilsCrossed' },
    { id: 'nature', label: 'Nature', icon: 'Trees' },
    { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { id: 'nightlife', label: 'Nightlife', icon: 'Moon' }
  ];

  const suggestions = [
    {
      id: 1,
      title: "Tokyo Skytree",
      category: "popular",
      type: "activity",
      description: "Iconic tower with panoramic city views and shopping complex",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
      duration: "2-3 hours",
      cost: 25,
      rating: 4.6,
      reviews: 12847,
      location: "Sumida City",
      tags: ["Views", "Photography", "Shopping"],
      bestTime: "Morning or Evening"
    },
    {
      id: 2,
      title: "Meiji Shrine",
      category: "culture",
      type: "activity",
      description: "Peaceful Shinto shrine dedicated to Emperor Meiji and Empress Shoken",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
      duration: "1-2 hours",
      cost: 0,
      rating: 4.5,
      reviews: 8934,
      location: "Shibuya",
      tags: ["Culture", "History", "Peaceful"],
      bestTime: "Early Morning"
    },
    {
      id: 3,
      title: "Ramen Tasting Tour",
      category: "food",
      type: "restaurant",
      description: "Guided tour through Tokyo\'s best ramen shops in Shibuya district",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      duration: "3 hours",
      cost: 85,
      rating: 4.8,
      reviews: 2156,
      location: "Shibuya District",
      tags: ["Food", "Local Experience", "Guided"],
      bestTime: "Evening"
    },
    {
      id: 4,
      title: "Harajuku Street Fashion",
      category: "shopping",
      type: "activity",
      description: "Explore unique fashion boutiques and street style in Harajuku",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
      duration: "2-4 hours",
      cost: 0,
      rating: 4.3,
      reviews: 5672,
      location: "Harajuku",
      tags: ["Fashion", "Shopping", "Culture"],
      bestTime: "Afternoon"
    },
    {
      id: 5,
      title: "Imperial Palace Gardens",
      category: "nature",
      type: "activity",
      description: "Beautiful traditional gardens surrounding the Imperial Palace",
      image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop",
      duration: "2 hours",
      cost: 0,
      rating: 4.4,
      reviews: 7823,
      location: "Chiyoda",
      tags: ["Nature", "Gardens", "History"],
      bestTime: "Morning"
    },
    {
      id: 6,
      title: "Golden Gai Bar Hopping",
      category: "nightlife",
      type: "activity",
      description: "Experience Tokyo\'s famous tiny bars in the historic Golden Gai district",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      duration: "3-4 hours",
      cost: 120,
      rating: 4.7,
      reviews: 3421,
      location: "Shinjuku",
      tags: ["Nightlife", "Bars", "Local Experience"],
      bestTime: "Night"
    }
  ];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesCategory = selectedCategory === 'all' || suggestion.category === selectedCategory;
    const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         suggestion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleActivitySelect = (activityId) => {
    setSelectedActivities(prev => {
      if (prev.includes(activityId)) {
        return prev.filter(id => id !== activityId);
      } else {
        return [...prev, activityId];
      }
    });
  };

  const handleAddSelected = () => {
    const activitiesToAdd = suggestions.filter(s => selectedActivities.includes(s.id));
    activitiesToAdd.forEach(activity => onAddActivity(activity));
    onClose();
  };

  const getActivityTypeIcon = (type) => {
    const icons = {
      activity: 'MapPin',
      restaurant: 'UtensilsCrossed',
      accommodation: 'Building',
      transport: 'Car'
    };
    return icons[type] || 'MapPin';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-soft-lg">
        {/* Header */}
        <div className="p-6 border-b border-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading font-bold text-2xl text-text-primary">Activity Suggestions</h2>
              <p className="font-body text-text-secondary mt-1">
                Discover amazing activities for {trip?.destination}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={20} className="text-text-secondary" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities, food, attractions..."
                className="w-full pl-10 pr-4 py-3 bg-surface border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0
                    ${selectedCategory === category.id
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-surface text-text-secondary hover:text-primary hover:bg-primary-50'
                    }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSuggestions.map((suggestion) => {
              const isSelected = selectedActivities.includes(suggestion.id);
              return (
                <div
                  key={suggestion.id}
                  className={`bg-surface rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer hover-lift
                    ${isSelected ? 'border-primary shadow-soft' : 'border-subtle hover:border-primary/30'}
                  `}
                  onClick={() => handleActivitySelect(suggestion.id)}
                >
                  {/* Image */}
                  <div className="relative h-48">
                    <Image 
                      src={suggestion.image} 
                      alt={suggestion.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Selection Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                        ${isSelected 
                          ? 'bg-primary border-primary text-white' :'bg-white/20 border-white/50 text-white'
                        }`}>
                        {isSelected && <Icon name="Check" size={14} />}
                      </div>
                    </div>

                    {/* Activity Type */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                        <Icon name={getActivityTypeIcon(suggestion.type)} size={16} className="text-text-primary" />
                      </div>
                    </div>

                    {/* Cost */}
                    <div className="absolute bottom-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="font-body font-semibold text-sm text-text-primary">
                          {suggestion.cost === 0 ? 'Free' : `$${suggestion.cost}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-semibold text-lg text-text-primary">
                        {suggestion.title}
                      </h3>
                      <div className="flex items-center space-x-1 ml-2">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span className="font-body text-sm text-text-primary">{suggestion.rating}</span>
                      </div>
                    </div>

                    <p className="font-body text-sm text-text-secondary mb-3 line-clamp-2">
                      {suggestion.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Clock" size={14} />
                        <span>{suggestion.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="MapPin" size={14} />
                        <span>{suggestion.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {suggestion.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-primary-50 text-primary text-xs font-caption rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-caption text-xs text-text-secondary">
                        {suggestion.reviews.toLocaleString()} reviews
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSuggestions.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-text-secondary/50 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">No activities found</h3>
              <p className="font-body text-text-secondary">Try adjusting your search or category filters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedActivities.length > 0 && (
          <div className="p-6 border-t border-subtle bg-surface">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="font-body text-text-primary">
                  {selectedActivities.length} activit{selectedActivities.length !== 1 ? 'ies' : 'y'} selected
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedActivities([])}
                  className="px-4 py-2 bg-background text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift"
                >
                  Clear Selection
                </button>
                <button
                  onClick={handleAddSelected}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-body text-sm transition-all duration-200 hover-lift flex items-center space-x-2"
                >
                  <Icon name="Plus" size={16} />
                  <span>Add to Trip</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySuggestions;