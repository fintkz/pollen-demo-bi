import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  FileText, 
  Shield, 
  Users, 
  DollarSign, 
  Sparkles,
  Target,
  Crown,
  ChevronDown,
  ChevronRight,
  Activity,
  Settings,
  Umbrella,
  UserCheck,
  Lock,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAgentState, AgentStatus } from '@/hooks/dashboard/useAgentState';

interface AIAgentProcessingProps {
  onComplete: () => void;
  agentState: ReturnType<typeof useAgentState>;
  selectedAgent: string | null;
  setSelectedAgent: (agent: string | null) => void;
}

export const AIAgentProcessing = ({ onComplete, agentState, selectedAgent, setSelectedAgent }: AIAgentProcessingProps) => {
  const { agents, executiveAgent } = agentState;
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set());

  // Pollen.tech Agent icon mapping
  const getAgentIcon = (agentId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'dahlia': TrendingUp,      // Demand Analysis
      'fern': DollarSign,       // Financial/Pricing
      'sage': Target,           // Sales/Marketplace
      'lily': Sparkles,         // AI Enhancement (executive agent)
      'executive': Crown
    };
    return iconMap[agentId] || FileText;
  };

  // Remove auto-complete - user will manually proceed
  // useEffect(() => {
  //   if (executiveAgent.status === 'completed') {
  //     const timer = setTimeout(() => onComplete(), 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [executiveAgent.status, onComplete]);

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'completed': return 'bg-success border-success text-success-foreground';
      case 'running': return 'bg-accent-blue border-accent-blue text-accent-blue-foreground';
      case 'waiting': return 'bg-warning border-warning text-warning-foreground';
      case 'pending': return 'bg-muted border-border text-muted-foreground';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'running': return <Activity className="h-4 w-4 animate-pulse-glow" />;
      case 'completed': return <div className="w-4 h-4 bg-success rounded-full" />;
      case 'waiting': return <div className="w-4 h-4 bg-warning rounded-full animate-pulse" />;
      case 'pending': return <div className="w-4 h-4 bg-muted-foreground rounded-full" />;
      default: return null;
    }
  };

  const toggleAgentExpansion = (agentId: string) => {
    const newExpanded = new Set(expandedAgents);
    if (newExpanded.has(agentId)) {
      newExpanded.delete(agentId);
    } else {
      newExpanded.add(agentId);
    }
    setExpandedAgents(newExpanded);
  };

  const completedAgents = agents.filter(a => a.status === 'completed').length;
  const runningAgents = agents.filter(a => a.status === 'running').length;
  const waitingAgents = agents.filter(a => a.status === 'waiting').length;

  return (
    <div 
      className="h-full overflow-y-auto"
      onWheel={(e) => e.stopPropagation()}
    >
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
        {/* Dynamic Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold institutional-heading">
            L'Oréal Q4 Excess Inventory Processing
          </h1>
          <p className="text-lg text-muted-foreground">
            {executiveAgent.status === 'completed' 
              ? '2,347 SKUs processed | AI agents completed analysis and optimization'
              : '2,347 SKUs | Multi-agent processing: Demand analysis, pricing optimization & marketplace prep'
            }
          </p>
        </div>


        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {agents.map((agent) => {
            const Icon = getAgentIcon(agent.id);
            const isExpanded = expandedAgents.has(agent.id);
            
            return (
              <Card 
                key={agent.id} 
                className={`border-l-4 ${getStatusColor(agent.status).split(' ')[1]} transition-all duration-200 hover:shadow-lg cursor-pointer ${
                  selectedAgent === agent.id ? 'ring-2 ring-accent-blue bg-accent-blue/5' : ''
                }`}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              >
                <div className="p-4 space-y-3">
                  {/* Agent Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Findings: <span className="font-medium text-foreground">{agent.findings}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Time: <span className="font-medium text-foreground financial-data">{agent.timeElapsed}</span>
                      </span>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {agent.reasoning.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between p-0 h-auto"
                          onClick={() => toggleAgentExpansion(agent.id)}
                        >
                          <span className="text-sm text-muted-foreground">View Details</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 space-y-2">
                        <div className="text-xs text-muted-foreground space-y-1">
                          {agent.reasoning.map((reason, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-1.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pollen.tech AI Master Coordinator - Moved to Bottom */}
        <div className="max-w-4xl mx-auto">
          <Card className={`border-l-4 border-warning bg-warning/5 ${
            executiveAgent.status === 'completed' ? 'border-success bg-success/5' : ''
          }`}>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-muted-foreground">Coordinating analysis across agents</span>
                  {executiveAgent.status === 'completed' && (
                    <div className="font-medium mt-1">Comprehensive analysis complete</div>
                  )}
                </div>
                <Progress value={executiveAgent.progress} className="h-3" />
                
                <div className="flex items-center justify-center space-x-8 text-sm">
                  <span className="text-muted-foreground">
                    Cross-Agent Insights: <span className="font-medium text-foreground">{executiveAgent.findings}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Processing Time: <span className="font-medium text-foreground financial-data">{executiveAgent.timeElapsed}</span>
                  </span>
                </div>

                {executiveAgent.reasoning.length > 0 && (
                  <div className="mt-4 p-4 bg-card rounded border border-border-muted">
                    <h4 className="font-medium mb-2">Key Synthesis Points:</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {executiveAgent.reasoning.map((reason, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Marketplace Summary & Next Steps */}
                {executiveAgent.status === 'completed' && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg text-foreground mb-2">Analysis Complete!</h4>
                        <p className="text-sm text-muted-foreground">
                          Generated <span className="font-medium text-green-600">2,347 optimized marketplace listings</span> with AI-recommended pricing, 
                          demand-based positioning, and automated product descriptions. 
                          <span className="font-medium text-blue-600"> Projected recovery: $185K+ value</span>.
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          onClick={onComplete}
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-2"
                        >
                          Preview Marketplace Listings
                          <span className="ml-2">→</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        </div>
      </div>
    </div>
  );
};