import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ItineraryBuilder = ({ trip, onUpdateTrip }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const activityTypes = [
    { id: 'flight', label: 'Flight', icon: 'Plane', color: 'bg-blue-100 text-blue-700' },
    { id: 'accommodation', label: 'Hotel', icon: 'Building', color: 'bg-purple-100 text-purple-700' },
    { id: 'activity', label: 'Activity', icon: 'MapPin', color: 'bg-green-100 text-green-700' },
    { id: 'restaurant', label: 'Restaurant', icon: 'UtensilsCrossed', color: 'bg-orange-100 text-orange-700' },
    { id: 'transport', label: 'Transport', icon: 'Car', color: 'bg-gray-100 text-gray-700' }
  ];

  const getActivityTypeConfig = (type) => {
    return activityTypes.find(t => t.id === type) || activityTypes[2];
  };

  const handleDragStart = (e, activity, dayIndex) => {
    setDraggedItem({ activity, dayIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDayIndex, targetActivityIndex) => {
    e.preventDefault();
    if (!draggedItem) return;

    console.log('Dropped activity:', draggedItem, 'to day:', targetDayIndex, 'position:', targetActivityIndex);
    setDraggedItem(null);
  };

  const handleAddActivity = (dayIndex) => {
    setSelectedDay(dayIndex);
    setShowAddActivity(true);
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl text-text-primary">Trip Itinerary</h2>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift">
            <Icon name="Download" size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg font-body text-sm transition-all duration-200 hover-lift">
            <Icon name="Shuffle" size={16} />
            <span className="hidden sm:inline">Optimize</span>
          </button>
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-6">
        {trip.itinerary.map((day, dayIndex) => (
          <div key={day.day} className="bg-surface rounded-xl p-6 border border-subtle">
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold">
                  {day.day}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-text-primary">
                    Day {day.day}
                  </h3>
                  <p className="font-body text-sm text-text-secondary">
                    {formatDate(day.date)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleAddActivity(dayIndex)}
                className="flex items-center space-x-2 px-3 py-2 bg-primary-50 text-primary rounded-lg font-body text-sm transition-all duration-200 hover-lift"
              >
                <Icon name="Plus" size={16} />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            {/* Activities List */}
            <div className="space-y-3">
              {day.activities.map((activity, activityIndex) => {
                const typeConfig = getActivityTypeConfig(activity.type);
                return (
                  <div
                    key={activity.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, activity, dayIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, dayIndex, activityIndex)}
                    className="bg-background rounded-lg p-4 border border-subtle hover:border-primary/30 transition-all duration-200 cursor-move group"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Time */}
                      <div className="flex-shrink-0 text-center min-w-16">
                        <div className="font-heading font-semibold text-sm text-text-primary">
                          {formatTime(activity.time)}
                        </div>
                        <div className="font-caption text-xs text-text-secondary">
                          {activity.duration}
                        </div>
                      </div>

                      {/* Activity Type Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                        <Icon name={typeConfig.icon} size={20} />
                      </div>

                      {/* Activity Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-body font-semibold text-text-primary mb-1">
                              {activity.title}
                            </h4>
                            <p className="font-body text-sm text-text-secondary flex items-center">
                              <Icon name="MapPin" size={14} className="mr-1" />
                              {activity.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-caption
                              ${activity.status === 'booked' ?'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
                              }`}>
                              {activity.status}
                            </span>
                            <span className="font-body font-semibold text-sm text-text-primary">
                              ${activity.cost}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Drag Handle */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Icon name="GripVertical" size={16} className="text-text-secondary" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add Activity Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, dayIndex, day.activities.length)}
                className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center hover:border-primary/50 transition-colors duration-200"
              >
                <Icon name="Plus" size={20} className="text-primary/50 mx-auto mb-2" />
                <p className="font-body text-sm text-text-secondary">
                  Drop activity here or click to add
                </p>
              </div>
            </div>

            {/* Day Summary */}
            <div className="mt-4 pt-4 border-t border-subtle">
              <div className="flex items-center justify-between text-sm">
                <span className="font-body text-text-secondary">
                  {day.activities.length} activities planned
                </span>
                <span className="font-body font-semibold text-text-primary">
                  Total: ${day.activities.reduce((sum, activity) => sum + activity.cost, 0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Day */}
      <button className="w-full p-6 border-2 border-dashed border-primary/30 rounded-xl text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
        <Icon name="Plus" size={24} className="text-primary mx-auto mb-2" />
        <p className="font-body text-primary font-medium">Add New Day</p>
      </button>

      {/* Add Activity Modal */}
      {showAddActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-2xl shadow-soft-lg max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-semibold text-lg text-text-primary">Add Activity</h3>
              <button
                onClick={() => setShowAddActivity(false)}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    console.log('Adding activity type:', type.id);
                    setShowAddActivity(false);
                  }}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-subtle hover:border-primary/30 hover:bg-surface transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                    <Icon name={type.icon} size={20} />
                  </div>
                  <span className="font-body text-text-primary">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;