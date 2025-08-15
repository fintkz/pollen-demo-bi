import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Sparkles, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { InventoryDataTable } from './InventoryDataTable';

interface LillyEnhancementFlowProps {
  uploadedFiles: File[];
  onComplete: () => void;
}

type FlowStage = 'upload' | 'parsing' | 'enhancing' | 'complete';

export const LillyEnhancementFlow = ({ uploadedFiles, onComplete }: LillyEnhancementFlowProps) => {
  const [currentStage, setCurrentStage] = useState<FlowStage>('upload');
  const [progress, setProgress] = useState(0);
  const [showTable, setShowTable] = useState(false);

  // Sample inventory data that would come from file parsing
  const sampleInventoryData = [
    {
      id: '1',
      sku: 'LOR-SKN-001',
      productName: 'Revitalift Anti-Aging Moisturizer',
      brand: "L'Oréal Paris",
      quantity: 247,
      originalPrice: 24.99,
      aiEnhanced: false
    },
    {
      id: '2', 
      sku: 'LOR-FND-002',
      productName: 'True Match Foundation',
      brand: "L'Oréal Paris",
      quantity: 189,
      originalPrice: 12.95,
      aiEnhanced: false
    },
    {
      id: '3',
      sku: 'LOR-LIP-003', 
      productName: 'Rouge Signature Matte Lipstick',
      brand: "L'Oréal Paris",
      quantity: 156,
      originalPrice: 9.99,
      aiEnhanced: false
    },
    {
      id: '4',
      sku: 'LOR-HAR-004',
      productName: 'Elvive Total Repair 5 Shampoo',
      brand: "L'Oréal Paris", 
      quantity: 312,
      originalPrice: 6.49,
      aiEnhanced: false
    },
    {
      id: '5',
      sku: 'LOR-EYE-005',
      productName: 'Voluminous Lash Paradise Mascara',
      brand: "L'Oréal Paris",
      quantity: 203,
      originalPrice: 11.99,
      aiEnhanced: false
    },
    {
      id: '6',
      sku: 'LOR-MEN-006',
      productName: 'Men Expert Hydra Energetic Moisturizer',
      brand: "L'Oréal Paris",
      quantity: 98,
      originalPrice: 7.99,
      aiEnhanced: false
    }
  ];

  const startProcessing = () => {
    if (uploadedFiles.length === 0) return;
    
    // Stage 1: Parsing
    setCurrentStage('parsing');
    setProgress(10);
    
    setTimeout(() => {
      setProgress(40);
      setTimeout(() => {
        setCurrentStage('enhancing');
        setProgress(60);
        setShowTable(true);
      }, 1500);
    }, 1000);
  };

  const handleEnhancementComplete = () => {
    setProgress(100);
    setTimeout(() => {
      setCurrentStage('complete');
    }, 500);
  };

  // Auto-start processing when files are uploaded
  useEffect(() => {
    if (uploadedFiles.length > 0 && currentStage === 'upload') {
      const timer = setTimeout(() => {
        startProcessing();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [uploadedFiles, currentStage]);

  const getStageIcon = (stage: FlowStage) => {
    switch (stage) {
      case 'upload': return Upload;
      case 'parsing': return FileText;
      case 'enhancing': return Sparkles;
      case 'complete': return CheckCircle;
    }
  };

  const getStageTitle = (stage: FlowStage) => {
    switch (stage) {
      case 'upload': return 'Files Uploaded';
      case 'parsing': return 'Parsing Inventory Data';
      case 'enhancing': return 'AI Enhancement in Progress';
      case 'complete': return 'Enhancement Complete';
    }
  };

  const getStageDescription = (stage: FlowStage) => {
    switch (stage) {
      case 'upload': return 'Ready to process uploaded inventory files';
      case 'parsing': return 'Extracting product information from uploaded files';
      case 'enhancing': return 'Lilly is analyzing and enriching your inventory data';
      case 'complete': return 'Your inventory is now enhanced and ready for AI processing';
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold institutional-heading">
                {getStageTitle(currentStage)}
              </h2>
              <p className="text-muted-foreground">
                {getStageDescription(currentStage)}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant={currentStage === 'complete' ? 'default' : 'secondary'}>
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
              </Badge>
              {currentStage === 'complete' && (
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  Ready for Processing
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />
          
          {/* Stage Indicators */}
          <div className="flex items-center justify-between mt-4">
            {(['upload', 'parsing', 'enhancing', 'complete'] as FlowStage[]).map((stage, index) => {
              const StageIcon = getStageIcon(stage);
              const isActive = currentStage === stage;
              const isCompleted = (['upload', 'parsing', 'enhancing', 'complete'] as FlowStage[]).indexOf(currentStage) > index;
              
              return (
                <div key={stage} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-green-100 border-green-500 text-green-600' 
                      : isActive 
                        ? 'bg-purple-100 border-purple-500 text-purple-600'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}>
                    <StageIcon className="h-4 w-4" />
                  </div>
                  {index < 3 && (
                    <div className={`
                      w-16 h-0.5 mx-2 transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Processing Animation */}
      <AnimatePresence mode="wait">
        {currentStage === 'parsing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold">Processing inventory files...</h3>
                <p className="text-muted-foreground">
                  Extracting product details, SKUs, and inventory information
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Table with Enhancement */}
      <AnimatePresence>
        {showTable && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <InventoryDataTable 
              data={sampleInventoryData}
              onEnhancementComplete={handleEnhancementComplete}
              onStartProcessing={onComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};