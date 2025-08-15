import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, FileSpreadsheet, File, Shield, TrendingUp, Users, Calendar, Clock, Upload, MessageSquare, CheckCircle } from 'lucide-react';

export const UploadCanvas = () => {


  return (
    <div className="h-full p-6 space-y-6 institutional-scroll overflow-y-auto">
      {/* Liquidation Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold institutional-heading">L'Oréal Beauty Inventory Liquidation</h3>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Liquidation Opportunity:</strong> Premium beauty product inventory 
            positioned to maximize recovery through strategic pricing, demand forecasting, and multi-channel marketplace optimization.
          </p>
        </div>
      </div>

      {/* Timeline & Milestones */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-accent-blue" />
          <h3 className="text-lg font-semibold institutional-heading">Timeline & Milestones</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Inventory Upload</span>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Agent Processing Kickoff</span>
                <Badge variant="secondary" className="text-xs">Completed</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full mt-1 flex-shrink-0 animate-pulse"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Demand Analysis Report</span>
                <Badge variant="outline" className="text-xs">In Progress</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-muted-foreground rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Marketplace Listing</span>
                <Badge variant="outline" className="text-xs">Upcoming</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-muted-foreground rounded-full mt-1 flex-shrink-0"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">Liquidation Strategy Review</span>
                <Badge variant="outline" className="text-xs">Scheduled</Badge>
              </div>
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
            <Upload className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Michael Rodriguez</span> uploaded Financial_Statements_Q4_2024.pdf
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <MessageSquare className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Sarah Chen</span> added comment on Environmental Impact Assessment
              </p>
              <p className="text-xs text-muted-foreground">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <Upload className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Priya Sharma</span> uploaded Loreal_Product_Catalog_v2.pdf
              </p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-sm">
            <MessageSquare className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">Beauty Retail Partners</span> requested additional product specifications
              </p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
};