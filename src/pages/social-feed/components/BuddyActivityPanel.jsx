import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BuddyActivityPanel = () => {
  const [onlineBuddies] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'Tokyo, Japan',
      status: 'online',
      lastActivity: 'Posted a photo',
      activityTime: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      name: 'Marco Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Barcelona, Spain',
      status: 'online',
      lastActivity: 'Shared a travel tip',
      activityTime: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 3,
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Bali, Indonesia',
      status: 'away',
      lastActivity: 'Liked your post',
      activityTime: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      location: 'Seoul, South Korea',
      status: 'online',
      lastActivity: 'Added to wishlist',
      activityTime: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      location: 'Paris, France',
      status: 'offline',
      lastActivity: 'Commented on a post',
      activityTime: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      action: 'liked your photo from Tokyo',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      icon: 'Heart',
      color: 'text-accent'
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
      },
      action: 'commented on your Barcelona post',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      icon: 'MessageCircle',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
      },
      action: 'started following you',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 4,
      type: 'share',
      user: {
        name: 'Sophie Martin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      },
      action: 'shared your travel tip',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      icon: 'Share',
      color: 'text-secondary-600'
    }
  ]);

  const [upcomingMeetups] = useState([
    {
      id: 1,
      title: 'Tokyo Food Tour',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: 'Shibuya, Tokyo',
      attendees: 8,
      maxAttendees: 12,
      organizer: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 2,
      title: 'Barcelona Walking Tour',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Gothic Quarter, Barcelona',
      attendees: 5,
      maxAttendees: 10,
      organizer: {
        name: 'Marco Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    }
  ]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const formatMeetupDate = (date) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning-500';
      case 'offline': return 'bg-text-secondary';
      default: return 'bg-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Online Travel Buddies */}
      <div className="bg-background rounded-xl border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Travel Buddies
          </h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="font-caption text-xs text-success">
              {onlineBuddies.filter(buddy => buddy.status === 'online').length} online
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {onlineBuddies.map((buddy) => (
            <div
              key={buddy.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface/50 cursor-pointer transition-all duration-200"
            >
              <div className="relative">
                <Image
                  src={buddy.avatar}
                  alt={buddy.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(buddy.status)} rounded-full border-2 border-background`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-text-primary truncate">
                  {buddy.name}
                </h4>
                <p className="font-caption text-xs text-text-secondary truncate">
                  {buddy.lastActivity}
                </p>
              </div>
              <span className="font-caption text-xs text-text-secondary">
                {formatTimeAgo(buddy.activityTime)}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center font-body text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200">
          View all buddies
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-background rounded-xl border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Recent Activity
          </h3>
          <Icon name="Activity" size={20} className="text-primary" />
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-surface/50 cursor-pointer transition-all duration-200"
            >
              <div className="relative">
                <Image
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-background rounded-full flex items-center justify-center`}>
                  <Icon name={activity.icon} size={10} className={activity.color} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-text-primary">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  <span className="text-text-secondary">{activity.action}</span>
                </p>
                <span className="font-caption text-xs text-text-secondary">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center font-body text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200">
          View all activity
        </button>
      </div>

      {/* Upcoming Meetups */}
      <div className="bg-background rounded-xl border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Upcoming Meetups
          </h3>
          <Icon name="Calendar" size={20} className="text-secondary-600" />
        </div>

        <div className="space-y-4">
          {upcomingMeetups.map((meetup) => (
            <div
              key={meetup.id}
              className="p-4 rounded-lg border border-subtle hover:border-primary/30 cursor-pointer transition-all duration-200 hover-lift"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-body font-medium text-text-primary">
                  {meetup.title}
                </h4>
                <Image
                  src={meetup.organizer.avatar}
                  alt={meetup.organizer.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} className="text-text-secondary" />
                  <span className="font-caption text-sm text-text-secondary">
                    {formatMeetupDate(meetup.date)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="font-caption text-sm text-text-secondary">
                    {meetup.location}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={14} className="text-text-secondary" />
                    <span className="font-caption text-sm text-text-secondary">
                      {meetup.attendees}/{meetup.maxAttendees} joined
                    </span>
                  </div>
                  <div className="w-16 bg-surface rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(meetup.attendees / meetup.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center font-body text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200">
          View all meetups
        </button>
      </div>
    </div>
  );
};

export default BuddyActivityPanel;