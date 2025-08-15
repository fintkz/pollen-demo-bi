import { useState } from 'react';
import { AppPhase } from './AppLayout';
import { InventoryUploadCanvas } from '../canvas/InventoryUploadCanvas';
import { InventoryProcessingCanvas } from '../canvas/InventoryProcessingCanvas';
import { ProductPreviewCanvas } from '../canvas/ProductPreviewCanvas';
import { MarketplaceCanvas } from '../canvas/MarketplaceCanvas';
import { useAgentState } from '@/hooks/dashboard/useAgentState';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, BarChart3 } from 'lucide-react';

interface CanvasPanelProps {
  currentPhase: AppPhase;
  agentState?: ReturnType<typeof useAgentState>;
  selectedAgent?: string | null;
}

export const CanvasPanel = ({ currentPhase, agentState, selectedAgent }: CanvasPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const renderCanvas = () => {
    switch (currentPhase) {
      case 'upload':
        return <InventoryUploadCanvas />;
      case 'processing':
        return <InventoryProcessingCanvas agentState={agentState} selectedAgent={selectedAgent} />;
      case 'preview':
        return <ProductPreviewCanvas agentState={agentState} selectedAgent={selectedAgent} />;
      case 'marketplace':
        return <MarketplaceCanvas />;
      default:
        return <InventoryUploadCanvas />;
    }
  };

  return (
    <aside className={`fixed top-0 right-0 bg-surface-muted border-l border-border-muted h-screen flex flex-col transition-all duration-300 z-40 ${
      isCollapsed ? 'w-12' : 'w-80 xl:w-96'
    }`}>
      {/* Toggle Button */}
      <div className="p-3 border-b border-border-muted flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground text-sm">Canvas</h3>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-6 w-6 p-0"
        >
          {isCollapsed ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* Canvas Content - Independently Scrollable */}
      {!isCollapsed && (
        <div 
          className="flex-1 overflow-y-auto institutional-scroll"
          onWheel={(e) => {
            e.stopPropagation();
          }}
          style={{ overscrollBehavior: 'contain' }}
        >
          {renderCanvas()}
        </div>
      )}
    </aside>
  );
};