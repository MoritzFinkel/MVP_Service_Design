import { notFound } from "next/navigation";
import Link from "next/link";
import { antraege, kategorien } from "@/data/antraege";
import VotingChart from "@/components/VotingChart";
import BuergerAbstimmung from "@/components/BuergerAbstimmung";
import Kommentare from "@/components/Kommentare";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AntragDetail({ params }: Props) {
  const { id } = await params;
  const antrag = antraege.find(a => a.id === id);

  if (!antrag) {
    notFound();
  }

  const kategorie = kategorien[antrag.kategorie];

  const statusConfig = {
    'angenommen': { label: 'Angenommen', class: 'badge-success' },
    'abgelehnt': { label: 'Abgelehnt', class: 'badge-danger' },
    'in-beratung': { label: 'In Beratung', class: 'badge-warning' },
    'vertagt': { label: 'Vertagt', class: 'badge-info' },
  };

  const status = statusConfig[antrag.status];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-light)]">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/antraege" 
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline text-sm"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div 
        className="py-12"
        style={{ backgroundColor: `${kategorie.farbe}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Badge - prominent */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-base font-semibold ${status.class}`}>
              {status.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: kategorie.farbe }}
            >
              {kategorie.label.charAt(0)}
            </span>
            <span className="text-sm font-medium" style={{ color: kategorie.farbe }}>
              {kategorie.label}
            </span>
          </div>

          <h1 
            className="text-2xl md:text-4xl font-bold text-[var(--neutral-dark)] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {antrag.titel}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-[var(--neutral-gray)]">
            <span>{formatDate(antrag.datum)}</span>
            <span>{antrag.sitzung}</span>
            {antrag.stadtteil && <span>{antrag.stadtteil}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Kurz erklärt
              </h2>
              <p className="text-[var(--neutral-dark)] leading-relaxed bg-[var(--secondary)] p-4 rounded-lg">
                {antrag.kurzfassung}
              </p>
            </div>

            {/* Full Description */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Details zum Antrag
              </h2>
              <div className="prose prose-sm max-w-none text-[var(--neutral-dark)]">
                {antrag.beschreibung.split('\n\n').map((paragraph, idx) => {
                  // Überschrift mit Bullet-Points darunter
                  if (paragraph.startsWith('**') && paragraph.includes('\n- ')) {
                    const lines = paragraph.split('\n');
                    const heading = lines[0].replace(/\*\*/g, '');
                    const bullets = lines.slice(1).filter(line => line.startsWith('- '));
                    return (
                      <div key={idx}>
                        <h3 className="font-semibold mt-4 mb-2">{heading}</h3>
                        <ul className="list-disc pl-5 space-y-1 mb-4">
                          {bullets.map((item, i) => (
                            <li key={i} className="text-[var(--neutral-dark)]">
                              {item.replace('- ', '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  // Nur Überschrift
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={idx} className="font-semibold mt-4 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  // Nur Bullet-Points
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1 mb-4">
                        {paragraph.split('\n').filter(line => line.startsWith('- ')).map((item, i) => (
                          <li key={i} className="text-[var(--neutral-dark)]">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Normaler Paragraph
                  return <p key={idx} className="mb-3">{paragraph}</p>;
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Zeitverlauf
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-4">
                  {antrag.timeline.map((event, idx) => {
                    const isPast = new Date(event.datum) <= new Date();
                    return (
                      <div key={idx} className="flex gap-4 relative">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                            isPast 
                              ? 'bg-[var(--primary)] text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {isPast ? '✓' : (idx + 1)}
                        </div>
                        <div className={isPast ? '' : 'opacity-60'}>
                          <p className="font-medium text-sm">{event.ereignis}</p>
                          <p className="text-xs text-[var(--neutral-gray)]">
                            {formatDate(event.datum)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Comments */}
            <Kommentare kommentare={antrag.kommentare} antragId={antrag.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Result */}
            <VotingChart abstimmung={antrag.abstimmung} />

            {/* Citizen Vote */}
            <BuergerAbstimmung 
              antragId={antrag.id}
              initialDafuer={antrag.buergerAbstimmung.dafuer}
              initialDagegen={antrag.buergerAbstimmung.dagegen}
            />

            {/* Share */}
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Teilen
              </h3>
              <p className="text-sm text-[var(--neutral-gray)] mb-4">
                Mach andere Bürger:innen auf diesen Antrag aufmerksam!
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-4 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Twitter
                </button>
                <button className="flex-1 py-2 px-4 bg-[#4267B2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Facebook
                </button>
                <button className="flex-1 py-2 px-4 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all proposals
export function generateStaticParams() {
  return antraege.map((antrag) => ({
    id: antrag.id,
  }));
}
