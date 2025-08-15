import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Package, Sparkles, Calendar, Clock, Upload, MessageSquare, CheckCircle, TrendingUp } from 'lucide-react';

export const InventoryUploadCanvas = () => {
  return (
    <div className="h-full p-6 space-y-6 institutional-scroll overflow-y-auto">
      {/* Batch Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold institutional-heading">L'Oréal Excess Stock Q4 2024</h3>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Liquidation Opportunity:</strong> Premium beauty and cosmetics 
            inventory batch with high-demand SKUs positioned for rapid marketplace deployment.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Total SKUs</span>
              <div className="text-lg font-semibold text-foreground">2,347</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Est. Recovery</span>
              <div className="text-lg font-semibold text-foreground">$185K</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lily AI Enhancement Workflow */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold institutional-heading text-purple-900">Lily: AI Enhancement</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Product Information Enhancement</span>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Added missing descriptions, categories, and specifications</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Image Enhancement & Analysis</span>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Enhanced product images and extracted visual features</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full mt-1 flex-shrink-0 animate-pulse"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Market Positioning Analysis</span>
                <Badge variant="outline" className="text-xs">In Progress</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Analyzing competitive positioning and market demand</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-muted-foreground rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Agent Coordination Ready</span>
                <Badge variant="outline" className="text-xs">Queued</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Ready for multi-agent processing pipeline</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Inventory Categories */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Package className="h-5 w-5 text-accent-blue" />
          <h3 className="text-lg font-semibold institutional-heading">Inventory Breakdown</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-card rounded border border-border-muted">
            <span className="text-sm text-muted-foreground">Skincare Products</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium financial-data">847 SKUs</span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-card rounded border border-border-muted">
            <span className="text-sm text-muted-foreground">Makeup & Cosmetics</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium financial-data">923 SKUs</span>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-card rounded border border-border-muted">
            <span className="text-sm text-muted-foreground">Hair Care</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium financial-data">421 SKUs</span>
              <TrendingUp className="h-4 w-4 text-warning" />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-card rounded border border-border-muted">
            <span className="text-sm text-muted-foreground">Fragrances</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium financial-data">156 SKUs</span>
              <TrendingUp className="h-4 w-4 text-warning" />
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity Feed */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-accent-blue" />
          <h3 className="text-lg font-semibold institutional-heading">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Lily AI</span> enhanced 2,347 SKUs with missing product data
              </p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <Upload className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Sarah Chen</span> uploaded L'Oreal_Inventory_Master_Q4.xlsx
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <MessageSquare className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Michael Rodriguez</span> added note about seasonal demand patterns
              </p>
              <p className="text-xs text-muted-foreground">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <Upload className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Operations Team</span> uploaded Product_Images_Batch_1.zip
              </p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Processing Pipeline Status */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-accent-blue" />
          <h3 className="text-lg font-semibold institutional-heading">Processing Pipeline</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Data Upload & Validation</span>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">AI Enhancement (Lily)</span>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-muted-foreground rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Multi-Agent Processing</span>
                <Badge variant="outline" className="text-xs">Next</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-muted-foreground rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Marketplace Deployment</span>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};