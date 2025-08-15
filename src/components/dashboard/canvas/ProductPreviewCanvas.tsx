import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Star,
  Package,
  Eye,
  ShoppingCart,
  Target,
  Sparkles,
  BarChart3,
  Users,
  Clock,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAgentState } from '@/hooks/dashboard/useAgentState';

interface ProductPreviewCanvasProps {
  agentState?: ReturnType<typeof useAgentState>;
  selectedAgent?: string | null;
}

export const ProductPreviewCanvas = ({ agentState, selectedAgent }: ProductPreviewCanvasProps) => {
  const agents = agentState?.agents || [];
  const executiveAgent = agentState?.executiveAgent;

  // Sample enhanced product data
  const featuredProducts = [
    {
      id: 'lor-001',
      name: 'L\'Oréal Revitalift Anti-Wrinkle Firming Cream',
      category: 'Anti-Aging Skincare',
      originalPrice: 24.99,
      suggestedPrice: 18.99,
      demandScore: 94,
      competitorPrice: 22.99,
      stock: 145,
      enhancedBy: ['lily', 'dahlia', 'fern']
    },
    {
      id: 'lor-002', 
      name: 'L\'Oréal True Match Foundation SPF 17',
      category: 'Makeup Foundation',
      originalPrice: 12.95,
      suggestedPrice: 9.99,
      demandScore: 87,
      competitorPrice: 11.99,
      stock: 289,
      enhancedBy: ['lily', 'fern', 'sage']
    },
    {
      id: 'lor-003',
      name: 'L\'Oréal Elvive Total Repair 5 Shampoo',
      category: 'Hair Care',
      originalPrice: 5.99,
      suggestedPrice: 4.49,
      demandScore: 72,
      competitorPrice: 5.49,
      stock: 342,
      enhancedBy: ['lily', 'dahlia']
    }
  ];

  const enhancementStats = {
    totalEnhanced: 2347,
    missingDataFilled: 96,
    priceOptimized: 89,
    demandAnalyzed: 100,
    marketplaceReady: 92
  };

  const categoryPerformance = [
    { category: 'Anti-Aging Skincare', items: 347, avgDemand: 91, revenue: 45200 },
    { category: 'Makeup & Foundation', items: 523, avgDemand: 86, revenue: 52800 },
    { category: 'Hair Care', items: 421, avgDemand: 74, revenue: 28900 },
    { category: 'Fragrances', items: 156, avgDemand: 82, revenue: 31200 }
  ];

  const getAgentIcon = (agentId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'dahlia': TrendingUp,
      'fern': DollarSign,
      'sage': Target,
      'lily': Sparkles
    };
    return iconMap[agentId] || Sparkles;
  };

  const getAgentColor = (agentId: string) => {
    const colorMap: Record<string, string> = {
      'dahlia': 'text-pink-600 bg-pink-100',
      'fern': 'text-green-600 bg-green-100', 
      'sage': 'text-blue-600 bg-blue-100',
      'lily': 'text-purple-600 bg-purple-100'
    };
    return colorMap[agentId] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="h-full p-6 space-y-6 institutional-scroll overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold institutional-heading">Product Preview</h3>
        <p className="text-sm text-muted-foreground">
          Enhanced inventory ready for marketplace deployment
        </p>
      </div>

      {/* Enhancement Overview */}
      <Card className="p-4 bg-success/5 border-success/20">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <h4 className="font-medium text-success">AI Enhancement Complete</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Products Enhanced:</span>
              <div className="font-bold financial-data">{enhancementStats.totalEnhanced}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Data Completion:</span>
              <div className="font-bold financial-data">{enhancementStats.missingDataFilled}%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Featured Products */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Top Revenue Potential
        </h4>
        <div className="space-y-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground truncate">{product.name}</h5>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <Badge variant="outline" className="text-xs ml-2">
                    {product.stock} units
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="text-sm font-bold text-success">
                        ${product.suggestedPrice}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (vs ${product.competitorPrice} market)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      Demand: {product.demandScore}%
                    </div>
                    <Progress value={product.demandScore} className="h-1 w-16" />
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Enhanced by:</span>
                  {product.enhancedBy.map((agentId) => {
                    const Icon = getAgentIcon(agentId);
                    return (
                      <div 
                        key={agentId}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${getAgentColor(agentId)}`}
                      >
                        <Icon className="h-3 w-3" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Performance */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Category Analysis
        </h4>
        <div className="space-y-2">
          {categoryPerformance.map((category) => (
            <Card key={category.category} className="p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium">{category.category}</h5>
                  <Badge variant="outline" className="text-xs">
                    {category.items} SKUs
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Avg Demand:</span>
                    <div className="font-medium">{category.avgDemand}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue:</span>
                    <div className="font-medium financial-data">${category.revenue.toLocaleString()}</div>
                  </div>
                </div>
                <Progress value={category.avgDemand} className="h-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Agent Contributions */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Agent Contributions
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-card rounded border border-border-muted">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Lily: Data Enhancement</p>
                <p className="text-xs text-muted-foreground">2,347 products enriched</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs financial-data">96% complete</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < 5 ? 'text-warning fill-current' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-card rounded border border-border-muted">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                <TrendingUp className="h-3 w-3 text-pink-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Dahlia: Demand Analysis</p>
                <p className="text-xs text-muted-foreground">Market forecasts complete</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs financial-data">94% accuracy</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < 5 ? 'text-warning fill-current' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-card rounded border border-border-muted">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Fern: Price Optimization</p>
                <p className="text-xs text-muted-foreground">Dynamic pricing ready</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs financial-data">89% optimized</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < 4 ? 'text-warning fill-current' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Readiness */}
      <Card className="p-4 bg-accent-blue/5 border-accent-blue/20">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4 text-accent-blue" />
            <h5 className="font-medium text-accent-blue">Marketplace Readiness</h5>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold financial-data text-accent-blue">
              {enhancementStats.marketplaceReady}%
            </p>
            <p className="text-sm text-muted-foreground">Ready for deployment</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Product data complete</span>
              <span className="font-medium">2,269/2,347</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pricing optimized</span>
              <span className="font-medium">2,089/2,347</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Images enhanced</span>
              <span className="font-medium">2,201/2,347</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Next Steps
        </h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <Eye className="h-4 w-4 mr-2" />
            Preview Product Listings
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <Target className="h-4 w-4 mr-2" />
            Launch Buyer Matching
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Analytics Report
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Deploy to Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
};