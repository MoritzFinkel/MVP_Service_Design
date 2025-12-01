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
            🎯 Unsere Mission
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
            ✨ Was wir bieten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📝
              </div>
              <div>
                <h3 className="font-semibold mb-1">Einfache Sprache</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Komplexe Anträge verständlich zusammengefasst – ohne Amtsdeutsch
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📊
              </div>
              <div>
                <h3 className="font-semibold mb-1">Visualisierte Abstimmungen</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Wer hat wie abgestimmt? Übersichtliche Diagramme zeigen es
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🗺️
              </div>
              <div>
                <h3 className="font-semibold mb-1">Interaktive Karte</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Finde Projekte in deinem Stadtteil auf einen Blick
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="font-semibold mb-1">Bürgerbeteiligung</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Kommentiere und stimme symbolisch ab – deine Meinung zählt!
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📱
              </div>
              <div>
                <h3 className="font-semibold mb-1">Mobile First</h3>
                <p className="text-sm text-[var(--neutral-gray)]">
                  Optimiert für Smartphone – Politik für unterwegs
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                ♿
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
            👥 Das Team
          </h2>
          <p className="text-[var(--neutral-dark)] leading-relaxed mb-6">
            Moosburg Transparent ist ein Projekt von Studierenden der Hochschule München im Rahmen 
            des Studiengangs Service Design. Wir arbeiten gemeinsam mit der Stadt Moosburg daran, 
            Kommunalpolitik zugänglicher zu machen.
          </p>
          <div className="bg-[var(--secondary)] rounded-xl p-6 text-center">
            <p className="text-sm text-[var(--neutral-dark)]">
              📚 Entwickelt im Wintersemester 2024/25<br />
              🎓 Hochschule München – Service Design<br />
              🤝 In Kooperation mit der Stadt Moosburg a.d. Isar
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
