"use client";

import { Abstimmung } from "@/data/antraege";

interface VotingChartProps {
  abstimmung: {
    dafuer: number;
    dagegen: number;
    abwesend: number;
    details: Abstimmung[];
  };
}

export default function VotingChart({ abstimmung }: VotingChartProps) {
  const total = abstimmung.dafuer + abstimmung.dagegen + abstimmung.abwesend;
  
  if (total === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-[var(--neutral-gray)]">
          Noch keine Abstimmung erfolgt
        </p>
      </div>
    );
  }

  const dafuerPercent = (abstimmung.dafuer / total) * 100;
  const dagegenPercent = (abstimmung.dagegen / total) * 100;
  const abwesendPercent = (abstimmung.abwesend / total) * 100;

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Abstimmungsergebnis
      </h3>

      {/* Total Members Info */}
      <p className="text-sm text-[var(--neutral-gray)] mb-4">
        Stadtrat: 25 Mitglieder ({25 - abstimmung.abwesend} anwesend)
      </p>

      {/* Main Result */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-[var(--success)] flex items-center justify-center text-white text-sm font-medium transition-all"
              style={{ width: `${dafuerPercent}%` }}
            >
              {dafuerPercent > 15 && `${Math.round(dafuerPercent)}%`}
            </div>
            <div 
              className="h-full bg-[var(--danger)] flex items-center justify-center text-white text-sm font-medium transition-all"
              style={{ width: `${dagegenPercent}%` }}
            >
              {dagegenPercent > 15 && `${Math.round(dagegenPercent)}%`}
            </div>
            <div 
              className="h-full bg-gray-400 flex items-center justify-center text-white text-sm font-medium transition-all"
              style={{ width: `${abwesendPercent}%` }}
            >
              {abwesendPercent > 15 && `${Math.round(abwesendPercent)}%`}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--success)]" />
          <span className="text-sm">Dafür: <strong>{abstimmung.dafuer}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--danger)]" />
          <span className="text-sm">Dagegen: <strong>{abstimmung.dagegen}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-400" />
          <span className="text-sm">Abwesend: <strong>{abstimmung.abwesend}</strong></span>
        </div>
      </div>

      {/* Party Breakdown */}
      {abstimmung.details.length > 0 && (
        <>
          <h4 className="font-medium text-sm text-[var(--neutral-gray)] mb-3">
            Abstimmung nach Fraktion
          </h4>
          <div className="space-y-3">
            {abstimmung.details.map((partei) => {
              const parteiTotal = partei.dafuer + partei.dagegen + partei.abwesend;
              return (
                <div key={partei.partei} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: partei.farbe }}
                  />
                  <span className="w-16 text-sm font-medium">{partei.partei}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden flex">
                    <div 
                      className="h-full bg-[var(--success)] transition-all"
                      style={{ width: `${(partei.dafuer / parteiTotal) * 100}%` }}
                    />
                    <div 
                      className="h-full bg-[var(--danger)] transition-all"
                      style={{ width: `${(partei.dagegen / parteiTotal) * 100}%` }}
                    />
                    <div 
                      className="h-full bg-gray-400 transition-all"
                      style={{ width: `${(partei.abwesend / parteiTotal) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--neutral-gray)] w-20 text-right">
                    {partei.dafuer}:{partei.dagegen}:{partei.abwesend}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
