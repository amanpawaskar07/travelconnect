import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StoryHighlights = () => {
  const [stories] = useState([
    {
      id: 1,
      user: {
        name: 'Your Story',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        isOwn: true
      },
      hasNew: false,
      lastUpdated: null
    },
    {
      id: 2,
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      hasNew: true,
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
      location: 'Tokyo, Japan'
    },
    {
      id: 3,
      user: {
        name: 'Marco Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      hasNew: true,
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: 'Barcelona, Spain'
    },
    {
      id: 4,
      user: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      hasNew: false,
      lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
      location: 'Bali, Indonesia'
    },
    {
      id: 5,
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      hasNew: true,
      lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
      location: 'Seoul, South Korea'
    },
    {
      id: 6,
      user: {
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
      },
      hasNew: false,
      lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000),
      location: 'Paris, France'
    }
  ]);

  const handleStoryClick = (story) => {
    console.log('Story clicked:', story);
  };

  const handleAddStory = () => {
    console.log('Add story clicked');
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => story.user.isOwn ? handleAddStory() : handleStoryClick(story)}
            className="flex-shrink-0 cursor-pointer group"
          >
            <div className="relative">
              {/* Story Ring */}
              <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-200 group-hover:scale-105 ${
                story.hasNew 
                  ? 'bg-gradient-to-tr from-accent via-secondary to-primary' :'bg-gradient-to-tr from-text-secondary/30 to-text-secondary/30'
              }`}>
                <div className="w-full h-full bg-background rounded-full p-0.5">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={story.user.avatar}
                      alt={story.user.name}
                      className="w-full h-full object-cover"
                    />
                    {story.user.isOwn && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Plus" size={14} color="white" strokeWidth={2.5} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* New Indicator */}
              {story.hasNew && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Story Info */}
            <div className="mt-2 text-center max-w-16">
              <p className="font-caption text-xs text-text-primary truncate">
                {story.user.isOwn ? 'Your Story' : story.user.name.split(' ')[0]}
              </p>
              {story.location && (
                <p className="font-caption text-xs text-text-secondary truncate mt-0.5">
                  {story.location.split(',')[0]}
                </p>
              )}
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

export default StoryHighlights;