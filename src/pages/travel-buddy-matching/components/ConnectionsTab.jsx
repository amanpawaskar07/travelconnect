import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ConnectionsTab = ({ connections, onChatOpen, showRequests = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = (connectionId) => {
    console.log('Accepting request:', connectionId);
    // Handle accept logic
  };

  const handleDeclineRequest = (connectionId) => {
    console.log('Declining request:', connectionId);
    // Handle decline logic
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl text-text-primary">
          {showRequests ? 'Travel Buddy Requests' : 'My Travel Connections'}
        </h2>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Users" size={16} />
          <span className="font-body text-sm">
            {filteredConnections.length} {showRequests ? 'request' : 'connection'}{filteredConnections.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${showRequests ? 'requests' : 'connections'}...`}
          className="block w-full pl-10 pr-4 py-3 border border-subtle rounded-xl font-body text-sm bg-surface/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder-text-secondary/70"
        />
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {filteredConnections.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name={showRequests ? "UserPlus" : "Users"} size={48} className="text-text-secondary" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
              {showRequests ? 'No Pending Requests' : 'No Connections Yet'}
            </h3>
            <p className="font-body text-text-secondary">
              {showRequests 
                ? 'You don\'t have any pending travel buddy requests at the moment.'
                : 'Start connecting with fellow travelers to build your network!'
              }
            </p>
          </div>
        ) : (
          filteredConnections.map((connection) => (
            <div
              key={connection.id}
              className="bg-background border border-subtle rounded-xl p-6 hover:shadow-soft-md transition-all duration-200 hover-lift"
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {connection.status === 'connected' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-text-primary">
                        {connection.name}
                      </h3>
                      {connection.sharedTrips && connection.sharedTrips.length > 0 && (
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="MapPin" size={14} className="text-text-secondary" />
                          <span className="font-body text-sm text-text-secondary">
                            {connection.sharedTrips.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {connection.unreadCount > 0 && (
                        <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
                          {connection.unreadCount}
                        </span>
                      )}
                      <span className="font-caption text-xs text-text-secondary">
                        {formatTime(connection.lastMessageTime)}
                      </span>
                    </div>
                  </div>

                  {/* Last Message */}
                  <p className="font-body text-sm text-text-secondary mb-4 line-clamp-2">
                    {connection.lastMessage}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    {showRequests ? (
                      <>
                        <button
                          onClick={() => handleDeclineRequest(connection.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-accent/10 text-text-primary hover:text-accent border border-subtle hover:border-accent/30 rounded-lg transition-all duration-200 hover-lift"
                        >
                          <Icon name="X" size={16} />
                          <span className="font-body text-sm font-medium">Decline</span>
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(connection.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover-lift"
                        >
                          <Icon name="Check" size={16} />
                          <span className="font-body text-sm font-medium">Accept</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => onChatOpen(connection)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover-lift"
                        >
                          <Icon name="MessageCircle" size={16} />
                          <span className="font-body text-sm font-medium">Chat</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-secondary/10 text-text-primary hover:text-secondary border border-subtle hover:border-secondary/30 rounded-lg transition-all duration-200 hover-lift">
                          <Icon name="Calendar" size={16} />
                          <span className="font-body text-sm font-medium">Plan Trip</span>
                        </button>
                        <button className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
                          <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredConnections.length > 0 && (
        <div className="text-center pt-6">
          <button className="bg-surface hover:bg-primary-50 text-text-primary hover:text-primary border border-subtle hover:border-primary/30 font-body font-medium px-6 py-3 rounded-xl transition-all duration-200 hover-lift">
            Load More {showRequests ? 'Requests' : 'Connections'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionsTab;