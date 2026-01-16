import React from 'react';
import { Smartphone, Mail, Bell, Clock, Users, MessageSquare, AlertCircle } from 'lucide-react';

export function SMSNotificationFlow() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">SMS Varslingssystem</h1>
          <p className="text-[#697077]">
            Automatisk varsling med smart batching for optimal kommunikasjon
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Flow */}
          <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#d0e2ff] rounded-full flex items-center justify-center">
                <Users size={24} className="text-[#0062ff]" />
              </div>
              <div>
                <h3>Kunde</h3>
                <p className="text-sm text-[#697077]">Varslingsflyt</p>
              </div>
            </div>
            
            {/* Flow Steps */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="relative pl-8 pb-8 border-l-2 border-[#dde1e6]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#016cb7] rounded-full flex items-center justify-center">
                  <MessageSquare size={12} className="text-white" />
                </div>
                <div className="bg-[#e7efff] p-4 rounded-lg">
                  <h5 className="text-[#016cb7] mb-2">Ny hendelse oppstår</h5>
                  <p className="text-sm text-[#21272a]">
                    • Prosjektleder sender melding<br />
                    • Statusoppdatering i sak<br />
                    • Nytt dokument lastet opp
                  </p>
                </div>
              </div>
              
              {/* Decision Point */}
              <div className="relative pl-8 pb-8 border-l-2 border-[#dde1e6]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#f1c21b] rounded-full flex items-center justify-center">
                  <AlertCircle size={12} className="text-white" />
                </div>
                <div className="bg-[#fdf5d9] p-4 rounded-lg border-2 border-dashed border-[#f1c21b]">
                  <h5 className="text-[#946800] mb-2">Sjekk batching-regel</h5>
                  <p className="text-sm text-[#21272a]">
                    Har det skjedd andre hendelser siste 60 min?
                  </p>
                  <div className="mt-3 flex gap-4">
                    <div className="flex-1 text-center">
                      <div className="bg-white px-3 py-2 rounded border border-[#dde1e6]">
                        <p className="text-xs text-[#697077] mb-1">NEI</p>
                        <p className="text-sm">→</p>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="bg-white px-3 py-2 rounded border border-[#dde1e6]">
                        <p className="text-xs text-[#697077] mb-1">JA</p>
                        <p className="text-sm">→</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Immediate SMS */}
              <div className="relative pl-8 pb-8 border-l-2 border-[#dde1e6]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#24a148] rounded-full flex items-center justify-center">
                  <Smartphone size={12} className="text-white" />
                </div>
                <div className="bg-[#d1f4db] p-4 rounded-lg">
                  <h5 className="text-[#24a148] mb-2">Øyeblikkelig SMS</h5>
                  <p className="text-sm text-[#21272a] mb-2">
                    Hvis første hendelse i tidsvinduet:
                  </p>
                  <div className="bg-white p-3 rounded border border-[#24a148]">
                    <p className="text-xs text-[#697077] mb-1">SMS-innhold:</p>
                    <p className="text-sm italic">
                      "Ny oppdatering i sak #2re444. Klikk her for å se: 
                      <span className="text-[#016cb7] underline ml-1">ocab.no/sak/2re444</span>"
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Batched SMS */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#0062ff] rounded-full flex items-center justify-center">
                  <Clock size={12} className="text-white" />
                </div>
                <div className="bg-[#d0e2ff] p-4 rounded-lg">
                  <h5 className="text-[#0062ff] mb-2">Batched SMS (60 min)</h5>
                  <p className="text-sm text-[#21272a] mb-2">
                    Hvis flere hendelser innen tidsvinduet:
                  </p>
                  <div className="bg-white p-3 rounded border border-[#0062ff]">
                    <p className="text-xs text-[#697077] mb-1">SMS-innhold:</p>
                    <p className="text-sm italic">
                      "3 nye oppdateringer i sak #2re444 siste time. Se detaljer: 
                      <span className="text-[#016cb7] underline ml-1">ocab.no/sak/2re444</span>"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Manager Flow */}
          <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#a6c8ff] rounded-full flex items-center justify-center">
                <Bell size={24} className="text-[#016cb7]" />
              </div>
              <div>
                <h3>Prosjektleder</h3>
                <p className="text-sm text-[#697077]">Varslingsflyt</p>
              </div>
            </div>
            
            {/* Flow Steps */}
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="relative pl-8 pb-8 border-l-2 border-[#dde1e6]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#016cb7] rounded-full flex items-center justify-center">
                  <MessageSquare size={12} className="text-white" />
                </div>
                <div className="bg-[#e7efff] p-4 rounded-lg">
                  <h5 className="text-[#016cb7] mb-2">Ny hendelse oppstår</h5>
                  <p className="text-sm text-[#21272a]">
                    • Kunde sender melding<br />
                    • Forsikring godkjenner sak<br />
                    • Kunde laster opp dokument
                  </p>
                </div>
              </div>
              
              {/* Decision Point */}
              <div className="relative pl-8 pb-8 border-l-2 border-[#dde1e6]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#f1c21b] rounded-full flex items-center justify-center">
                  <AlertCircle size={12} className="text-white" />
                </div>
                <div className="bg-[#fdf5d9] p-4 rounded-lg border-2 border-dashed border-[#f1c21b]">
                  <h5 className="text-[#946800] mb-2">Sjekk batching-regel</h5>
                  <p className="text-sm text-[#21272a]">
                    Har det skjedd andre hendelser siste 60 min?
                  </p>
                  <div className="mt-3 flex gap-4">
                    <div className="flex-1 text-center">
                      <div className="bg-white px-3 py-2 rounded border border-[#dde1e6]">
                        <p className="text-xs text-[#697077] mb-1">NEI</p>
                        <p className="text-sm">→</p>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="bg-white px-3 py-2 rounded border border-[#dde1e6]">
                        <p className="text-xs text-[#697077] mb-1">JA</p>
                        <p className="text-sm">→</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Immediate SMS */}
              <div className="relative pl-8 pb-8 border-l-2 border-[#dde1e6]">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#24a148] rounded-full flex items-center justify-center">
                  <Smartphone size={12} className="text-white" />
                </div>
                <div className="bg-[#d1f4db] p-4 rounded-lg">
                  <h5 className="text-[#24a148] mb-2">Øyeblikkelig SMS</h5>
                  <p className="text-sm text-[#21272a] mb-2">
                    Hvis første hendelse i tidsvinduet:
                  </p>
                  <div className="bg-white p-3 rounded border border-[#24a148]">
                    <p className="text-xs text-[#697077] mb-1">SMS-innhold:</p>
                    <p className="text-sm italic">
                      "Kunde har sendt melding i sak #2re444. Se melding: 
                      <span className="text-[#016cb7] underline ml-1">ocab.no/sak/2re444</span>"
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Batched SMS */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#0062ff] rounded-full flex items-center justify-center">
                  <Clock size={12} className="text-white" />
                </div>
                <div className="bg-[#d0e2ff] p-4 rounded-lg">
                  <h5 className="text-[#0062ff] mb-2">Batched SMS (60 min)</h5>
                  <p className="text-sm text-[#21272a] mb-2">
                    Hvis flere hendelser innen tidsvinduet:
                  </p>
                  <div className="bg-white p-3 rounded border border-[#0062ff]">
                    <p className="text-xs text-[#697077] mb-1">SMS-innhold:</p>
                    <p className="text-sm italic">
                      "5 nye hendelser i dine saker siste time. Se oversikt: 
                      <span className="text-[#016cb7] underline ml-1">ocab.no/mine-saker</span>"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg border border-[#dde1e6] p-6">
          <h4 className="mb-4">Forklaring</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-[#0062ff] mt-1" />
              <div>
                <h6 className="mb-1">60-minutters regel</h6>
                <p className="text-sm text-[#697077]">
                  Flere hendelser innen samme time samles i én SMS for å unngå spam
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Smartphone size={20} className="text-[#24a148] mt-1" />
              <div>
                <h6 className="mb-1">Øyeblikkelig varsel</h6>
                <p className="text-sm text-[#697077]">
                  Første hendelse i tidsvinduet sender SMS umiddelbart
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageSquare size={20} className="text-[#016cb7] mt-1" />
              <div>
                <h6 className="mb-1">Hendelsestyper</h6>
                <p className="text-sm text-[#697077]">
                  Nye meldinger, statusoppdateringer, dokumenter, godkjenninger
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-[#697077] mt-1" />
              <div>
                <h6 className="mb-1">Lenker i SMS</h6>
                <p className="text-sm text-[#697077]">
                  Alle SMS inneholder direktelenke til relevant side i systemet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
