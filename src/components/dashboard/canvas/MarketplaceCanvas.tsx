import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  Star,
  FileText,
  Download,
  Share,
  Calendar,
  ShoppingCart,
  Users,
  Target,
  DollarSign,
  Package,
  Globe,
  MessageSquare,
  Eye,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MarketplaceCanvas = () => {
  const marketplaceMetrics = {
    totalListings: 2347,
    liveListings: 2201,
    avgViewsPerListing: 127,
    inquiriesReceived: 89
  };

  const buyerSegments = [
    { segment: 'Beauty Resellers', interest: 94, avgOrder: '$1,250', volume: '42%' },
    { segment: 'Discount Retailers', interest: 87, avgOrder: '$2,890', volume: '28%' },
    { segment: 'International Distributors', interest: 91, avgOrder: '$4,650', volume: '18%' },
    { segment: 'Direct Consumers', interest: 76, avgOrder: '$85', volume: '12%' }
  ];

  const topPerformingListings = [
    { 
      product: 'L\'Oréal Revitalift Anti-Wrinkle Cream', 
      views: 342, 
      inquiries: 28, 
      offers: 12, 
      category: 'Anti-Aging Skincare',
      status: 'hot'
    },
    { 
      product: 'L\'Oréal True Match Foundation Bundle', 
      views: 298, 
      inquiries: 23, 
      offers: 8, 
      category: 'Makeup Foundation',
      status: 'active'
    },
    { 
      product: 'L\'Oréal Professional Hair Care Set', 
      views: 186, 
      inquiries: 15, 
      offers: 5, 
      category: 'Hair Care',
      status: 'active'
    }
  ];

  const recentActivity = [
    { 
      type: 'inquiry',
      buyer: 'Premium Beauty Supply Co.',
      product: 'Anti-Wrinkle Cream Bundle',
      quantity: '150 units',
      time: '2 hours ago'
    },
    { 
      type: 'offer',
      buyer: 'Discount Retailer Network',
      product: 'Foundation Mixed Lot',
      amount: '$2,850',
      time: '4 hours ago'
    },
    { 
      type: 'view',
      buyer: 'International Beauty Dist.',
      product: 'Premium Skincare Collection',
      quantity: 'Bulk viewing',
      time: '6 hours ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'inquiry': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'offer': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'view': return <Eye className="h-4 w-4 text-orange-500" />;
      default: return <Package className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-700 border-red-200';
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-full p-6 space-y-6 institutional-scroll overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold institutional-heading">Pollen Direct Marketplace</h3>
        <p className="text-sm text-muted-foreground">
          Live marketplace performance and buyer engagement
        </p>
      </div>

      {/* Marketplace Status */}
      <Card className="p-4 bg-success/5 border-success/20">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <h4 className="font-medium text-success">Marketplace Active</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Live Listings:</span>
              <div className="font-bold financial-data">{marketplaceMetrics.liveListings}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Inquiries:</span>
              <div className="font-bold financial-data">{marketplaceMetrics.inquiriesReceived}</div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Avg views per listing</p>
            <p className="text-2xl font-bold text-success">{marketplaceMetrics.avgViewsPerListing}</p>
          </div>
        </div>
      </Card>

      {/* Top Performing Products */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Top Performing Listings
        </h4>
        <div className="space-y-3">
          {topPerformingListings.map((listing, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground truncate">{listing.product}</h5>
                    <p className="text-xs text-muted-foreground">{listing.category}</p>
                  </div>
                  <Badge className={`text-xs ml-2 ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{listing.views}</span>
                    </div>
                    <span className="text-muted-foreground">views</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <MessageSquare className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{listing.inquiries}</span>
                    </div>
                    <span className="text-muted-foreground">inquiries</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{listing.offers}</span>
                    </div>
                    <span className="text-muted-foreground">offers</span>
                  </div>
                </div>

                <Progress value={(listing.inquiries / listing.views) * 100} className="h-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Buyer Segments */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Buyer Segments
        </h4>
        <div className="space-y-2">
          {buyerSegments.map((segment, index) => (
            <Card key={index} className="p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium">{segment.segment}</h5>
                  <Badge variant="outline" className="text-xs">
                    {segment.volume} of volume
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Interest Score:</span>
                    <div className="font-medium">{segment.interest}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg Order:</span>
                    <div className="font-medium financial-data">{segment.avgOrder}</div>
                  </div>
                </div>
                <Progress value={segment.interest} className="h-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Marketplace Activity */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-card rounded border border-border-muted">
              {getActivityIcon(activity.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.buyer}</span> {activity.type === 'inquiry' ? 'inquired about' : activity.type === 'offer' ? 'made offer on' : 'viewed'} {activity.product}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {activity.quantity || activity.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <Card className="p-4 bg-accent-blue/5 border-accent-blue/20">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-accent-blue" />
            <h5 className="font-medium text-accent-blue">Marketplace Performance</h5>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Conversion Rate:</span>
              <div className="font-bold financial-data text-accent-blue">12.4%</div>
            </div>
            <div>
              <span className="text-muted-foreground">Avg Response Time:</span>
              <div className="font-bold financial-data text-accent-blue">2.3 hours</div>
            </div>
          </div>
          <div className="text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Listing completion rate</span>
              <span className="font-medium">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Buyer satisfaction score</span>
              <span className="font-medium">4.7/5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Repeat buyer rate</span>
              <span className="font-medium">67%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Sage Insights */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-blue-600" />
            <h5 className="font-medium text-blue-900">Sage: Sales Optimization</h5>
          </div>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• <strong>Premium skincare</strong> driving highest inquiry rates (3.2x average)</p>
            <p>• <strong>Beauty resellers</strong> showing strong bulk purchase intent</p>
            <p>• <strong>International distributors</strong> requesting exclusive territory rights</p>
            <p>• <strong>Pricing sweet spot</strong> identified at 22-26% below retail</p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-4">
        <h4 className="font-medium text-muted-foreground uppercase tracking-wide text-sm">
          Marketplace Actions
        </h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <Users className="h-4 w-4 mr-2" />
            Manage Buyer Relationships
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics Dashboard
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <Download className="h-4 w-4 mr-2" />
            Export Sales Report
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start surgical-button">
            <Globe className="h-4 w-4 mr-2" />
            Expand to New Markets
          </Button>
        </div>
      </div>
    </div>
  );
};