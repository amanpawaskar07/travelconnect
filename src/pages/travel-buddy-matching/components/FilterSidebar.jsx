import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFiltersChange, isMobile = false }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const travelStyles = [
    { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
    { id: 'luxury', label: 'Luxury', icon: 'Crown' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'cultural', label: 'Cultural', icon: 'Building' },
    { id: 'food', label: 'Food & Drink', icon: 'UtensilsCrossed' },
    { id: 'nature', label: 'Nature', icon: 'Trees' },
    { id: 'nightlife', label: 'Nightlife', icon: 'Moon' },
    { id: 'family', label: 'Family', icon: 'Users' }
  ];

  const popularDestinations = [
    'Tokyo, Japan',
    'Paris, France',
    'Bali, Indonesia',
    'New York, USA',
    'London, UK',
    'Barcelona, Spain',
    'Bangkok, Thailand',
    'Rome, Italy'
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Mandarin',
    'Japanese',
    'Korean',
    'Arabic'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterToggle = (key, value) => {
    const currentArray = localFilters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      ageRange: [25, 45],
      gender: 'any',
      travelStyle: [],
      destinations: [],
      languages: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className={`bg-background ${isMobile ? '' : 'sticky top-40'} space-y-6`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Filters
        </h3>
        <button
          onClick={handleClearFilters}
          className="text-sm font-body text-accent hover:text-accent-700 transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Age Range */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Age Range</span>
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-body text-text-secondary">
            <span>{localFilters.ageRange[0]} years</span>
            <span>{localFilters.ageRange[1]} years</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="18"
              max="65"
              value={localFilters.ageRange[0]}
              onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value), localFilters.ageRange[1]])}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min="18"
              max="65"
              value={localFilters.ageRange[1]}
              onChange={(e) => handleFilterChange('ageRange', [localFilters.ageRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider absolute top-0"
            />
          </div>
        </div>
      </div>

      {/* Gender */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="Users" size={16} />
          <span>Gender</span>
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {['any', 'male', 'female'].map((gender) => (
            <button
              key={gender}
              onClick={() => handleFilterChange('gender', gender)}
              className={`py-2 px-3 rounded-lg font-body text-sm transition-all duration-200 capitalize
                ${localFilters.gender === gender
                  ? 'bg-primary text-white' :'bg-surface hover:bg-primary-50 text-text-primary'
                }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Travel Style */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="Backpack" size={16} />
          <span>Travel Style</span>
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {travelStyles.map((style) => {
            const isSelected = localFilters.travelStyle.includes(style.id);
            return (
              <button
                key={style.id}
                onClick={() => handleArrayFilterToggle('travelStyle', style.id)}
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg font-body text-sm transition-all duration-200
                  ${isSelected
                    ? 'bg-primary text-white' :'bg-surface hover:bg-primary-50 text-text-primary'
                  }`}
              >
                <Icon name={style.icon} size={14} />
                <span>{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Destinations */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="MapPin" size={16} />
          <span>Destinations</span>
        </h4>
        <div className="space-y-2">
          {popularDestinations.map((destination) => {
            const isSelected = localFilters.destinations.includes(destination);
            return (
              <button
                key={destination}
                onClick={() => handleArrayFilterToggle('destinations', destination)}
                className={`w-full text-left py-2 px-3 rounded-lg font-body text-sm transition-all duration-200
                  ${isSelected
                    ? 'bg-primary text-white' :'bg-surface hover:bg-primary-50 text-text-primary'
                  }`}
              >
                {destination}
              </button>
            );
          })}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <h4 className="font-heading font-medium text-text-primary flex items-center space-x-2">
          <Icon name="MessageCircle" size={16} />
          <span>Languages</span>
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((language) => {
            const isSelected = localFilters.languages.includes(language);
            return (
              <button
                key={language}
                onClick={() => handleArrayFilterToggle('languages', language)}
                className={`py-2 px-3 rounded-lg font-body text-sm transition-all duration-200
                  ${isSelected
                    ? 'bg-primary text-white' :'bg-surface hover:bg-primary-50 text-text-primary'
                  }`}
              >
                {language}
              </button>
            );
          })}
        </div>
      </div>

      {/* Apply Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => {}}
          className="w-full bg-primary hover:bg-primary-700 text-white font-body font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover-lift"
        >
          Apply Filters
        </button>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;