import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/dashboard/layout/AppSidebar';
import { InventoryUpload } from '../components/dashboard/phases/InventoryUpload';

const Inventory = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleUploadComplete = () => {
    // Navigate to dashboard agents processing
    navigate('/dashboard');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div data-theme="institutional" className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          currentPhase="upload"
          uploadedFiles={uploadedFiles}
        />
        
        <div className="flex-1">
          <InventoryUpload 
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            onComplete={handleUploadComplete}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;