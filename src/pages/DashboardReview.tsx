// Dashboard marketplace page - contains the MarketplacePreview component
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/dashboard/layout/AppSidebar';
import { CanvasPanel } from '../components/dashboard/layout/CanvasPanel';
import { MarketplacePreview } from '../components/dashboard/phases/MarketplacePreview';
import { useAgentState } from '../hooks/dashboard/useAgentState';

const DashboardReview = () => {
  const [uploadedFiles] = useState<File[]>([{ name: 'Demo Data' } as File]); // Simulated
  const agentState = useAgentState();

  return (
    <SidebarProvider defaultOpen={true}>
      <div data-theme="institutional" className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentPhase="marketplace"
          uploadedFiles={uploadedFiles}
        />
        
        <div className="flex-1 pr-80 xl:pr-96">
          <MarketplacePreview />
        </div>
        
        <CanvasPanel 
          currentPhase="marketplace" 
          agentState={agentState}
        />
      </div>
    </SidebarProvider>
  );
};

export default DashboardReview;