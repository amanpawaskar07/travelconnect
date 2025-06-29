import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

import StoryHighlights from './components/StoryHighlights';
import PostCard from './components/PostCard';
import TrendingSidebar from './components/TrendingSidebar';
import BuddyActivityPanel from './components/BuddyActivityPanel';
import ComposeModal from './components/ComposeModal';

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const observerRef = useRef();

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      user: {
        id: 'user1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        verified: true,
        location: 'Tokyo, Japan'
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'photo',
      content: {
        text: `Just discovered this hidden gem in Shibuya! The cherry blossoms here are absolutely breathtaking. Sometimes the best adventures happen when you take the path less traveled. 🌸✨

Who else loves finding those secret spots that aren't in the guidebooks?`,
        images: [
          'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'
        ],
        location: 'Hidden Garden, Shibuya'
      },
      engagement: {
        likes: 127,
        comments: 23,
        shares: 8,
        liked: false,
        bookmarked: true
      },
      tags: ['#Tokyo', '#CherryBlossoms', '#HiddenGems', '#Japan']
    },
    {
      id: 2,
      user: {
        id: 'user2',name: 'Marco Rodriguez',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: false,
        location: 'Barcelona, Spain'
      },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'tip',
      content: {
        text: `Pro tip for Barcelona travelers: Skip the touristy restaurants near La Rambla and head to Gràcia neighborhood instead. The local tapas bars here serve authentic Catalan cuisine at half the price!

My favorites:
• Bar Canigó - Best patatas bravas in the city
• La Pepita - Amazing jamón ibérico
• Café Salambó - Perfect for morning coffee

Trust me, your wallet and taste buds will thank you! 🥘`,
        location: 'Gràcia, Barcelona'
      },
      engagement: {
        likes: 89,
        comments: 15,
        shares: 12,
        liked: true,
        bookmarked: false
      },
      tags: ['#Barcelona', '#TravelTips', '#LocalFood', '#Spain']
    },
    {
      id: 3,
      user: {
        id: 'user3',name: 'Emma Thompson',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        verified: true,
        location: 'Bali, Indonesia'
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'video',
      content: {
        text: `Sunrise at Mount Batur was absolutely magical! 4:30 AM wake-up call was so worth it. The trek was challenging but the view from the top... no words can describe it.

Swipe to see the time-lapse of the sunrise! 🌅`,
        video: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',location: 'Mount Batur, Bali'
      },
      engagement: {
        likes: 203,
        comments: 31,
        shares: 18,
        liked: true,
        bookmarked: true
      },
      tags: ['#Bali', '#Sunrise', '#MountBatur', '#Adventure']
    },
    {
      id: 4,
      user: {
        id: 'user4',name: 'David Kim',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false,
        location: 'Seoul, South Korea'
      },
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      type: 'review',
      content: {
        text: `Just finished an incredible 3-day food tour in Seoul! Korean street food is on another level. From hotteok to tteokbokki, every bite was an adventure.

Rating: ⭐⭐⭐⭐⭐

Must-try spots:
1. Gwangjang Market - Best bindaetteok
2. Myeongdong Street Food - Amazing hotteok
3. Hongdae Night Market - Perfect for late-night snacks

Already planning my next food adventure. Where should I go next? 🍜`,
        images: [
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
        ],
        location: 'Seoul Food Markets'
      },
      engagement: {
        likes: 156,
        comments: 28,
        shares: 14,
        liked: false,
        bookmarked: false
      },
      tags: ['#Seoul', '#StreetFood', '#FoodTour', '#Korea']
    },
    {
      id: 5,
      user: {
        id: 'user5',name: 'Lisa Anderson',avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        verified: true,
        location: 'Paris, France'
      },
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      type: 'photo',
      content: {
        text: `Golden hour in Paris never gets old! Spent the evening wandering along the Seine, watching the city come alive with lights. There's something magical about this city that captures your heart every single time.

Fun fact: This photo was taken from Pont Alexandre III - one of the most beautiful bridges in Paris! 🗼✨`,
        images: [
          'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop'
        ],
        location: 'Pont Alexandre III, Paris'
      },
      engagement: {
        likes: 234,
        comments: 19,
        shares: 22,
        liked: true,
        bookmarked: true
      },
      tags: ['#Paris', '#GoldenHour', '#Seine', '#France']
    }
  ];

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = () => {
    setLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  };

  const loadMorePosts = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const newPosts = mockPosts.map(post => ({
        ...post,
        id: post.id + posts.length,
        timestamp: new Date(post.timestamp.getTime() - posts.length * 60 * 60 * 1000)
      }));
      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);
      if (posts.length > 20) setHasMore(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setRefreshing(false);
      setHasMore(true);
    }, 1000);
  };

  const handlePostInteraction = (postId, action, value) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const updatedPost = { ...post };
        switch (action) {
          case 'like':
            updatedPost.engagement.liked = !updatedPost.engagement.liked;
            updatedPost.engagement.likes += updatedPost.engagement.liked ? 1 : -1;
            break;
          case 'bookmark':
            updatedPost.engagement.bookmarked = !updatedPost.engagement.bookmarked;
            break;
          case 'comment':
            updatedPost.engagement.comments += 1;
            break;
          case 'share':
            updatedPost.engagement.shares += 1;
            break;
        }
        return updatedPost;
      }
      return post;
    }));
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const filteredPosts = posts.filter(post => {
    if (selectedFilter === 'all') return true;
    return post.type === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Pull to Refresh */}
        <div className="relative">
          {refreshing && (
            <div className="absolute top-0 left-0 right-0 z-50 bg-primary/10 p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin">
                  <Icon name="RefreshCw" size={16} className="text-primary" />
                </div>
                <span className="font-body text-sm text-primary">Refreshing...</span>
              </div>
            </div>
          )}

          {/* Story Highlights */}
          <div className="bg-background border-b border-subtle">
            <StoryHighlights />
          </div>

          {/* Feed Content */}
          <div className="pb-24">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                onInteraction={handlePostInteraction}
                className={index === 0 ? 'border-t-0' : ''}
              />
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="p-8 text-center">
                <div className="animate-spin mx-auto mb-4">
                  <Icon name="Loader2" size={24} className="text-primary" />
                </div>
                <p className="font-body text-text-secondary">Loading more posts...</p>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={observerRef} className="h-4" />

            {/* End of Feed */}
            {!hasMore && posts.length > 0 && (
              <div className="p-8 text-center border-t border-subtle">
                <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
                <p className="font-body text-text-secondary">You're all caught up!</p>
                <p className="font-caption text-sm text-text-secondary mt-1">
                  Check back later for new posts
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Trending */}
            <div className="col-span-3">
              <div className="sticky top-32">
                <TrendingSidebar />
              </div>
            </div>

            {/* Main Feed */}
            <div className="col-span-6">
              {/* Story Highlights */}
              <div className="bg-background rounded-xl border border-subtle mb-6">
                <StoryHighlights />
              </div>

              {/* Feed Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onInteraction={handlePostInteraction}
                    className="rounded-xl border border-subtle"
                  />
                ))}

                {/* Loading Indicator */}
                {loading && (
                  <div className="p-8 text-center bg-background rounded-xl border border-subtle">
                    <div className="animate-spin mx-auto mb-4">
                      <Icon name="Loader2" size={24} className="text-primary" />
                    </div>
                    <p className="font-body text-text-secondary">Loading more posts...</p>
                  </div>
                )}

                {/* Infinite Scroll Trigger */}
                <div ref={observerRef} className="h-4" />

                {/* End of Feed */}
                {!hasMore && posts.length > 0 && (
                  <div className="p-8 text-center bg-background rounded-xl border border-subtle">
                    <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
                    <p className="font-body text-text-secondary">You're all caught up!</p>
                    <p className="font-caption text-sm text-text-secondary mt-1">
                      Check back later for new posts
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Buddy Activity */}
            <div className="col-span-3">
              <div className="sticky top-32">
                <BuddyActivityPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <ComposeModal
          onClose={() => setShowComposeModal(false)}
          onPost={(newPost) => {
            setPosts(prev => [newPost, ...prev]);
            setShowComposeModal(false);
          }}
        />
      )}

      {/* Floating Compose Button - Mobile */}
      <button
        onClick={() => setShowComposeModal(true)}
        className="lg:hidden fixed bottom-24 right-4 w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full shadow-soft-lg hover:shadow-soft-lg transition-all duration-200 hover-lift flex items-center justify-center z-80"
      >
        <Icon name="Plus" size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default SocialFeed;