import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const DestinationSuggestions = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      id: 1,
      name: "Reykjavik, Iceland",
      country: "Iceland",
      image: "https://images.unsplash.com/photo-1539066834-3fa5463eeadb?w=200&h=150&fit=crop",
      reason: "Based on your love for nature",
      matchScore: 95,
      highlights: ["Northern Lights", "Hot Springs", "Glaciers"],
      bestTime: "Sep - Mar",
      avgTemp: "2°C",
      flightTime: "5h 30m"
    },
    {
      id: 2,
      name: "Marrakech, Morocco",
      country: "Morocco",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=200&h=150&fit=crop",
      reason: "Perfect for cultural exploration",
      matchScore: 88,
      highlights: ["Souks", "Architecture", "Desert"],
      bestTime: "Oct - Apr",
      avgTemp: "22°C",
      flightTime: "3h 45m"
    },
    {
      id: 3,
      name: "Queenstown, New Zealand",
      country: "New Zealand",
      image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=200&h=150&fit=crop",
      reason: "Adventure activities await",
      matchScore: 92,
      highlights: ["Bungee Jumping", "Skiing", "Fjords"],
      bestTime: "Dec - Feb",
      avgTemp: "18°C",
      flightTime: "24h"
    }
  ];

  const handleDestinationClick = (destination) => {
    navigate('/destination-discovery', { state: { destination } });
  };

  const handleViewAll = () => {
    navigate('/destination-discovery');
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-warning bg-warning/10';
    return 'text-accent bg-accent/10';
  };

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-soft border border-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Suggested for You
        </h3>
        <button
          onClick={handleViewAll}
          className="text-primary hover:text-primary-700 font-body text-sm font-semibold transition-colors duration-200"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.map((destination) => (
          <div
            key={destination.id}
            onClick={() => handleDestinationClick(destination)}
            className="bg-background rounded-xl p-4 border border-subtle cursor-pointer hover-lift transition-all duration-200 hover:shadow-soft"
          >
            <div className="flex items-start space-x-3">
              <div className="relative flex-shrink-0">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className={`absolute -top-1 -right-1 px-1 py-0.5 ${getMatchColor(destination.matchScore)} rounded-full text-xs font-semibold`}>
                  {destination.matchScore}%
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-heading font-semibold text-text-primary">
                      {destination.name}
                    </h4>
                    <p className="font-body text-sm text-text-secondary">
                      {destination.country}
                    </p>
                  </div>
                </div>

                <p className="font-caption text-xs text-primary mb-2">
                  {destination.reason}
                </p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {destination.highlights.slice(0, 2).map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-1 bg-secondary/10 text-secondary-700 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="px-2 py-1 bg-text-secondary/10 text-text-secondary text-xs rounded-full">
                      +{destination.highlights.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{destination.bestTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Thermometer" size={12} />
                      <span>{destination.avgTemp}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Plane" size={12} />
                    <span>{destination.flightTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-subtle">
        <div className="flex items-center space-x-2 text-text-secondary mb-3">
          <Icon name="Lightbulb" size={16} />
          <span className="font-body text-sm">Personalized recommendations</span>
        </div>
        <p className="font-caption text-xs text-text-secondary">
          Based on your travel history, preferences, and saved destinations
        </p>
      </div>
    </div>
  );
};

export default DestinationSuggestions;