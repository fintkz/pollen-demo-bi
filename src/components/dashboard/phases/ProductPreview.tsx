import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package,
  ShoppingCart, 
  TrendingUp,
  DollarSign,
  Target,
  Eye,
  Star,
  CheckCircle,
  Sparkles,
  ChevronRight,
  BarChart3,
  Users,
  Globe
} from 'lucide-react';

interface ProductPreviewProps {
  onComplete: () => void;
}

interface EnhancedProduct {
  id: string;
  name: string;
  category: string;
  originalData: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
  };
  enhancedData: {
    name: string;
    description: string;
    price: number;
    suggestedPrice: number;
    category: string;
    tags: string[];
    demandScore: number;
    competitorPrice: number;
    marketPosition: string;
  };
  aiInsights: string[];
  stock: number;
}

const sampleProducts: EnhancedProduct[] = [
  {
    id: 'lor-001',
    name: 'L\'Oréal Revitalift Anti-Wrinkle Firming Cream',
    category: 'Anti-Aging Skincare',
    originalData: {
      name: 'Revitalift Cream',
      description: undefined,
      price: 24.99,
      category: 'Skincare'
    },
    enhancedData: {
      name: 'L\'Oréal Revitalift Anti-Wrinkle Firming Cream - Pro-Retinol Formula',
      description: 'Advanced anti-aging moisturizer with Pro-Retinol and Centella Asiatica. Clinically proven to reduce wrinkles and firm skin in 4 weeks. Suitable for sensitive skin.',
      price: 24.99,
      suggestedPrice: 18.99,
      category: 'Anti-Aging Skincare',
      tags: ['Anti-aging', 'Pro-Retinol', 'Firming', 'Sensitive Skin', 'Clinically Tested'],
      demandScore: 94,
      competitorPrice: 22.99,
      marketPosition: 'Premium Value'
    },
    aiInsights: [
      'High demand product - Valentine\'s Day skincare trend',
      'Optimal pricing 24% below retail maintains premium positioning',
      'Strong competitor differentiation with Pro-Retinol formula'
    ],
    stock: 145
  },
  {
    id: 'lor-002',
    name: 'L\'Oréal True Match Foundation SPF 17',
    category: 'Makeup Foundation',
    originalData: {
      name: 'True Match Foundation',
      price: 12.95,
      category: 'Makeup'
    },
    enhancedData: {
      name: 'L\'Oréal True Match Super-Blendable Foundation SPF 17 - 45 Shades',
      description: 'Lightweight liquid foundation with SPF 17 protection. Perfect shade match technology with 45 shades. Oil-free, non-comedogenic formula for all skin types.',
      price: 12.95,
      suggestedPrice: 9.99,
      category: 'Makeup Foundation',
      tags: ['Foundation', 'SPF Protection', '45 Shades', 'Oil-Free', 'All Skin Types'],
      demandScore: 87,
      competitorPrice: 11.99,
      marketPosition: 'Mass Market Leader'
    },
    aiInsights: [
      'Strong spring makeup season demand expected',
      '45 shade range appeals to diverse buyer base',
      'SPF feature increases value proposition'
    ],
    stock: 289
  },
  {
    id: 'lor-003',
    name: 'L\'Oréal Age Perfect Golden Age Serum',
    category: 'Premium Skincare',
    originalData: {
      name: 'Age Perfect Serum',
      price: 32.99
    },
    enhancedData: {
      name: 'L\'Oréal Age Perfect Golden Age Re-Fortifying Serum - Precious Oil Complex',
      description: 'Luxurious anti-aging serum with precious oil complex and imperial peony extract. Restores skin comfort and radiance for mature skin 60+. Dermatologist tested.',
      price: 32.99,
      suggestedPrice: 22.99,
      category: 'Premium Anti-Aging Skincare',
      tags: ['Premium', 'Precious Oils', 'Mature Skin', '60+', 'Imperial Peony', 'Dermatologist Tested'],
      demandScore: 91,
      competitorPrice: 28.99,
      marketPosition: 'Premium Accessible'
    },
    aiInsights: [
      'Premium positioning with 30% discount attracts luxury buyers',
      'Mature skin demographic has high purchase intent',
      'Precious oil complex differentiates from standard serums'
    ],
    stock: 78
  }
];

export const ProductPreview = ({ onComplete }: ProductPreviewProps) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState<'enhanced' | 'comparison'>('enhanced');
  const [processing, setProcessing] = useState(true);

  // Simulate processing completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const currentProduct = sampleProducts[currentProductIndex];
  const totalProducts = sampleProducts.length;

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % sampleProducts.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + sampleProducts.length) % sampleProducts.length);
  };

  const stats = {
    totalEnhanced: 2347,
    dataCompletion: 96,
    priceOptimized: 89,
    marketplaceReady: 92
  };

  if (processing) {
    return (
      <div className="h-full overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-semibold institutional-heading">
                AI Enhancement Processing
              </h1>
              <p className="text-lg text-muted-foreground">
                Lily is finalizing product enhancements and market optimization
              </p>
            </div>

            <Card className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Enhancement in Progress</h3>
                  <p className="text-muted-foreground">Processing 2,347 products with AI-powered enhancements</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Product Data Enhancement</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Price Optimization</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Market Analysis</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold institutional-heading">
              Enhanced Product Preview
            </h1>
            <p className="text-lg text-muted-foreground">
              AI-enhanced L'Oréal inventory ready for marketplace deployment
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-sm">
                <span className="text-muted-foreground">Products Enhanced:</span>
                <span className="font-bold ml-1">{stats.totalEnhanced}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Data Completion:</span>
                <span className="font-bold ml-1 text-success">{stats.dataCompletion}%</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Marketplace Ready:</span>
                <span className="font-bold ml-1 text-accent-blue">{stats.marketplaceReady}%</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={prevProduct} disabled={currentProductIndex === 0}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Product {currentProductIndex + 1} of {totalProducts} (Sample)
              </span>
              <Button variant="outline" onClick={nextProduct} disabled={currentProductIndex === sampleProducts.length - 1}>
                Next
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={previewMode === 'enhanced' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPreviewMode('enhanced')}
              >
                Enhanced View
              </Button>
              <Button 
                variant={previewMode === 'comparison' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPreviewMode('comparison')}
              >
                Before/After
              </Button>
            </div>
          </div>

          {/* Main Content */}
          {previewMode === 'enhanced' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Display */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="space-y-6">
                    {/* Product Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">
                          {currentProduct.enhancedData.name}
                        </h2>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{currentProduct.enhancedData.category}</Badge>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Enhanced
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Stock</div>
                        <div className="text-lg font-bold">{currentProduct.stock} units</div>
                      </div>
                    </div>

                    {/* Product Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-16 w-16 text-purple-400" />
                    </div>

                    {/* Enhanced Description */}
                    <div>
                      <h3 className="font-medium mb-2">Enhanced Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentProduct.enhancedData.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="font-medium mb-2">AI-Generated Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProduct.enhancedData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div>
                      <h3 className="font-medium mb-2">Market Insights</h3>
                      <div className="space-y-2">
                        {currentProduct.aiInsights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Pricing & Analytics Sidebar */}
              <div className="space-y-6">
                {/* Pricing */}
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Dynamic Pricing</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Original Price</span>
                        <span className="text-sm line-through">${currentProduct.enhancedData.price}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Optimized Price</span>
                        <span className="text-lg font-bold text-success">${currentProduct.enhancedData.suggestedPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Competitor Price</span>
                        <span className="text-sm">${currentProduct.enhancedData.competitorPrice}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Market Position</span>
                        <Badge variant="outline" className="text-xs">
                          {currentProduct.enhancedData.marketPosition}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Demand Score */}
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Demand Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Demand Score</span>
                        <span className="font-bold">{currentProduct.enhancedData.demandScore}%</span>
                      </div>
                      <Progress value={currentProduct.enhancedData.demandScore} className="h-2" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">High Demand Expected</span>
                    </div>
                  </div>
                </Card>

                {/* Enhancement Score */}
                <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <h3 className="font-medium mb-4 text-purple-900">AI Enhancement Score</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                    <div className="text-sm text-purple-800">Marketplace Ready</div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            /* Comparison View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before */}
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4 text-muted-foreground">Before AI Enhancement</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {currentProduct.originalData.name || 'No name provided'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentProduct.originalData.category || 'Uncategorized'}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentProduct.originalData.description || 'No description available'}
                  </div>
                  <div className="text-lg font-bold">
                    ${currentProduct.originalData.price || 'Price not set'}
                  </div>
                </div>
              </Card>

              {/* After */}
              <Card className="p-6 border-2 border-accent-blue bg-accent-blue/5">
                <h3 className="text-lg font-medium mb-4 text-accent-blue">After AI Enhancement</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {currentProduct.enhancedData.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentProduct.enhancedData.category}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentProduct.enhancedData.description}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-success">${currentProduct.enhancedData.suggestedPrice}</span>
                    <span className="text-sm line-through text-muted-foreground">${currentProduct.enhancedData.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentProduct.enhancedData.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {currentProduct.enhancedData.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{currentProduct.enhancedData.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-8 border-t">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview All Products
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onComplete}>
                Continue to Marketplace
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={onComplete}>
                Deploy to Marketplace
                <Globe className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};