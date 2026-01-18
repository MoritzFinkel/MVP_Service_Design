"use client";

import { useState } from "react";
import Link from "next/link";
import { antraege, kategorien, stadtteile } from "@/data/antraege";

export default function KartePage() {
  const [selectedStadtteil, setSelectedStadtteil] = useState<string | null>(null);

  // Group proposals by district
  const antraegeByStadtteil = stadtteile.reduce((acc, stadtteil) => {
    acc[stadtteil] = antraege.filter(a => a.stadtteil === stadtteil);
    return acc;
  }, {} as Record<string, typeof antraege>);

  const filteredAntraege = selectedStadtteil 
    ? antraegeByStadtteil[selectedStadtteil] || []
    : antraege.filter(a => a.stadtteil);

  // Simple map coordinates for districts (simplified representation)
  const stadtteilPositions: Record<string, { x: number; y: number }> = {
    "Altstadt": { x: 50, y: 50 },
    "Stadtpark": { x: 70, y: 40 },
    "Nord": { x: 50, y: 20 },
    "Süd": { x: 50, y: 80 },
    "Gewerbegebiet": { x: 80, y: 70 },
    "Aich": { x: 20, y: 60 },
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-light)]">
      {/* Header */}
      <div className="bg-[var(--primary)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Stadtkarte
          </h1>
          <p className="text-[var(--secondary)]">
            Entdecke Anträge und Projekte in deinem Stadtteil
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Wähle deinen Stadtteil
              </h2>
              
              {/* Interactive Map (Simplified) */}
              <div className="relative bg-gradient-to-br from-[var(--secondary)] to-blue-100 rounded-xl h-96 mb-4 overflow-hidden">
                {/* Map background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,119,182,0.2)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* District markers */}
                {stadtteile.map((stadtteil) => {
                  const pos = stadtteilPositions[stadtteil];
                  const count = antraegeByStadtteil[stadtteil]?.length || 0;
                  const isSelected = selectedStadtteil === stadtteil;
                  
                  return (
                    <button
                      key={stadtteil}
                      onClick={() => setSelectedStadtteil(isSelected ? null : stadtteil)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        isSelected ? 'scale-125 z-10' : 'hover:scale-110'
                      }`}
                      style={{ 
                        left: `${pos.x}%`, 
                        top: `${pos.y}%` 
                      }}
                    >
                      <div 
                        className={`relative flex flex-col items-center ${
                          isSelected ? 'text-white' : ''
                        }`}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-colors ${
                            isSelected 
                              ? 'bg-[var(--primary)] text-white' 
                              : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)]'
                          }`}
                        >
                          {count}
                        </div>
                        <span 
                          className={`mt-1 text-xs font-medium px-2 py-0.5 rounded ${
                            isSelected 
                              ? 'bg-[var(--primary)] text-white' 
                              : 'bg-white text-[var(--neutral-dark)] shadow'
                          }`}
                        >
                          {stadtteil}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Center label */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[var(--primary)] bg-white/80 px-2 py-1 rounded mt-1">
                    Moosburg
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[var(--primary)]" />
                  <span>Ausgewählt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-[var(--primary)]" />
                  <span>Stadtteil mit Projekten</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - District Details */}
          <div className="space-y-4">
            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedStadtteil ? selectedStadtteil : 'Alle Stadtteile'}
              </h2>
              
              {selectedStadtteil && (
                <button
                  onClick={() => setSelectedStadtteil(null)}
                  className="text-sm text-[var(--primary)] hover:underline mb-4"
                >
                  ← Alle Stadtteile anzeigen
                </button>
              )}

              <p className="text-sm text-[var(--neutral-gray)] mb-4">
                {filteredAntraege.length} {filteredAntraege.length === 1 ? 'Projekt' : 'Projekte'} 
                {selectedStadtteil ? ` in ${selectedStadtteil}` : ' mit Stadtteilbezug'}
              </p>

              {filteredAntraege.length === 0 ? (
                <p className="text-center py-8 text-[var(--neutral-gray)]">
                  Keine Projekte in diesem Stadtteil
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAntraege.map((antrag) => {
                    const kategorie = kategorien[antrag.kategorie];
                    return (
                      <Link
                        key={antrag.id}
                        href={`/antrag/${antrag.id}`}
                        className="block p-3 bg-[var(--neutral-light)] rounded-lg hover:bg-[var(--secondary)] transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <span 
                            className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                            style={{ backgroundColor: kategorie.farbe }}
                          >
                            {kategorie.label.charAt(0)}
                          </span>
                          <div>
                            <p className="font-medium text-sm line-clamp-1">
                              {antrag.titel}
                            </p>
                            <p className="text-xs text-[var(--neutral-gray)]">
                              {antrag.stadtteil}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* District Quick Stats */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Stadtteile im Überblick
              </h3>
              <div className="space-y-2">
                {stadtteile.map((stadtteil) => {
                  const count = antraegeByStadtteil[stadtteil]?.length || 0;
                  return (
                    <button
                      key={stadtteil}
                      onClick={() => setSelectedStadtteil(stadtteil)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedStadtteil === stadtteil 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'hover:bg-[var(--neutral-light)]'
                      }`}
                    >
                      <span className="text-sm">{stadtteil}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedStadtteil === stadtteil
                          ? 'bg-white/20 text-white'
                          : 'bg-[var(--secondary)] text-[var(--primary)]'
                      }`}>
                        {count} Projekte
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
