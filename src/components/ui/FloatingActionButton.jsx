import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [fabConfig, setFabConfig] = useState(null);

  const fabConfigurations = {
    '/travel-dashboard': {
      icon: 'Plus',
      label: 'Quick Add',
      actions: [
        { icon: 'MapPin', label: 'New Trip', action: 'new-trip' },
        { icon: 'Camera', label: 'Add Memory', action: 'add-memory' },
        { icon: 'Users', label: 'Find Buddy', action: 'find-buddy' }
      ]
    },
    '/destination-discovery': {
      icon: 'Plus',
      label: 'Add to Trip',
      actions: [
        { icon: 'Heart', label: 'Save Destination', action: 'save-destination' },
        { icon: 'Calendar', label: 'Plan Trip', action: 'plan-trip' },
        { icon: 'Share', label: 'Share', action: 'share' }
      ]
    },
    '/trip-planning': {
      icon: 'Plus',
      label: 'Add Item',
      actions: [
        { icon: 'MapPin', label: 'Add Place', action: 'add-place' },
        { icon: 'Clock', label: 'Add Activity', action: 'add-activity' },
        { icon: 'DollarSign', label: 'Add Expense', action: 'add-expense' }
      ]
    },
    '/travel-memory-albums': {
      icon: 'Camera',
      label: 'New Memory',
      actions: [
        { icon: 'Camera', label: 'Take Photo', action: 'take-photo' },
        { icon: 'Upload', label: 'Upload Photos', action: 'upload-photos' },
        { icon: 'BookOpen', label: 'New Album', action: 'new-album' }
      ]
    }
  };

  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const config = fabConfigurations[location.pathname];
    setFabConfig(config);
    setIsVisible(!!config);
    setShowActions(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 100 && fabConfig;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fabConfig]);

  const handleMainAction = () => {
    if (fabConfig.actions && fabConfig.actions.length > 1) {
      setShowActions(!showActions);
    } else if (fabConfig.actions && fabConfig.actions.length === 1) {
      handleActionClick(fabConfig.actions[0]);
    } else {
      console.log('Main FAB action:', fabConfig.label);
    }
  };

  const handleActionClick = (action) => {
    console.log('FAB action clicked:', action);
    setShowActions(false);
  };

  if (!isVisible || !fabConfig) {
    return null;
  }

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-90">
      {/* Action Menu */}
      {showActions && fabConfig.actions && (
        <div className="absolute bottom-16 right-0 space-y-3 transition-spatial">
          {fabConfig.actions.map((action, index) => (
            <div
              key={action.action}
              className="flex items-center space-x-3 animate-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-text-primary text-background px-3 py-1 rounded-lg text-sm font-caption whitespace-nowrap shadow-soft">
                {action.label}
              </span>
              <button
                onClick={() => handleActionClick(action)}
                className="w-12 h-12 bg-surface hover:bg-primary text-text-primary hover:text-white rounded-full shadow-soft-md hover:shadow-soft-lg transition-all duration-200 hover-lift flex items-center justify-center"
              >
                <Icon name={action.icon} size={20} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={handleMainAction}
        className={`w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full shadow-soft-lg hover:shadow-soft-lg transition-all duration-200 hover-lift flex items-center justify-center group
          ${showActions ? 'rotate-45' : 'rotate-0'}`}
        title={fabConfig.label}
      >
        <Icon 
          name={showActions ? 'X' : fabConfig.icon} 
          size={24} 
          strokeWidth={2.5}
          className="transition-transform duration-200"
        />
      </button>

      {/* Backdrop */}
      {showActions && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;