import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UpcomingTrip = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});

  const upcomingTrip = {
    id: 1,
    destination: "Tokyo, Japan",
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    endDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000), // 22 days from now
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop",
    activities: 8,
    buddies: 3,
    status: "confirmed"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = upcomingTrip.startDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [upcomingTrip.startDate]);

  const handleViewTrip = () => {
    navigate('/trip-planning');
  };

  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-soft border border-subtle">
      <div className="relative h-32">
        <Image
          src={upcomingTrip.image}
          alt={upcomingTrip.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-heading font-bold text-white text-lg">
            {upcomingTrip.destination}
          </h3>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            <Icon name="Calendar" size={14} />
            <span className="font-body">
              {upcomingTrip.startDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })} - {upcomingTrip.endDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm text-text-secondary">Countdown</span>
            <span className="px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
              {upcomingTrip.status.toUpperCase()}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-primary/5 rounded-lg p-2">
              <div className="font-heading font-bold text-lg text-primary">
                {timeLeft.days || 0}
              </div>
              <div className="font-caption text-xs text-text-secondary">Days</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-2">
              <div className="font-heading font-bold text-lg text-primary">
                {timeLeft.hours || 0}
              </div>
              <div className="font-caption text-xs text-text-secondary">Hours</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-2">
              <div className="font-heading font-bold text-lg text-primary">
                {timeLeft.minutes || 0}
              </div>
              <div className="font-caption text-xs text-text-secondary">Min</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span className="font-body">{upcomingTrip.activities} activities</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span className="font-body">{upcomingTrip.buddies} buddies</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleViewTrip}
          className="w-full bg-primary hover:bg-primary-700 text-white font-body font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover-lift"
        >
          View Trip Details
        </button>
      </div>
    </div>
  );
};

export default UpcomingTrip;