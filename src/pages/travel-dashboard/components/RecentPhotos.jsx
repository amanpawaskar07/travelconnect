import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentPhotos = () => {
  const navigate = useNavigate();

  const recentPhotos = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      location: "Santorini, Greece",
      date: "2 days ago",
      likes: 45,
      comments: 12,
      user: "You"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop",
      location: "Paris, France",
      date: "1 week ago",
      likes: 78,
      comments: 23,
      user: "You"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=300&fit=crop",
      location: "Marrakech, Morocco",
      date: "2 weeks ago",
      likes: 92,
      comments: 18,
      user: "You"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=300&fit=crop",
      location: "Kyoto, Japan",
      date: "3 weeks ago",
      likes: 156,
      comments: 34,
      user: "You"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=300&fit=crop",
      location: "Bali, Indonesia",
      date: "1 month ago",
      likes: 203,
      comments: 45,
      user: "You"
    }
  ];

  const handlePhotoClick = (photo) => {
    navigate('/travel-memory-albums', { state: { photo } });
  };

  const handleViewAll = () => {
    navigate('/travel-memory-albums');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-text-primary">
          Recent Photos
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
        {recentPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
            className="flex-shrink-0 w-64 bg-surface rounded-2xl overflow-hidden shadow-soft border border-subtle cursor-pointer hover-lift transition-all duration-200"
          >
            <div className="relative">
              <Image
                src={photo.image}
                alt={photo.location}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <Icon name="MapPin" size={14} />
                  <span className="font-body text-sm font-semibold">
                    {photo.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-caption text-xs text-white/80">
                    {photo.date}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} className="text-white" />
                      <span className="font-caption text-xs text-white">
                        {photo.likes}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={14} className="text-white" />
                      <span className="font-caption text-xs text-white">
                        {photo.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
                  <Icon name="Share" size={14} />
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

export default RecentPhotos;