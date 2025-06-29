import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickAccessTiles = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'trip-planner',
      title: 'Trip Planner',
      description: 'Plan your next adventure',
      icon: 'MapPin',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      route: '/trip-planning',
      badge: null
    },
    {
      id: 'travel-buddies',
      title: 'Travel Buddies',
      description: 'Find travel companions',
      icon: 'Users',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary/10',
      route: '/travel-buddy-matching',
      badge: '3 new'
    },
    {
      id: 'saved-destinations',
      title: 'Saved Places',
      description: 'Your wishlist destinations',
      icon: 'Bookmark',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      route: '/destination-discovery',
      badge: '12 saved'
    },
    {
      id: 'travel-challenges',
      title: 'Challenges',
      description: 'Complete travel goals',
      icon: 'Trophy',
      color: 'text-warning-600',
      bgColor: 'bg-warning/10',
      route: '/travel-dashboard',
      badge: '2 active'
    }
  ];

  const handleTileClick = (action) => {
    navigate(action.route);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-lg text-text-primary">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleTileClick(action)}
            className="bg-surface hover:bg-primary-50 rounded-2xl p-4 shadow-soft border border-subtle transition-all duration-200 hover-lift text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={24} className={action.color} strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {action.title}
                  </h4>
                  {action.badge && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {action.badge}
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-text-secondary">
                  {action.description}
                </p>
              </div>
              
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-2xl border border-success/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="Target" size={20} className="text-success" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-semibold text-success mb-1">
              Travel Goal Progress
            </h4>
            <p className="font-body text-sm text-text-secondary">
              Visit 5 new countries this year
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-caption text-xs text-text-secondary">3 of 5 countries</span>
            <span className="font-caption text-xs text-success font-semibold">60%</span>
          </div>
          <div className="w-full bg-success/20 rounded-full h-2">
            <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessTiles;