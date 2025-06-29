import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TrendingSidebar = () => {
  const [trendingDestinations] = useState([
    {
      id: 1,
      name: 'Tokyo, Japan',
      posts: 1247,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      trending: true,
      growth: '+23%'
    },
    {
      id: 2,
      name: 'Bali, Indonesia',
      posts: 892,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      trending: true,
      growth: '+18%'
    },
    {
      id: 3,
      name: 'Paris, France',
      posts: 756,
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
      trending: false,
      growth: '+12%'
    },
    {
      id: 4,
      name: 'Barcelona, Spain',
      posts: 634,
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
      trending: true,
      growth: '+15%'
    },
    {
      id: 5,
      name: 'Seoul, South Korea',
      posts: 523,
      image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=400&h=300&fit=crop',
      trending: false,
      growth: '+8%'
    }
  ]);

  const [travelChallenges] = useState([
    {
      id: 1,
      title: 'Cherry Blossom Challenge',
      description: 'Share your best cherry blossom photos',
      participants: 234,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      icon: 'Camera',
      color: 'bg-accent'
    },
    {
      id: 2,
      title: 'Local Food Discovery',
      description: 'Try and share authentic local dishes',
      participants: 156,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      icon: 'UtensilsCrossed',
      color: 'bg-secondary-600'
    },
    {
      id: 3,
      title: 'Hidden Gems Hunt',
      description: 'Find and share secret spots',
      participants: 89,
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      icon: 'MapPin',
      color: 'bg-primary'
    }
  ]);

  const formatDaysLeft = (endDate) => {
    const now = new Date();
    const diff = endDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  return (
    <div className="space-y-6">
      {/* Trending Destinations */}
      <div className="bg-background rounded-xl border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Trending Destinations
          </h3>
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>

        <div className="space-y-4">
          {trendingDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-surface/50 cursor-pointer transition-all duration-200 hover-lift"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {destination.trending && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={10} color="white" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-body font-medium text-text-primary truncate">
                    {destination.name}
                  </h4>
                  <span className="font-caption text-xs text-success font-medium">
                    {destination.growth}
                  </span>
                </div>
                <p className="font-caption text-sm text-text-secondary">
                  {destination.posts.toLocaleString()} posts
                </p>
              </div>

              <div className="text-text-secondary">
                <span className="font-heading font-bold text-lg text-primary">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center font-body text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200">
          View all destinations
        </button>
      </div>

      {/* Travel Challenges */}
      <div className="bg-background rounded-xl border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Travel Challenges
          </h3>
          <Icon name="Trophy" size={20} className="text-secondary-600" />
        </div>

        <div className="space-y-4">
          {travelChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="p-4 rounded-lg border border-subtle hover:border-primary/30 cursor-pointer transition-all duration-200 hover-lift"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${challenge.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={challenge.icon} size={20} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-medium text-text-primary mb-1">
                    {challenge.title}
                  </h4>
                  <p className="font-caption text-sm text-text-secondary mb-2">
                    {challenge.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={14} className="text-text-secondary" />
                      <span className="font-caption text-xs text-text-secondary">
                        {challenge.participants} joined
                      </span>
                    </div>
                    <span className="font-caption text-xs text-warning-600 font-medium">
                      {formatDaysLeft(challenge.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center font-body text-sm text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200">
          View all challenges
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-background rounded-xl border border-subtle p-6">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Quick Actions
        </h3>

        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface/50 transition-all duration-200 hover-lift text-left">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-primary" />
            </div>
            <span className="font-body text-sm text-text-primary">Find Travel Buddies</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface/50 transition-all duration-200 hover-lift text-left">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={16} className="text-secondary-600" />
            </div>
            <span className="font-body text-sm text-text-primary">Plan New Trip</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface/50 transition-all duration-200 hover-lift text-left">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Camera" size={16} className="text-accent" />
            </div>
            <span className="font-body text-sm text-text-primary">Share Memory</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;