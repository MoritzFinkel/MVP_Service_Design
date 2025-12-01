"use client";

import { useState } from "react";
import AntragCard from "@/components/AntragCard";
import { antraege, kategorien, stadtteile } from "@/data/antraege";

export default function AntraegePage() {
  const [selectedKategorie, setSelectedKategorie] = useState<string>("alle");
  const [selectedStatus, setSelectedStatus] = useState<string>("alle");
  const [selectedStadtteil, setSelectedStadtteil] = useState<string>("alle");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAntraege = antraege.filter(antrag => {
    const matchesKategorie = selectedKategorie === "alle" || antrag.kategorie === selectedKategorie;
    const matchesStatus = selectedStatus === "alle" || antrag.status === selectedStatus;
    const matchesStadtteil = selectedStadtteil === "alle" || antrag.stadtteil === selectedStadtteil;
    const matchesSearch = antrag.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         antrag.kurzfassung.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesKategorie && matchesStatus && matchesStadtteil && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--neutral-light)]">
      {/* Header */}
      <div className="bg-[var(--primary)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Alle Anträge
          </h1>
          <p className="text-[var(--secondary)]">
            Durchsuche alle Stadtratsentscheidungen und -anträge
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Suche nach Anträgen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedKategorie}
              onChange={(e) => setSelectedKategorie(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
            >
              <option value="alle">Alle Kategorien</option>
              {Object.entries(kategorien).map(([key, kat]) => (
                <option key={key} value={key}>
                  {kat.icon} {kat.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
            >
              <option value="alle">Alle Status</option>
              <option value="angenommen">✅ Angenommen</option>
              <option value="abgelehnt">❌ Abgelehnt</option>
              <option value="in-beratung">⏳ In Beratung</option>
              <option value="vertagt">📅 Vertagt</option>
            </select>

            {/* Stadtteil Filter */}
            <select
              value={selectedStadtteil}
              onChange={(e) => setSelectedStadtteil(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
            >
              <option value="alle">Alle Stadtteile</option>
              {stadtteile.map((stadtteil) => (
                <option key={stadtteil} value={stadtteil}>
                  📍 {stadtteil}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <p className="text-sm text-[var(--neutral-gray)] mb-6">
          {filteredAntraege.length} {filteredAntraege.length === 1 ? 'Antrag' : 'Anträge'} gefunden
        </p>

        {filteredAntraege.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-medium text-[var(--neutral-dark)]">
              Keine Anträge gefunden
            </p>
            <p className="text-sm text-[var(--neutral-gray)] mt-2">
              Versuche es mit anderen Filtereinstellungen
            </p>
            <button
              onClick={() => {
                setSelectedKategorie("alle");
                setSelectedStatus("alle");
                setSelectedStadtteil("alle");
                setSearchTerm("");
              }}
              className="btn-primary mt-4"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAntraege.map((antrag) => (
              <AntragCard key={antrag.id} antrag={antrag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
