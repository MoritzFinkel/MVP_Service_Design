# Usability Feedback Analyse & Implementierungsplan

**Datum:** 18. Januar 2026  
**Anzahl Testpersonen:** 4  
**Durchschnittlicher SUS-Score:** 85.6/100 (Gut bis Exzellent)

---

## 📊 Zusammenfassung der SUS-Scores

| Tester | Score | Bewertung |
|--------|-------|-----------|
| Tester 1 | 80.0 | Gut |
| Tester 2 | 92.5 | Exzellent |
| Tester 3 | 85.0 | Gut |
| Tester 4 | 85.0 | Gut |
| **Durchschnitt** | **85.6** | **Gut** |

> Ein SUS-Score über 80 gilt als "gut", über 90 als "exzellent". Die Website schneidet insgesamt sehr positiv ab.

---

## 🔴 Kritische Probleme (Priorität: Hoch)

### 1. Farbkollision: Kategorie "Soziales & Familie" vs. Status "Abgelehnt"
**Problem:** Die rote Farbe für die Kategorie "Soziales & Familie" (#EF476F) wird mit dem Status "Abgelehnt" verwechselt.

**Tester-Zitat:** 
> "Die Farbwahl für Familie und Soziales ist gleich wie abgelehnt. Es wirkt mehr als ob der Antrag abgelehnt wurde."

**Lösung:** Farbe für "Soziales & Familie" ändern (z.B. zu Lila/Violett #9B5DE5 oder einem warmen Rosa #FF6B9D)

**Aufwand:** ⏱️ 10 Min | **Datei:** `src/data/antraege.ts`

---

### 2. Inhaltliche Fehler im Footer & Über uns
**Probleme:**
- Falsches Semester: "Wintersemester 2024/25" statt "2025/26"
- Copyright: "© 2024" statt "© 2025"
- Schrift in Über-uns Card schwer lesbar

**Tester-Zitat:**
> "Wir haben das Wintersemester 2025/26 nicht. Kontrolliert mal inhaltlich euren gesamten Footer."

**Lösung:** Jahreszahlen aktualisieren, Kontrast/Schriftgröße auf Über-uns prüfen

**Aufwand:** ⏱️ 15 Min | **Dateien:** `src/components/Footer.tsx`, `src/app/ueber-uns/page.tsx`

---

### 3. Status-Labels zu unauffällig auf Detailseite
**Problem:** Der Antragsstatus (Angenommen/Abgelehnt/In Beratung) wird leicht übersehen.

**Tester-Zitat:**
> "Nur den Antragsstatus übersieht man leicht. Die Labels sind recht klein und unauffällig."

**Lösung:** Status-Badge größer/prominenter gestalten, evtl. eigene Zeile mit Icon

**Aufwand:** ⏱️ 20 Min | **Datei:** `src/app/antrag/[id]/page.tsx`

---

## 🟡 Mittlere Priorität

### 4. Formatierung der Beschreibung (Aufzählungspunkte)
**Problem:** Bullet Points werden horizontal statt vertikal dargestellt.

**Tester-Zitat:**
> "Es ist schlecht formatiert, die Punkte stehen hintereinander anstatt nebeneinander und das macht das lesen schwer."

**Lösung:** CSS für Prose-Styling der Beschreibung überprüfen, `list-style` korrekt setzen

**Aufwand:** ⏱️ 15 Min | **Datei:** `src/app/antrag/[id]/page.tsx`

---

### 5. Fehlende Verlinkung zu Originalquellen
**Problem:** Nutzer wollen die originalen Beschlüsse/Dokumente einsehen können.

**Tester-Zitat:**
> "Die originalen Unterlagen der Entscheidung verlinkt auf den Seiten, will ja auch sehen ob das wirklich stimmt."

**Lösung:** 
- Datenmodell erweitern um `quellenUrl` Feld
- Link-Button "Originaldokument ansehen" auf Detailseite

**Aufwand:** ⏱️ 30 Min | **Dateien:** `src/data/antraege.ts`, `src/app/antrag/[id]/page.tsx`

---

### 6. Karte: Mehr Sichtbarkeit & "Auf Karte zeigen" Button
**Probleme:**
- Karte wird nicht wahrgenommen
- Kein direkter Link vom Antrag zur Karte
- Altstadt-Symbol verdeckt

**Tester-Zitate:**
> "Ich habe die Karte für die Aufgaben gar nicht angeschaut."
> "Mir fehlt ein Button 'auf Stadtkarte anzeigen' bei den einzelnen Anträgen."

**Lösung:**
- "Auf Karte anzeigen" Button in Antragsdetails
- Hinweis auf Homepage zur Kartenfunktion
- Karten-Layout überarbeiten (Altstadt-Marker sichtbar machen)

**Aufwand:** ⏱️ 45 Min | **Dateien:** `src/app/antrag/[id]/page.tsx`, `src/app/karte/page.tsx`, `src/app/page.tsx`

---

### 7. Bürgerabstimmung: Ergebnisse erst nach Abstimmung zeigen
**Problem:** Nutzer könnten durch sichtbare Ergebnisse beeinflusst werden.

**Tester-Zitat:**
> "Ich würde das Stimmergebnis nicht standardmäßig sichtbar machen sondern erst anzeigen sobald der Nutzer abgestimmt hat."

**Lösung:** Ergebnisbalken erst nach eigenem Vote anzeigen

**Aufwand:** ⏱️ 20 Min | **Datei:** `src/components/BuergerAbstimmung.tsx`

---

### 8. Einfluss der Bürgerstimmen unklar
**Problem:** Nutzer verstehen nicht, welchen Einfluss ihre Stimme/Kommentare haben.

**Tester-Zitat:**
> "Mir ist nicht klar, inwiefern meine Abstimmung oder ein Kommentar von mir die Politik meiner Gemeinde ändern könnte. Hat das überhaupt Einfluss?"

**Lösung:** Infotext hinzufügen, der den symbolischen Charakter erklärt und auf echte Beteiligungsmöglichkeiten verweist

**Aufwand:** ⏱️ 15 Min | **Datei:** `src/components/BuergerAbstimmung.tsx`

---

## 🟢 Nice-to-Have (Niedrige Priorität)

### 9. Kurzanleitung auf der Startseite
**Wunsch:** Erklärung was man auf der Website alles machen kann.

**Tester-Zitat:**
> "Ein Hinweis auf home wie das Tool so grob funktioniert/welche Sachen man alles machen kann."

**Lösung:** "So funktioniert's" Section mit 3-4 kurzen Punkten

**Aufwand:** ⏱️ 30 Min | **Datei:** `src/app/page.tsx`

---

### 10. Datumsfilter für Anträge
**Wunsch:** Nach Zeitraum filtern können.

**Tester-Zitat:**
> "Datum Filter bei der Anträge Seite wär nice."

**Lösung:** Dropdown oder Datepicker für Zeitraum hinzufügen

**Aufwand:** ⏱️ 45 Min | **Datei:** `src/app/antraege/page.tsx`

---

### 11. Bilder/Konzepte für greifbarere Projekte
**Wunsch:** Visuelle Inhalte zu den Projekten.

**Tester-Zitat:**
> "Es wäre schön, wenn die Projekte greifbarer durch z.B. Fotos oder Konzepte wären."

**Lösung:** Datenmodell um `bilder[]` erweitern, Bildergalerie auf Detailseite

**Aufwand:** ⏱️ 60 Min | **Dateien:** Mehrere

---

### 12. "Jetzt Abstimmen" Section besser platzieren
**Wunsch:** CTA vor den aktuellen Anträgen.

**Tester-Zitat:**
> "Die 'Jetzt Abstimmen' Section würde über den aktuellen Anträgen besser funktionieren."

**Lösung:** Reihenfolge der Sections auf Homepage anpassen

**Aufwand:** ⏱️ 10 Min | **Datei:** `src/app/page.tsx`

---

## ✅ Positives Feedback (Was gut läuft)

| Aspekt | Feedback |
|--------|----------|
| **Einfache Sprache** | "Leichte Sprache und einheitliches Design" |
| **Übersichtlichkeit** | "Klar strukturiert und übersichtlich" |
| **Abstimmungsvisualisierung** | "Visuelle Darstellung der Abstimmungsergebnisse ist sehr hilfreich" |
| **Kurzerklärung** | "Die Kurzerklärung am Anfang war super hilfreich" |
| **Filter** | "Die Filter haben wie erwartet funktioniert" |
| **Intuitivität** | "Sehr intuitives Layout, keine unnötigen Informationen" |

---

## 📋 Implementierungs-Fahrplan

### Sprint 1: Kritische Fixes (vor Präsentation)
**Geschätzter Aufwand: 1-2 Stunden**

| # | Task | Aufwand | Status |
|---|------|---------|--------|
| 1 | Farbe "Soziales & Familie" ändern | 10 Min | ✅ Erledigt |
| 2 | Jahreszahlen korrigieren (Footer, Über uns) | 15 Min | ✅ Erledigt |
| 3 | Status-Badge auf Detailseite vergrößern | 20 Min | ✅ Erledigt |
| 4 | Bullet-Point Formatierung fixen | 15 Min | ✅ Erledigt |
| 5 | Schriftlesbarkeit Über-uns verbessern | 10 Min | ✅ Erledigt |

### Sprint 2: UX-Verbesserungen (nach Präsentation)
**Geschätzter Aufwand: 2-3 Stunden**

| # | Task | Aufwand | Status |
|---|------|---------|--------|
| 6 | Bürgerabstimmung: Ergebnis erst nach Vote zeigen | 20 Min | ⬜ |
| 7 | Infotext zum Einfluss der Bürgerstimmen | 15 Min | ⬜ |
| 8 | "Auf Karte anzeigen" Button hinzufügen | 30 Min | ⬜ |
| 9 | Quellenlinks im Datenmodell & UI | 30 Min | ⬜ |
| 10 | Karten-Marker Visibility fixen | 15 Min | ⬜ |

### Sprint 3: Feature-Erweiterungen (optional)
**Geschätzter Aufwand: 2-3 Stunden**

| # | Task | Aufwand | Status |
|---|------|---------|--------|
| 11 | "So funktioniert's" Section auf Homepage | 30 Min | ⬜ |
| 12 | Datumsfilter implementieren | 45 Min | ⬜ |
| 13 | CTA-Reihenfolge auf Homepage anpassen | 10 Min | ⬜ |
| 14 | Bilder-Support für Anträge | 60 Min | ⬜ |

---

## 💡 Empfehlung

Für die **Präsentation morgen** sollten mindestens die kritischen Fixes (Sprint 1) umgesetzt werden, insbesondere:

1. ✅ Farbkollision beheben
2. ✅ Jahreszahlen korrigieren  
3. ✅ Status-Badge sichtbarer machen

Diese Änderungen sind schnell umsetzbar und adressieren die auffälligsten Probleme.

---

*Erstellt am 18.01.2026 basierend auf 4 Usability-Tests*
