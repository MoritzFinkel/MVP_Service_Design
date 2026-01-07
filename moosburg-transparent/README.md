# Moosburg Transparent 🏛️

> **Verstehen, was entschieden wird.**

Eine digitale Plattform, die Anträge des Moosburger Stadtrats sichtbar, verständlich und interaktiv macht. Ziel ist es, Entscheidungen nachvollziehbar zu gestalten und Bürger:innen aktiv einzubeziehen.

![Status](https://img.shields.io/badge/Status-MVP-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## ✨ Features

- 📝 **Einfache Sprache** – Komplexe Anträge verständlich zusammengefasst
- 📊 **Abstimmungstracker** – Wer hat wie abgestimmt? Übersichtliche Visualisierungen
- 🗺️ **Interaktive Karte** – Projekte nach Stadtteil filtern
- 💬 **Bürgerbeteiligung** – Kommentare und symbolische Abstimmungen
- 📱 **Mobile First** – Optimiert für Smartphone
- ♿ **Barrierefrei** – Zugänglich für alle

---

## 🚀 Schnellstart

### Voraussetzungen

Stelle sicher, dass folgende Software installiert ist:

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| **npm** | ≥ 9.x | (kommt mit Node.js) |
| **Git** | ≥ 2.x | [git-scm.com](https://git-scm.com/) |

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/MoritzFinkel/MVP_Service_Design.git
   cd MVP_Service_Design/moosburg-transparent
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Development Server starten**
   ```bash
   npm run dev
   ```

4. **Im Browser öffnen**
   
   → [http://localhost:3000](http://localhost:3000)

---

## 📁 Projektstruktur

```
moosburg-transparent/
├── src/
│   ├── app/                 # Next.js App Router Pages
│   │   ├── page.tsx         # Dashboard (Startseite)
│   │   ├── antraege/        # Alle Anträge
│   │   ├── antrag/[id]/     # Antrags-Detailseite
│   │   ├── karte/           # Interaktive Stadtkarte
│   │   └── ueber-uns/       # Über das Projekt
│   ├── components/          # React Komponenten
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AntragCard.tsx
│   │   ├── VotingChart.tsx
│   │   ├── BuergerAbstimmung.tsx
│   │   └── Kommentare.tsx
│   └── data/
│       └── antraege.ts      # Demo-Daten
├── public/                  # Statische Assets
├── package.json
└── README.md
```

---

## 🎨 Design System

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| 🔵 Primär | `#0077B6` | Hauptfarbe, Links, Buttons |
| 🩵 Sekundär | `#CAF0F8` | Hintergründe, Highlights |
| 🟡 Akzent | `#FFD166` | Call-to-Actions, Badges |
| ⬜ Neutral Hell | `#F8F9FA` | Hintergründe |
| ⬛ Neutral Dunkel | `#343A40` | Text |

**Typografie:**
- Headlines: **Poppins** (500, 600, 700)
- Body: **Inter** (400, 500, 600)

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Sprache:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Fonts:** Google Fonts (Poppins, Inter)

---

## 📜 Verfügbare Scripts

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet Development Server |
| `npm run build` | Erstellt Production Build |
| `npm run start` | Startet Production Server |
| `npm run lint` | Prüft Code mit ESLint |

---

## 👥 Team

Entwickelt im Rahmen des **Service Design Studiums** an der Hochschule München (WiSe 2024/25).

---

## 📄 Lizenz

Dieses Projekt ist Teil eines Hochschulprojekts in Kooperation mit der Stadt Moosburg a.d. Isar.
