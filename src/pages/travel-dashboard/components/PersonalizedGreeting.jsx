import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PersonalizedGreeting = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready for your next adventure?",
      "Where will you explore today?",
      "Your next journey awaits!",
      "Time to discover something new!",
      "Adventure is calling your name!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white shadow-soft-md">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <Image
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-heading font-bold text-xl mb-1">
            {getGreeting()}, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-white/80 font-body text-sm">
            {getMotivationalMessage()}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-white/70">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span className="font-caption text-xs">{user.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span className="font-caption text-xs">Member since {user.memberSince}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-white/80">Travel Level</span>
          <span className="font-heading font-semibold text-secondary">Explorer</span>
        </div>
        <div className="mt-2 w-full bg-white/20 rounded-full h-2">
          <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedGreeting;