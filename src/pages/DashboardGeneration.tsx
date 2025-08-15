// Dashboard product preview page - contains the ProductPreview component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/dashboard/layout/AppSidebar';
import { CanvasPanel } from '../components/dashboard/layout/CanvasPanel';
import { ProductPreview } from '../components/dashboard/phases/ProductPreview';
import { useAgentState } from '../hooks/dashboard/useAgentState';

const DashboardGeneration = () => {
  const [uploadedFiles] = useState<File[]>([{ name: 'Demo Data' } as File]); // Simulated
  const agentState = useAgentState();
  const navigate = useNavigate();

  const handleGenerationComplete = () => {
    navigate('/dashboard/marketplace');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div data-theme="institutional" className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentPhase="preview"
          uploadedFiles={uploadedFiles}
        />
        
        <div className="flex-1 pr-80 xl:pr-96">
          <ProductPreview 
            onComplete={handleGenerationComplete}
          />
        </div>
        
        <CanvasPanel 
          currentPhase="preview" 
          agentState={agentState}
        />
      </div>
    </SidebarProvider>
  );
};

export default DashboardGeneration;