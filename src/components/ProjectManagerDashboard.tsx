import React, { useState } from 'react';
import { Navigation } from './design-system/Navigation';
import { SearchBar } from './design-system/SearchBar';
import { Filter } from './design-system/Filter';
import { SortControl } from './design-system/SortControl';
import { Table } from './design-system/Table';
import { StatusBadge } from './design-system/StatusBadge';
import { Button } from './design-system/Button';
import { Modal } from './design-system/Modal';
import { Input } from './design-system/Input';
import { FileAttachment } from './design-system/FileAttachment';
import { ChatBubble } from './design-system/ChatBubble';
import { NotificationBanner } from './design-system/NotificationBanner';
import { CaseDetailPage } from './CaseDetailPage';
import { MessageSquare, Bell } from 'lucide-react';

interface ProjectManagerDashboardProps {
  onLogout: () => void;
}

// Mock data
const mockProjects = [
  { 
    id: '2re444', 
    address: 'Storgata 3', 
    customer: 'Ola Nordmann', 
    status: 'torking-pagar', 
    insurance: 'Selskap A', 
    lastUpdate: '14. jan 2025',
    dateCreated: '10. jan 2025',
    projectManager: 'Ola Svendsen',
    unreadMessages: 2
  },
  { 
    id: '3sf567', 
    address: 'Torgveien 15', 
    customer: 'Kari Hansen', 
    status: 'godkjenning-fra-forsikring', 
    insurance: 'Selskap C', 
    lastUpdate: '13. jan 2025',
    dateCreated: '09. jan 2025',
    projectManager: 'Kari Berg',
    unreadMessages: 0
  },
  { 
    id: '4tg890', 
    address: 'Fjellveien 22', 
    customer: 'Per Olsen', 
    status: 'ferdigstillelse', 
    insurance: 'Selskap B', 
    lastUpdate: '12. jan 2025',
    dateCreated: '05. jan 2025',
    projectManager: 'Ola Svendsen',
    unreadMessages: 0
  },
  { 
    id: '5uh123', 
    address: 'Strandgata 8', 
    customer: 'Anne Berg', 
    status: 'dokumentasjon-sendt', 
    insurance: 'Selskap A', 
    lastUpdate: '11. jan 2025',
    dateCreated: '08. jan 2025',
    projectManager: 'Per Hansen',
    unreadMessages: 1
  },
  { 
    id: '6vi456', 
    address: 'Skolevei 45', 
    customer: 'Tom Eriksen', 
    status: 'befaring-planlagt', 
    insurance: 'Selskap C', 
    lastUpdate: '10. jan 2025',
    dateCreated: '07. jan 2025',
    projectManager: 'Ola Svendsen',
    unreadMessages: 3
  },
  { 
    id: '7wj789', 
    address: 'Parkvegen 12', 
    customer: 'Lisa Johansen', 
    status: 'gjenoppbygging', 
    insurance: 'Selskap A', 
    lastUpdate: '15. jan 2025',
    dateCreated: '11. jan 2025',
    projectManager: 'Kari Berg',
    unreadMessages: 0
  },
  { 
    id: '8xk012', 
    address: 'Havnegata 7', 
    customer: 'Erik Andersen', 
    status: 'reparasjon-starter', 
    insurance: 'Selskap B', 
    lastUpdate: '14. jan 2025',
    dateCreated: '12. jan 2025',
    projectManager: 'Per Hansen',
    unreadMessages: 1
  },
];

export function ProjectManagerDashboard({ onLogout }: ProjectManagerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [insuranceFilter, setInsuranceFilter] = useState<string[]>([]);
  const [projectManagerFilter, setProjectManagerFilter] = useState<string[]>(['Ola Svendsen']);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('desc');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [viewingCase, setViewingCase] = useState<string | null>(null);
  
  // If viewing a specific case, show the detail page
  if (viewingCase) {
    return <CaseDetailPage caseId={viewingCase} onBack={() => setViewingCase(null)} />;
  }
  
  const columns = [
    { 
      key: 'id', 
      header: 'Skadenr.',
      width: '110px',
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <span>{value}</span>
          {row.unreadMessages > 0 && (
            <div className="relative">
              <Bell size={16} className="text-[#016cb7]" />
              <span className="absolute -top-1 -right-1 bg-[#da1e28] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {row.unreadMessages}
              </span>
            </div>
          )}
        </div>
      )
    },
    { 
      key: 'customer', 
      header: 'Kunde',
      width: '150px'
    },
    { 
      key: 'address', 
      header: 'Adresse',
      width: '180px'
    },
    { 
      key: 'projectManager', 
      header: 'Prosjektleder',
      width: '150px'
    },
    { 
      key: 'dateCreated', 
      header: 'Dato opprettet',
      width: '130px'
    },
    { 
      key: 'status', 
      header: 'Status',
      width: '150px',
      render: (value: string) => <StatusBadge status={value as any} />
    },
    { 
      key: 'insurance', 
      header: 'Forsikring',
      width: '130px'
    },
  ];
  
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(project.status);
    const matchesInsurance = insuranceFilter.length === 0 || insuranceFilter.includes(project.insurance);
    const matchesProjectManager = projectManagerFilter.length === 0 || projectManagerFilter.includes(project.projectManager);
    return matchesSearch && matchesStatus && matchesInsurance && matchesProjectManager;
  });
  
  // Sort by date
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortDirection) return 0;
    const dateA = new Date(a.dateCreated.split('.').reverse().join('-'));
    const dateB = new Date(b.dateCreated.split('.').reverse().join('-'));
    return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
  
  const totalUnreadMessages = mockProjects.reduce((sum, p) => sum + p.unreadMessages, 0);
  
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation
        logo={
          <img 
            src="https://ocab.no/wp-content/uploads/2025/04/ocab-logo-01.svg" 
            alt="Ocab" 
            className="h-8"
          />
        }
        items={[]}
        onLogout={onLogout}
        userRole="Prosjektleder"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2">Oversikt</h1>
          <p className="text-[#697077]">Administrer alle skadesaker og oppgaver</p>
        </div>
        
        {/* Notification */}
        {showNotification && (
          <div className="mb-6">
            <NotificationBanner
              type="info"
              title="Ny oppdatering"
              message="2 saker har ny informasjon fra kunde"
              onClose={() => setShowNotification(false)}
              unreadCount={5}
            />
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar 
              placeholder="Søk etter adresse, kunde eller skadenummer..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Filter
            label="Status"
            options={[
              { label: 'Skade meldt', value: 'skade-meldt' },
              { label: 'Befaring planlagt', value: 'befaring-planlagt' },
              { label: 'Dokumentasjon sendt', value: 'dokumentasjon-sendt' },
              { label: 'Godkjenning fra forsikring', value: 'godkjenning-fra-forsikring' },
              { label: 'Reparasjon starter', value: 'reparasjon-starter' },
              { label: 'Tørking pågår', value: 'torking-pagar' },
              { label: 'Gjenoppbygging', value: 'gjenoppbygging' },
              { label: 'Ferdigstillelse', value: 'ferdigstillelse' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            multiple
          />
          <Filter
            label="Forsikringsselskap"
            options={[
              { label: 'Selskap A', value: 'Selskap A' },
              { label: 'Selskap B', value: 'Selskap B' },
              { label: 'Selskap C', value: 'Selskap C' },
            ]}
            value={insuranceFilter}
            onChange={setInsuranceFilter}
            multiple
          />
          <Filter
            label="Prosjektleder"
            options={[
              { label: 'Ola Svendsen', value: 'Ola Svendsen' },
              { label: 'Kari Berg', value: 'Kari Berg' },
              { label: 'Per Hansen', value: 'Per Hansen' },
            ]}
            value={projectManagerFilter}
            onChange={setProjectManagerFilter}
            multiple
          />
          <SortControl
            label="Sorter etter dato"
            direction={sortDirection}
            onSort={setSortDirection}
          />
        </div>
        
        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <Table
            columns={columns}
            data={sortedProjects}
            onRowClick={(row) => {
              setViewingCase(row.id);
            }}
          />
        </div>
      </div>
      
      {/* Chat Modal */}
      <Modal
        isOpen={showChatModal}
        onClose={() => {
          setShowChatModal(false);
          setSelectedProject(null);
        }}
        title={selectedProject ? `Sak ${selectedProject.id} - ${selectedProject.address}` : 'Meldinger'}
      >
        <div className="space-y-4">
          <ChatBubble
            sender="other"
            senderName="Selskap A"
            message="Vi har mottatt dokumentasjonen og vil behandle saken innen 2 arbeidsdager."
            timestamp="14. jan, 09:15"
            avatar="A"
          />
          <ChatBubble
            sender="user"
            senderName="Deg"
            message="Takk for oppdateringen. Jeg sender over flere bilder av skaden i morgen."
            timestamp="14. jan, 10:30"
            avatar="P"
          />
          <ChatBubble
            sender="other"
            senderName="Selskap A"
            message="Perfekt, da får vi en bedre vurdering av omfanget."
            timestamp="14. jan, 11:00"
            avatar="A"
          />
          
          <div className="pt-4 border-t border-[#dde1e6]">
            <Input placeholder="Skriv en melding..." fullWidth />
            <div className="flex gap-2 mt-3">
              <FileAttachment />
              <Button size="sm" icon={<MessageSquare size={16} />}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}