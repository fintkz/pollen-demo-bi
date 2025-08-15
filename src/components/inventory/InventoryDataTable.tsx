import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, DollarSign, Package, Star, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface InventoryItem {
  id: string;
  sku: string;
  productName: string;
  brand: string;
  quantity: number;
  originalPrice: number;
  category?: string;
  demandScore?: number;
  marketValue?: number;
  condition?: string;
  aiEnhanced: boolean;
}

interface InventoryDataTableProps {
  data: InventoryItem[];
  onEnhancementComplete: () => void;
  onStartProcessing?: () => void;
}

export const InventoryDataTable = ({ data, onEnhancementComplete, onStartProcessing }: InventoryDataTableProps) => {
  const [enhancedData, setEnhancedData] = useState<InventoryItem[]>(data);
  const [currentStage, setCurrentStage] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhancementStages = [
    { 
      field: 'category', 
      name: 'Product Categories', 
      icon: Package, 
      delay: 3000,  // Start after 3 seconds
      duration: 1500,
      values: ['Premium Skincare', 'Color Cosmetics', 'Haircare', 'Fragrance', 'Men\'s Grooming']
    },
    { 
      field: 'demandScore', 
      name: 'Demand Analysis', 
      icon: TrendingUp, 
      delay: 4500,  // 7.5 seconds total
      duration: 2000,
      values: [85, 92, 78, 96, 88, 91, 83, 89]
    },
    { 
      field: 'marketValue', 
      name: 'Market Valuation', 
      icon: DollarSign, 
      delay: 4000,  // 11.5 seconds total  
      duration: 2500,
      values: [45.99, 28.50, 67.25, 23.75, 89.99, 34.50, 156.25, 78.99]
    },
    { 
      field: 'condition', 
      name: 'Condition Assessment', 
      icon: Star, 
      delay: 3500,  // 15 seconds total
      duration: 1800,
      values: ['Excellent', 'Very Good', 'Good', 'Fair', 'Like New']
    }
  ];

  const startEnhancement = () => {
    setIsEnhancing(true);
    setCurrentStage(0);
  };

  useEffect(() => {
    if (isEnhancing && currentStage < enhancementStages.length) {
      const stage = enhancementStages[currentStage];
      
      const timer = setTimeout(() => {
        setEnhancedData(prevData => 
          prevData.map((item, index) => {
            const randomValue = stage.values[index % stage.values.length];
            return {
              ...item,
              [stage.field]: randomValue,
              aiEnhanced: true
            };
          })
        );
        
        setCurrentStage(prev => prev + 1);
      }, stage.delay);

      return () => clearTimeout(timer);
    } else if (isEnhancing && currentStage >= enhancementStages.length) {
      // All stages complete
      setTimeout(() => {
        setIsEnhancing(false);
        onEnhancementComplete();
      }, 1000);
    }
  }, [isEnhancing, currentStage, enhancementStages, onEnhancementComplete]);

  // Auto-start enhancement when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      startEnhancement();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getConditionBadge = (condition: string | undefined) => {
    if (!condition) return null;
    
    const variants: Record<string, string> = {
      'Excellent': 'bg-green-100 text-green-800 border-green-200',
      'Very Good': 'bg-blue-100 text-blue-800 border-blue-200', 
      'Good': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Fair': 'bg-orange-100 text-orange-800 border-orange-200',
      'Like New': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    
    return (
      <Badge className={`${variants[condition] || 'bg-gray-100 text-gray-800'} border`}>
        {condition}
      </Badge>
    );
  };

  const getDemandColor = (score: number | undefined) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 90) return 'text-green-600 font-semibold';
    if (score >= 80) return 'text-blue-600 font-medium';
    if (score >= 70) return 'text-yellow-600 font-medium';
    return 'text-orange-600 font-medium';
  };

  return (
    <div className="space-y-6">
      {/* Enhancement Progress Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Lilly AI Enhancement</h3>
              <p className="text-sm text-muted-foreground">
                {isEnhancing 
                  ? `Enhancing ${enhancementStages[currentStage]?.name || 'data'}...`
                  : currentStage >= enhancementStages.length 
                    ? 'Enhancement complete! Ready for processing.'
                    : 'Ready to enhance inventory data'
                }
              </p>
            </div>
          </div>
          
          {/* Progress Indicators or Action Button */}
          <div className="flex space-x-2">
            {currentStage >= enhancementStages.length && !isEnhancing ? (
              <Button 
                onClick={onStartProcessing}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6"
              >
                Start AI Liquidation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              enhancementStages.map((stage, index) => {
                const StageIcon = stage.icon;
                const isCompleted = currentStage > index;
                const isActive = currentStage === index && isEnhancing;
                
                return (
                  <div key={stage.field} className={`
                    flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-green-100 border-green-500 text-green-600' 
                      : isActive 
                        ? 'bg-purple-100 border-purple-500 text-purple-600 animate-pulse'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}>
                    <StageIcon className="h-5 w-5" />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden relative">
        <div className="relative max-h-[600px] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Original Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Demand Score</TableHead>
                <TableHead>Market Value</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enhancedData.slice(0, 10).map((item, index) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                <TableCell className="font-medium">{item.productName}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.originalPrice.toFixed(2)}</TableCell>
                
                {/* Enhanced Category */}
                <TableCell>
                  <AnimatePresence mode="wait">
                    {item.category ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {item.category}
                        </Badge>
                      </motion.div>
                    ) : (
                      <div className="w-20 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" 
                           style={{ 
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 2s ease-in-out infinite'
                           }} />
                    )}
                  </AnimatePresence>
                </TableCell>
                
                {/* Enhanced Demand Score */}
                <TableCell>
                  <AnimatePresence mode="wait">
                    {item.demandScore !== undefined ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        className={getDemandColor(item.demandScore)}
                      >
                        {item.demandScore}/100
                      </motion.div>
                    ) : (
                      <div className="w-12 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" 
                           style={{ 
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 2s ease-in-out infinite'
                           }} />
                    )}
                  </AnimatePresence>
                </TableCell>
                
                {/* Enhanced Market Value */}
                <TableCell>
                  <AnimatePresence mode="wait">
                    {item.marketValue !== undefined ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="font-semibold text-green-600"
                      >
                        ${item.marketValue.toFixed(2)}
                      </motion.div>
                    ) : (
                      <div className="w-16 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" 
                           style={{ 
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 2s ease-in-out infinite'
                           }} />
                    )}
                  </AnimatePresence>
                </TableCell>
                
                {/* Enhanced Condition */}
                <TableCell>
                  <AnimatePresence mode="wait">
                    {item.condition ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        {getConditionBadge(item.condition)}
                      </motion.div>
                    ) : (
                      <div className="w-18 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" 
                           style={{ 
                             backgroundSize: '200% 100%',
                             animation: 'shimmer 2s ease-in-out infinite'
                           }} />
                    )}
                  </AnimatePresence>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Fade Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
        
        {/* Row Count Indicator */}
        <div className="absolute bottom-3 right-4 text-xs text-muted-foreground bg-white/90 px-2 py-1 rounded z-20">
          Showing 10 of 2.3K items
        </div>
      </div>
      </Card>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};