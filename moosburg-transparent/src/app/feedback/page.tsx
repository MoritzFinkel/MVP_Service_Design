"use client";

import { useState } from "react";
import Link from "next/link";

interface FeedbackData {
  // Allgemeine Infos
  alter: string;
  digitalErfahrung: string;
  
  // Aufgaben-Feedback
  aufgabe1: string;
  aufgabe2: string;
  aufgabe3: string;
  aufgabe4: string;
  aufgabe5: string;
  aufgabe6: string;
  
  // SUS (System Usability Scale) - 10 Fragen, 1-5
  sus1: number; // Würde regelmäßig nutzen
  sus2: number; // Unnötig kompliziert
  sus3: number; // Einfach zu bedienen
  sus4: number; // Bräuchte Hilfe
  sus5: number; // Gut integriert
  sus6: number; // Zu viele Unstimmigkeiten
  sus7: number; // Schnell verstehen
  sus8: number; // Umständlich
  sus9: number; // Sicher gefühlt
  sus10: number; // Viel lernen müssen
  
  // Offene Fragen
  gutGefallen: string;
  verwirrend: string;
  fehlt: string;
  sonstiges: string;
}

// ⚠️ WICHTIG: Ersetze diese ID mit deiner eigenen von https://formspree.io
const FORMSPREE_ID = "mbddrjvp"; // z.B. "xyzabcde"

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FeedbackData>({
    alter: "",
    digitalErfahrung: "",
    aufgabe1: "",
    aufgabe2: "",
    aufgabe3: "",
    aufgabe4: "",
    aufgabe5: "",
    aufgabe6: "",
    sus1: 0,
    sus2: 0,
    sus3: 0,
    sus4: 0,
    sus5: 0,
    sus6: 0,
    sus7: 0,
    sus8: 0,
    sus9: 0,
    sus10: 0,
    gutGefallen: "",
    verwirrend: "",
    fehlt: "",
    sonstiges: "",
  });

  const updateField = (field: keyof FeedbackData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // SUS Score berechnen (0-100)
      // Ungerade Fragen (1,3,5,7,9): Score - 1
      // Gerade Fragen (2,4,6,8,10): 5 - Score
      const susRaw = 
        (formData.sus1 - 1) + (5 - formData.sus2) +
        (formData.sus3 - 1) + (5 - formData.sus4) +
        (formData.sus5 - 1) + (5 - formData.sus6) +
        (formData.sus7 - 1) + (5 - formData.sus8) +
        (formData.sus9 - 1) + (5 - formData.sus10);
      const susScore = susRaw * 2.5;

      // Nummerierte Felder für korrekte Reihenfolge in Formspree
      const sortedData = {
        "01_Alter": formData.alter || "Keine Angabe",
        "02_Digitale_Erfahrung": formData.digitalErfahrung || "Keine Angabe",
        "03_Aufgabe1_Startseite": formData.aufgabe1 || "Keine Angabe",
        "04_Aufgabe2_Antrag_finden": formData.aufgabe2 || "Keine Angabe",
        "05_Aufgabe3_Antrag_verstehen": formData.aufgabe3 || "Keine Angabe",
        "06_Aufgabe4_Filter": formData.aufgabe4 || "Keine Angabe",
        "07_Aufgabe5_Stadtkarte": formData.aufgabe5 || "Keine Angabe",
        "08_Aufgabe6_Buergerabstimmung": formData.aufgabe6 || "Keine Angabe",
        "09_SUS01_Regelmaessig_nutzen": `${formData.sus1}/5`,
        "10_SUS02_Unnoetig_kompliziert": `${formData.sus2}/5`,
        "11_SUS03_Einfach_bedienen": `${formData.sus3}/5`,
        "12_SUS04_Hilfe_benoetigt": `${formData.sus4}/5`,
        "13_SUS05_Gut_integriert": `${formData.sus5}/5`,
        "14_SUS06_Unstimmigkeiten": `${formData.sus6}/5`,
        "15_SUS07_Schnell_verstehen": `${formData.sus7}/5`,
        "16_SUS08_Umstaendlich": `${formData.sus8}/5`,
        "17_SUS09_Sicher_gefuehlt": `${formData.sus9}/5`,
        "18_SUS10_Viel_lernen": `${formData.sus10}/5`,
        "19_SUS_SCORE": `${susScore.toFixed(1)}/100`,
        "20_Was_gut_gefallen": formData.gutGefallen || "Keine Angabe",
        "21_Was_verwirrend": formData.verwirrend || "Keine Angabe",
        "22_Was_fehlt": formData.fehlt || "Keine Angabe",
        "23_Sonstiges": formData.sonstiges || "Keine Angabe",
        "_subject": "Neues Moosburg Transparent Feedback",
      };

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sortedData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Fehler beim Senden");
      }
    } catch {
      setSubmitError("Das Feedback konnte nicht gesendet werden. Bitte versuche es erneut.");
      // Fallback: lokal speichern
      const existingFeedback = JSON.parse(localStorage.getItem("moosburg-feedback") || "[]");
      existingFeedback.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem("moosburg-feedback", JSON.stringify(existingFeedback));
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: "Willkommen", icon: "👋" },
    { title: "Über dich", icon: "👤" },
    { title: "Aufgaben 1-3", icon: "📋" },
    { title: "Aufgaben 4-6", icon: "📋" },
    { title: "SUS 1-5", icon: "📊" },
    { title: "SUS 6-10", icon: "📊" },
    { title: "Feedback", icon: "💬" },
  ];

  const RatingScale = ({ 
    value, 
    onChange, 
    label,
    isNegative = false
  }: { 
    value: number; 
    onChange: (v: number) => void; 
    label: string;
    isNegative?: boolean;
  }) => (
    <div className={`mb-6 p-4 rounded-lg ${isNegative ? "bg-orange-50 border border-orange-200" : ""}`}>
      <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-1">
        {label}
      </label>
      {isNegative && (
        <p className="text-xs text-orange-600 mb-2 flex items-center gap-1">
          ⚠️ Achtung: Negative Aussage – lies genau!
        </p>
      )}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-12 h-12 rounded-lg font-bold transition-all ${
              value === num
                ? isNegative 
                  ? "bg-orange-500 text-white scale-110"
                  : "bg-[var(--primary)] text-white scale-110"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        <span>Stimme gar nicht zu</span>
        <span>Stimme voll zu</span>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--neutral-light)] flex items-center justify-center p-4">
        <div className="card p-8 max-w-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 
            className="text-2xl font-bold text-[var(--primary)] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Vielen Dank!
          </h1>
          <p className="text-[var(--neutral-gray)] mb-6">
            Dein Feedback hilft uns, Moosburg Transparent für alle Bürger:innen besser zu machen.
          </p>
          <Link 
            href="/"
            className="btn-primary inline-block"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--neutral-light)]">
      {/* Header */}
      <div className="bg-[var(--primary)] text-white py-8">
        <div className="max-w-3xl mx-auto px-4">
          <h1 
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            🧪 User Testing Feedback
          </h1>
          <p className="text-[var(--secondary)]">
            Hilf uns, die Plattform zu verbessern
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`flex flex-col items-center transition-all ${
                  idx === currentStep
                    ? "text-[var(--primary)]"
                    : idx < currentStep
                    ? "text-[var(--success)]"
                    : "text-gray-400"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                  idx === currentStep
                    ? "bg-[var(--primary)] text-white"
                    : idx < currentStep
                    ? "bg-[var(--success)] text-white"
                    : "bg-gray-200"
                }`}>
                  {idx < currentStep ? "✓" : step.icon}
                </div>
                <span className="text-xs hidden md:block">{step.title}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--primary)] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card p-6 md:p-8">
          
          {/* Step 0: Willkommen */}
          {currentStep === 0 && (
            <div className="py-4">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🙏</div>
                <h2 
                  className="text-2xl font-bold text-[var(--neutral-dark)] mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Willkommen zum Usability-Test!
                </h2>
                <p className="text-[var(--neutral-gray)] mb-4 max-w-md mx-auto">
                  Merci dir für die Zeit die du dir nimmst, um unsere Website zu testen. 
                  Wir entwickeln eine Plattform, die Stadtratsentscheidungen in Moosburg 
                  für alle Bürger:innen verständlich und transparent macht.
                </p>
                <div className="bg-[var(--secondary)] p-4 rounded-lg mb-6 max-w-md mx-auto">
                  <p className="text-sm text-[var(--primary)]">
                    <strong>Wichtig:</strong> Es gibt keine richtigen oder falschen Antworten! 
                    Wir testen die Website, nicht dich. Sei BITTE ehrlich, auch kritisches Feedback hilft uns sehr (<strong>stimmts Julia?</strong>).
                  </p>
                </div>
              </div>

              {/* Aufgabenstellung */}
              <div className="bg-white border-2 border-[var(--primary)] rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg text-[var(--primary)] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  📋 Deine Aufgaben
                </h3>
                <p className="text-sm text-[var(--neutral-gray)] mb-4">
                  <strong>Szenario:</strong> Stell dir vor, du bist Bürger:in in Moosburg an der Isar. 
                  Du hast gehört, dass der Stadtrat kürzlich über Tempo 30 in der Altstadt abgestimmt hat. 
                  Du möchtest mehr darüber erfahren.
                </p>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                    <span><strong>Startseite:</strong> Schau dir die Startseite an. Was siehst du? Worum geht es?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                    <span><strong>Antrag finden:</strong> Finde den Antrag &quot;Tempo 30 in der Altstadt&quot;.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                    <span><strong>Antrag verstehen:</strong> Lies die Details. Verstehst du, worum es geht?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                    <span><strong>Filter:</strong> Gehe zur Antragsübersicht und filtere nach Kategorie und Status.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                    <span><strong>Stadtkarte:</strong> Finde heraus, welche Anträge es für einen Stadtteil gibt.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">6</span>
                    <span><strong>Bürgerabstimmung:</strong> Gib deine Meinung zu einem Antrag ab.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">7</span>
                    <span><strong>Teilen & Meinung:</strong> Wenn du Lust hast, das zu verbreiten oder deine Meinung abzugeben, welche Optionen fallen dir noch auf? Was hättest du noch gerne?</span>
                  </li>
                </ol>
              </div>

              <p className="text-center text-sm text-[var(--neutral-gray)]">
                ⏱️ Dauer: ca. 10-15 Minuten (Aufgaben + Feedback)
              </p>
            </div>
          )}

          {/* Step 1: Über dich */}
          {currentStep === 1 && (
            <div>
              <h2 
                className="text-xl font-bold text-[var(--neutral-dark)] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                👤 Kurz über dich
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  Altersgruppe (optional)
                </label>
                <select
                  value={formData.alter}
                  onChange={(e) => updateField("alter", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="unter-18">Unter 18</option>
                  <option value="18-30">18-30</option>
                  <option value="31-50">31-50</option>
                  <option value="51-65">51-65</option>
                  <option value="ueber-65">Über 65</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  Wie erfahren bist du mit digitalen Diensten?
                </label>
                <div className="space-y-2">
                  {[
                    { value: "wenig", label: "Wenig – Ich nutze selten Websites/Apps" },
                    { value: "mittel", label: "Mittel – Ich nutze regelmäßig Standard-Apps" },
                    { value: "viel", label: "Viel – Ich bin sehr versiert im Umgang mit Technologie" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.digitalErfahrung === option.value
                          ? "border-[var(--primary)] bg-[var(--secondary)]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="digitalErfahrung"
                        value={option.value}
                        checked={formData.digitalErfahrung === option.value}
                        onChange={(e) => updateField("digitalErfahrung", e.target.value)}
                        className="mr-3"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Aufgaben 1-3 */}
          {currentStep === 2 && (
            <div>
              <h2 
                className="text-xl font-bold text-[var(--neutral-dark)] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                📋 Deine Erfahrung bei den Aufgaben
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  <span className="bg-[var(--primary)] text-white px-2 py-1 rounded text-xs mr-2">1</span>
                  Orientierung auf der Startseite
                </label>
                <p className="text-sm text-[var(--neutral-gray)] mb-2">
                  War dir klar, worum es auf der Website geht?
                </p>
                <textarea
                  value={formData.aufgabe1}
                  onChange={(e) => updateField("aufgabe1", e.target.value)}
                  placeholder="Was ist dir aufgefallen? Was war unklar?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  <span className="bg-[var(--primary)] text-white px-2 py-1 rounded text-xs mr-2">2</span>
                  Antrag &quot;Tempo 30&quot; finden
                </label>
                <p className="text-sm text-[var(--neutral-gray)] mb-2">
                  Konntest du den Antrag leicht finden?
                </p>
                <textarea
                  value={formData.aufgabe2}
                  onChange={(e) => updateField("aufgabe2", e.target.value)}
                  placeholder="Wie bist du vorgegangen? Was war schwierig?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  <span className="bg-[var(--primary)] text-white px-2 py-1 rounded text-xs mr-2">3</span>
                  Antrag verstehen
                </label>
                <p className="text-sm text-[var(--neutral-gray)] mb-2">
                  Waren die Informationen zum Antrag verständlich?
                </p>
                <textarea
                  value={formData.aufgabe3}
                  onChange={(e) => updateField("aufgabe3", e.target.value)}
                  placeholder="War die Kurzfassung hilfreich? Konntest du die Abstimmung verstehen?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>
            </div>
          )}

          {/* Step 3: Aufgaben 4-6 */}
          {currentStep === 3 && (
            <div>
              <h2 
                className="text-xl font-bold text-[var(--neutral-dark)] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                📋 Weitere Aufgaben
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  <span className="bg-[var(--primary)] text-white px-2 py-1 rounded text-xs mr-2">4</span>
                  Filter verwenden
                </label>
                <p className="text-sm text-[var(--neutral-gray)] mb-2">
                  Konntest du nach Kategorie und Status filtern?
                </p>
                <textarea
                  value={formData.aufgabe4}
                  onChange={(e) => updateField("aufgabe4", e.target.value)}
                  placeholder="Haben die Filter funktioniert wie erwartet?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  <span className="bg-[var(--primary)] text-white px-2 py-1 rounded text-xs mr-2">5</span>
                  Stadtkarte erkunden
                </label>
                <p className="text-sm text-[var(--neutral-gray)] mb-2">
                  War die Karte hilfreich, um Anträge in deinem Stadtteil zu finden?
                </p>
                <textarea
                  value={formData.aufgabe5}
                  onChange={(e) => updateField("aufgabe5", e.target.value)}
                  placeholder="Was hat gut funktioniert? Was war verwirrend?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  <span className="bg-[var(--primary)] text-white px-2 py-1 rounded text-xs mr-2">6</span>
                  Bürgerabstimmung
                </label>
                <p className="text-sm text-[var(--neutral-gray)] mb-2">
                  Hast du die Abstimmungsfunktion gefunden und verstanden?
                </p>
                <textarea
                  value={formData.aufgabe6}
                  onChange={(e) => updateField("aufgabe6", e.target.value)}
                  placeholder="Würdest du diese Funktion nutzen? Warum / warum nicht?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>
            </div>
          )}

          {/* Step 4: SUS Fragen 1-5 */}
          {currentStep === 4 && (
            <div>
              <h2 
                className="text-xl font-bold text-[var(--neutral-dark)] mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                📊 System Usability Scale (1/2)
              </h2>
              <p className="text-[var(--neutral-gray)] mb-2 text-sm">
                Bitte bewerte die folgenden Aussagen von 1 (Stimme gar nicht zu) bis 5 (Stimme voll zu).
              </p>
              <div className="bg-[var(--secondary)] p-3 rounded-lg mb-6">
                <p className="text-xs text-[var(--primary)]">
                  💡 Dies ist ein standardisierter Fragebogen zur Messung der Benutzerfreundlichkeit.
                </p>
              </div>

              <RatingScale
                value={formData.sus1}
                onChange={(v) => updateField("sus1", v)}
                label="1. Ich würde diese Website gerne regelmäßig nutzen."
              />

              <RatingScale
                value={formData.sus2}
                onChange={(v) => updateField("sus2", v)}
                label="2. Ich fand die Website unnötig kompliziert."
                isNegative={true}
              />

              <RatingScale
                value={formData.sus3}
                onChange={(v) => updateField("sus3", v)}
                label="3. Ich fand die Website einfach zu bedienen."
              />

              <RatingScale
                value={formData.sus4}
                onChange={(v) => updateField("sus4", v)}
                label="4. Ich bräuchte Hilfe, um die Website nutzen zu können."
                isNegative={true}
              />

              <RatingScale
                value={formData.sus5}
                onChange={(v) => updateField("sus5", v)}
                label="5. Die verschiedenen Funktionen waren gut integriert."
              />
            </div>
          )}

          {/* Step 5: SUS Fragen 6-10 */}
          {currentStep === 5 && (
            <div>
              <h2 
                className="text-xl font-bold text-[var(--neutral-dark)] mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                📊 System Usability Scale (2/2)
              </h2>
              <p className="text-[var(--neutral-gray)] mb-6 text-sm">
                Bitte bewerte die folgenden Aussagen von 1 (Stimme gar nicht zu) bis 5 (Stimme voll zu).
              </p>

              <RatingScale
                value={formData.sus6}
                onChange={(v) => updateField("sus6", v)}
                label="6. Es gab zu viele Unstimmigkeiten auf der Website."
                isNegative={true}
              />

              <RatingScale
                value={formData.sus7}
                onChange={(v) => updateField("sus7", v)}
                label="7. Die meisten Menschen würden die Website schnell verstehen."
              />

              <RatingScale
                value={formData.sus8}
                onChange={(v) => updateField("sus8", v)}
                label="8. Ich fand die Website umständlich zu bedienen."
                isNegative={true}
              />

              <RatingScale
                value={formData.sus9}
                onChange={(v) => updateField("sus9", v)}
                label="9. Ich fühlte mich sicher bei der Nutzung der Website."
              />

              <RatingScale
                value={formData.sus10}
                onChange={(v) => updateField("sus10", v)}
                label="10. Ich musste viel lernen, bevor ich die Website nutzen konnte."
                isNegative={true}
              />
            </div>
          )}

          {/* Step 6: Offenes Feedback */}
          {currentStep === 6 && (
            <div>
              <h2 
                className="text-xl font-bold text-[var(--neutral-dark)] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                💬 Dein Feedback
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  😊 Was hat dir besonders gut gefallen?
                </label>
                <textarea
                  value={formData.gutGefallen}
                  onChange={(e) => updateField("gutGefallen", e.target.value)}
                  placeholder="Erzähl uns, was du gut fandest..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  😕 Was hat dich verwirrt oder gestört?
                </label>
                <textarea
                  value={formData.verwirrend}
                  onChange={(e) => updateField("verwirrend", e.target.value)}
                  placeholder="Sei ehrlich – kritisches Feedback hilft uns am meisten!"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  💡 Was fehlt dir auf der Website?
                </label>
                <textarea
                  value={formData.fehlt}
                  onChange={(e) => updateField("fehlt", e.target.value)}
                  placeholder="Welche Funktionen oder Infos würdest du dir wünschen?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--neutral-dark)] mb-2">
                  📝 Sonstige Anmerkungen
                </label>
                <textarea
                  value={formData.sonstiges}
                  onChange={(e) => updateField("sonstiges", e.target.value)}
                  placeholder="Gibt es noch etwas, das du uns mitteilen möchtest?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] h-24"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ← Zurück
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary"
              >
                Weiter →
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-red-500 text-sm">{submitError}</p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`btn-accent ${isSubmitting ? "opacity-50 cursor-wait" : ""}`}
                >
                  {isSubmitting ? "⏳ Wird gesendet..." : "✓ Feedback absenden"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
