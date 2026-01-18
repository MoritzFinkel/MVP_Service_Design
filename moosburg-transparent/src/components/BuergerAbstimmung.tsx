"use client";

import { useState } from "react";

interface BuergerAbstimmungProps {
  antragId: string;
  initialDafuer: number;
  initialDagegen: number;
}

export default function BuergerAbstimmung({ 
  antragId, 
  initialDafuer, 
  initialDagegen 
}: BuergerAbstimmungProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'dafuer' | 'dagegen' | null>(null);
  const [dafuer, setDafuer] = useState(initialDafuer);
  const [dagegen, setDagegen] = useState(initialDagegen);

  const total = dafuer + dagegen;
  const dafuerPercent = total > 0 ? (dafuer / total) * 100 : 50;

  const handleVote = (vote: 'dafuer' | 'dagegen') => {
    if (hasVoted) return;
    
    setHasVoted(true);
    setUserVote(vote);
    
    if (vote === 'dafuer') {
      setDafuer(prev => prev + 1);
    } else {
      setDagegen(prev => prev + 1);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Wie würdest du abstimmen?
      </h3>
      <p className="text-sm text-[var(--neutral-gray)] mb-4">
        {hasVoted 
          ? "Danke für deine Stimme! So haben andere Bürger:innen abgestimmt:"
          : "Diese symbolische Abstimmung zeigt die Meinung der Bürger:innen. Klicke, um deine Stimme abzugeben!"
        }
      </p>

      {/* Vote Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleVote('dafuer')}
          disabled={hasVoted}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            hasVoted
              ? userVote === 'dafuer'
                ? 'bg-[var(--success)] text-white'
                : 'bg-gray-100 text-gray-400'
              : 'bg-[var(--success)]/10 text-[var(--success)] hover:bg-[var(--success)] hover:text-white'
          }`}
        >
          Dafür
        </button>
        <button
          onClick={() => handleVote('dagegen')}
          disabled={hasVoted}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            hasVoted
              ? userVote === 'dagegen'
                ? 'bg-[var(--danger)] text-white'
                : 'bg-gray-100 text-gray-400'
              : 'bg-[var(--danger)]/10 text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white'
          }`}
        >
          Dagegen
        </button>
      </div>

      {/* Result Bar - nur nach Abstimmung sichtbar */}
      {hasVoted ? (
        <>
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-[var(--success)] transition-all duration-500"
                style={{ width: `${dafuerPercent}%` }}
              />
              <div 
                className="h-full bg-[var(--danger)] transition-all duration-500"
                style={{ width: `${100 - dafuerPercent}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm mb-4">
            <span className="text-[var(--success)] font-medium">
              {dafuer} Stimmen ({Math.round(dafuerPercent)}%)
            </span>
            <span className="text-[var(--danger)] font-medium">
              {dagegen} Stimmen ({Math.round(100 - dafuerPercent)}%)
            </span>
          </div>

          <p className="text-center text-xs text-[var(--neutral-gray)] p-3 bg-[var(--secondary)] rounded-lg">
            Diese Abstimmung ist symbolisch und dient dazu, die Meinung der Bürger:innen sichtbar zu machen. 
            Für echte Bürgerbeteiligung besuche die <a href="https://www.moosburg.de" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline">offizielle Website der Stadt Moosburg</a>.
          </p>
        </>
      ) : (
        <div className="text-center py-4 bg-[var(--neutral-light)] rounded-lg">
          <p className="text-sm text-[var(--neutral-gray)]">
            Stimme ab, um zu sehen wie andere Bürger:innen denken
          </p>
        </div>
      )}
    </div>
  );
}
