import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InventoryEnhancementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartWorkflow: () => void;
}

export const InventoryEnhancementModal = ({ open, onOpenChange, onStartWorkflow }: InventoryEnhancementModalProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const enhancementCategories = [
    {
      title: "Product Information Enhancement",
      items: [
        "Auto-complete missing product titles and descriptions",
        "Standardize brand names and product categories",
        "Extract and validate SKU information",
        "Identify product variants and bundles",
        "Generate comprehensive product specifications",
        "Detect seasonal and limited edition items"
      ]
    },
    {
      title: "Image and Visual Enhancement",
      items: [
        "Auto-tag product images with metadata",
        "Generate alt-text descriptions for accessibility",
        "Identify product colors, sizes, and variants from images",
        "Create standardized image naming conventions",
        "Detect packaging and label information"
      ]
    },
    {
      title: "Pricing and Cost Analysis",
      items: [
        "Extract and validate original retail prices",
        "Calculate cost basis and margin analysis",
        "Identify discount and promotional pricing history",
        "Benchmark against market pricing data",
        "Detect pricing anomalies and outliers"
      ]
    },
    {
      title: "Inventory Condition Assessment",
      items: [
        "Parse and validate expiry dates",
        "Identify damaged or returned items",
        "Assess sellability and condition grades",
        "Flag items requiring special handling",
        "Categorize by storage requirements (temperature, humidity)"
      ]
    },
    {
      title: "Market Data Enrichment",
      items: [
        "Research current market demand trends",
        "Identify target buyer demographics",
        "Analyze seasonal demand patterns",
        "Compare with competitor inventory",
        "Assess regional market preferences"
      ]
    },
    {
      title: "Categorization and Taxonomy",
      items: [
        "Apply standardized product categories",
        "Create hierarchical product taxonomies",
        "Tag products with relevant keywords",
        "Group similar items for bulk processing",
        "Identify cross-selling opportunities"
      ]
    },
    {
      title: "Compliance and Regulatory",
      items: [
        "Verify product safety certifications",
        "Check regulatory compliance status",
        "Identify restricted or prohibited items",
        "Validate ingredient lists for cosmetics",
        "Ensure labeling compliance requirements"
      ]
    },
    {
      title: "Logistics and Fulfillment",
      items: [
        "Calculate shipping dimensions and weights",
        "Identify fragile or hazardous materials",
        "Determine optimal packaging requirements",
        "Assess storage and handling needs",
        "Plan distribution and shipping strategies"
      ]
    }
  ];

  // Initialize all categories as selected when modal opens
  useEffect(() => {
    if (open) {
      const allCategories: Record<string, boolean> = {};
      enhancementCategories.forEach((category) => {
        allCategories[category.title] = true;
      });
      setSelectedItems(allCategories);
    }
  }, [open]);

  const handleCategoryToggle = (categoryTitle: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  const handleExpandToggle = (categoryTitle: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = enhancementCategories.every(cat => expandedCategories[cat.title]);
    const newState: Record<string, boolean> = {};
    
    enhancementCategories.forEach(category => {
      newState[category.title] = !allExpanded;
    });
    
    setExpandedCategories(newState);
  };

  const areAllExpanded = enhancementCategories.every(cat => expandedCategories[cat.title]);
  const areSomeExpanded = enhancementCategories.some(cat => expandedCategories[cat.title]);

  const handleStartWorkflow = () => {
    onStartWorkflow();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-xl font-semibold institutional-heading">Lily: AI Enhancement</DialogTitle>
            </div>
            <Button onClick={handleStartWorkflow} className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 mr-8">
              Start Enhancement
            </Button>
          </div>
          <DialogDescription className="flex items-center justify-between">
            <span>Automatically enhance and enrich your inventory data with AI-powered insights and missing information</span>
            <button
              onClick={handleExpandAll}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{areAllExpanded ? 'Collapse All' : 'Expand All'}</span>
              {areAllExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enhancementCategories.map((category, index) => {
              const isSelected = selectedItems[category.title] || false;
              const isExpanded = expandedCategories[category.title] || false;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.title}
                      checked={isSelected}
                      onCheckedChange={() => handleCategoryToggle(category.title)}
                      className="flex-shrink-0 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <label 
                      htmlFor={category.title}
                      className={`font-semibold text-sm institutional-heading cursor-pointer flex-1 ${
                        isSelected ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {category.title}
                    </label>
                    <button
                      onClick={() => handleExpandToggle(category.title)}
                      className="p-1 hover:bg-muted rounded-sm transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {isExpanded && (
                    <ul className="space-y-1 ml-6">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex-shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};