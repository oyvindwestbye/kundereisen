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
import { NotificationBanner } from './design-system/NotificationBanner';
import { InsuranceCaseDetailPage } from './InsuranceCaseDetailPage';
import { GenericInsuranceLogo } from './GenericInsuranceLogo';
import { CheckCircle, XCircle, FileText, AlertCircle, Clock } from 'lucide-react';

interface InsuranceDashboardProps {
  onLogout: () => void;
}

// Mock data for insurance company view
const mockClaims = [
  { id: '2re444', address: 'Storgata 3, 0123 Oslo', projectManager: 'Ola Svendsen', status: 'godkjenning-fra-forsikring', claimAmount: '125 000', submitted: '12. jan 2025', dateCreated: '10. jan 2025' },
  { id: '3sf567', address: 'Torgveien 15, 5003 Bergen', projectManager: 'Kari Berg', status: 'approved', claimAmount: '85 000', submitted: '11. jan 2025', dateCreated: '09. jan 2025' },
  { id: '4tg890', address: 'Fjellveien 22, 7020 Trondheim', projectManager: 'Per Hansen', status: 'torking-pagar', claimAmount: '200 000', submitted: '10. jan 2025', dateCreated: '08. jan 2025' },
  { id: '5uh123', address: 'Strandgata 8, 4006 Stavanger', projectManager: 'Anne Olsen', status: 'dokumentasjon-sendt', claimAmount: '150 000', submitted: '9. jan 2025', dateCreated: '07. jan 2025' },
  { id: '6vi456', address: 'Skolevei 45, 9008 Tromsø', projectManager: 'Tom Eriksen', status: 'rejected', claimAmount: '45 000', submitted: '8. jan 2025', dateCreated: '06. jan 2025' },
];

export function InsuranceDashboard({ onLogout }: InsuranceDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('desc');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [viewingCase, setViewingCase] = useState<string | null>(null);
  
  // If viewing a specific case, show the read-only detail page
  if (viewingCase) {
    return <InsuranceCaseDetailPage caseId={viewingCase} onBack={() => setViewingCase(null)} />;
  }
  
  const columns = [
    { 
      key: 'id', 
      header: 'Skadenr.',
      width: '100px'
    },
    { 
      key: 'address', 
      header: 'Adresse',
      width: '250px'
    },
    { 
      key: 'projectManager', 
      header: 'Prosjektleder',
      width: '140px'
    },
    { 
      key: 'status', 
      header: 'Status',
      width: '220px',
      render: (value: string) => <StatusBadge status={value as any} />
    },
    { 
      key: 'submitted', 
      header: 'Innsendt',
      width: '150px'
    }
  ];
  
  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = claim.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.projectManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(claim.status);
    return matchesSearch && matchesStatus;
  });
  
  const handleApprove = () => {
    setShowApprovalModal(false);
    setSelectedClaim(null);
    // In a real app, this would update the claim status
  };
  
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
        userRole="Forsikringsselskap"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <h1 className="mb-2">Saker til behandling</h1>
            <p className="text-[#697077]">Administrer innkomne skadesaker fra Ocab</p>
          </div>
          <GenericInsuranceLogo />
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <SearchBar 
            placeholder="Søk etter adresse, prosjektleder eller skadenummer..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
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
              { label: 'Godkjent', value: 'approved' },
              { label: 'Avvist', value: 'rejected' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            multiple
          />
          <SortControl
            label="Sorter etter dato"
            direction={sortDirection}
            onSort={setSortDirection}
          />
        </div>      
        
        {/* Cases Table */}
        <div className="bg-white rounded-lg border border-[#dde1e6] overflow-hidden">
          <Table 
            columns={columns} 
            data={filteredClaims}
            onRowClick={(claim) => setViewingCase(claim.id)}
          />
        </div>
      </div>
      
      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => {
          setShowApprovalModal(false);
          setSelectedClaim(null);
        }}
        title={selectedClaim ? `Godkjenn sak ${selectedClaim.id}` : 'Godkjenn sak'}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowApprovalModal(false)}>
              Avbryt
            </Button>
            <Button onClick={handleApprove} icon={<CheckCircle size={20} />}>
              Godkjenn og send
            </Button>
          </>
        }
      >
        {selectedClaim && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#697077] mb-1">Adresse</p>
              <p>{selectedClaim.address}</p>
            </div>
            <div>
              <p className="text-sm text-[#697077] mb-1">Beløp</p>
              <p>kr {selectedClaim.claimAmount}</p>
            </div>
            <div>
              <p className="text-sm text-[#697077] mb-1">Prosjektleder</p>
              <p>{selectedClaim.projectManager}</p>
            </div>
            <Input 
              label="Kommentar (valgfritt)" 
              placeholder="Legg til en kommentar til prosjektleder..."
              fullWidth 
            />
            <FileAttachment />
          </div>
        )}
      </Modal>
    </div>
  );
}