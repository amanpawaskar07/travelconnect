import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'buddy_request',
      message: 'Sarah wants to be your travel buddy',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'trip_update',
      message: 'Your Tokyo trip has been updated',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'social',
      message: 'Mike liked your Paris album',
      time: '3 hours ago',
      unread: false
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationItemClick = (notification) => {
    console.log('Notification clicked:', notification);
    setShowNotifications(false);
  };

  return (
    <header className="sticky top-0 z-90 bg-background/95 backdrop-blur-soft border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
                  <Icon name="Compass" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="font-heading font-bold text-xl text-primary">
                  Wanderlust
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'transform scale-105' : ''
              }`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className={`transition-colors duration-200 ${
                      isSearchFocused ? 'text-primary' : 'text-text-secondary'
                    }`}
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search destinations, experiences, or travel buddies..."
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl font-body text-sm
                    transition-all duration-200 bg-surface/50 backdrop-blur-sm
                    ${isSearchFocused 
                      ? 'border-primary shadow-soft-md bg-background' 
                      : 'border-subtle hover:border-primary/30 hover:bg-surface'
                    }
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                    placeholder-text-secondary/70`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-surface/50 rounded-r-xl transition-colors duration-200"
                  >
                    <Icon name="X" size={16} className="text-text-secondary hover:text-text-primary" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Voice Search */}
            <button
              type="button"
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200 hover-lift"
              title="Voice Search"
            >
              <Icon name="Mic" size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={handleNotificationClick}
                className="relative p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200 hover-lift"
                title="Notifications"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-background rounded-xl shadow-soft-lg border border-subtle z-100 transition-spatial">
                  <div className="p-4 border-b border-subtle">
                    <h3 className="font-heading font-semibold text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationItemClick(notification)}
                        className={`p-4 border-b border-subtle last:border-b-0 cursor-pointer transition-colors duration-200
                          ${notification.unread ? 'bg-primary-50/50' : 'hover:bg-surface/50'}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-accent' : 'bg-transparent'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-text-primary">
                              {notification.message}
                            </p>
                            <p className="font-caption text-xs text-text-secondary mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-subtle">
                    <button className="w-full text-center font-body text-sm text-primary hover:text-primary-700 transition-colors duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-all duration-200 hover-lift"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary-600 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className="lg:hidden">
        {isSearchFocused && (
          <div className="absolute inset-x-0 top-full bg-background/95 backdrop-blur-soft border-b border-subtle p-4 z-80">
            <div className="space-y-3">
              <div className="text-sm font-body text-text-secondary">Recent searches</div>
              <div className="flex flex-wrap gap-2">
                {['Tokyo', 'Paris', 'Bali', 'New York'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-surface rounded-full text-sm font-body text-text-primary hover:bg-primary-100 transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;