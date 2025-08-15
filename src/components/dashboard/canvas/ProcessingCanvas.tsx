import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  FileText, 
  Sparkles,
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
  Crown
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

interface ProcessingCanvasProps {
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

const FinancialChatInterface = () => {
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

  const getCPIResponse = () => {
    return `Great question about demand forecasting - these are exactly the kinds of details that can make or break a liquidation strategy.

For the L'Oréal inventory demand analysis, I've built the forecasting model with the following assumptions:

**Base Case Demand Projections:**
- Q1 2025: 23% higher demand vs Q4 2024 (Valentine's Day and spring refresh cycle)
- Q2 2025: Stabilization at +15% vs baseline (sustained anti-aging product trend)
- H2 2025: Seasonal normalization with 8-12% growth

**Key reasoning behind these numbers:**
- Social media analytics show 40% increase in TikTok mentions for vitamin C serums
- Anti-aging products consistently outperforming market by 15-20%
- Valentine's Day gift sets historically drive 25-30% uplift in Q1
- Sustainable packaging preference aligns with L'Oréal's positioning

**Price Optimization Analysis:**
I've modeled optimal pricing at 65% of retail value for premium skincare, with bundle strategies increasing conversion by 28%. Recovery projections show 78% for skincare category vs 65% for makeup.

**Channel Performance:**
- Direct-to-consumer: 45% margin potential with higher conversion
- Amazon optimization: 40% increase in views through keyword targeting
- eBay auctions: 25% bid increase with optimized timing

**Data Sources:** 
Beauty industry reports, social media sentiment analysis, and historical liquidation data from similar premium cosmetics inventories.

The pricing model accounts for shelf life considerations and seasonal demand patterns. I can walk you through the specific calculations if you'd like to see how consumer behavior trends translate to recovery rates.

**Sources:**
[1] Beauty Industry Analysis Q4 2024: Market demand trends
[2] Social Media Sentiment Report: Skincare product mentions 
[3] Loreal_Inventory_Manifest.xlsx (Product details and quantities)
[4] Market_Analysis_Beauty_2024.pdf (Competitive landscape)
[5] Pricing_Strategy_Analysis.pdf (Recovery optimization model)`;
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
        
        // Auto-scroll as content streams
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
    }, 100); // Stream one word every 100ms
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
    
    // Check if question matches demand/pricing patterns
    const question = inputValue.toLowerCase();
    const demandPattern = /\b(demand|pricing|forecast|recovery|loreal|beauty|cosmetics)\b/i;
    
    if (demandPattern.test(question)) {
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
      
      // Think for 2 seconds before streaming the response
      setTimeout(() => {
        // Update thinking message with sources being referenced
        const thinkingMessages = [
          'Accessing beauty industry demand database...',
          'Reviewing social media sentiment analysis...',
          'Cross-referencing Loreal_Inventory_Manifest.xlsx...',
          'Pulling data from Market_Analysis_Beauty_2024.pdf...',
          'Analyzing Pricing_Strategy_Analysis.pdf...'
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
            simulateStreaming(getCPIResponse(), aiMessageId);
          }
        }, 300);
      }, 500);
    } else {
      // Default response for other questions
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
            ? { ...msg, content: "I can help you with questions about demand forecasting, pricing strategies, or beauty product market analysis. Please try asking about those topics.", isStreaming: false }
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
      {/* Chat Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 pt-4 pb-20 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Ask me anything about the demand analysis</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className="w-full mb-6">
            {/* Avatar above message */}
            <div className={`flex items-center space-x-2 mb-1 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                message.sender === 'user' ? 'bg-accent-blue' : 'bg-green-600'
              }`}>
                {message.sender === 'user' ? 'U' : 'AI'}
              </div>
              <span className="text-xs text-muted-foreground">
                {message.sender === 'user' ? 'You' : 'Demand Agent'}
              </span>
            </div>
            
            {/* Full width message bubble */}
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

      {/* Chat Input - Fixed at bottom */}
      <div className="flex-shrink-0 px-3 py-3 border-t border-border-muted bg-card">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about demand forecasting, pricing, recovery..."
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
          disabled={isStreaming}
        />
      </div>
    </div>
  );
};

export const ProcessingCanvas = ({ agentState, selectedAgent }: ProcessingCanvasProps) => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);

  const agents = agentState?.agents || [];
  const executiveAgent = agentState?.executiveAgent;
  const selectedAgentData = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;

  // Calculate live metrics from actual agent state
  const liveMetrics = {
    totalFindings: agents.reduce((sum, agent) => sum + agent.findings, 0) + (executiveAgent?.findings || 0),
    riskFlags: Math.max(1, Math.floor(agents.filter(a => a.status === 'running').length / 2)),
    confidenceScore: Math.floor(
      86 + (agents.filter(a => a.status === 'completed').length / agents.length) * 9 // Start at 86%, converge to 95%
    ),
    documentsProcessed: agents.filter(a => a.progress > 0).length + 6, // Base processed docs
    activeAgents: agents.filter(a => a.status === 'running' || a.status === 'waiting').length
  };

  // Initialize with some sample logs if agents exist
  useEffect(() => {
    if (agents.length > 0 && activityLogs.length === 0) {
      const initialLogs: ActivityLog[] = [
        {
          id: 'init-1',
          agentId: 'dahlia',
          agentName: 'Dahlia: Demand Analyst',
          tool: 'Demand Forecaster',
          action: 'Loading L\'Oréal inventory manifest',
          timestamp: new Date(Date.now() - 30000),
          status: 'completed'
        },
        {
          id: 'init-2', 
          agentId: 'fern',
          agentName: 'Fern: Financial Advisor',
          tool: 'Price Optimizer',
          action: 'Analyzing beauty product market trends',
          timestamp: new Date(Date.now() - 15000),
          status: 'completed'
        }
      ];
      setActivityLogs(initialLogs);
      setRecentActivity(initialLogs);
    }
  }, [agents, activityLogs.length]);

  // Generate realistic activity logs using rich data source
  useEffect(() => {
    const interval = setInterval(() => {
      const activeAgents = agents.filter(a => a.status === 'running' || a.status === 'waiting');
      
      if (activeAgents.length > 0) {
        // Get weighted random activity from data
        const activity = getRandomActivity();
        
        // Find the matching agent
        const matchingAgent = activeAgents.find(a => a.id === activity.agentId);
        if (!matchingAgent) return; // Skip if agent not active
        
        const newLog: ActivityLog = {
          id: Date.now().toString(),
          agentId: activity.agentId,
          agentName: matchingAgent.name,
          tool: activity.tool,
          action: activity.action,
          timestamp: new Date(),
          status: 'active',
          // Show findings less frequently to make discoveries feel more special
          finding: activity.findings && activity.findings.length > 0 && Math.random() < 0.2
            ? activity.findings[Math.floor(Math.random() * activity.findings.length)]
            : undefined
        };

        // Update tool usage stream (longer retention)
        setActivityLogs(prev => {
          const updated = prev.map(log => ({
            ...log,
            status: 'completed' as const
          }));
          return [newLog, ...updated].slice(0, 25);
        });

        // Update recent activity (shorter, more focused)
        setRecentActivity(prev => {
          const updated = prev.map(log => ({
            ...log,
            status: 'completed' as const
          }));
          return [newLog, ...updated].slice(0, 8);
        });
      }
    }, 800 + Math.random() * 1500);

    return () => clearInterval(interval);
  }, [agents]);

  // If Dahlia agent is completed, return full-screen chat interface
  if (selectedAgent === 'dahlia' && selectedAgentData?.status === 'completed') {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border-muted flex-shrink-0">
          <h2 className="text-xl font-semibold institutional-heading mb-2">Dahlia: Demand Analyst</h2>
          <p className="text-sm text-muted-foreground">
            Interactive demand analysis chat
          </p>
        </div>

        {/* Full-screen chat interface */}
        <div className="flex-1 min-h-0">
          <FinancialChatInterface />
        </div>
      </div>
    );
  }

  // Tool icon mapping
  const getToolIcon = (tool: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'Financial Ratio Calculator': DollarSign,
      'Market Sizing Model': TrendingUp,
      'Contract Analyzer': Shield,
      'Code Quality Scanner': Sparkles,
      'Leadership Profiler': Users,
      'Process Analyzer': Target,
      'QueryDocuments': FileSearch,
      'WebSearch': Search,
      'RunAnalysis': BarChart3,
      'QueryPartnerDataProvider': Database
    };
    return iconMap[tool] || Activity;
  };

  const getAgentIcon = (agentId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'dahlia': TrendingUp,    // Demand Analyst
      'fern': DollarSign,      // Financial Advisor
      'sage': Users,           // Sales Expert
      'lily': Crown            // Executive Coordinator
    };
    return iconMap[agentId] || FileText;
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

  const getProgressStatusBadge = (agent: any) => {
    if (agent.status === 'completed') return 'default';
    if (agent.status === 'running') return 'secondary';
    return 'outline';
  };

  // Check if all agents are completed
  const allAgentsCompleted = agents.every(agent => agent.status === 'completed');

  // Render contextual content based on state
  const renderContextualContent = () => {
    // State 1: GeneralProcessing - No agent selected, processing
    if (!selectedAgent && !allAgentsCompleted) {
      return (
        <div className="space-y-6">
          
          <Card className="p-6">
            <h4 className="font-medium mb-4">High-Level Overview</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Inventory Type:</span>
                <div className="font-medium">L'Oréal Beauty Products</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total Units:</span>
                <div className="font-medium">2,400 Units</div>
              </div>
              <div>
                <span className="text-muted-foreground">Est. Value:</span>
                <div className="font-medium">$156K</div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="font-medium text-orange-600">Processing Stage 1</div>
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
            <h4 className="font-medium mb-4">Key Risks</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Seasonal demand fluctuations in beauty market</p>
              <p>• Competition from discount retailers</p>
              <p>• Limited shelf life for certain products</p>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">ESG Score</h4>
            <div className="text-2xl font-bold text-green-600 mb-2">8.4/10</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">Recovery Score</h4>
            <div className="text-2xl font-bold text-green-600 mb-2">7.8/10</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-4">Potential Upsides</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Premium brand recognition (L'Oréal)</p>
              <p>• Multiple sales channel opportunities</p>
              <p>• Strong demand for anti-aging products</p>
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
                <span>Beauty product demand analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></div>
                <span>Price optimization and margin calculation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span>Market trend analysis and forecasting</span>
              </div>
            </div>
          </Card>

        </div>
      );
    }

    // State 4: DahliaAgentCompleted - This is now handled at the top level
    // (removed to prevent duplication)

    // Default fallback for other agents (placeholder)
    if (selectedAgent && selectedAgent !== 'dahlia') {
      return (
        <div className="space-y-6">
          <div className="text-center py-8 text-muted-foreground">
            <h3 className="text-lg font-medium mb-2">{selectedAgentData?.name.replace(' Agent', '')} Analysis</h3>
            <p className="text-sm mb-4">
              Detailed analysis for this agent will be implemented next
            </p>
            <div className="text-xs">
              Currently showing contextual content for Dahlia Demand Analysis only
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
          Contextual insights and detailed analysis
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <div className="p-6 pb-8 space-y-6 h-full">
          {/* Live Metrics - Show different content when Dahlia agent is selected */}
          {selectedAgent === 'dahlia' ? (
            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Documents Referenced</span>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Loreal_Inventory_Manifest.xlsx</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Product_Catalog_Detailed.pdf</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Market_Analysis_Beauty_2024.pdf</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Sales_Data_Historical.xlsx</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Pricing_Strategy_Analysis.pdf</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Competitor_Pricing_Data.pdf</span>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Findings</span>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-2xl font-bold financial-data">{liveMetrics.totalFindings}</p>
                  <p className="text-xs text-success">Live from all agents</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <Sparkles className="h-4 w-4 text-accent-blue" />
                  </div>
                  <p className="text-2xl font-bold financial-data">{liveMetrics.confidenceScore}%</p>
                  <Progress value={liveMetrics.confidenceScore} className="h-1" />
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