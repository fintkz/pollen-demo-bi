import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { MainContent } from './MainContent';
import { CanvasPanel } from './CanvasPanel';
import { useAgentState } from '@/hooks/dashboard/useAgentState';

export type AppPhase = 'processing' | 'preview' | 'marketplace';

export const AppLayout = () => {
  const [currentPhase, setCurrentPhase] = useState<AppPhase>('processing');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const agentState = useAgentState();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentPhase={currentPhase}
          uploadedFiles={uploadedFiles}
        />
        
        <SidebarInset>
          <MainContent 
            currentPhase={currentPhase}
            setCurrentPhase={setCurrentPhase}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            agentState={agentState}
          />
        </SidebarInset>
        
        <CanvasPanel 
          currentPhase={currentPhase} 
          agentState={agentState}
        />
      </div>
    </SidebarProvider>
  );
};