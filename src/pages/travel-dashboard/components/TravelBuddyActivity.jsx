import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TravelBuddyActivity = () => {
  const navigate = useNavigate();

  const buddyActivities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
        status: "online"
      },
      activity: {
        type: "check_in",
        location: "Santorini, Greece",
        timestamp: "2 hours ago",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=100&h=100&fit=crop"
      }
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        status: "offline"
      },
      activity: {
        type: "trip_plan",
        location: "Tokyo, Japan",
        timestamp: "5 hours ago",
        details: "Planning 7-day itinerary"
      }
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        status: "online"
      },
      activity: {
        type: "photo_share",
        location: "Bali, Indonesia",
        timestamp: "1 day ago",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=100&h=100&fit=crop",
        likes: 23
      }
    },
    {
      id: 4,
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        status: "traveling"
      },
      activity: {
        type: "review",
        location: "Paris, France",
        timestamp: "2 days ago",
        rating: 5,
        details: "Amazing food tour experience!"
      }
    }
  ];

  const handleUserClick = (user) => {
    navigate('/social-feed', { state: { user } });
  };

  const handleViewAll = () => {
    navigate('/travel-buddy-matching');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'check_in': return 'MapPin';
      case 'trip_plan': return 'Calendar';
      case 'photo_share': return 'Camera';
      case 'review': return 'Star';
      default: return 'Activity';
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'check_in':
        return `checked in at ${activity.location}`;
      case 'trip_plan':
        return `is planning a trip to ${activity.location}`;
      case 'photo_share':
        return `shared photos from ${activity.location}`;
      case 'review':
        return `reviewed a place in ${activity.location}`;
      default:
        return 'had an activity';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'traveling': return 'bg-warning';
      case 'offline': return 'bg-text-secondary';
      default: return 'bg-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-soft border border-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Buddy Activity
        </h3>
        <button
          onClick={handleViewAll}
          className="text-primary hover:text-primary-700 font-body text-sm font-semibold transition-colors duration-200"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {buddyActivities.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <button onClick={() => handleUserClick(item.user)}>
                <Image
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(item.user.status)} rounded-full border-2 border-background`}></div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-body text-sm text-text-primary">
                    <button
                      onClick={() => handleUserClick(item.user)}
                      className="font-semibold hover:text-primary transition-colors duration-200"
                    >
                      {item.user.name}
                    </button>
                    <span className="text-text-secondary"> {getActivityText(item.activity)}</span>
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon 
                      name={getActivityIcon(item.activity.type)} 
                      size={12} 
                      className="text-text-secondary" 
                    />
                    <span className="font-caption text-xs text-text-secondary">
                      {item.activity.timestamp}
                    </span>
                  </div>
                </div>

                {item.activity.image && (
                  <Image
                    src={item.activity.image}
                    alt={item.activity.location}
                    className="w-12 h-12 rounded-lg object-cover ml-3"
                  />
                )}
              </div>

              {item.activity.details && (
                <p className="font-body text-xs text-text-secondary mt-1 bg-primary/5 px-2 py-1 rounded">
                  {item.activity.details}
                </p>
              )}

              {item.activity.rating && (
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(item.activity.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                  ))}
                </div>
              )}

              {item.activity.likes && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Heart" size={12} className="text-accent" />
                  <span className="font-caption text-xs text-text-secondary">
                    {item.activity.likes} likes
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-subtle">
        <button
          onClick={() => navigate('/travel-buddy-matching')}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-body font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover-lift"
        >
          Find More Travel Buddies
        </button>
      </div>
    </div>
  );
};

export default TravelBuddyActivity;