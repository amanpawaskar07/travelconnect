import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const MapView = ({ destinations }) => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 });
  const [zoomLevel, setZoomLevel] = useState(2);

  // Mock coordinates for destinations
  const destinationCoordinates = {
    1: { lat: 36.3932, lng: 25.4615 }, // Santorini
    2: { lat: 35.0116, lng: 135.7681 }, // Kyoto
    3: { lat: 51.4968, lng: -115.9281 }, // Banff
    4: { lat: 31.6295, lng: -7.9811 }, // Marrakech
    5: { lat: -8.3405, lng: 115.0920 }, // Bali
    6: { lat: -50.9423, lng: -73.4068 }, // Patagonia
    7: { lat: 64.1466, lng: -21.9426 }, // Reykjavik
    8: { lat: -33.9249, lng: 18.4241 }  // Cape Town
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    const coords = destinationCoordinates[destination.id];
    if (coords) {
      setMapCenter(coords);
      setZoomLevel(8);
    }
  };

  const handleMapReset = () => {
    setSelectedDestination(null);
    setMapCenter({ lat: 20, lng: 0 });
    setZoomLevel(2);
  };

  return (
    <div className="bg-background rounded-2xl shadow-soft overflow-hidden border border-subtle">
      {/* Map Header */}
      <div className="bg-surface border-b border-subtle p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="Map" size={20} className="text-primary" />
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Destination Map
            </h3>
            <p className="font-caption text-sm text-text-secondary">
              {destinations.length} destinations • Click pins to explore
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedDestination && (
            <button
              onClick={handleMapReset}
              className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-body text-sm hover:bg-primary/20 transition-colors duration-200"
            >
              Reset View
            </button>
          )}
          
          <div className="flex items-center bg-background rounded-lg border border-subtle">
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 10))}
              className="p-2 text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
            <div className="w-px h-6 bg-subtle" />
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
              className="p-2 text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
            >
              <Icon name="Minus" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 lg:h-[600px]">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Destinations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${zoomLevel}&output=embed`}
          className="w-full h-full"
        />

        {/* Map Overlay Controls */}
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-xl p-3 shadow-soft border border-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Layers" size={16} className="text-primary" />
            <span className="font-body text-sm font-semibold text-text-primary">
              Map Layers
            </span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-subtle" />
              <span className="font-caption text-xs text-text-secondary">Destinations</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-subtle" />
              <span className="font-caption text-xs text-text-secondary">Popular Routes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-subtle" />
              <span className="font-caption text-xs text-text-secondary">Weather</span>
            </label>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-xl p-3 shadow-soft border border-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="font-body text-sm font-semibold text-text-primary">
              Legend
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="font-caption text-xs text-text-secondary">Trending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="font-caption text-xs text-text-secondary">Popular</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary-600 rounded-full" />
              <span className="font-caption text-xs text-text-secondary">Hidden Gems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destination List */}
      <div className="border-t border-subtle">
        <div className="p-4">
          <h4 className="font-heading font-semibold text-text-primary mb-3">
            Destinations on Map
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {destinations.map((destination) => {
              const coords = destinationCoordinates[destination.id];
              const isSelected = selectedDestination?.id === destination.id;
              
              return (
                <button
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination)}
                  className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 text-left hover-lift ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-subtle hover:border-primary/30 hover:bg-surface/50'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    destination.trendingRank <= 5 ? 'bg-accent' :
                    destination.communityVisits > 2000 ? 'bg-primary': 'bg-secondary-600'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-body text-sm font-semibold text-text-primary truncate">
                        {destination.name}
                      </span>
                      {destination.trendingRank <= 5 && (
                        <Icon name="TrendingUp" size={12} className="text-accent flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="Star" size={12} className="text-warning-500" />
                      <span className="font-caption text-xs text-text-secondary">
                        {destination.rating} • {destination.communityVisits.toLocaleString()} visits
                      </span>
                    </div>
                  </div>
                  
                  <Icon 
                    name={isSelected ? "MapPin" : "ArrowRight"} 
                    size={16} 
                    className={isSelected ? "text-primary" : "text-text-secondary"} 
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;