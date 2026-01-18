import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--neutral-dark)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h2 className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Moosburg Transparent
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Eine Initiative für mehr Transparenz in der Kommunalpolitik. 
              Wir machen Stadtratsentscheidungen verständlich und zugänglich für alle Bürger:innen.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Ein Projekt im Rahmen des Service Design Studiums an der Hochschule München.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[var(--accent)]">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/antraege" className="text-gray-400 hover:text-white transition-colors">
                  Alle Anträge
                </Link>
              </li>
              <li>
                <Link href="/karte" className="text-gray-400 hover:text-white transition-colors">
                  Stadtkarte
                </Link>
              </li>
              <li>
                <Link href="/abstimmungen" className="text-gray-400 hover:text-white transition-colors">
                  Abstimmungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-[var(--accent)]">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@moosburg-transparent.de</li>
              <li>Stadt Moosburg a.d. Isar</li>
              <li>Stadtplatz 13, 85368 Moosburg</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Moosburg Transparent. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
            <Link href="/barrierefreiheit" className="hover:text-white transition-colors">
              Barrierefreiheit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
