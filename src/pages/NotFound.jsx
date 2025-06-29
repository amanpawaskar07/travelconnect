import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/travel-dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="MapPin" size={48} color="white" strokeWidth={2} />
          </div>
          <h1 className="font-heading font-bold text-4xl text-text-primary mb-4">
            404
          </h1>
          <h2 className="font-heading font-semibold text-xl text-text-primary mb-2">
            Destination Not Found
          </h2>
          <p className="font-body text-text-secondary mb-8">
            Looks like you've wandered off the beaten path. This page doesn't exist in our travel guide.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary hover:bg-primary-700 text-white font-body font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover-lift shadow-soft"
          >
            Return to Dashboard
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-surface hover:bg-primary-50 text-text-primary font-body font-semibold py-3 px-6 rounded-xl border border-subtle transition-all duration-200 hover-lift"
          >
            Go Back
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-subtle">
          <p className="font-caption text-sm text-text-secondary">
            Need help? Contact our travel support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;