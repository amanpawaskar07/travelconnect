import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TrendingDestinations = () => {
  const navigate = useNavigate();

  const trendingDestinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop",
      trending: "+45%",
      price: "From $89/night",
      rating: 4.8,
      reviews: 2341,
      tags: ["Romantic", "Sunset Views"]
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
      trending: "+38%",
      price: "From $65/night",
      rating: 4.9,
      reviews: 1876,
      tags: ["Culture", "Cherry Blossoms"]
    },
    {
      id: 3,
      name: "Bali, Indonesia",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
      trending: "+52%",
      price: "From $35/night",
      rating: 4.7,
      reviews: 3245,
      tags: ["Beach", "Adventure"]
    },
    {
      id: 4,
      name: "Reykjavik, Iceland",
      country: "Iceland",
      image: "https://images.unsplash.com/photo-1539066834-3fa5463eeadb?w=300&h=200&fit=crop",
      trending: "+29%",
      price: "From $120/night",
      rating: 4.6,
      reviews: 987,
      tags: ["Northern Lights", "Nature"]
    },
    {
      id: 5,
      name: "Marrakech, Morocco",
      country: "Morocco",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop",
      trending: "+33%",
      price: "From $45/night",
      rating: 4.5,
      reviews: 1654,
      tags: ["Culture", "Markets"]
    }
  ];

  const handleDestinationClick = (destination) => {
    navigate('/destination-discovery', { state: { destination } });
  };

  const handleViewAll = () => {
    navigate('/destination-discovery');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-text-primary">
          Trending Destinations
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
        {trendingDestinations.map((destination) => (
          <div
            key={destination.id}
            onClick={() => handleDestinationClick(destination)}
            className="flex-shrink-0 w-72 bg-surface rounded-2xl overflow-hidden shadow-soft border border-subtle cursor-pointer hover-lift transition-all duration-200"
          >
            <div className="relative h-40">
              <Image
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <div className="bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {destination.trending}
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
                  <Icon name="Heart" size={16} />
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <h3 className="font-heading font-semibold text-lg text-text-primary">
                  {destination.name}
                </h3>
                <p className="font-body text-sm text-text-secondary">
                  {destination.country}
                </p>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="font-body text-sm font-semibold text-text-primary">
                    {destination.rating}
                  </span>
                </div>
                <span className="font-body text-sm text-text-secondary">
                  ({destination.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {destination.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-body text-sm font-semibold text-text-primary">
                  {destination.price}
                </span>
                <button className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                  Explore
                </button>
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

export default TrendingDestinations;