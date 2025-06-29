import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import BottomNavigation from "components/ui/BottomNavigation";
import FloatingActionButton from "components/ui/FloatingActionButton";
import QuickFilterChips from "components/ui/QuickFilterChips";

// Page imports
import TravelDashboard from "pages/travel-dashboard";
import TripPlanning from "pages/trip-planning";
import DestinationDiscovery from "pages/destination-discovery";
import SocialFeed from "pages/social-feed";
import TravelBuddyMatching from "pages/travel-buddy-matching";
import TravelMemoryAlbums from "pages/travel-memory-albums";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <BottomNavigation />
          <QuickFilterChips />
          <FloatingActionButton />
          
          <main className="relative">
            <RouterRoutes>
              <Route path="/" element={<TravelDashboard />} />
              <Route path="/travel-dashboard" element={<TravelDashboard />} />
              <Route path="/destination-discovery" element={<DestinationDiscovery />} />
              <Route path="/trip-planning" element={<TripPlanning />} />
              <Route path="/social-feed" element={<SocialFeed />} />
              <Route path="/travel-buddy-matching" element={<TravelBuddyMatching />} />
              <Route path="/travel-memory-albums" element={<TravelMemoryAlbums />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;