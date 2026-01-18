# n8n Workflow: Moosburg Stadtrat PDF Crawler

Dieser Workflow extrahiert Anträge aus Stadtratssitzungs-PDFs für die Moosburg Transparent Plattform.

> ⚠️ **Wichtig:** Das Bürgerinfo-Portal der Stadt Moosburg lädt PDFs per JavaScript. Daher müssen PDF-Links **manuell** in den Workflow eingefügt werden.

## 📋 Voraussetzungen

1. **n8n Installation** (self-hosted oder Cloud)
   - Self-hosted: https://docs.n8n.io/hosting/
   - Cloud: https://n8n.io/cloud/

2. **OpenAI API Key** für die AI-Analyse der PDFs
   - Account erstellen: https://platform.openai.com
   - API Key generieren

## 🚀 Installation

### 1. Workflow importieren

1. Öffne n8n
2. Gehe zu **Workflows** → **Import from File**
3. Wähle `moosburg-crawler-workflow.json`
4. Klicke auf **Import**

### 2. OpenAI Credentials einrichten

1. Gehe zu **Settings** → **Credentials**
2. Klicke auf **Add Credential**
3. Wähle **OpenAI API**
4. Gib deinen API Key ein
5. Speichern

### 3. Credential im Workflow verknüpfen

1. Öffne den importierten Workflow
2. Klicke auf den Node **"AI Analyse"**
3. Wähle bei Credentials deine OpenAI API aus
4. Speichern

## 📥 PDF-Links hinzufügen (WICHTIG!)

Da das Bürgerinfo-Portal JavaScript benötigt, musst du die PDF-Links manuell einfügen:

### Schritt 1: PDF-URLs finden

1. Öffne https://www.moosburg.de/buergerinfo-portal-2
2. Klicke oben auf **"2025"** (oder aktuelles Jahr)
3. Klicke auf **"Ganzes Jahr"** um alle Sitzungen zu sehen
4. Wähle eine Sitzung aus (z.B. "Stadtratssitzung")
5. Klicke auf **"Niederschrift öffentlich"**
6. **Rechtsklick** auf den PDF-Download → **"Link kopieren"**

### Schritt 2: URLs im Workflow einfügen

1. Öffne den Workflow in n8n
2. Klicke auf den Node **"PDF-Liste (manuell pflegen)"**
3. Finde die `pdfListe` im Code
4. Füge deine URLs ein:

```javascript
const pdfListe = [
  {
    url: 'https://www.moosburg.de/allris/bi/ni020?SILFDNR=1234',
    titel: 'Stadtratssitzung Dezember 2025',
    datum: '2025-12-18'
  },
  {
    url: 'https://www.moosburg.de/allris/bi/ni020?SILFDNR=1233',
    titel: 'Stadtratssitzung November 2025',
    datum: '2025-11-20'
  },
  // Weitere PDFs hier...
];
```

5. **Speichern** und Workflow starten

## 🔧 Workflow-Übersicht

```
┌─────────────────┐
│  Trigger        │  ← Manual, Webhook, oder wöchentlich
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  PDF-Liste (manuell pflegen)│  ← Du fügst hier PDF-URLs ein
└────────┬────────────────────┘
         │
         ▼ (für jedes PDF)
┌─────────────────┐
│  Download PDF   │  ← Lädt das PDF herunter
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Extract Text   │  ← Extrahiert Text aus dem PDF
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI Analyse     │  ← GPT-4 analysiert und extrahiert Anträge
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Format Output  │  ← Formatiert als Antrag[] für die Website
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Final Output   │  ← JSON + TypeScript Code
└─────────────────┘
```

## 📤 Trigger-Optionen

### 1. Manueller Trigger
- Klicke auf **"Execute Workflow"** in n8n

### 2. Webhook (API-Aufruf)
- URL: `https://dein-n8n-server.com/webhook/moosburg-crawler`
- Methode: `GET` oder `POST`

### 3. Automatisch (wöchentlich)
- Läuft jeden Sonntag automatisch
- Kann in den Trigger-Einstellungen angepasst werden

## � Manuelle Integration (Empfohlen für den Start)

So überträgst du die gecrawlten Anträge auf die Website:

### Schritt 1: Workflow ausführen

1. Öffne n8n und den importierten Workflow
2. Klicke auf **"Execute Workflow"** (Play-Button oben rechts)
3. Warte bis alle Nodes grün werden (kann 1-2 Minuten dauern)

### Schritt 2: Output kopieren

1. Klicke auf den letzten Node **"Final Output"**
2. Im rechten Panel siehst du den Output
3. Wähle den **"TypeScript"** Tab
4. Kopiere den gesamten Code (Strg+A, Strg+C)

### Schritt 3: In die Website einfügen

1. Öffne die Datei `src/data/antraege.ts`
2. Finde das Array `export const antraege: Antrag[] = [`
3. Füge die neuen Anträge **am Anfang** des Arrays ein:

```typescript
export const antraege: Antrag[] = [
  // ===== NEU VON N8N (Datum einfügen) =====
  {
    id: "5",  // ← Nächste freie ID verwenden!
    titel: "...",
    // ... der kopierte Antrag
  },
  // ===== ENDE NEU =====
  
  // Bestehende Anträge bleiben darunter
  {
    id: "1",
    titel: "Tempo 30 in der Altstadt",
    // ...
  },
];
```

### Schritt 4: Prüfen und Anpassen

**Wichtig vor dem Speichern:**

1. **ID prüfen**: Jede ID muss einzigartig sein. Aktuelle höchste ID: `4`
2. **Kategorie prüfen**: Muss einer von diesen sein:
   - `'verkehr'` | `'umwelt'` | `'soziales'` | `'finanzen'` | `'kultur'` | `'bau'`
3. **Status prüfen**: Muss einer von diesen sein:
   - `'angenommen'` | `'abgelehnt'` | `'in-beratung'` | `'vertagt'`
4. **Stadtteil** (optional): z.B. `'Altstadt'`, `'Bonau'`, `'Pfrombach'`

### Schritt 5: Testen

```bash
npm run dev
```

Öffne http://localhost:3000 und prüfe ob die neuen Anträge angezeigt werden.

---

## �📦 Output-Format

Der Workflow gibt ein JSON-Objekt zurück:

```json
{
  "antraege": [
    {
      "id": "crawled-1737200000000-0",
      "titel": "Tempo 30 in der Altstadt",
      "kurzfassung": "Die Geschwindigkeit...",
      "beschreibung": "Der Antrag sieht vor...",
      "kategorie": "verkehr",
      "status": "angenommen",
      "datum": "2026-01-15",
      "sitzung": "Stadtratssitzung Januar 2026",
      "abstimmung": {
        "dafuer": 18,
        "dagegen": 5,
        "abwesend": 2,
        "details": [
          { "partei": "CSU", "dafuer": 6, "dagegen": 3, "abwesend": 1, "farbe": "#0088CC" },
          ...
        ]
      },
      "timeline": [...],
      "kommentare": [],
      "buergerAbstimmung": { "dafuer": 0, "dagegen": 0 },
      "quelleUrl": "https://www.moosburg.de/..."
    }
  ],
  "count": 5,
  "crawledAt": "2026-01-18T14:30:00.000Z",
  "tsCode": "// TypeScript Code zum direkten Import..."
}
```

## 🔗 Integration in die Website

### Option A: Manuell kopieren

1. Führe den Workflow aus
2. Kopiere die Anträge aus dem Output
3. Füge sie in `src/data/antraege.ts` ein

### Option B: Automatisch per API

```typescript
// src/lib/fetchAntraege.ts
export async function fetchGecrawlteAntraege() {
  const response = await fetch('https://dein-n8n-server.com/webhook/moosburg-crawler');
  const data = await response.json();
  return data.antraege;
}
```

### Option C: Datei-Export (Erweitert)

Der Workflow kann erweitert werden, um die Anträge direkt in eine Datei zu schreiben oder an ein CMS/Datenbank zu senden.

## ⚙️ Anpassungen

### Andere PDF-Quellen hinzufügen

Im Node **"PDFs filtern"** kannst du die Filter-Logik anpassen:

```javascript
// Aktuelle Filter
const sitzungsMuster = /sitzung|protokoll|stadtrat|beschluss/i;

// Erweitert z.B. für Ausschüsse
const sitzungsMuster = /sitzung|protokoll|stadtrat|beschluss|ausschuss|bauamt/i;
```

### AI-Modell ändern

Im Node **"AI Analyse"**:
- `gpt-4o-mini` (günstig, schnell)
- `gpt-4o` (besser, teurer)
- `gpt-4-turbo` (am besten für komplexe Dokumente)

### Anzahl PDFs begrenzen

Im Node **"PDFs filtern"**:
```javascript
// Nur die neuesten 5 PDFs
return results.slice(0, 5).map(item => ({ json: item }));

// Oder alle
return results.map(item => ({ json: item }));
```

## 🔒 Datenschutz-Hinweise

- Der Workflow verarbeitet öffentlich zugängliche Dokumente
- Die PDFs werden nur temporär heruntergeladen
- Die AI-Analyse erfolgt über OpenAI (Daten werden an OpenAI gesendet)
- Für maximalen Datenschutz: Self-hosted n8n + lokales LLM (z.B. Ollama)

## 🐛 Troubleshooting

### "PDF konnte nicht extrahiert werden"
- Manche PDFs sind gescannt (Bilder statt Text)
- Lösung: OCR-Service einbinden (z.B. AWS Textract, Google Vision)

### "AI-Antwort konnte nicht geparst werden"
- Das PDF-Format ist ungewöhnlich
- Lösung: Prompt im "AI Analyse" Node anpassen

### "Keine PDFs gefunden"
- Die Website-Struktur hat sich geändert
- Lösung: CSS-Selektoren im "PDF Links extrahieren" Node anpassen

## 📞 Support

Bei Fragen: Erstelle ein Issue im GitHub Repository oder kontaktiere das Team.

---

*Erstellt für Moosburg Transparent - Wintersemester 2025/26*
