import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  FileText, 

  CheckCircle,
  Clock,
  AlertTriangle,
  Database,
  DollarSign,
  Shield,
  Users,
  Target,
  Search,
  BarChart3,
  FileSearch,
  Settings,
  Umbrella,
  UserCheck,
  Lock,
  Calculator,
  Crown,
  Package,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import { useAgentState } from '@/hooks/dashboard/useAgentState';
import { getRandomActivity, pinnedFindings } from '@/data/dashboard/demoData';

interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  tool: string;
  action: string;
  timestamp: Date;
  status: 'completed' | 'active' | 'pending';
  finding?: string;
}

interface InventoryProcessingCanvasProps {
  agentState?: ReturnType<typeof useAgentState>;
  selectedAgent?: string | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const DemandForecastingInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getDemandResponse = () => {
    return `Great question about seasonality - demand patterns are crucial for inventory liquidation timing.

**L'Oréal Skincare Q1-Q2 Demand Forecast:**

**High-Demand Categories (Q1 Spring Launch):**
- Anti-aging serums: 340% increase expected (Valentine's Day + spring prep)
- Moisturizers with SPF: 280% increase (UV protection awareness)
- Vitamin C products: 260% increase (winter recovery trend)

**Seasonal Patterns Analysis:**
- **January-February**: New Year skincare resolutions drive premium product demand
- **March-April**: Spring preparation creates surge in preventative care products
- **Peak Selling Window**: Feb 14 - Apr 15 (8 weeks of optimal demand)

**Price Sensitivity Analysis:**
- Premium skincare (>$50): Low price sensitivity, focus on authenticity
- Mass market ($15-50): Moderate sensitivity, 15-20% discount optimal
- Entry-level (<$15): High sensitivity, aggressive pricing needed

**Competitive Intelligence:**
- Sephora winter clearance ends Feb 28
- Ulta spring promotion starts Mar 1
- Amazon Prime Day skincare category growing 45% YoY

**Inventory Velocity Recommendations:**
- Move anti-aging products FIRST (highest margin + demand)
- Bundle slow-moving hair care with high-demand skincare
- Hold fragrance inventory until Mother's Day surge (higher prices)

**Key Buyer Segments:**
1. **Beauty Resellers** (42% of volume): Price-conscious, bulk purchases
2. **Discount Retailers** (28% of volume): Margin-focused, consistent orders  
3. **International Distributors** (18% of volume): Premium positioning possible
4. **Direct Consumers** (12% of volume): Authenticity-focused, small batches

**Recommended Actions:**
- Launch skincare liquidation by Feb 1st latest
- Reserve 30% of premium inventory for international buyers
- Create seasonal bundles to move slower categories

Data sources: Google Trends, Sephora sell-through rates, L'Oréal historical performance, beauty industry reports.`;
  };

  const simulateStreaming = (response: string, messageId: string) => {
    const words = response.split(' ');
    let currentIndex = 0;

    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const wordsToShow = words.slice(0, currentIndex + 1).join(' ');
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: wordsToShow, isStreaming: true }
            : msg
        ));
        
        currentIndex++;
        setTimeout(scrollToBottom, 50);
      } else {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isStreaming: false }
            : msg
        ));
        setIsStreaming(false);
        clearInterval(streamInterval);
      }
    }, 100);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const question = inputValue.toLowerCase();
    const demandPattern = /\b(demand|seasonal|forecast|trend|spring|winter|skincare|beauty)\b/i;
    
    if (demandPattern.test(question)) {
      setIsStreaming(true);
      
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        sender: 'ai',
        content: 'Analyzing demand patterns...',
        timestamp: new Date(),
        isStreaming: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      setTimeout(() => {
        const thinkingMessages = [
          'Accessing Google Trends for beauty products...',
          'Analyzing Sephora sell-through data...',
          'Processing L\'Oréal historical performance...',
          'Cross-referencing seasonal buying patterns...',
          'Calculating price elasticity by category...'
        ];
        
        let thinkingIndex = 0;
        const thinkingInterval = setInterval(() => {
          if (thinkingIndex < thinkingMessages.length) {
            setMessages(prev => prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, content: thinkingMessages[thinkingIndex] }
                : msg
            ));
            thinkingIndex++;
          } else {
            clearInterval(thinkingInterval);
            simulateStreaming(getDemandResponse(), aiMessageId);
          }
        }, 300);
      }, 500);
    } else {
      setIsStreaming(true);
      
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        sender: 'ai',
        content: 'Thinking...',
        timestamp: new Date(),
        isStreaming: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: "I can help you with demand forecasting, seasonal trends, or beauty product analysis. Please ask about those topics for detailed insights.", isStreaming: false }
            : msg
        ));
        setIsStreaming(false);
      }, 2000);
    }

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 pt-4 pb-20 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Ask me about demand forecasting, seasonal trends, or beauty market analysis</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className="w-full mb-6">
            <div className={`flex items-center space-x-2 mb-1 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                message.sender === 'user' ? 'bg-accent-blue' : 'bg-gradient-to-r from-pink-500 to-purple-600'
              }`}>
                {message.sender === 'user' ? 'U' : 'D'}
              </div>
              <span className="text-xs text-muted-foreground">
                {message.sender === 'user' ? 'You' : 'Dahlia: Demand Analyst'}
              </span>
            </div>
            
            <div className={`w-full ${
              message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'
            }`}>
              <div className={`max-w-full p-4 rounded-lg text-sm ${
                message.sender === 'user' 
                  ? 'bg-accent-blue text-white' 
                  : 'bg-card border border-border'
              }`}>
                {message.sender === 'ai' ? (
                  <div className="whitespace-pre-line">
                    {(message.content || '').split('**').map((part, index) => 
                      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                    )}
                    {message.isStreaming && <span className="animate-pulse">|</span>}
                  </div>
                ) : (
                  message.content || ''
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 px-3 py-3 border-t border-border-muted bg-card">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about demand forecasting, seasonality, beauty trends..."
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
          disabled={isStreaming}
        />
      </div>
    </div>
  );
};

export const InventoryProcessingCanvas = ({ agentState, selectedAgent }: InventoryProcessingCanvasProps) => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);

  const agents = agentState?.agents || [];
  const executiveAgent = agentState?.executiveAgent;
  const selectedAgentData = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;

  // Calculate live metrics from actual agent state
  const liveMetrics = {
    skusProcessed: agents.reduce((sum, agent) => sum + agent.findings, 0) * 12, // Scale up for inventory
    optimizationScore: Math.floor(
      78 + (agents.filter(a => a.status === 'completed').length / agents.length) * 17 // Start at 78%, converge to 95%
    ),
    revenueProjection: Math.floor(145000 + (agents.filter(a => a.progress > 50).length * 8500)), // Dynamic revenue projection
    categoriesAnalyzed: agents.filter(a => a.progress > 0).length + 2, // Base categories
    activeAgents: agents.filter(a => a.status === 'running' || a.status === 'waiting').length
  };

  // Pollen.tech agent icon mapping
  const getAgentIcon = (agentId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'dahlia': TrendingUp,      // Demand Analysis
      'fern': DollarSign,        // Financial/Pricing
      'sage': Target,            // Sales/Marketplace
      'lily': Sparkles,          // AI Enhancement (executive agent)
      'executive': Crown
    };
    return iconMap[agentId] || FileText;
  };

  const getToolIcon = (tool: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'Demand Forecaster': TrendingUp,
      'Market Trend Analyzer': BarChart3,
      'Price Optimizer': DollarSign,
      'Buyer Matcher': Target,
      'Listing Optimizer': FileSearch,
      'Enhancement Engine': Sparkles,
      'QueryDocuments': FileSearch,
      'WebSearch': Search,
      'RunAnalysis': BarChart3,
      'QueryPartnerDataProvider': Database
    };
    return iconMap[tool] || Activity;
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    return `${Math.floor(diffSecs / 3600)}h ago`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'active': return <Activity className="h-4 w-4 text-accent-blue animate-pulse-glow" />;
      case 'pending': return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  // Check if all agents are completed
  const allAgentsCompleted = agents.every(agent => agent.status === 'completed');

  // If Dahlia agent is completed, return full-screen chat interface
  if (selectedAgent === 'dahlia' && selectedAgentData?.status === 'completed') {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-border-muted flex-shrink-0">
          <h2 className="text-xl font-semibold institutional-heading mb-2">Dahlia: Demand Analyst</h2>
          <p className="text-sm text-muted-foreground">
            Interactive demand forecasting and market analysis
          </p>
        </div>

        <div className="flex-1 min-h-0">
          <DemandForecastingInterface />
        </div>
      </div>
    );
  }

  // Render contextual content based on state
  const renderContextualContent = () => {
    // State 1: GeneralProcessing - No agent selected, processing
    if (!selectedAgent && !allAgentsCompleted) {
      return (
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="font-medium mb-4">Batch Overview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Product Category:</span>
                <div className="font-medium">Beauty & Cosmetics</div>
              </div>
              <div>
                <span className="text-muted-foreground">Brand:</span>
                <div className="font-medium">L'Oréal</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total SKUs:</span>
                <div className="font-medium">2,347</div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="font-medium text-orange-600">AI Processing Stage</div>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    // State 2: GeneralCompleted - No agent selected, all completed
    if (!selectedAgent && allAgentsCompleted) {
      return (
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="font-medium mb-4">Demand Forecast Results</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• High demand expected for anti-aging serums (Q1 surge)</p>
              <p>• Seasonal opportunity: Valentine's Day + spring prep</p>
              <p>• Optimal selling window: Feb 14 - Apr 15</p>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">Revenue Optimization Score</h4>
            <div className="text-2xl font-bold text-green-600 mb-2">{liveMetrics.optimizationScore}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${liveMetrics.optimizationScore}%` }}></div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">Revenue Projection</h4>
            <div className="text-2xl font-bold text-success mb-2">${liveMetrics.revenueProjection.toLocaleString()}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">Marketplace Readiness</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Premium products: Ready for direct listing</p>
              <p>• Volume bundles: Buyer matching in progress</p>
            </div>
          </Card>
        </div>
      );
    }

    // State 3: DahliaAgentProcessing - Dahlia agent selected, processing
    if (selectedAgent === 'dahlia' && selectedAgentData?.status !== 'completed') {
      return (
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="font-medium mb-4">Current Analysis Focus</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Historical sales data analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></div>
                <span>Google Trends and social media sentiment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span>Seasonal demand pattern modeling</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">Beauty Market Insights</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Q1 skincare demand typically increases 280%</p>
              <p>• Anti-aging products peak in Jan-Feb</p>
              <p>• Spring preparation drives moisturizer sales</p>
            </div>
          </Card>
        </div>
      );
    }

    // State 4: Other agents selected
    if (selectedAgent && selectedAgent !== 'dahlia') {
      const agentNames = {
        'fern': 'Fern: Financial Advisor',
        'sage': 'Sage: Sales Expert',
        'lily': 'Lily: AI Enhancement Coordinator'
      };
      
      return (
        <div className="space-y-6">
          <div className="text-center py-8 text-muted-foreground">
            <h3 className="text-lg font-medium mb-2">{agentNames[selectedAgent as keyof typeof agentNames]?.replace(/: .+$/, '') || 'Agent'} Analysis</h3>
            <p className="text-sm mb-4">
              Detailed analysis for this agent will be implemented next
            </p>
            <div className="text-xs">
              Currently showing contextual content for Dahlia: Demand Analyst only
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border-muted flex-shrink-0">
        {selectedAgent === 'dahlia' ? (
          <h2 className="text-xl font-semibold institutional-heading mb-2">Dahlia: Demand Analyst</h2>
        ) : (
          <h2 className="text-xl font-semibold institutional-heading mb-2">Canvas</h2>
        )}
        <p className="text-sm text-muted-foreground">
          Contextual insights and inventory analysis
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <div className="p-6 pb-8 space-y-6 h-full">
          {/* Live Metrics - Show different content when Dahlia agent is selected */}
          {selectedAgent === 'dahlia' ? (
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Sources Active</span>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Google Trends Beauty Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>L'Oréal Historical Sales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Sephora Market Intelligence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Social Media Sentiment Feed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Seasonal Pattern Database</span>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">SKUs Processed</span>
                    <Package className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-2xl font-bold financial-data">{liveMetrics.skusProcessed}</p>
                  <p className="text-xs text-success">Live from all agents</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Revenue Projection</span>
                    <DollarSign className="h-4 w-4 text-accent-blue" />
                  </div>
                  <p className="text-lg font-bold financial-data">${liveMetrics.revenueProjection.toLocaleString()}</p>
                  <Progress value={liveMetrics.optimizationScore} className="h-1" />
                </div>
              </Card>
            </div>
          )}

          {/* Contextual Content Based on Selected Agent and State */}
          {renderContextualContent()}
        </div>
      </div>
    </div>
  );
};