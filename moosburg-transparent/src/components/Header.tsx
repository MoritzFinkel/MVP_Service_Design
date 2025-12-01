"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--primary)] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[var(--primary)] font-bold text-xl">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Moosburg Transparent
              </h1>
              <p className="text-xs text-[var(--secondary)] opacity-90">
                Verstehen, was entschieden wird
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="hover:text-[var(--accent)] transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/antraege" 
              className="hover:text-[var(--accent)] transition-colors font-medium"
            >
              Alle Anträge
            </Link>
            <Link 
              href="/karte" 
              className="hover:text-[var(--accent)] transition-colors font-medium"
            >
              Stadtkarte
            </Link>
            <Link 
              href="/abstimmungen" 
              className="hover:text-[var(--accent)] transition-colors font-medium"
            >
              Abstimmungen
            </Link>
            <Link 
              href="/ueber-uns" 
              className="hover:text-[var(--accent)] transition-colors font-medium"
            >
              Über uns
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Dashboard
              </Link>
              <Link 
                href="/antraege" 
                className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                📋 Alle Anträge
              </Link>
              <Link 
                href="/karte" 
                className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                🗺️ Stadtkarte
              </Link>
              <Link 
                href="/abstimmungen" 
                className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                📊 Abstimmungen
              </Link>
              <Link 
                href="/ueber-uns" 
                className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ℹ️ Über uns
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
