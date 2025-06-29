import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import PersonalizedGreeting from './components/PersonalizedGreeting';
import QuickStats from './components/QuickStats';
import UpcomingTrip from './components/UpcomingTrip';
import TrendingDestinations from './components/TrendingDestinations';
import RecentPhotos from './components/RecentPhotos';
import TravelMemories from './components/TravelMemories';
import SocialFeed from './components/SocialFeed';
import QuickAccessTiles from './components/QuickAccessTiles';
import TravelBuddyActivity from './components/TravelBuddyActivity';
import DestinationSuggestions from './components/DestinationSuggestions';

const TravelDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedData, setFeedData] = useState([]);

  const mockUser = {
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, CA",
    memberSince: "2022"
  };

  useEffect(() => {
    // Simulate initial data load
    loadFeedData();
  }, []);

  const loadFeedData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setFeedData(generateMockFeedData());
      setIsRefreshing(false);
    }, 1000);
  };

  const generateMockFeedData = () => {
    return [
      {
        id: 1,
        type: 'destination_recommendation',
        title: 'Trending Now: Kyoto, Japan',
        description: 'Perfect for cherry blossom season',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
        likes: 234,
        comments: 45,
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        type: 'buddy_activity',
        user: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        action: 'just checked in at',
        location: 'Santorini, Greece',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
        timestamp: '4 hours ago'
      },
      {
        id: 3,
        type: 'travel_tip',
        title: 'Pro Tip: Best Time to Visit Iceland',
        description: 'Northern Lights season is starting! Here are the best months and locations for aurora viewing.',
        author: 'Travel Expert Mike',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        likes: 156,
        saves: 89,
        timestamp: '6 hours ago'
      }
    ];
  };

  const handlePullToRefresh = () => {
    loadFeedData();
  };

  const handlePlanNewTrip = () => {
    navigate('/trip-planning');
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Mobile Pull-to-Refresh Indicator */}
      {isRefreshing && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-soft-md">
          <div className="flex items-center space-x-2">
            <div className="animate-spin">
              <Icon name="RefreshCw" size={16} />
            </div>
            <span className="font-caption text-sm">Refreshing...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Desktop Three-Column Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-36 space-y-6">
              <PersonalizedGreeting user={mockUser} />
              <QuickStats />
              <UpcomingTrip />
              <QuickAccessTiles />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            {/* Mobile Header Section */}
            <div className="lg:hidden space-y-6 mb-6">
              <PersonalizedGreeting user={mockUser} />
              <QuickStats />
              <UpcomingTrip />
            </div>

            {/* Horizontal Scrolling Sections */}
            <div className="space-y-8 mb-8">
              <TrendingDestinations />
              <RecentPhotos />
              <TravelMemories />
            </div>

            {/* Mobile Quick Access */}
            <div className="lg:hidden mb-8">
              <QuickAccessTiles />
            </div>

            {/* Social Feed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-xl text-text-primary">
                  Travel Feed
                </h2>
                <button
                  onClick={handlePullToRefresh}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
                >
                  <Icon name="RefreshCw" size={20} />
                </button>
              </div>
              <SocialFeed data={feedData} onRefresh={handlePullToRefresh} />
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-36 space-y-6">
              <TravelBuddyActivity />
              <DestinationSuggestions />
            </div>
          </div>
        </div>
      </div>

      {/* Plan New Trip FAB - Mobile */}
      <button
        onClick={handlePlanNewTrip}
        className="lg:hidden fixed bottom-24 right-4 w-14 h-14 bg-accent hover:bg-accent-700 text-white rounded-full shadow-soft-lg hover:shadow-soft-lg transition-all duration-200 hover-lift flex items-center justify-center z-40"
        title="Plan New Trip"
      >
        <Icon name="Plus" size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default TravelDashboard;