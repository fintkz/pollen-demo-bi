// Comprehensive demo data for Pollen AI Inventory Liquidation Platform  
// This contains all the hardcoded data used throughout the demo, focused on inventory management

export interface ActivityLogTemplate {
  agentId: string;
  tool: string;
  action: string;
  findings?: string[];
  weight: number; // Higher weight = more likely to be selected
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  initialStatus: 'pending' | 'running' | 'completed' | 'waiting';
  initialProgress: number;
  initialTask: string;
  initialFindings: number;
  tools: string[];
  reasoning: string[];
}

// Inventory liquidation activity log templates
export const activityLogTemplates: ActivityLogTemplate[] = [
  // Demand analysis activities  
  {
    agentId: 'dahlia',
    tool: 'Demand Forecaster',
    action: 'Analyzing historical sales data for beauty products',
    findings: ['L\'Oréal skincare shows 23% higher demand in Q1', 'Anti-aging products trending +15%'],
    weight: 10
  },
  {
    agentId: 'dahlia',
    tool: 'Market Trend Analyzer',
    action: 'Evaluating social media sentiment and trends',
    findings: ['TikTok mentions increased 40% for vitamin C serums', 'Sustainable packaging preference growing'],
    weight: 9
  },
  {
    agentId: 'dahlia',
    tool: 'Seasonal Pattern Detector',
    action: 'Identifying seasonal demand patterns',
    findings: ['Valentine\'s Day boost expected for gift sets', 'Spring skincare refresh cycle starting'],
    weight: 8
  },
  
  // Financial optimization activities
  {
    agentId: 'fern',
    tool: 'Price Optimizer',
    action: 'Calculating optimal pricing for liquidation',
    findings: ['Premium products: 65% of retail recommended', 'Bundle discounts increase conversion 28%'],
    weight: 10
  },
  {
    agentId: 'fern',
    tool: 'Margin Calculator',
    action: 'Analyzing profit margins across channels',
    findings: ['Direct-to-consumer: 45% margin potential', 'Wholesale: 22% margin with volume'],
    weight: 9
  },
  {
    agentId: 'fern',
    tool: 'Recovery Maximizer',
    action: 'Optimizing recovery strategy by product category',
    findings: ['Skincare: 78% recovery rate achievable', 'Makeup: 65% recovery with aggressive pricing'],
    weight: 8
  },
  
  // Sales and marketplace activities
  {
    agentId: 'sage',
    tool: 'Buyer Matcher',
    action: 'Identifying potential bulk buyers',
    findings: ['3 beauty retailers interested in pallets', 'Discount chain wants overstock cosmetics'],
    weight: 10
  },
  {
    agentId: 'sage',
    tool: 'Listing Optimizer',
    action: 'Optimizing marketplace listings for visibility',
    findings: ['Amazon: Keywords optimized for 40% more views', 'eBay: Auction timing increased bids 25%'],
    weight: 9
  },
  {
    agentId: 'sage',
    tool: 'Outreach Automator',
    action: 'Automating buyer outreach campaigns',
    findings: ['Email campaigns: 15% response rate', 'LinkedIn outreach: 8 qualified leads'],
    weight: 8
  }
];

// Agent configuration data - Pollen.tech Inventory Liquidation focused
export const agentTemplates: AgentTemplate[] = [
  {
    id: 'dahlia',
    name: 'Dahlia: Demand Analyst',
    description: 'Forecasts product demand using historical data and current market trends',
    initialStatus: 'running',
    initialProgress: 25,
    initialTask: 'Analyzing demand patterns for L\'Oréal skincare products',
    initialFindings: 3,
    tools: ['Demand Forecaster', 'Market Trend Analyzer', 'Seasonal Pattern Detector'],
    reasoning: [
      'Processing historical sales data for similar beauty products',
      'Analyzing Google Trends and social media mentions',
      'Evaluating seasonal demand patterns for Q1-Q2',
      'Cross-referencing with competitor sell-through rates'
    ]
  },
  {
    id: 'fern',
    name: 'Fern: Financial Advisor', 
    description: 'Implements dynamic pricing strategies to maximize revenue recovery',
    initialStatus: 'waiting',
    initialProgress: 0,
    initialTask: 'Ready for dynamic pricing optimization',
    initialFindings: 0,
    tools: ['Price Optimizer', 'Margin Calculator', 'Recovery Maximizer'],
    reasoning: []
  },
  {
    id: 'sage',
    name: 'Sage: Sales Expert',
    description: 'Finds buyers, automates outreach, and manages marketplace listings',
    initialStatus: 'waiting',
    initialProgress: 0,
    initialTask: 'Ready for buyer matching and marketplace optimization',
    initialFindings: 0,
    tools: ['Buyer Matcher', 'Listing Optimizer', 'Outreach Automator'],
    reasoning: []
  }
];

// Executive summary agent data (Lily)
export const executiveSummaryTemplate = {
  id: 'lily',
  name: 'Lily: AI Enhancement Coordinator',
  description: 'Orchestrates multi-agent inventory processing and enhancement workflow',
  initialStatus: 'waiting' as const,
  initialProgress: 0,
  initialTask: 'Waiting for agent coordination to begin',
  initialFindings: 0,
  tools: ['Workflow Orchestrator', 'Enhancement Engine', 'Quality Validator'],
  reasoning: []
};


// Pinned findings for sidebar
export const pinnedFindings = [
  'L\'Oréal inventory: 2,400 units available',
  'Demand forecast: 23% higher in Q1',
  'Optimal pricing: 65% of retail value',
  'Recovery potential: 78% for skincare',
  'Buyer interest: 3 retailers contacted',
  'Market trends: Anti-aging products +15%',
  'Channel optimization: Amazon views +40%'
];

// Helper function to get weighted random activity
export const getRandomActivity = (): ActivityLogTemplate => {
  const totalWeight = activityLogTemplates.reduce((sum, activity) => sum + activity.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const activity of activityLogTemplates) {
    random -= activity.weight;
    if (random <= 0) {
      return activity;
    }
  }
  
  return activityLogTemplates[0]; // Fallback
};