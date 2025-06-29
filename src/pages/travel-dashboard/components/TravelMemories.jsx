import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TravelMemories = () => {
  const navigate = useNavigate();

  const travelMemories = [
    {
      id: 1,
      title: "European Adventure 2024",
      coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop",
      photoCount: 127,
      duration: "14 days",
      countries: ["France", "Italy", "Spain"],
      date: "March 2024",
      highlights: ["Eiffel Tower", "Colosseum", "Sagrada Familia"]
    },
    {
      id: 2,
      title: "Southeast Asia Journey",
      coverImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
      photoCount: 89,
      duration: "21 days",
      countries: ["Thailand", "Vietnam", "Indonesia"],
      date: "January 2024",
      highlights: ["Angkor Wat", "Ha Long Bay", "Bali Temples"]
    },
    {
      id: 3,
      title: "Japan Cherry Blossom",
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
      photoCount: 156,
      duration: "10 days",
      countries: ["Japan"],
      date: "April 2023",
      highlights: ["Kyoto Gardens", "Mount Fuji", "Tokyo Streets"]
    },
    {
      id: 4,
      title: "Morocco Desert Trek",
      coverImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop",
      photoCount: 73,
      duration: "8 days",
      countries: ["Morocco"],
      date: "November 2023",
      highlights: ["Sahara Desert", "Marrakech Souks", "Atlas Mountains"]
    }
  ];

  const handleMemoryClick = (memory) => {
    navigate('/travel-memory-albums', { state: { memory } });
  };

  const handleViewAll = () => {
    navigate('/travel-memory-albums');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-text-primary">
          Travel Memories
        </h2>
        <button
          onClick={handleViewAll}
          className="flex items-center space-x-1 text-primary hover:text-primary-700 font-body text-sm font-semibold transition-colors duration-200"
        >
          <span>View All</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {travelMemories.map((memory) => (
          <div
            key={memory.id}
            onClick={() => handleMemoryClick(memory)}
            className="flex-shrink-0 w-80 bg-surface rounded-2xl overflow-hidden shadow-soft border border-subtle cursor-pointer hover-lift transition-all duration-200"
          >
            <div className="relative h-44">
              <Image
                src={memory.coverImage}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute top-3 left-3">
                <div className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {memory.photoCount} photos
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-heading font-bold text-white text-lg mb-1">
                  {memory.title}
                </h3>
                <div className="flex items-center space-x-3 text-white/80 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span className="font-body">{memory.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span className="font-body">{memory.countries.length} countries</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-sm text-text-secondary">
                  {memory.date}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} className="text-text-secondary" />
                  <span className="font-caption text-xs text-text-secondary">
                    View Album
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {memory.countries.map((country) => (
                    <span
                      key={country}
                      className="px-2 py-1 bg-secondary/10 text-secondary-700 text-xs font-semibold rounded-full"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-body text-sm text-text-secondary">Top Highlights:</div>
                <div className="flex flex-wrap gap-1">
                  {memory.highlights.slice(0, 2).map((highlight) => (
                    <span
                      key={highlight}
                      className="font-caption text-xs text-text-primary bg-primary/5 px-2 py-1 rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                  {memory.highlights.length > 2 && (
                    <span className="font-caption text-xs text-text-secondary">
                      +{memory.highlights.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default TravelMemories;