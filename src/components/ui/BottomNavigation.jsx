import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      path: '/travel-dashboard',
      badge: null
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: 'MapPin',
      path: '/destination-discovery',
      badge: null
    },
    {
      id: 'plan',
      label: 'Plan',
      icon: 'Calendar',
      path: '/trip-planning',
      badge: 2
    },
    {
      id: 'social',
      label: 'Social',
      icon: 'Users',
      path: '/social-feed',
      badge: 5
    },
    {
      id: 'memories',
      label: 'Memories',
      icon: 'Camera',
      path: '/travel-memory-albums',
      badge: null
    }
  ];

  const handleTabClick = (item) => {
    setActiveTab(item.path);
    navigate(item.path);
  };

  const isActive = (path) => {
    return location.pathname === path || activeTab === path;
  };

  return (
    <>
      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-soft border-t border-subtle">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 mx-1
                  ${active 
                    ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                  }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={24} 
                    strokeWidth={active ? 2.5 : 2}
                    className={`transition-all duration-200 ${
                      active ? 'transform scale-110' : ''
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`font-caption text-xs mt-1 transition-all duration-200 ${
                  active ? 'font-semibold' : 'font-normal'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Top Navigation - Desktop */}
      <nav className="hidden lg:block sticky top-16 z-80 bg-background/95 backdrop-blur-soft border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 py-4">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover-lift
                    ${active 
                      ? 'bg-primary/10 text-primary shadow-soft' 
                      : 'text-text-secondary hover:text-primary hover:bg-surface/50'
                    }`}
                >
                  <div className="relative">
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 h-4 w-4 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`font-body text-sm transition-all duration-200 ${
                    active ? 'font-semibold' : 'font-normal'
                  }`}>
                    {item.label}
                  </span>
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed bottom navigation on mobile */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default BottomNavigation;