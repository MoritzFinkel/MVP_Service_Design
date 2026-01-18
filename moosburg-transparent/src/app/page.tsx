import Link from "next/link";
import AntragCard from "@/components/AntragCard";
import { antraege, naechsteSitzung, kategorien } from "@/data/antraege";

export default function Home() {
  const neuesteAntraege = antraege.slice(0, 4);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const stats = {
    gesamt: antraege.length,
    angenommen: antraege.filter(a => a.status === 'angenommen').length,
    inBeratung: antraege.filter(a => a.status === 'in-beratung').length,
    buergerStimmen: antraege.reduce((sum, a) => sum + a.buergerAbstimmung.dafuer + a.buergerAbstimmung.dagegen, 0)
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Verstehen, was entschieden wird.
            </h1>
            <p className="text-lg md:text-xl text-[var(--secondary)] mb-8 leading-relaxed">
              Die Plattform für transparente Stadtratsentscheidungen in Moosburg. 
              Einfach erklärt, barrierefrei zugänglich, für alle Bürger:innen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/antraege" className="btn-accent inline-flex items-center gap-2">
                Alle Anträge ansehen
              </Link>
              <Link 
                href="/ueber-uns" 
                className="px-6 py-3 border-2 border-white rounded-lg font-medium hover:bg-white hover:text-[var(--primary)] transition-colors"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-[var(--primary)]">{stats.gesamt}</p>
              <p className="text-sm text-[var(--neutral-gray)]">Anträge gesamt</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-[var(--success)]">{stats.angenommen}</p>
              <p className="text-sm text-[var(--neutral-gray)]">Angenommen</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-[var(--warning)]">{stats.inBeratung}</p>
              <p className="text-sm text-[var(--neutral-gray)]">In Beratung</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-[var(--accent)]">{stats.buergerStimmen}</p>
              <p className="text-sm text-[var(--neutral-gray)]">Bürgerstimmen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Meeting Alert */}
      <section className="bg-[var(--secondary)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-[var(--primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Nächste Stadtratssitzung
                </h2>
                <p className="text-sm text-[var(--neutral-dark)]">
                  {formatDate(naechsteSitzung.datum)} um {naechsteSitzung.uhrzeit} Uhr
                </p>
                <p className="text-xs text-[var(--neutral-gray)]">
                  {naechsteSitzung.ort}
                </p>
              </div>
            </div>
            <Link 
              href="/sitzungen" 
              className="btn-primary text-sm"
            >
              Tagesordnung ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Proposals */}
      <section className="py-12 md:py-16 bg-[var(--neutral-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[var(--neutral-dark)]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Aktuelle Anträge
              </h2>
              <p className="text-[var(--neutral-gray)] mt-1">
                Die neuesten Entscheidungen im Überblick
              </p>
            </div>
            <Link 
              href="/antraege"
              className="text-[var(--primary)] font-medium hover:underline hidden md:block"
            >
              Alle anzeigen →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neuesteAntraege.map((antrag) => (
              <AntragCard key={antrag.id} antrag={antrag} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/antraege" className="btn-primary">
              Alle Anträge anzeigen
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Themen durchstöbern
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(kategorien).map(([key, kategorie]) => (
              <Link
                key={key}
                href={`/antraege?kategorie=${key}`}
                className="card p-4 text-center hover:scale-105"
              >
                <span 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold mx-auto mb-2"
                  style={{ backgroundColor: kategorie.farbe }}
                >
                  {kategorie.label.charAt(0)}
                </span>
                <span className="text-sm font-medium">{kategorie.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[var(--accent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-[var(--neutral-dark)]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Deine Meinung zählt!
          </h2>
          <p className="text-[var(--neutral-dark)] mb-6 max-w-2xl mx-auto">
            Gib deine symbolische Stimme zu den Anträgen ab und zeige, 
            was die Bürger:innen von Moosburg wirklich denken.
          </p>
          <Link href="/antraege" className="btn-primary">
            Jetzt abstimmen →
          </Link>
        </div>
      </section>
    </div>
  );
}
