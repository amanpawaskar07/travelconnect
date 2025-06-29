import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TripHeader = ({ trip }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleShare = (platform) => {
    console.log(`Sharing trip to ${platform}`);
    setShowShareModal(false);
  };

  const shareOptions = [
    { id: 'link', label: 'Copy Link', icon: 'Link' },
    { id: 'email', label: 'Email', icon: 'Mail' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { id: 'facebook', label: 'Facebook', icon: 'Share' }
  ];

  return (
    <div className="bg-background rounded-xl overflow-hidden shadow-soft border border-subtle">
      {/* Hero Image */}
      <div className="relative h-48 lg:h-64">
        <Image 
          src={trip.image} 
          alt={trip.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-caption font-medium
            ${trip.status === 'planning' ?'bg-warning-100 text-warning-700 border border-warning-200' :'bg-surface text-text-secondary border border-subtle'
            }`}>
            {trip.status === 'planning' ? 'Planning' : 'Draft'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 bg-background/90 backdrop-blur-sm rounded-lg text-text-primary hover:bg-background transition-all duration-200 hover-lift"
            title="Share Trip"
          >
            <Icon name="Share" size={18} />
          </button>
          <button
            className="p-2 bg-background/90 backdrop-blur-sm rounded-lg text-text-primary hover:bg-background transition-all duration-200 hover-lift"
            title="More Options"
          >
            <Icon name="MoreHorizontal" size={18} />
          </button>
        </div>

        {/* Trip Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="font-heading font-bold text-2xl text-white mb-1">{trip.title}</h2>
          <p className="font-body text-white/90 flex items-center">
            <Icon name="MapPin" size={16} className="mr-1" />
            {trip.destination}
          </p>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
            <div className="font-heading font-semibold text-sm text-text-primary">
              {formatDate(trip.startDate)}
            </div>
            <div className="font-caption text-xs text-text-secondary">Start Date</div>
          </div>
          
          <div className="text-center p-4 bg-secondary-50 rounded-lg">
            <Icon name="Clock" size={24} className="text-secondary-700 mx-auto mb-2" />
            <div className="font-heading font-semibold text-sm text-text-primary">
              {getDuration()} Days
            </div>
            <div className="font-caption text-xs text-text-secondary">Duration</div>
          </div>
          
          <div className="text-center p-4 bg-accent-50 rounded-lg">
            <Icon name="Users" size={24} className="text-accent mx-auto mb-2" />
            <div className="font-heading font-semibold text-sm text-text-primary">
              {trip.travelers}
            </div>
            <div className="font-caption text-xs text-text-secondary">Travelers</div>
          </div>
          
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <Icon name="DollarSign" size={24} className="text-success-600 mx-auto mb-2" />
            <div className="font-heading font-semibold text-sm text-text-primary">
              ${trip.budget}
            </div>
            <div className="font-caption text-xs text-text-secondary">Budget</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-sm text-text-primary">Planning Progress</span>
            <span className="font-body text-sm text-text-secondary">
              {trip.itinerary.length > 0 ? Math.round((trip.itinerary.length / getDuration()) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${trip.itinerary.length > 0 ? Math.round((trip.itinerary.length / getDuration()) * 100) : 0}%` 
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-body text-sm transition-all duration-200 hover-lift">
            <Icon name="Plus" size={16} />
            <span>Add Activity</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift">
            <Icon name="UserPlus" size={16} />
            <span>Invite</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-soft-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-semibold text-lg text-text-primary">Share Trip</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface transition-colors duration-200"
                >
                  <Icon name={option.icon} size={20} className="text-text-secondary" />
                  <span className="font-body text-text-primary">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripHeader;