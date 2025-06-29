import React from 'react';
import Icon from 'components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      id: 'trips',
      label: 'Trips Planned',
      value: 12,
      icon: 'MapPin',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'places',
      label: 'Places Visited',
      value: 28,
      icon: 'Globe',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'buddies',
      label: 'Travel Buddies',
      value: 45,
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'memories',
      label: 'Memories Shared',
      value: 156,
      icon: 'Camera',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-soft border border-subtle">
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
        Your Travel Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon name={stat.icon} size={20} className={stat.color} strokeWidth={2.5} />
            </div>
            <div className="font-heading font-bold text-2xl text-text-primary mb-1">
              {stat.value}
            </div>
            <div className="font-caption text-xs text-text-secondary">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-subtle">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-text-secondary">This Month</span>
          <div className="flex items-center space-x-1 text-success">
            <Icon name="TrendingUp" size={14} />
            <span className="font-body text-sm font-semibold">+23%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;