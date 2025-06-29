import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AdvancedFilters = ({ activeFilters, onFilterChange, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    region: true,
    budget: true,
    activities: true,
    climate: false,
    accessibility: false,
    travel: false
  });

  const filterSections = {
    region: {
      title: 'Region',
      icon: 'Globe',
      options: [
        { id: 'europe', label: 'Europe', count: 45 },
        { id: 'asia', label: 'Asia', count: 38 },
        { id: 'north-america', label: 'North America', count: 32 },
        { id: 'south-america', label: 'South America', count: 18 },
        { id: 'africa', label: 'Africa', count: 24 },
        { id: 'oceania', label: 'Oceania', count: 12 }
      ]
    },
    budget: {
      title: 'Budget Range',
      icon: 'DollarSign',
      options: [
        { id: 'budget', label: 'Budget ($0-80/day)', count: 156 },
        { id: 'mid-range', label: 'Mid-range ($80-150/day)', count: 234 },
        { id: 'luxury', label: 'Luxury ($150+/day)', count: 89 }
      ]
    },
    activities: {
      title: 'Activities & Interests',
      icon: 'Activity',
      options: [
        { id: 'adventure', label: 'Adventure & Outdoor', count: 187 },
        { id: 'culture', label: 'Culture & History', count: 298 },
        { id: 'nature', label: 'Nature & Wildlife', count: 156 },
        { id: 'beach', label: 'Beach & Water Sports', count: 134 },
        { id: 'food', label: 'Food & Culinary', count: 201 },
        { id: 'nightlife', label: 'Nightlife & Entertainment', count: 98 },
        { id: 'wellness', label: 'Wellness & Spa', count: 76 },
        { id: 'photography', label: 'Photography', count: 145 }
      ]
    },
    climate: {
      title: 'Climate & Weather',
      icon: 'Sun',
      options: [
        { id: 'tropical', label: 'Tropical', count: 89 },
        { id: 'temperate', label: 'Temperate', count: 156 },
        { id: 'desert', label: 'Desert', count: 34 },
        { id: 'mediterranean', label: 'Mediterranean', count: 67 },
        { id: 'continental', label: 'Continental', count: 78 },
        { id: 'polar', label: 'Polar/Arctic', count: 12 }
      ]
    },
    accessibility: {
      title: 'Accessibility',
      icon: 'Accessibility',
      options: [
        { id: 'wheelchair-accessible', label: 'Wheelchair Accessible', count: 123 },
        { id: 'mobility-friendly', label: 'Mobility Friendly', count: 234 },
        { id: 'visual-impairment', label: 'Visual Impairment Support', count: 89 },
        { id: 'hearing-impairment', label: 'Hearing Impairment Support', count: 67 }
      ]
    },
    travel: {
      title: 'Travel Requirements',
      icon: 'FileText',
      options: [
        { id: 'no-visa', label: 'No Visa Required', count: 156 },
        { id: 'visa-on-arrival', label: 'Visa on Arrival', count: 89 },
        { id: 'e-visa', label: 'E-Visa Available', count: 134 },
        { id: 'english-speaking', label: 'English Speaking', count: 98 },
        { id: 'direct-flights', label: 'Direct Flights Available', count: 167 }
      ]
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleFilterToggle = (filterId) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    onFilterChange([]);
  };

  const handleApplyFilters = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="SlidersHorizontal" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Advanced Filters
          </h3>
        </div>
        
        {activeFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm font-body text-accent hover:text-accent-700 transition-colors duration-200"
          >
            Clear All ({activeFilters.length})
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {Object.entries(filterSections).map(([sectionId, section]) => (
          <div key={sectionId} className="border border-subtle rounded-xl overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionId)}
              className="w-full flex items-center justify-between p-4 bg-surface hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section.icon} size={18} className="text-primary" />
                <span className="font-body font-semibold text-text-primary">
                  {section.title}
                </span>
                {activeFilters.some(filter => 
                  section.options.some(option => option.id === filter)
                ) && (
                  <div className="w-2 h-2 bg-accent rounded-full" />
                )}
              </div>
              
              <Icon 
                name={expandedSections[sectionId] ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>

            {/* Section Content */}
            {expandedSections[sectionId] && (
              <div className="p-4 border-t border-subtle bg-background">
                <div className="space-y-3">
                  {section.options.map((option) => {
                    const isActive = activeFilters.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={() => handleFilterToggle(option.id)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                              isActive
                                ? 'bg-primary border-primary' :'border-subtle group-hover:border-primary/50'
                            }`}>
                              {isActive && (
                                <Icon name="Check" size={12} color="white" className="absolute inset-0 m-auto" />
                              )}
                            </div>
                          </div>
                          
                          <span className={`font-body text-sm transition-colors duration-200 ${
                            isActive ? 'text-primary font-semibold' : 'text-text-primary group-hover:text-primary'
                          }`}>
                            {option.label}
                          </span>
                        </div>
                        
                        <span className="font-caption text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
                          {option.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Apply Button */}
      {onClose && (
        <div className="sticky bottom-0 bg-background border-t border-subtle p-4 mt-6">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-primary hover:bg-primary-700 text-white font-body font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover-lift shadow-soft"
          >
            Apply Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
        </div>
      )}

      {/* Filter Summary */}
      <div className="mt-6 p-4 bg-surface rounded-xl border border-subtle">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-body text-sm font-semibold text-text-primary">
            Filter Summary
          </span>
        </div>
        <p className="font-caption text-xs text-text-secondary">
          {activeFilters.length === 0 
            ? 'No filters applied. Showing all destinations.'
            : `${activeFilters.length} filter${activeFilters.length !== 1 ? 's' : ''} applied. Results will be refined based on your selections.`
          }
        </p>
      </div>
    </div>
  );
};

export default AdvancedFilters;