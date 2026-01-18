import Link from "next/link";

export default function UeberUnsPage() {
  return (
    <div className="min-h-screen bg-[var(--neutral-light)]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Über Moosburg Transparent
          </h1>
          <p className="text-xl text-[var(--secondary)]">
            Transparenz schafft Vertrauen.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Unsere Mission
          </h2>
          <p className="text-[var(--neutral-dark)] leading-relaxed mb-4">
            Die Sitzungen des Moosburger Stadtrats sind der zentrale Ort lokalpolitischer demokratischer 
            Entscheidungen – für viele Bürger jedoch schwer zugänglich. Protokolle sind oft unübersichtlich 
            und erst nach längeren Zeiträumen einsehbar, technische Begriffe unverständlich.
          </p>
          <p className="text-[var(--neutral-dark)] leading-relaxed">
            <strong>Moosburg Transparent</strong> macht politische Entscheidungen mittels mehrerer Maßnahmen 
            <strong> sichtbarer</strong> und <strong>verständlicher</strong>. Durch digitale, barrierefreie 
            und interaktive Formate wird die Stadtratst&auml;tigkeit näher an den Alltag der Bürger gebracht.
          </p>
        </section>

        {/* Goals */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Was wir bieten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Einfache Sprache</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Komplexe Anträge verständlich zusammengefasst – ohne Amtsdeutsch
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Visualisierte Abstimmungen</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Wer hat wie abgestimmt? Übersichtliche Diagramme zeigen es
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Interaktive Karte</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Finde Projekte in deinem Stadtteil auf einen Blick
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Bürgerbeteiligung</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Kommentiere und stimme symbolisch ab – deine Meinung zählt!
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Mobile First</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Optimiert für Smartphone – Politik für unterwegs
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Barrierefrei</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Zugänglich für alle – unabhängig von Einschränkungen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Das Team
          </h2>
          <p className="text-[var(--neutral-dark)] leading-relaxed mb-6">
            Moosburg Transparent ist ein Projekt von Studierenden der Hochschule München im Rahmen 
            des Studiengangs Service Design. Wir arbeiten gemeinsam mit der Stadt Moosburg daran, 
            Kommunalpolitik zugänglicher zu machen.
          </p>
          <div className="bg-[var(--primary)] rounded-xl p-6 text-center">
            <p className="text-base text-white font-medium leading-relaxed">
              Entwickelt im Wintersemester 2025/26<br />
              Hochschule München – Service Design<br />
              In Kooperation mit der Stadt Moosburg a.d. Isar
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Mach mit!
          </h2>
          <p className="mb-6 text-[var(--secondary)]">
            Entdecke die neuesten Stadtratsentscheidungen und bring dich ein.
          </p>
          <Link href="/antraege" className="btn-accent inline-block">
            Zu den Anträgen →
          </Link>
        </section>
      </div>
    </div>
  );
}
