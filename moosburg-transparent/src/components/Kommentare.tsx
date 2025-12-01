"use client";

import { useState } from "react";

interface Kommentar {
  id: string;
  autor: string;
  text: string;
  datum: string;
  likes: number;
}

interface KommentareProps {
  kommentare: Kommentar[];
  antragId: string;
}

export default function Kommentare({ kommentare: initialKommentare, antragId }: KommentareProps) {
  const [kommentare, setKommentare] = useState(initialKommentare);
  const [neuerKommentar, setNeuerKommentar] = useState("");
  const [autorName, setAutorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!neuerKommentar.trim() || !autorName.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment: Kommentar = {
        id: `temp-${Date.now()}`,
        autor: autorName,
        text: neuerKommentar,
        datum: new Date().toISOString().split('T')[0],
        likes: 0
      };
      
      setKommentare([newComment, ...kommentare]);
      setNeuerKommentar("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleLike = (kommentarId: string) => {
    setKommentare(prev => 
      prev.map(k => 
        k.id === kommentarId 
          ? { ...k, likes: k.likes + 1 }
          : k
      )
    );
  };

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        💬 Bürgermeinungen ({kommentare.length})
      </h3>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-[var(--neutral-light)] rounded-lg">
        <h4 className="font-medium text-sm mb-3">Deine Meinung zählt!</h4>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Dein Name"
            value={autorName}
            onChange={(e) => setAutorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Was denkst du zu diesem Antrag?"
            value={neuerKommentar}
            onChange={(e) => setNeuerKommentar(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !neuerKommentar.trim() || !autorName.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Wird gesendet..." : "Kommentar abschicken"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {kommentare.length === 0 ? (
          <p className="text-center text-[var(--neutral-gray)] py-8">
            Noch keine Kommentare. Sei der/die Erste!
          </p>
        ) : (
          kommentare.map((kommentar) => (
            <div 
              key={kommentar.id} 
              className="p-4 bg-white border border-gray-100 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {kommentar.autor.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{kommentar.autor}</p>
                    <p className="text-xs text-[var(--neutral-gray)]">
                      {formatDate(kommentar.datum)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleLike(kommentar.id)}
                  className="flex items-center gap-1 text-sm text-[var(--neutral-gray)] hover:text-[var(--primary)] transition-colors"
                >
                  ❤️ {kommentar.likes}
                </button>
              </div>
              <p className="text-sm text-[var(--neutral-dark)] leading-relaxed">
                {kommentar.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
