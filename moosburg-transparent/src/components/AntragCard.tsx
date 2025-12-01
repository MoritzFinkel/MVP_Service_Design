import Link from "next/link";
import { Antrag, kategorien } from "@/data/antraege";

interface AntragCardProps {
  antrag: Antrag;
}

export default function AntragCard({ antrag }: AntragCardProps) {
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
      month: '2-digit',
      year: 'numeric'
    });
  };

  const totalVotes = antrag.abstimmung.dafuer + antrag.abstimmung.dagegen + antrag.abstimmung.enthaltung;
  const dafuerPercent = totalVotes > 0 ? (antrag.abstimmung.dafuer / totalVotes) * 100 : 0;

  return (
    <Link href={`/antrag/${antrag.id}`}>
      <article className="card p-5 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ backgroundColor: `${kategorie.farbe}20` }}
            >
              {kategorie.icon}
            </span>
            <span className="text-xs text-[var(--neutral-gray)]">
              {kategorie.label}
            </span>
          </div>
          <span className={`badge ${status.class}`}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="font-semibold text-lg mb-2 line-clamp-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {antrag.titel}
        </h3>

        {/* Summary */}
        <p className="text-sm text-[var(--neutral-gray)] mb-4 line-clamp-2 flex-grow">
          {antrag.kurzfassung}
        </p>

        {/* Voting Bar (if voted) */}
        {totalVotes > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-[var(--neutral-gray)] mb-1">
              <span>Dafür: {antrag.abstimmung.dafuer}</span>
              <span>Dagegen: {antrag.abstimmung.dagegen}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-[var(--success)]"
                style={{ width: `${dafuerPercent}%` }}
              />
              <div 
                className="h-full bg-[var(--danger)]"
                style={{ width: `${100 - dafuerPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[var(--neutral-gray)] pt-3 border-t border-gray-100">
          <span>📅 {formatDate(antrag.datum)}</span>
          {antrag.stadtteil && (
            <span>📍 {antrag.stadtteil}</span>
          )}
          <span>💬 {antrag.kommentare.length}</span>
        </div>
      </article>
    </Link>
  );
}
