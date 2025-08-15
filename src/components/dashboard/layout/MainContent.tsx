import { AppPhase } from './AppLayout';
import { DocumentUpload } from '../phases/DocumentUpload';
import { AgentProcessing } from '../phases/AgentProcessing';
import { SlideGeneration } from '../phases/SlideGeneration';
import { SlideReview } from '../phases/SlideReview';
import { useAgentState } from '@/hooks/dashboard/useAgentState';

interface MainContentProps {
  currentPhase: AppPhase;
  setCurrentPhase: (phase: AppPhase) => void;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  agentState: ReturnType<typeof useAgentState>;
}

export const MainContent = ({ 
  currentPhase, 
  setCurrentPhase, 
  uploadedFiles, 
  setUploadedFiles,
  agentState
}: MainContentProps) => {
  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'upload':
        return (
          <DocumentUpload
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            onComplete={() => setCurrentPhase('processing')}
          />
        );
      case 'processing':
        return (
          <AgentProcessing
            onComplete={() => setCurrentPhase('generating')}
            agentState={agentState}
          />
        );
      case 'generating':
        return (
          <SlideGeneration
            onComplete={() => setCurrentPhase('review')}
          />
        );
      case 'review':
        return (
          <SlideReview />
        );
      default:
        return <DocumentUpload uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} onComplete={() => setCurrentPhase('processing')} />;
    }
  };

  return (
    <main className="flex-1 bg-background min-w-0 overflow-x-hidden">
      {renderCurrentPhase()}
    </main>
  );
};