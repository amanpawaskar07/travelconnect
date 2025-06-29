import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ChatPanel = ({ buddy, onClose, isMobile = false }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const mockMessages = [
    {
      id: 1,
      sender: 'buddy',
      content: `Hi! I saw we're both interested in visiting ${buddy.upcomingTrips[0]}. Would love to chat about potentially traveling together!`,
      timestamp: new Date(Date.now() - 3600000),
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      content: "That sounds amazing! I\'ve been planning this trip for months. What dates were you thinking?",
      timestamp: new Date(Date.now() - 3300000),
      type: 'text'
    },
    {
      id: 3,
      sender: 'buddy',content: "I\'m flexible with dates, but I was thinking sometime in the next 2-3 months. What\'s your travel style like?",timestamp: new Date(Date.now() - 3000000),type: 'text'
    },
    {
      id: 4,
      sender: 'user',
      content: "I love a mix of adventure and culture! I\'m always up for trying local food and exploring hidden gems.",
      timestamp: new Date(Date.now() - 2700000),
      type: 'text'
    },
    {
      id: 5,
      sender: 'buddy',content: "Perfect! We seem to have similar interests. I\'ve attached some photos from my last trip to give you an idea of my travel style.",timestamp: new Date(Date.now() - 2400000),type: 'text'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, [buddy.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        content: message,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  const quickReplies = [
    "That sounds great!",
    "When are you planning to go?",
    "What\'s your budget like?",
    "I'm interested! Tell me more."
  ];

  return (
    <div className={`bg-background border border-subtle rounded-xl overflow-hidden flex flex-col ${
      isMobile ? 'h-screen' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-subtle bg-surface/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={buddy.avatar}
              alt={buddy.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              {buddy.name}
            </h3>
            <p className="font-caption text-xs text-text-secondary">
              Active {buddy.lastActive}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
            <Icon name="Phone" size={18} className="text-text-secondary" />
          </button>
          <button className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
            <Icon name="Video" size={18} className="text-text-secondary" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={18} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const showDate = index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);
          const isUser = msg.sender === 'user';
          
          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center mb-4">
                  <span className="bg-surface px-3 py-1 rounded-full font-caption text-xs text-text-secondary">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl font-body text-sm ${
                      isUser
                        ? 'bg-primary text-white rounded-br-md' :'bg-surface text-text-primary rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                    <span className="font-caption text-xs text-text-secondary">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 border-t border-subtle">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setMessage(reply)}
              className="flex-shrink-0 bg-surface hover:bg-primary-50 text-text-primary hover:text-primary px-3 py-1 rounded-full font-caption text-xs border border-subtle hover:border-primary/30 transition-all duration-200"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-subtle">
        <div className="flex items-end space-x-3">
          <button
            type="button"
            className="p-2 hover:bg-surface rounded-lg transition-colors duration-200 flex-shrink-0"
          >
            <Icon name="Paperclip" size={20} className="text-text-secondary" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows="1"
              className="w-full px-4 py-2 border border-subtle rounded-xl font-body text-sm bg-surface/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none placeholder-text-secondary/70"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
              message.trim()
                ? 'bg-primary hover:bg-primary-700 text-white hover-lift'
                : 'bg-surface text-text-secondary cursor-not-allowed'
            }`}
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
      </form>

      {/* Safety Notice */}
      <div className="px-4 py-2 bg-warning/10 border-t border-warning/20">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <p className="font-caption text-xs text-warning-700">
            Always meet in public places and trust your instincts. Report any suspicious behavior.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;