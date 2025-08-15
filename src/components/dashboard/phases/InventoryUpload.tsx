import React, { useState, useCallback } from 'react';
import { Upload, File, FileText, FileSpreadsheet, X, Activity, TrendingUp, Shield, Database, ChevronRight, Home, Folder, MessageCircle, Bot, Package, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { integrationLogos } from '@/lib/logos';
import { InventoryEnhancementModal } from '../modals/InventoryEnhancementModal';
import { LillyEnhancementFlow } from '@/components/inventory/LillyEnhancementFlow';

interface InventoryUploadProps {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  onComplete: () => void;
}

export const InventoryUpload = ({ uploadedFiles, setUploadedFiles, onComplete }: InventoryUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploadedFiles([...uploadedFiles, ...files]);
      toast({
        title: "Files uploaded successfully",
        description: `Added ${files.length} file(s) to analysis queue`,
      });
    }
  }, [uploadedFiles, setUploadedFiles, toast]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed, files:', e.target.files);
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      console.log('Setting uploaded files:', files);
      setUploadedFiles([...uploadedFiles, ...files]);
      toast({
        title: "Files uploaded successfully",
        description: `Added ${files.length} file(s) to analysis queue`,
      });
    }
  }, [uploadedFiles, setUploadedFiles, toast]);

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    toast({
      title: "File removed",
      description: "File removed from analysis queue",
    });
  }, [uploadedFiles, setUploadedFiles, toast]);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-destructive" />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet className="h-8 w-8 text-success" />;
      default:
        return <File className="h-8 w-8 text-muted-foreground" />;
    }
  };

  // Sample inventory documents
  const sampleDocuments = [
    { name: 'L_Oreal_Excess_Inventory.xlsx', type: 'Excel', size: '2.1 MB' },
    { name: 'Dove_Product_Catalog.pdf', type: 'PDF', size: '1.5 MB' },
    { name: 'Maybelline_Stock_List.csv', type: 'CSV', size: '890 KB' },
    { name: 'Product_Images_Beauty.zip', type: 'ZIP', size: '15.2 MB' },
    { name: 'Pricing_Guidelines_2024.xlsx', type: 'Excel', size: '1.8 MB' },
    { name: 'Seasonal_Returns_Report.pdf', type: 'PDF', size: '2.3 MB' },
    { name: 'SKU_Master_Data.xlsx', type: 'Excel', size: '3.7 MB' },
    { name: 'Expiry_Dates_Tracking.csv', type: 'CSV', size: '650 KB' }
  ];

  return (
    <div>
      {/* Dashboard Header */}
      <div className="border-b border-border-muted bg-surface-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Package className="h-4 w-4" />
            <span>Inventory</span>
            <ChevronRight className="h-4 w-4" />
            <Folder className="h-4 w-4" />
            <span>Beauty & Personal Care</span>
            <ChevronRight className="h-4 w-4" />
            <Folder className="h-4 w-4" />
            <span className="font-medium text-foreground">L'Oréal Excess Stock Q4</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-2 ml-8">
              <h1 className="text-4xl font-bold institutional-heading text-foreground">
                L'Oréal Excess Stock<br/>Q4 2024 Batch
              </h1>
            </div>
            {/* Batch Status */}
            <div className="flex items-start space-x-8">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center h-6">
                  <div className="text-sm font-medium text-foreground">Batch Status</div>
                </div>
                <div className="text-sm text-green-600">
                  <span className="whitespace-pre-line">Ready for{'\n'}processing</span>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center h-6">
                  <div className="text-sm font-medium text-foreground">Total Units</div>
                </div>
                <div className="text-sm font-medium" style={{ color: '#3b82f6' }}>
                  <span>2,347 SKUs</span>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center h-6">
                  <div className="text-sm font-medium text-foreground">Est. Recovery</div>
                </div>
                <div className="text-sm text-orange-600">
                  <span className="whitespace-pre-line">$185K{'\n'}potential value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="w-full">
          {uploadedFiles.length === 0 ? (
            /* File Upload Interface */
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold institutional-heading">
                  Upload Inventory Files
                </h2>
                <p className="text-muted-foreground text-lg">
                  Upload your inventory files to begin AI-powered enhancement and processing.
                </p>
              </div>

              {/* Drag & Drop Upload Area */}
              <Card className="p-8">
                <div 
                  className={`
                    border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200
                    ${isDragOver 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-300 hover:border-purple-400 hover:bg-purple-25'
                    }
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {isDragOver ? 'Drop files here' : 'Upload inventory files'}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop your files here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                        accept=".xlsx,.xls,.csv,.pdf,.zip"
                        ref={(input) => {
                          if (input) {
                            input.onclick = () => {
                              console.log('File input clicked');
                            };
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        className="cursor-pointer"
                        onClick={() => {
                          console.log('Choose Files button clicked');
                          document.getElementById('file-upload')?.click();
                        }}
                      >
                        Choose Files
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: Excel (.xlsx, .xls), CSV, PDF, ZIP
                    </p>
                  </div>
                </div>
              </Card>

              {/* Sample Files for Demo */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sample Files (Demo)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleDocuments.slice(0, 4).map((doc, index) => {
                    const isLOrealFile = index === 0; // First file is L'Oréal
                    return (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${isLOrealFile ? 'bg-green-50 border border-green-200' : 'bg-muted/30'}`}>
                        {getFileIcon(doc.name)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant={isLOrealFile ? "default" : "outline"}
                          disabled={!isLOrealFile}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Button clicked, isLOrealFile:', isLOrealFile, 'index:', index);
                            if (isLOrealFile) {
                              console.log('Demo button clicked, creating mock file');
                              // Simulate file upload for demo
                              const mockFile = {
                                name: doc.name,
                                size: 2100000, // 2.1 MB
                                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                lastModified: Date.now()
                              } as File;
                              console.log('Setting uploaded files:', [mockFile]);
                              setUploadedFiles([mockFile]);
                              toast({
                                title: "Demo file loaded",
                                description: "L'Oréal inventory data ready for processing",
                              });
                            }
                          }}
                        >
                          {isLOrealFile ? "Use File" : "Use File"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          ) : (
            /* Lilly Enhancement Flow */
            <LillyEnhancementFlow 
              uploadedFiles={uploadedFiles}
              onComplete={onComplete}
            />
          )}
        </div>
      </div>

      <InventoryEnhancementModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onStartWorkflow={onComplete}
      />
    </div>
  );
};