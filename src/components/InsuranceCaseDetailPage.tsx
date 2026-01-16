import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  FileText,
  Image as ImageIcon,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react';
import { StatusBadge } from './design-system/StatusBadge';
import { GenericInsuranceLogo } from './GenericInsuranceLogo';

interface InsuranceCaseDetailPageProps {
  caseId: string;
  onBack: () => void;
}

// Mock case data
const mockCaseData = {
  id: '2re444',
  address: 'Storgata 3, 0123 Oslo',
  customer: {
    name: 'Ola Nordmann',
    phone: '+47 123 45 678',
    email: 'ola.nordmann@epost.no'
  },
  projectManager: 'Ola Svendsen',
  projectManagerEmail: 'ola.svendsen@ocab.no',
  projectManagerPhone: '+47 468 44 301',
  insurance: 'Forsikringsselskap',
  status: 'in-progress',
  dateCreated: '10. jan 2025',
  dateApproved: '15. jan 2025',
  estimatedCompletion: '28. feb 2025',
  claimAmount: '125 000',
  approvedAmount: '125 000',
  description: 'Vannskade i bad grunnet lekkasje fra varmtvannsbereder'
};

const mockTimeline = [
  { status: 'Skade meldt', date: '10. jan 2025', completed: true, link: 'https://ocab.no/for-befaring/' },
  { status: 'Befaring planlagt', date: '12. jan 2025', completed: true, link: 'https://ocab.no/vi-har-fatt-bekreftelse-fra-forsikringsselskapet-ditt/' },
  { status: 'Dokumentasjon mottatt', date: '14. jan 2025', completed: true, link: 'https://ocab.no/vi-kommer-snart-pa-besok/' },
  { status: 'Godkjent av forsikring', date: '15. jan 2025', completed: true, link: 'https://ocab.no/vi-har-fatt-bekreftelse-fra-forsikringsselskapet-ditt/' },
  { status: 'Reparasjon starter', date: '20. jan 2025', completed: false, active: true, link: 'https://ocab.no/reparasjonen-starter/' },
  { status: 'Tørking pågår', date: '', completed: false, link: 'https://ocab.no/vi-er-i-gang-med-a-torke/' },
  { status: 'Gjenoppbygging', date: '', completed: false, link: 'https://ocab.no/gjenoppbygging/' },
  { status: 'Ferdigstillelse', date: '', completed: false, link: 'https://ocab.no/gratulerer-skaden-din-er-na-reparert/' }
];

const mockDocuments = [
  { id: 1, name: 'Skadefoto_bad.jpg', type: 'image/jpeg', size: 2400, uploadedBy: 'Ola Svendsen', date: '14. jan 2025' },
  { id: 2, name: 'Takst_rapport.pdf', type: 'application/pdf', size: 450, uploadedBy: 'Ola Svendsen', date: '14. jan 2025' },
  { id: 3, name: 'Godkjenning_forsikring.pdf', type: 'application/pdf', size: 120, uploadedBy: 'Forsikringsselskap', date: '15. jan 2025' },
  { id: 4, name: 'Bilder_skade_2.jpg', type: 'image/jpeg', size: 3200, uploadedBy: 'Ola Svendsen', date: '13. jan 2025' },
  { id: 5, name: 'Kostnadsoverslag.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 85, uploadedBy: 'Ola Svendsen', date: '14. jan 2025' }
];

const mockActivityLog = [
  { action: 'Status oppdatert', user: 'System', details: 'Fra "Venter godkjenning" til "Reparasjon starter"', timestamp: '15. jan 2025, 09:15' },
  { action: 'Sak godkjent', user: 'Forsikringsselskap', details: 'Beløp godkjent: kr 125 000', timestamp: '15. jan 2025, 09:15' },
  { action: 'Dokument lastet opp', user: 'Ola Svendsen', details: 'Takst_rapport.pdf', timestamp: '14. jan 2025, 14:30' },
  { action: 'Befaring gjennomført', user: 'Ola Svendsen', details: 'Skadeomfang dokumentert', timestamp: '12. jan 2025, 11:00' },
  { action: 'Sak opprettet', user: 'Ola Svendsen', details: 'Vannskade i bad', timestamp: '10. jan 2025, 09:30' }
];

export function InsuranceCaseDetailPage({ caseId, onBack }: InsuranceCaseDetailPageProps) {
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={20} className="text-[#0062ff]" />;
    if (type.includes('pdf')) return <FileText size={20} className="text-[#da1e28]" />;
    return <FileText size={20} className="text-[#697077]" />;
  };
  
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation Header with Ocab Logo */}
      <nav className="bg-white border-b border-[#dde1e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img 
              src="https://ocab.no/wp-content/uploads/2025/04/ocab-logo-01.svg" 
              alt="Ocab" 
              className="h-8"
            />
          </div>
        </div>
      </nav>

      {/* Read-only banner */}
      <div className="bg-[#d0e2ff] border-b border-[#0062ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-[#0062ff]">
            <Eye size={20} />
            <p className="text-sm">
              Dette er en betaversjon av saksvoersikten til Ocab. Har du innspill? <a href="mailto:feedback@ocab.no" target="_blank">Send oss en mail på feedback@ocab.no</a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-white border-b border-[#dde1e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#016cb7] hover:text-[#006cb7] mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
            Tilbake til oversikt
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[#21272a]">Sak {mockCaseData.id}</h1>
                <StatusBadge status={mockCaseData.status as any} />
              </div>
              <div className="flex items-center gap-2 text-[#697077] mb-4">
                <MapPin size={16} />
                <span>{mockCaseData.address}</span>
              </div>
              
              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#697077]" />
                  <div>
                    <p className="text-xs text-[#697077]">Opprettet</p>
                    <p className="text-sm">{mockCaseData.dateCreated}</p>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Insurance Logo */}
            <GenericInsuranceLogo />
            
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-1 space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
              <h3 className="mb-6">Fremdrift</h3>
              <div className="space-y-4">
                {mockTimeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                        ${item.completed 
                          ? 'bg-[#24a148] border-[#24a148]' 
                          : item.active
                          ? 'bg-[#0062ff] border-[#0062ff]'
                          : 'bg-white border-[#dde1e6]'
                        }`}
                      >
                        {item.completed && <CheckCircle2 size={16} className="text-white" />}
                        {item.active && <Clock size={16} className="text-white" />}
                      </div>
                      {index < mockTimeline.length - 1 && (
                        <div className={`w-0.5 h-8 ${item.completed ? 'bg-[#24a148]' : 'bg-[#dde1e6]'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className={`text-sm ${item.active ? 'text-[#016cb7]' : item.completed ? 'text-[#21272a]' : 'text-[#697077]'}`}>
                        {item.status}
                      </p>
                      {item.date && (
                        <p className="text-xs text-[#697077]">{item.date}</p>
                      )}
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-[#016cb7] hover:underline inline-block mt-1"
                        >
                          Se mer info
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Info, Documents & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Manager Contact */}
              <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
                <h4 className="mb-4">Prosjektleder</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-[#697077]" />
                    <span>{mockCaseData.projectManager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[#697077]" />
                    <a href={`tel:${mockCaseData.projectManagerPhone}`} className="text-[#016cb7] hover:underline">
                      {mockCaseData.projectManagerPhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[#697077]" />
                    <a href={`mailto:${mockCaseData.projectManagerEmail}`} className="text-[#016cb7] hover:underline truncate">
                      {mockCaseData.projectManagerEmail}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Customer Contact */}
              <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
                <h4 className="mb-4">Kundeinformasjon</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-[#697077]" />
                    <span>{mockCaseData.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-[#697077]" />
                    <a href={`tel:${mockCaseData.customer.phone}`} className="text-[#016cb7] hover:underline">
                      {mockCaseData.customer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-[#697077]" />
                    <a href={`mailto:${mockCaseData.customer.email}`} className="text-[#016cb7] hover:underline truncate">
                      {mockCaseData.customer.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Documents */}
            <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
              <h3 className="mb-4">Dokumenter ({mockDocuments.length})</h3>
              <div className="space-y-2">
                {mockDocuments.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center gap-3 p-4 bg-[#f4f4f4] rounded-lg hover:bg-[#e7efff] transition-colors"
                  >
                    {getFileIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{doc.name}</p>
                      <p className="text-xs text-[#697077]">
                        {doc.size} KB · Lastet opp av {doc.uploadedBy} · {doc.date}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-white rounded transition-colors" title="Last ned">
                      <Download size={16} className="text-[#016cb7]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg border border-[#dde1e6] p-6">
            <h3 className="mb-6">Ofte stilte spørsmål</h3>
            <div className="space-y-3">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Hva skal jeg gjøre med møblene mine som er utsatt for vann?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Det er viktig at du tar innbo ut av vannet for å begrense skadeomfanget. Du kan eventuelt klosse opp møbler og annet inventar hvis det ikke er mulig å flytte det ut av vannet.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Kan jeg begynne å tørke?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Du kan begynne å tørke med en gang. Husk å ta bilde av det synlige vannet før du fjerner det. Etter det synlige vannet er fjernet, kan du bruke vifte/avfukter, eller annet du har som kan bidra til å tørke opp fuktigheten. Det viktigste er sirkulasjon og at fuktig luft kan trekke ut i nye områder hvor luften er mindre fuktig. Dette gjerne kombinert med at du øker varmen i huset.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Kan jeg ta bilde av innbo og kaste det?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Nei. Det er opp til hvert enkelt forsikringsselskap å avgjøre om/hvordan du kan håndtere dette, eller om en fagperson er nødt til å se på det. Våre tekniske avdelinger kan bistå med å reparere de vanskeligste skader på innbo.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Jeg har hatt kloakk/tilbakeslag fra sluk/toalett, hva gjør jeg?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Opptre med varsomhet. Om mulig, hindre spredning til uberørte områder, for eksempel ved å lage en \"demning\" med håndklær i døråpning til naborom. Vi anbefaler at du benytter gummihansker, støvler og engangsmaske. Husk å koble ut strømmen i områder under vann eller som har vært under vann. Om du opplever at skaden din krever umiddelbar handling, ta kontakt med vår vakttelefon på 40009009.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Hva skal dere rive/demontere og må jeg være tilstede?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Vi demonterer/river kun det som er berørt av skaden, slik at vi får igangsatt tørkeprosessen av din skade. Du trenger ikke være tilstede. Du kan avtale tilgang til skadestedet med prosjektleder (normal arbeidstid: virkedager mellom 07:00-15:00). Vi kan ved behov montere en nøkkelboks for tilgang til nøkkel.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Er støv i forbindelse med rivearbeid farlig?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Det kan oppstå helseskadelig støv fra byggematerialer, om dette er tilfellet vil vi utføre nødvendige tiltak. Asbest er et eksempel på dette, og det vil kunne medføre en forsinket fremdrift.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Hvor lang tid tar rivejobben?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Demontering og eventuell riving er avhengig av omfanget. Snakk med prosjektlederen din som kan estimere noe om omfanget og reparasjonstiden.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Kan tørkemaskinene skrus av om natten?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Ja, du kan slå den av, men du må kun bruke av/på knappen. Maskinen kan bli ødelagt om du napper den ut av stikkontakten. NB: dette vil forlenge tørkeprosessen. Avtal med prosjektleder om hvordan maskinen skal håndteres.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Er det fargeforskjeller på gulvet mitt?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Det kan hende at det er noen nyanser som oppleves forskjellig, men dette vil over tid jevne seg ut. Fargeforskjellene kan f.eks. skyldes at de nye materialene ikke har blitt eksponert for sollys.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Lukter det litt rart i boligen min?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Din vanlige lukt vil komme tilbake når skaden er reparert og du bruker boligen som normalt igjen. Vi bruker ikke parfymerte produkter for å dekke over luktbildet, men vi fjerner kilden til lukten. Dette medfører at vi også fjerner lukt som du kjenner til i din bolig.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Jeg har spørsmål som gjelder skaden min, hvem kontakter jeg?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Gjelder det spørsmål om skadesaken og fremdrift av denne, er prosjektlederen i Ocab din kontaktperson. Prosjektlederen sørger for at ditt forsikringsselskap er informert om fremdriften i din skadesak. Kontaktinformasjon direkte til din prosjektleder finner du på Min side.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Når kan dere starte og hvordan er arbeidstiden?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Vi planlegger oppstart så fort forsikringsselskapet ditt har tatt erstatningsbeslutning. Ut ifra forsikringsselskapet ditt sin vurdering, vil vi ta kontakt for videre fremdrift. Våre ansatte jobber alle virkedager mellom 07:00 – 15:00.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Må jeg være tilstede under befaring?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Ja, enten du eller en annen er nødt til å være tilstede på skadestedet. Vi ønsker å gjennomføre en digital befaring, men om det er behov for fysisk befaring trenger vi tilgang til boligen din. Det må derfor være en person tilgjengelig for å åpne/låse under avtalt befaringstidspunkt, eventuelt bruke nøkkelboks som vi kan få tilgang til for å låse oss inn.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Hvor lenge må jeg vente på et svar?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Vi sender rapporten til forsikringsselskapet ditt etter befaring. De vil vurdere den og komme tilbake til deg med en erstatningsbeslutning. Tiden er avhengig av kapasitet hos forsikringsselskapet ditt.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Bruker dere farlige kjemikalier eller produkter?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Vi bruker alltid miljøvennlig kjemikalier, og begrenser bruken av denne. Din prosjektleder informer deg om dette. Under behandling har vi på oss nødvendig verneutstyr i rommet som behandles. Dette gjøres uten at du er til stede da enkelte kjemikalier er helseskadelige under virkningsperioden på ca. 15 minutter.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Jeg ønsker å påvirke sluttresultatet i min skadesak. Hvordan går jeg frem?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Om du ønsker andre løsninger enn det du opprinnelig hadde, kan du diskutere materialvalg og løsninger med prosjektleder. PS! Forsikringen din dekker reparasjon til samme stand – derfor må du selv betale for eventuelle oppgraderinger.</p>
                </div>
              </details>
              
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-[#f4f4f4] hover:bg-[#e7efff] rounded-lg transition-colors">
                  <span className="text-sm">Er det andre ting du ønsker å få fikset eller oppgradert hos deg?</span>
                  <span className="ml-4 text-[#697077] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-sm text-[#697077]">
                  <p>Vi tar gjerne en dialog med deg om vi kan hjelpe deg med noe annet. <a href="https://ocab.no/tjenester/" target="_blank" rel="noopener noreferrer" className="text-[#016cb7] hover:underline">Les mer om våre tjenester her</a>.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}