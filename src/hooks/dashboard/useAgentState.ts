import { useState, useEffect } from 'react';
import { agentTemplates, executiveSummaryTemplate } from '../../data/dashboard/demoData';

export type AgentStatus = 'pending' | 'running' | 'completed' | 'waiting';

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  progress: number;
  currentTask: string;
  findings: number;
  timeElapsed: string;
  tools: string[];
  reasoning: string[];
}

export interface ExecutiveAgent extends Agent {
  // Additional properties specific to executive summary agent
}

// Convert templates to initial agent state
const initialAgents: Agent[] = agentTemplates.map(template => ({
  id: template.id,
  name: template.name,
  description: template.description,
  status: template.initialStatus,
  progress: template.initialProgress,
  currentTask: template.initialTask,
  findings: template.initialFindings,
  timeElapsed: '0m 0s', // Will be updated in real-time
  tools: template.tools,
  reasoning: template.reasoning
}));

const initialExecutiveAgent: ExecutiveAgent = {
  id: executiveSummaryTemplate.id,
  name: executiveSummaryTemplate.name,
  description: executiveSummaryTemplate.description,
  status: executiveSummaryTemplate.initialStatus,
  progress: executiveSummaryTemplate.initialProgress,
  currentTask: executiveSummaryTemplate.initialTask,
  findings: executiveSummaryTemplate.initialFindings,
  timeElapsed: '0m 0s',
  tools: executiveSummaryTemplate.tools,
  reasoning: executiveSummaryTemplate.reasoning
};

export const useAgentState = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [executiveAgent, setExecutiveAgent] = useState<ExecutiveAgent>(initialExecutiveAgent);
  const [startTime] = useState<Date>(new Date());

  // Real-time clock updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      
      setAgents(prevAgents => 
        prevAgents.map(agent => {
          // Update real-time elapsed time
          const minutes = Math.floor(elapsed / 60);
          const seconds = elapsed % 60;
          const timeElapsed = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
          
          // Update progress and findings for running agents
          if (agent.status === 'running' && agent.progress < 100) {
            const newProgress = Math.min(agent.progress + Math.random() * 6.25, 100);
            
            // Increment findings based on progress milestones
            let newFindings = agent.findings;
            if (Math.random() < 0.5) { // 50% chance to find something each second
              newFindings += 1;
            }
            
            const newStatus = newProgress >= 100 ? 'completed' : 'running';
            
            return {
              ...agent,
              progress: newProgress,
              status: newStatus as AgentStatus,
              currentTask: newStatus === 'completed' ? 'Analysis complete' : agent.currentTask,
              findings: newFindings,
              timeElapsed
            };
          }
          
          // Start waiting/pending agents when others are progressing
          if ((agent.status === 'waiting' || agent.status === 'pending') && agents.some(a => a.progress > 10)) {
            return {
              ...agent,
              status: 'running' as AgentStatus,
              currentTask: `Starting ${agent.description.toLowerCase()}`,
              timeElapsed
            };
          }
          
          // For completed agents, keep their last recorded time (don't update clock)
          if (agent.status === 'completed') {
            return agent;
          }
          
          // For non-running agents that aren't completed, update the clock
          return {
            ...agent,
            timeElapsed
          };
        })
      );

      // Update executive agent
      setExecutiveAgent(prev => {
        const completedCount = agents.filter(a => a.status === 'completed').length;
        const runningCount = agents.filter(a => a.status === 'running').length;
        const totalAgents = agents.length;
        const avgProgress = agents.reduce((sum, agent) => sum + agent.progress, 0) / totalAgents;
        
        let newProgress = Math.min(avgProgress * 0.8, 100); // Progress tracks other agents
        let newStatus = prev.status;
        let newTask = prev.currentTask;
        
        // Start executive when first agents begin
        if (runningCount > 0 && prev.status === 'waiting') {
          newStatus = 'running';
          newTask = 'Coordinating analysis across agents';
        }
        
        // Complete when most agents are done
        if (completedCount >= totalAgents * 0.8) {
          newProgress = 100;
          newStatus = 'completed';
          newTask = 'Executive summary ready';
        }
        
        const totalFindings = agents.reduce((sum, agent) => sum + agent.findings, 0);
        const executiveFindings = Math.floor(totalFindings * 0.2); // Executive adds synthesis insights
        
        // Don't update clock if executive agent is completed
        let timeElapsed = prev.timeElapsed;
        if (newStatus !== 'completed') {
          const minutes = Math.floor(elapsed / 60);
          const seconds = elapsed % 60;
          timeElapsed = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
        }
        
        return {
          ...prev,
          progress: newProgress,
          status: newStatus,
          findings: executiveFindings,
          currentTask: newTask,
          timeElapsed
        };
      });
    }, 1000); // Real-time updates every second

    return () => clearInterval(interval);
  }, [agents, startTime]);

  return {
    agents,
    executiveAgent, 
    setAgents,
    setExecutiveAgent
  };
};