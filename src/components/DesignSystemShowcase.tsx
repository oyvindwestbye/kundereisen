import React, { useState } from 'react';
import { Button } from './design-system/Button';
import { Input } from './design-system/Input';
import { StatusBadge } from './design-system/StatusBadge';
import { SearchBar } from './design-system/SearchBar';
import { Filter } from './design-system/Filter';
import { SortControl } from './design-system/SortControl';
import { Table } from './design-system/Table';
import { FileAttachment } from './design-system/FileAttachment';
import { ChatBubble } from './design-system/ChatBubble';
import { NotificationBanner } from './design-system/NotificationBanner';
import { Modal } from './design-system/Modal';
import { Navigation } from './design-system/Navigation';
import { Plus, Search, Mail } from 'lucide-react';

export function DesignSystemShowcase() {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="mb-2">Ocab Mini-CRM Design System</h1>
          <p className="text-[#697077]">
            A comprehensive design system built for Ocab's mini-CRM application
          </p>
        </div>
        
        {/* Colors */}
        <section>
          <h2 className="mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 rounded-lg bg-[#016cb7] mb-2" />
              <p className="text-sm">Primary</p>
              <code className="text-xs text-[#697077]">#016CB7</code>
            </div>
            <div>
              <div className="h-24 rounded-lg bg-[#006cb7] mb-2" />
              <p className="text-sm">Primary Dark</p>
              <code className="text-xs text-[#697077]">#006CB7</code>
            </div>
            <div>
              <div className="h-24 rounded-lg bg-[#a6c8ff] mb-2" />
              <p className="text-sm">Primary Light</p>
              <code className="text-xs text-[#697077]">#A6C8FF</code>
            </div>
            <div>
              <div className="h-24 rounded-lg bg-[#e7efff] mb-2" />
              <p className="text-sm">Primary Lighter</p>
              <code className="text-xs text-[#697077]">#E7EFFF</code>
            </div>
          </div>
        </section>
        
        {/* Buttons */}
        <section>
          <h2 className="mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button icon={<Plus size={20} />}>With Icon</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
        
        {/* Inputs */}
        <section>
          <h2 className="mb-4">Input Fields</h2>
          <div className="space-y-4 max-w-md">
            <Input label="Email" type="email" placeholder="din.epost@eksempel.no" />
            <Input label="Passord" type="password" placeholder="••••••••" />
            <Input label="Med ikon" icon={<Mail size={20} />} placeholder="Søk..." />
            <Input label="Med feil" error="Dette feltet er påkrevd" />
            <Input label="Deaktivert" disabled value="Ikke redigerbart" />
          </div>
        </section>
        
        {/* Status Badges */}
        <section>
          <h2 className="mb-4">Status Badges</h2>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="active" />
            <StatusBadge status="pending" />
            <StatusBadge status="completed" />
            <StatusBadge status="cancelled" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="approved" />
            <StatusBadge status="rejected" />
          </div>
        </section>
        
        {/* Notifications */}
        <section>
          <h2 className="mb-4">Notification Banners</h2>
          <div className="space-y-3">
            <NotificationBanner
              type="success"
              title="Suksess"
              message="Saken ble opprettet"
              closable={false}
            />
            <NotificationBanner
              type="error"
              message="Kunne ikke lagre endringer"
              closable={false}
            />
            <NotificationBanner
              type="warning"
              title="Advarsel"
              message="Denne handlingen kan ikke angres"
              closable={false}
            />
            <NotificationBanner
              type="info"
              message="Du har 3 nye meldinger"
              closable={false}
            />
          </div>
        </section>
        
        {/* Chat Bubbles */}
        <section>
          <h2 className="mb-4">Chat Bubbles</h2>
          <div className="space-y-4 max-w-2xl">
            <ChatBubble
              sender="other"
              senderName="Selskap A"
              message="Vi har mottatt dokumentasjonen"
              timestamp="14. jan, 09:15"
              avatar="A"
            />
            <ChatBubble
              sender="user"
              senderName="Prosjektleder"
              message="Takk for oppdateringen!"
              timestamp="14. jan, 10:30"
              avatar="P"
            />
          </div>
        </section>
        
        {/* Table */}
        <section>
          <h2 className="mb-4">Table</h2>
          <Table
            columns={[
              { key: 'id', header: 'ID', width: '100px' },
              { key: 'name', header: 'Navn' },
              { key: 'status', header: 'Status', render: (value) => <StatusBadge status={value as any} /> }
            ]}
            data={[
              { id: '001', name: 'Storgata 3', status: 'active' },
              { id: '002', name: 'Torgveien 15', status: 'pending' },
              { id: '003', name: 'Fjellveien 22', status: 'completed' }
            ]}
          />
        </section>
        
        {/* Modal */}
        <section>
          <h2 className="mb-4">Modal</h2>
          <Button onClick={() => setShowModal(true)}>Åpne Modal</Button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Eksempel Modal"
            footer={
              <>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Avbryt
                </Button>
                <Button onClick={() => setShowModal(false)}>
                  Bekreft
                </Button>
              </>
            }
          >
            <p>Dette er innholdet i modalen</p>
          </Modal>
        </section>
      </div>
    </div>
  );
}