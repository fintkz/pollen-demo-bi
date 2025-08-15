// Dashboard agent processing page - contains the AgentProcessing component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/dashboard/layout/AppSidebar';
import { CanvasPanel } from '../components/dashboard/layout/CanvasPanel';
import { AIAgentProcessing } from '../components/dashboard/phases/AIAgentProcessing';
import { useAgentState } from '../hooks/dashboard/useAgentState';

const DashboardAgent = () => {
  const [uploadedFiles] = useState<File[]>([{ name: 'Demo Data' } as File]); // Simulated
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const agentState = useAgentState();
  const navigate = useNavigate();

  const handleProcessingComplete = () => {
    navigate('/dashboard/preview');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div data-theme="institutional" className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentPhase="processing"
          uploadedFiles={uploadedFiles}
        />
        
        <div className="flex-1 pr-80 xl:pr-96 h-screen overflow-hidden">
          <AIAgentProcessing 
            onComplete={handleProcessingComplete}
            agentState={agentState}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
          />
        </div>
        
        <CanvasPanel 
          currentPhase="processing" 
          agentState={agentState}
          selectedAgent={selectedAgent}
        />
      </div>
    </SidebarProvider>
  );
};

export default DashboardAgent;