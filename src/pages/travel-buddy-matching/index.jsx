import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

import BuddyCard from './components/BuddyCard';
import FilterSidebar from './components/FilterSidebar';
import ConnectionsTab from './components/ConnectionsTab';
import ChatPanel from './components/ChatPanel';

const TravelBuddyMatching = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [currentBuddyIndex, setCurrentBuddyIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [filters, setFilters] = useState({
    ageRange: [25, 45],
    gender: 'any',
    travelStyle: [],
    destinations: [],
    languages: []
  });

  const travelBuddies = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      verified: true,
      rating: 4.9,
      reviewCount: 23,
      travelStyle: ["Adventure", "Cultural"],
      languages: ["English", "Mandarin", "Spanish"],
      upcomingTrips: ["Tokyo, Japan", "Bali, Indonesia"],
      bio: `Adventure seeker and culture enthusiast! I love exploring hidden gems, trying local cuisines, and connecting with locals. Looking for travel companions who share my passion for authentic experiences and aren't afraid to step off the beaten path.Currently planning trips to Asia and always open to spontaneous weekend getaways. I'm a photographer, so expect lots of photo stops!`,
      interests: ["Photography", "Hiking", "Street Food", "Museums", "Local Markets"],
      travelHistory: ["Thailand", "Peru", "Morocco", "Iceland", "Vietnam"],
      mutualConnections: 3,
      compatibilityScore: 95,
      lastActive: "2 hours ago",
      badges: ["Verified Traveler", "Photography Expert", "Local Guide"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 32,
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      rating: 4.7,
      reviewCount: 18,
      travelStyle: ["Luxury", "Cultural"],
      languages: ["English", "French", "German"],
      upcomingTrips: ["Paris, France", "Rome, Italy"],
      bio: `Luxury traveler with a passion for history and fine dining. I believe in experiencing destinations through their culture, cuisine, and heritage. Looking for sophisticated travel companions who appreciate the finer things in life.

I'm a wine enthusiast and history buff, so expect visits to vineyards and historical sites. Always up for a good conversation over dinner!`,
      interests: ["Wine Tasting", "History", "Fine Dining", "Architecture", "Art Galleries"],
      travelHistory: ["Italy", "France", "Spain", "Greece", "Portugal"],
      mutualConnections: 5,
      compatibilityScore: 87,
      lastActive: "1 hour ago",
      badges: ["Verified Traveler", "Wine Expert", "History Buff"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 26,
      location: "Barcelona, Spain",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: false,
      rating: 4.8,
      reviewCount: 12,
      travelStyle: ["Budget", "Adventure"],
      languages: ["Spanish", "English", "Catalan"],
      upcomingTrips: ["Morocco", "Portugal"],
      bio: `Budget backpacker with an adventurous spirit! I love finding affordable ways to explore the world and meeting fellow travelers along the way. Always up for hostels, street food, and spontaneous adventures.

Currently saving up for a South America trip and looking for travel buddies who share my love for authentic, budget-friendly experiences.`,
      interests: ["Backpacking", "Hostels", "Street Art", "Local Music", "Volunteering"],
      travelHistory: ["Morocco", "Portugal", "France", "Netherlands", "Germany"],
      mutualConnections: 2,
      compatibilityScore: 92,
      lastActive: "30 minutes ago",
      badges: ["Budget Expert", "Backpacker"]
    },
    {
      id: 4,
      name: "David Kim",
      age: 35,
      location: "Seoul, South Korea",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      verified: true,
      rating: 4.6,
      reviewCount: 31,
      travelStyle: ["Cultural", "Food"],
      languages: ["Korean", "English", "Japanese"],
      upcomingTrips: ["Osaka, Japan", "Bangkok, Thailand"],
      bio: `Food enthusiast and cultural explorer from Seoul! I'm passionate about discovering authentic local cuisines and understanding different cultures through their food traditions. Looking for fellow foodies to share culinary adventures.

I run a food blog and love sharing hidden restaurant gems. Always ready to try the most authentic local dishes, no matter how adventurous!`,
      interests: ["Food Blogging", "Cooking Classes", "Night Markets", "Traditional Festivals", "Local Breweries"],
      travelHistory: ["Japan", "Thailand", "Vietnam", "Taiwan", "Hong Kong"],
      mutualConnections: 4,
      compatibilityScore: 89,
      lastActive: "5 minutes ago",
      badges: ["Verified Traveler", "Food Expert", "Cultural Ambassador"]
    }
  ];

  const connections = [
    {
      id: 1,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      status: "connected",
      lastMessage: "Can\'t wait for our Tokyo trip!",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      sharedTrips: ["Tokyo, Japan"]
    },
    {
      id: 2,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      status: "pending",
      lastMessage: "Sent you a travel buddy request",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      sharedTrips: ["Paris, France"]
    },
    {
      id: 3,
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      status: "connected",
      lastMessage: "The Barcelona photos are amazing!",
      lastMessageTime: "3 days ago",
      unreadCount: 0,
      sharedTrips: ["Barcelona, Spain", "Madrid, Spain"]
    }
  ];

  const handleSwipe = (direction, buddyId) => {
    if (direction === 'right') {
      console.log('Liked buddy:', buddyId);
      // Handle like logic
    } else {
      console.log('Passed buddy:', buddyId);
      // Handle pass logic
    }
    
    if (currentBuddyIndex < travelBuddies.length - 1) {
      setCurrentBuddyIndex(currentBuddyIndex + 1);
    } else {
      setCurrentBuddyIndex(0);
    }
  };

  const handleChatOpen = (buddy) => {
    setSelectedBuddy(buddy);
    setShowChat(true);
  };

  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'Users' },
    { id: 'connections', label: 'My Connections', icon: 'UserCheck' },
    { id: 'requests', label: 'Requests', icon: 'UserPlus' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-3xl lg:text-4xl mb-2">
              Find Your Travel Buddy
            </h1>
            <p className="font-body text-lg opacity-90 max-w-2xl mx-auto">
              Connect with like-minded travelers and create unforgettable adventures together
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-32 lg:top-28 z-60 bg-background/95 backdrop-blur-soft border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover-lift
                  ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-text-secondary hover:text-primary hover:bg-surface/50'
                  }`}
              >
                <Icon name={tab.icon} size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                <span className="font-body text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'discover' && (
              <div className="space-y-6">
                {/* Mobile Filter Button */}
                <div className="lg:hidden flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-xl text-text-primary">
                    Discover Travel Buddies
                  </h2>
                  <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-primary-50 rounded-xl border border-subtle transition-colors duration-200"
                  >
                    <Icon name="Filter" size={18} />
                    <span className="font-body text-sm">Filters</span>
                  </button>
                </div>

                {/* Buddy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {travelBuddies.map((buddy, index) => (
                    <BuddyCard
                      key={buddy.id}
                      buddy={buddy}
                      onSwipe={handleSwipe}
                      onChatOpen={handleChatOpen}
                      isActive={index === currentBuddyIndex}
                    />
                  ))}
                </div>

                {/* No More Buddies Message */}
                {travelBuddies.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Users" size={48} className="text-text-secondary" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
                      No More Travel Buddies
                    </h3>
                    <p className="font-body text-text-secondary mb-6">
                      You've seen all available travel buddies. Try adjusting your filters or check back later.
                    </p>
                    <button
                      onClick={() => setCurrentBuddyIndex(0)}
                      className="bg-primary hover:bg-primary-700 text-white font-body font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover-lift"
                    >
                      Start Over
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'connections' && (
              <ConnectionsTab 
                connections={connections.filter(c => c.status === 'connected')}
                onChatOpen={handleChatOpen}
              />
            )}

            {activeTab === 'requests' && (
              <ConnectionsTab 
                connections={connections.filter(c => c.status === 'pending')}
                onChatOpen={handleChatOpen}
                showRequests={true}
              />
            )}
          </div>

          {/* Desktop Chat Panel */}
          {showChat && selectedBuddy && (
            <div className="hidden lg:block w-80 flex-shrink-0">
              <ChatPanel
                buddy={selectedBuddy}
                onClose={() => setShowChat(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-100 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-x-0 bottom-0 bg-background rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-xl text-text-primary">
                  Filter Travel Buddies
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Chat Modal */}
      {showChat && selectedBuddy && (
        <div className="lg:hidden fixed inset-0 z-100 bg-background">
          <ChatPanel
            buddy={selectedBuddy}
            onClose={() => setShowChat(false)}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
};

export default TravelBuddyMatching;