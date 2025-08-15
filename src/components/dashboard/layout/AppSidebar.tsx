import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Activity, 
  Clock, 
  CheckCircle,
  Settings,
  Database,
  Wifi,
  WifiOff,
  Upload,
  Link,
  Globe,
  FolderOpen,
  Mail,
  HardDrive,
  Plus
} from 'lucide-react';
import { integrationLogos } from '@/lib/logos';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppPhase } from './AppLayout';

interface AppSidebarProps {
  currentPhase: AppPhase;
  uploadedFiles: File[];
}

export const AppSidebar = ({ currentPhase, uploadedFiles }: AppSidebarProps) => {
  const { state } = useSidebar();
  const [isOnline] = useState(true);
  const collapsed = state === 'collapsed';

  const getPhaseStatus = (phase: AppPhase) => {
    const phases: AppPhase[] = ['processing', 'preview', 'marketplace'];
    const currentIndex = phases.indexOf(currentPhase);
    const phaseIndex = phases.indexOf(phase);
    
    if (phaseIndex < currentIndex) return 'completed';
    if (phaseIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'active': return <Activity className="h-4 w-4 text-accent-blue animate-pulse-glow" />;
      case 'pending': return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const recentBatches = [
    { name: 'L\'Oréal Excess Skincare', type: 'Beauty', value: '2.3K units', connected: true },
    { name: 'Dove Body Care Collection', type: 'Personal Care', value: '1.8K units', connected: false },
    { name: 'Maybelline Seasonal Stock', type: 'Cosmetics', value: '4.1K units', connected: false }
  ];

  const externalDataSources = [
    { name: 'PitchBook', logo: integrationLogos.find(logo => logo.name === 'PitchBook')?.imageUrl, connected: false },
    { name: 'CapitalIQ', logo: integrationLogos.find(logo => logo.name === 'CapitalIQ')?.imageUrl, connected: true },
    { name: 'Moody\'s Analytics', logo: integrationLogos.find(logo => logo.name === 'Moody\'s Analytics')?.imageUrl, connected: true }
  ];

  const inventoryTypes = [
    { 
      name: 'Product Catalogs', 
      count: 12, 
      logos: [integrationLogos.find(logo => logo.name === 'PDF')?.imageUrl].filter(Boolean)
    },
    { 
      name: 'Inventory Lists', 
      count: 8, 
      logos: [integrationLogos.find(logo => logo.name === 'Microsoft Excel')?.imageUrl].filter(Boolean)
    },
    { 
      name: 'Product Images', 
      count: 24, 
      logos: [
        integrationLogos.find(logo => logo.name === 'Microsoft Word')?.imageUrl,
        integrationLogos.find(logo => logo.name === 'PDF')?.imageUrl
      ].filter(Boolean)
    },
    { 
      name: 'Pricing Data', 
      count: 6, 
      logos: [
        integrationLogos.find(logo => logo.name === 'Microsoft PowerPoint')?.imageUrl,
        integrationLogos.find(logo => logo.name === 'PDF')?.imageUrl
      ].filter(Boolean)
    }
  ];

  const connectServices = [
    { name: 'Microsoft OneDrive', logo: integrationLogos.find(logo => logo.name === 'Microsoft OneDrive')?.imageUrl, connected: true },
    { name: 'Microsoft Outlook', logo: integrationLogos.find(logo => logo.name === 'Microsoft Outlook')?.imageUrl, connected: true }
  ];

  return (
    <Sidebar 
      className="border-r border-border-muted bg-surface-muted"
      collapsible="icon"
    >
      <SidebarHeader className="p-6 border-b border-border-muted">
        {!collapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold institutional-heading">Pollen AI</h1>
                <p className="text-sm text-muted-foreground">Inventory Liquidation</p>
              </div>
              <SidebarTrigger className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </SidebarTrigger>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-xs font-bold text-accent-blue">PA</div>
            <SidebarTrigger className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </SidebarTrigger>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-6 space-y-6 institutional-scroll overflow-y-auto">
        {/* Data Sources */}
        {!collapsed && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Data Sources
              </h3>
              <Plus className="h-4 w-4 font-bold stroke-2 text-muted-foreground hover:text-foreground cursor-pointer" title="Upload more documents" />
            </div>
            
            <Accordion type="multiple" className="space-y-1">
              {/* External Data Sources */}
              <AccordionItem value="external" className="border-0">
                <AccordionTrigger className="py-1 text-xs font-medium text-muted-foreground hover:no-underline">
                  External Data Sources
                </AccordionTrigger>
                <AccordionContent className="pb-2 space-y-2">
                  {externalDataSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-center py-2 relative bg-card rounded border border-border-muted">
                      {source.logo ? (
                        <img 
                          src={source.logo} 
                          alt={source.name} 
                          className="h-6 w-auto max-w-full object-contain" 
                          title={source.name}
                        />
                      ) : (
                        <Globe className="h-6 w-6 text-muted-foreground" title={source.name} />
                      )}
                      {source.connected && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {!source.connected && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* My Documents */}
              <AccordionItem value="documents" className="border-0">
                <AccordionTrigger className="py-1 text-xs font-medium text-muted-foreground hover:no-underline">
                  My Documents
                </AccordionTrigger>
                <AccordionContent className="pb-2 space-y-1">
                  {inventoryTypes.map((docType, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {docType.logos.map((logo, logoIndex) => (
                            <img 
                              key={logoIndex}
                              src={logo} 
                              alt="Document type" 
                              className="h-4 w-4 object-contain" 
                            />
                          ))}
                        </div>
                        <span className="text-sm">{docType.name}</span>
                      </div>
                      <Badge variant={docType.count > 0 ? "default" : "secondary"} className="text-xs">
                        {docType.count}
                      </Badge>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Connect Services */}
              <AccordionItem value="connect" className="border-0">
                <AccordionTrigger className="py-1 text-xs font-medium text-muted-foreground hover:no-underline">
                  Connect
                </AccordionTrigger>
                <AccordionContent className="pb-2 space-y-1">
                  {connectServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-1 hover:bg-muted/50 transition-colors cursor-pointer rounded px-1">
                      <div className="flex items-center space-x-2">
                        {service.logo ? (
                          <img 
                            src={service.logo} 
                            alt={service.name} 
                            className="h-4 w-4 object-contain" 
                          />
                        ) : (
                          <Link className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm">{service.name}</span>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: service.connected ? '#22c55e' : '#9ca3af',
                          border: '1px solid #ffffff',
                          minWidth: '12px',
                          minHeight: '12px'
                        }}
                      ></div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Analysis Progress */}
        {!collapsed && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Analysis Progress
            </h3>
            <div className="space-y-3">
              {[
                { phase: 'processing' as AppPhase, label: 'AI Agent Processing', icon: Activity },
                { phase: 'preview' as AppPhase, label: 'Product Preview', icon: Settings },
                { phase: 'marketplace' as AppPhase, label: 'Marketplace View', icon: CheckCircle }
              ].map(({ phase, label, icon: Icon }) => {
                const status = getPhaseStatus(phase);
                return (
                  <div key={phase} className="flex items-center space-x-3 p-2 rounded border border-border-muted bg-card">
                    <div className="flex-shrink-0">
                      {getStatusIcon(status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        status === 'active' ? 'text-accent-blue' : 
                        status === 'completed' ? 'text-success' : 
                        'text-muted-foreground'
                      }`}>
                        {label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Batches */}
        {!collapsed && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Recent Batches
            </h3>
            <div className="space-y-2">
              {recentBatches.map((deal, index) => (
                <div key={index} className="p-3 rounded border border-border-muted bg-card hover:bg-surface-elevated transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground leading-tight">{deal.name}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{deal.type}</span>
                        <span className="text-xs font-medium text-accent-blue">{deal.value}</span>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: deal.connected ? '#22c55e' : '#9ca3af',
                          border: '1px solid #ffffff',
                          minWidth: '12px',
                          minHeight: '12px'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border-muted">
        {!collapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Session: {new Date().toLocaleDateString()}</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
                <span>Live</span>
              </span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};