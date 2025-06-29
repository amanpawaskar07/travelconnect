import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import TripHeader from './components/TripHeader';
import ItineraryBuilder from './components/ItineraryBuilder';
import BudgetTracker from './components/BudgetTracker';
import CollaboratorsList from './components/CollaboratorsList';
import MapView from './components/MapView';
import ActivitySuggestions from './components/ActivitySuggestions';

const TripPlanning = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showActivitySuggestions, setShowActivitySuggestions] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const tabsRef = useRef(null);

  const trips = [
    {
      id: 1,
      title: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      travelers: 2,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop",
      status: "planning",
      budget: 3500,
      spent: 1200,
      collaborators: [
        { id: 1, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/32.jpg", role: "co-planner" },
        { id: 2, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/45.jpg", role: "viewer" }
      ],
      itinerary: [
        {
          day: 1,
          date: "2024-03-15",
          activities: [
            {
              id: 1,
              type: "flight",
              title: "Flight to Tokyo",
              time: "08:00",
              duration: "14h",
              cost: 800,
              status: "booked",
              location: "Narita Airport"
            },
            {
              id: 2,
              type: "accommodation",
              title: "Check-in Hotel Shibuya",
              time: "15:00",
              duration: "30min",
              cost: 150,
              status: "booked",
              location: "Shibuya District"
            }
          ]
        },
        {
          day: 2,
          date: "2024-03-16",
          activities: [
            {
              id: 3,
              type: "activity",
              title: "Visit Senso-ji Temple",
              time: "09:00",
              duration: "2h",
              cost: 0,
              status: "planned",
              location: "Asakusa"
            },
            {
              id: 4,
              type: "restaurant",
              title: "Sushi Lunch at Tsukiji",
              time: "12:30",
              duration: "1.5h",
              cost: 80,
              status: "planned",
              location: "Tsukiji Market"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "European Explorer",
      destination: "Paris, France",
      startDate: "2024-05-10",
      endDate: "2024-05-20",
      travelers: 4,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=400&fit=crop",
      status: "draft",
      budget: 5000,
      spent: 0,
      collaborators: [],
      itinerary: []
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'collaborators', label: 'Team', icon: 'Users' }
  ];

  useEffect(() => {
    if (trips.length > 0) {
      setSelectedTrip(trips[0]);
    }
  }, []);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 120;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
    setActiveTab('overview');
  };

  const renderTabContent = () => {
    if (!selectedTrip) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <TripHeader trip={selectedTrip} />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-surface rounded-xl p-6 border border-subtle">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-heading font-bold text-primary">{selectedTrip.itinerary.length}</div>
                      <div className="text-sm font-body text-text-secondary">Days Planned</div>
                    </div>
                    <div className="text-center p-4 bg-secondary-50 rounded-lg">
                      <div className="text-2xl font-heading font-bold text-secondary-700">{selectedTrip.travelers}</div>
                      <div className="text-sm font-body text-text-secondary">Travelers</div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface rounded-xl p-6 border border-subtle">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={16} className="text-success-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm text-text-primary">Flight booked to Tokyo</p>
                        <p className="font-caption text-xs text-text-secondary">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Icon name="MapPin" size={16} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm text-text-primary">Added Senso-ji Temple</p>
                        <p className="font-caption text-xs text-text-secondary">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:block hidden">
                <MapView trip={selectedTrip} />
              </div>
            </div>
          </div>
        );
      case 'itinerary':
        return <ItineraryBuilder trip={selectedTrip} onUpdateTrip={setSelectedTrip} />;
      case 'budget':
        return <BudgetTracker trip={selectedTrip} onUpdateTrip={setSelectedTrip} />;
      case 'collaborators':
        return <CollaboratorsList trip={selectedTrip} onUpdateTrip={setSelectedTrip} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Trip Selection Header */}
      <div className="bg-surface border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading font-bold text-2xl text-text-primary">Trip Planning</h1>
            <button
              onClick={() => setShowActivitySuggestions(true)}
              className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 hover-lift flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>New Trip</span>
            </button>
          </div>
          
          {/* Trip Selector */}
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => handleTripSelect(trip)}
                className={`flex-shrink-0 p-4 rounded-xl border transition-all duration-200 hover-lift min-w-64
                  ${selectedTrip?.id === trip.id 
                    ? 'bg-primary-50 border-primary text-primary' :'bg-background border-subtle hover:border-primary/30 text-text-primary'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image 
                      src={trip.image} 
                      alt={trip.destination}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-heading font-semibold text-sm">{trip.title}</h3>
                    <p className="font-body text-xs opacity-70">{trip.destination}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-caption
                        ${trip.status === 'planning' ? 'bg-warning-100 text-warning-700' : 'bg-surface text-text-secondary'}
                      `}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-background border-b border-subtle sticky top-32 lg:top-28 z-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              onClick={() => scrollTabs('left')}
              className="lg:hidden flex-shrink-0 p-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <div 
              ref={tabsRef}
              className="flex space-x-1 overflow-x-auto scrollbar-hide py-4 flex-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0
                    ${activeTab === tab.id
                      ? 'bg-primary text-white shadow-soft'
                      : 'text-text-secondary hover:text-primary hover:bg-surface'
                    }`}
                >
                  <Icon name={tab.icon} size={16} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTabs('right')}
              className="lg:hidden flex-shrink-0 p-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedTrip ? renderTabContent() : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MapPin" size={32} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">No Trip Selected</h3>
            <p className="font-body text-text-secondary">Select a trip from above to start planning</p>
          </div>
        )}
      </div>

      {/* Activity Suggestions Modal */}
      {showActivitySuggestions && (
        <ActivitySuggestions 
          trip={selectedTrip}
          onClose={() => setShowActivitySuggestions(false)}
          onAddActivity={(activity) => {
            console.log('Adding activity:', activity);
            setShowActivitySuggestions(false);
          }}
        />
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TripPlanning;