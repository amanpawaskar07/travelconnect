import React from 'react';
import Icon from 'components/AppIcon';

const AlbumSidebar = ({ categories, selectedCategory, onCategoryChange, totalStats }) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-surface rounded-2xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Your Memory Stats
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FolderOpen" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-body text-sm text-text-secondary">Total Albums</p>
                <p className="font-heading font-bold text-xl text-text-primary">{totalStats.totalAlbums}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="Camera" size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="font-body text-sm text-text-secondary">Total Photos</p>
                <p className="font-heading font-bold text-xl text-text-primary">{formatNumber(totalStats.totalPhotos)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Video" size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-body text-sm text-text-secondary">Total Videos</p>
                <p className="font-heading font-bold text-xl text-text-primary">{totalStats.totalVideos}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={20} className="text-success" />
              </div>
              <div>
                <p className="font-body text-sm text-text-secondary">Total Views</p>
                <p className="font-heading font-bold text-xl text-text-primary">{formatNumber(totalStats.totalViews)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-surface rounded-2xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left ${
                selectedCategory === category.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-primary hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={category.icon} 
                  size={18} 
                  strokeWidth={selectedCategory === category.id ? 2.5 : 2}
                />
                <span className="font-body text-sm">{category.label}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id 
                  ? 'bg-primary/20 text-primary' :'bg-text-secondary/10 text-text-secondary'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-2xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/5 rounded-xl transition-colors duration-200">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Upload" size={16} className="text-primary" />
            </div>
            <span className="font-body text-sm text-text-primary">Import from Device</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/5 rounded-xl transition-colors duration-200">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={16} className="text-secondary-600" />
            </div>
            <span className="font-body text-sm text-text-primary">Invite Collaborators</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/5 rounded-xl transition-colors duration-200">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={16} className="text-accent" />
            </div>
            <span className="font-body text-sm text-text-primary">Export Albums</span>
          </button>

          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/5 rounded-xl transition-colors duration-200">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Share" size={16} className="text-success" />
            </div>
            <span className="font-body text-sm text-text-primary">Share Collection</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface rounded-2xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Heart" size={14} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-text-primary">Sarah liked your Tokyo album</p>
              <p className="font-caption text-xs text-text-secondary">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={14} className="text-secondary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-text-primary">New comment on Bali Sunset</p>
              <p className="font-caption text-xs text-text-secondary">5 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="UserPlus" size={14} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-text-primary">Mike joined as collaborator</p>
              <p className="font-caption text-xs text-text-secondary">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumSidebar;