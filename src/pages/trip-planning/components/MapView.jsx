import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MapView = ({ trip }) => {
  const [mapView, setMapView] = useState('satellite');
  const [showRouteOptimization, setShowRouteOptimization] = useState(false);

  // Mock coordinates for Tokyo activities
  const mapCenter = { lat: 35.6762, lng: 139.6503 }; // Tokyo center
  
  const activities = [
    { id: 1, name: "Narita Airport", lat: 35.7720, lng: 140.3929, type: "transport" },
    { id: 2, name: "Hotel Shibuya", lat: 35.6580, lng: 139.7016, type: "accommodation" },
    { id: 3, name: "Senso-ji Temple", lat: 35.7148, lng: 139.7967, type: "activity" },
    { id: 4, name: "Tsukiji Market", lat: 35.6654, lng: 139.7707, type: "restaurant" }
  ];

  const mapViewOptions = [
    { id: 'roadmap', label: 'Map', icon: 'Map' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  const handleOptimizeRoute = () => {
    console.log('Optimizing route for activities');
    setShowRouteOptimization(true);
    setTimeout(() => setShowRouteOptimization(false), 2000);
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-subtle">
      {/* Map Header */}
      <div className="p-4 border-b border-subtle">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-lg text-text-primary">Trip Map</h3>
          <div className="flex items-center space-x-2">
            {mapViewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setMapView(option.id)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  mapView === option.id
                    ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
                title={option.label}
              >
                <Icon name={option.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="MapPin" size={16} />
            <span>{activities.length} locations</span>
          </div>
          <button
            onClick={handleOptimizeRoute}
            disabled={showRouteOptimization}
            className="flex items-center space-x-2 px-3 py-1 bg-primary-50 text-primary rounded-lg font-body text-sm transition-all duration-200 hover-lift disabled:opacity-50"
          >
            <Icon name={showRouteOptimization ? "Loader" : "Route"} size={14} className={showRouteOptimization ? "animate-spin" : ""} />
            <span>{showRouteOptimization ? "Optimizing..." : "Optimize Route"}</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80 lg:h-96">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Trip Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=12&output=embed&maptype=${mapView}`}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-soft">
          <div className="flex flex-col space-y-2">
            <button
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
              title="Zoom In"
            >
              <Icon name="Plus" size={16} />
            </button>
            <button
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
              title="Zoom Out"
            >
              <Icon name="Minus" size={16} />
            </button>
            <button
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
              title="Center Map"
            >
              <Icon name="Crosshair" size={16} />
            </button>
          </div>
        </div>

        {/* Route Optimization Notification */}
        {showRouteOptimization && (
          <div className="absolute bottom-4 left-4 right-4 bg-success/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-soft">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} />
              <span className="font-body text-sm">Route optimized! Saved 45 minutes of travel time.</span>
            </div>
          </div>
        )}
      </div>

      {/* Activity Legend */}
      <div className="p-4 border-t border-subtle">
        <h4 className="font-body font-semibold text-text-primary mb-3">Locations</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {activities.map((activity, index) => {
            const typeColors = {
              transport: 'bg-blue-100 text-blue-700',
              accommodation: 'bg-purple-100 text-purple-700',
              activity: 'bg-green-100 text-green-700',
              restaurant: 'bg-orange-100 text-orange-700'
            };
            
            const typeIcons = {
              transport: 'Plane',
              accommodation: 'Building',
              activity: 'MapPin',
              restaurant: 'UtensilsCrossed'
            };

            return (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${typeColors[activity.type]}`}>
                  {index + 1}
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[activity.type]}`}>
                  <Icon name={typeIcons[activity.type]} size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-text-primary">{activity.name}</p>
                  <p className="font-caption text-xs text-text-secondary">
                    {activity.lat.toFixed(4)}, {activity.lng.toFixed(4)}
                  </p>
                </div>
                <button
                  className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                  title="Center on Map"
                >
                  <Icon name="Eye" size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Actions */}
      <div className="p-4 border-t border-subtle bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Route" size={16} />
            <span>Total distance: ~45 km</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift">
              <Icon name="Share" size={14} />
              <span className="hidden sm:inline">Share Map</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift">
              <Icon name="Download" size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;