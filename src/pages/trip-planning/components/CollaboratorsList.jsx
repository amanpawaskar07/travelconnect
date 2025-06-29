import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CollaboratorsList = ({ trip, onUpdateTrip }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('viewer');

  const roles = [
    { id: 'owner', label: 'Owner', description: 'Full access to edit and manage', color: 'text-primary' },
    { id: 'co-planner', label: 'Co-Planner', description: 'Can edit itinerary and budget', color: 'text-secondary-700' },
    { id: 'viewer', label: 'Viewer', description: 'Can view trip details only', color: 'text-text-secondary' }
  ];

  const collaborators = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "co-planner",
      status: "active",
      joinedDate: "2024-02-10",
      lastActive: "2 hours ago",
      contributions: {
        activities: 5,
        expenses: 3,
        comments: 12
      }
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      role: "viewer",
      status: "active",
      joinedDate: "2024-02-12",
      lastActive: "1 day ago",
      contributions: {
        activities: 0,
        expenses: 0,
        comments: 3
      }
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      role: "viewer",
      status: "pending",
      joinedDate: null,
      lastActive: null,
      contributions: {
        activities: 0,
        expenses: 0,
        comments: 0
      }
    }
  ];

  const pendingInvites = collaborators.filter(c => c.status === 'pending');
  const activeCollaborators = collaborators.filter(c => c.status === 'active');

  const getRoleConfig = (roleId) => {
    return roles.find(r => r.id === roleId) || roles[2];
  };

  const handleInvite = (e) => {
    e.preventDefault();
    console.log('Inviting:', inviteEmail, 'as', selectedRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setSelectedRole('viewer');
  };

  const handleRoleChange = (collaboratorId, newRole) => {
    console.log('Changing role for collaborator:', collaboratorId, 'to:', newRole);
  };

  const handleRemoveCollaborator = (collaboratorId) => {
    console.log('Removing collaborator:', collaboratorId);
  };

  const handleResendInvite = (collaboratorId) => {
    console.log('Resending invite to:', collaboratorId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-xl text-text-primary">Trip Collaborators</h2>
          <p className="font-body text-sm text-text-secondary mt-1">
            Manage who can view and edit this trip
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 hover-lift flex items-center space-x-2"
        >
          <Icon name="UserPlus" size={16} />
          <span>Invite</span>
        </button>
      </div>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <div className="bg-warning-50 rounded-xl p-6 border border-warning-200">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Clock" size={20} className="text-warning-600" />
            <h3 className="font-heading font-semibold text-lg text-warning-800">Pending Invites</h3>
          </div>
          
          <div className="space-y-3">
            {pendingInvites.map((collaborator) => {
              const roleConfig = getRoleConfig(collaborator.role);
              return (
                <div key={collaborator.id} className="bg-background rounded-lg p-4 border border-warning-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-warning-600" />
                      </div>
                      <div>
                        <h4 className="font-body font-semibold text-text-primary">{collaborator.name}</h4>
                        <p className="font-body text-sm text-text-secondary">{collaborator.email}</p>
                        <span className={`font-caption text-xs ${roleConfig.color}`}>
                          {roleConfig.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleResendInvite(collaborator.id)}
                        className="px-3 py-1 bg-warning-100 text-warning-700 rounded-lg font-body text-sm transition-all duration-200 hover-lift"
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                        className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Collaborators */}
      <div className="bg-surface rounded-xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
          Active Collaborators ({activeCollaborators.length})
        </h3>
        
        <div className="space-y-4">
          {activeCollaborators.map((collaborator) => {
            const roleConfig = getRoleConfig(collaborator.role);
            return (
              <div key={collaborator.id} className="bg-background rounded-lg p-4 border border-subtle hover:border-primary/30 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Image 
                        src={collaborator.avatar} 
                        alt={collaborator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-body font-semibold text-text-primary">{collaborator.name}</h4>
                        {collaborator.role === 'owner' && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-caption">
                            Owner
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm text-text-secondary mb-2">{collaborator.email}</p>
                      
                      {/* Role Selector */}
                      {collaborator.role !== 'owner' && (
                        <select
                          value={collaborator.role}
                          onChange={(e) => handleRoleChange(collaborator.id, e.target.value)}
                          className="px-2 py-1 bg-surface border border-subtle rounded text-xs font-body text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                        >
                          {roles.filter(r => r.id !== 'owner').map((role) => (
                            <option key={role.id} value={role.id}>{role.label}</option>
                          ))}
                        </select>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                        <span>Joined {new Date(collaborator.joinedDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Active {collaborator.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Contributions */}
                    <div className="hidden lg:flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="text-center">
                        <div className="font-heading font-semibold text-text-primary">
                          {collaborator.contributions.activities}
                        </div>
                        <div className="font-caption text-xs">Activities</div>
                      </div>
                      <div className="text-center">
                        <div className="font-heading font-semibold text-text-primary">
                          {collaborator.contributions.expenses}
                        </div>
                        <div className="font-caption text-xs">Expenses</div>
                      </div>
                      <div className="text-center">
                        <div className="font-heading font-semibold text-text-primary">
                          {collaborator.contributions.comments}
                        </div>
                        <div className="font-caption text-xs">Comments</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    {collaborator.role !== 'owner' && (
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
                          title="Send Message"
                        >
                          <Icon name="MessageCircle" size={16} />
                        </button>
                        <button
                          onClick={() => handleRemoveCollaborator(collaborator.id)}
                          className="p-2 text-text-secondary hover:text-error transition-colors duration-200"
                          title="Remove Collaborator"
                        >
                          <Icon name="UserMinus" size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collaboration Settings */}
      <div className="bg-surface rounded-xl p-6 border border-subtle">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">Collaboration Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-body font-semibold text-text-primary">Allow comments</h4>
              <p className="font-body text-sm text-text-secondary">Let collaborators comment on activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-body font-semibold text-text-primary">Real-time notifications</h4>
              <p className="font-body text-sm text-text-secondary">Get notified when collaborators make changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-body font-semibold text-text-primary">Public trip link</h4>
              <p className="font-body text-sm text-text-secondary">Allow anyone with the link to view this trip</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-surface peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-soft-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-semibold text-lg text-text-primary">Invite Collaborator</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block font-body text-sm text-text-primary mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-surface border border-subtle rounded-lg font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="collaborator@email.com"
                />
              </div>
              
              <div>
                <label className="block font-body text-sm text-text-primary mb-2">Role</label>
                <div className="space-y-2">
                  {roles.filter(r => r.id !== 'owner').map((role) => (
                    <label key={role.id} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={selectedRole === role.id}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="mt-1 text-primary focus:ring-primary/20"
                      />
                      <div>
                        <div className="font-body font-semibold text-text-primary">{role.label}</div>
                        <div className="font-body text-sm text-text-secondary">{role.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg font-body text-sm border border-subtle transition-all duration-200 hover-lift"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-body text-sm transition-all duration-200 hover-lift"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsList;