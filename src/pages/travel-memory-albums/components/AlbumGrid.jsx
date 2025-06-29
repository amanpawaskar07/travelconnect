import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AlbumGrid = ({ albums, viewMode, onAlbumClick, onCreateAlbum }) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const AlbumCard = ({ album, isCreateCard = false }) => {
    if (isCreateCard) {
      return (
        <div
          onClick={onCreateAlbum}
          className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-200 hover-lift cursor-pointer overflow-hidden"
          style={{ aspectRatio: '4/3' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
              <Icon name="Plus" size={32} className="text-primary" strokeWidth={2} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-primary mb-2">
              Create New Album
            </h3>
            <p className="font-body text-sm text-text-secondary">
              Start capturing your travel memories
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={() => onAlbumClick(album)}
        className="group relative bg-surface rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-200 hover-lift cursor-pointer border border-subtle"
      >
        {/* Cover Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <Image
            src={album.coverImage}
            alt={album.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Photo/Video Count */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <Icon name="Camera" size={12} color="white" />
              <span className="font-caption text-xs text-white">{album.photoCount}</span>
            </div>
            {album.videoCount > 0 && (
              <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                <Icon name="Video" size={12} color="white" />
                <span className="font-caption text-xs text-white">{album.videoCount}</span>
              </div>
            )}
          </div>

          {/* Privacy Indicator */}
          <div className="absolute top-3 left-3">
            <div className={`p-1.5 rounded-full backdrop-blur-sm ${
              album.isPublic ? 'bg-success/20' : 'bg-warning/20'
            }`}>
              <Icon 
                name={album.isPublic ? 'Globe' : 'Lock'} 
                size={12} 
                color={album.isPublic ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
            </div>
          </div>

          {/* Collaborators */}
          {album.collaborators.length > 0 && (
            <div className="absolute bottom-3 right-3 flex -space-x-2">
              {album.collaborators.slice(0, 3).map((collaborator, index) => (
                <div
                  key={collaborator.id}
                  className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                  style={{ zIndex: 10 - index }}
                >
                  <Image
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {album.collaborators.length > 3 && (
                <div className="w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full border-2 border-white flex items-center justify-center">
                  <span className="font-caption text-xs text-white">+{album.collaborators.length - 3}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Album Info */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 line-clamp-1">
              {album.title}
            </h3>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="MapPin" size={14} />
              <span className="font-body text-sm line-clamp-1">{album.destination}</span>
            </div>
            <div className="flex items-center space-x-2 text-text-secondary mt-1">
              <Icon name="Calendar" size={14} />
              <span className="font-caption text-sm">{album.date}</span>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span className="font-caption text-xs">{formatNumber(album.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span className="font-caption text-xs">{formatNumber(album.likes)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={14} />
                <span className="font-caption text-xs">{formatNumber(album.comments)}</span>
              </div>
            </div>
            
            <button className="p-1 hover:bg-surface rounded-full transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {/* Create Album Card - List View */}
        <div
          onClick={onCreateAlbum}
          className="group flex items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-200 hover-lift cursor-pointer"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-200">
            <Icon name="Plus" size={24} className="text-primary" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-primary mb-1">
              Create New Album
            </h3>
            <p className="font-body text-sm text-text-secondary">
              Start capturing your travel memories
            </p>
          </div>
        </div>

        {/* Albums List */}
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => onAlbumClick(album)}
            className="group flex items-center p-4 bg-surface rounded-xl border border-subtle hover:shadow-soft-md transition-all duration-200 hover-lift cursor-pointer"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 flex-shrink-0">
              <Image
                src={album.coverImage}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 line-clamp-1">
                    {album.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-text-secondary text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span className="font-body line-clamp-1">{album.destination}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span className="font-caption">{album.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <div className={`p-1 rounded-full ${
                    album.isPublic ? 'bg-success/10' : 'bg-warning/10'
                  }`}>
                    <Icon 
                      name={album.isPublic ? 'Globe' : 'Lock'} 
                      size={12} 
                      color={album.isPublic ? 'var(--color-success)' : 'var(--color-warning)'} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Camera" size={14} />
                    <span className="font-caption text-xs">{album.photoCount}</span>
                  </div>
                  {album.videoCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Video" size={14} />
                      <span className="font-caption text-xs">{album.videoCount}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span className="font-caption text-xs">{formatNumber(album.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span className="font-caption text-xs">{formatNumber(album.likes)}</span>
                  </div>
                </div>
                
                {album.collaborators.length > 0 && (
                  <div className="flex -space-x-1">
                    {album.collaborators.slice(0, 3).map((collaborator, index) => (
                      <div
                        key={collaborator.id}
                        className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                        style={{ zIndex: 10 - index }}
                      >
                        <Image
                          src={collaborator.avatar}
                          alt={collaborator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid View
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {/* Create Album Card */}
      <AlbumCard isCreateCard={true} />
      
      {/* Albums */}
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;