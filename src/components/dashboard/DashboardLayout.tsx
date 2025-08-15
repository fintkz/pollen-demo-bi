import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard will have its own isolated layout - no main site nav/footer */}
      <Outlet />
    </div>
  );
};