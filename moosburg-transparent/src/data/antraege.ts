export interface Abstimmung {
  partei: string;
  dafuer: number;
  dagegen: number;
  abwesend: number;
  farbe: string;
}

export interface Antrag {
  id: string;
  titel: string;
  kurzfassung: string;
  beschreibung: string;
  kategorie: 'verkehr' | 'umwelt' | 'soziales' | 'finanzen' | 'kultur' | 'bau';
  status: 'angenommen' | 'abgelehnt' | 'in-beratung' | 'vertagt';
  datum: string;
  sitzung: string;
  stadtteil?: string;
  abstimmung: {
    dafuer: number;
    dagegen: number;
    abwesend: number;
    details: Abstimmung[];
  };
  timeline: {
    datum: string;
    ereignis: string;
  }[];
  kommentare: {
    id: string;
    autor: string;
    text: string;
    datum: string;
    likes: number;
  }[];
  buergerAbstimmung: {
    dafuer: number;
    dagegen: number;
  };
}

export const antraege: Antrag[] = [
  // ===== ECHTE ANTRÄGE AUS BÜRGERINFO-PORTAL (gecrawlt am 18.01.2026) =====
  // Quelle: Stadtratsprotokolle Oktober 2025 - Januar 2026
  
  // === JANUAR 2026 ===
  {
    id: "1",
    titel: "Städtebauförderung - Bedarfsanmeldung 2026",
    kurzfassung: "Die Stadt stellt einen Antrag auf Aufnahme in das Programm 'Lebendige Zentren' für 2026.",
    beschreibung: `Der Stadtrat beschließt, für das Jahr 2026 einen Antrag auf Aufnahme in das Städtebauförderungsprogramm 'Lebendige Zentren' zu stellen.

**Was ist geplant?**
- Angemeldete Kosten der beabsichtigten Vorhaben: 505.000 Euro
- Der erforderliche Eigenanteil wird im Haushalt der Stadt bereitgestellt
- Die vorgesehenen Vorhaben und Kosten ergeben sich aus der Bedarfsmitteilung

**Nächste Schritte:**
Die Verwaltung wird beauftragt, die erforderlichen Unterlagen zusammenzustellen und rechtzeitig bei der Regierung von Oberbayern einzureichen.`,
    kategorie: "bau",
    status: "angenommen",
    datum: "2026-01-15",
    sitzung: "Stadtratssitzung Januar 2026",
    abstimmung: {
      dafuer: 22,
      dagegen: 0,
      abwesend: 3,
      details: []
    },
    timeline: [
      { datum: "2026-01-15", ereignis: "Einstimmig im Stadtrat beschlossen" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  {
    id: "2",
    titel: "Sichere Straßen - Gehweg Industriestraße",
    kurzfassung: "Der Gehweg an der Industriestraße wird auf mindestens 2,00 m Breite ausgebaut.",
    beschreibung: `Antrag von Drittem Bürgermeister Dr. Stanglmaier, dem Bündnis 90/DIE GRÜNEN sowie Eltern der Theresia-Gerhardinger-Grundschule.

**Beschluss:**
Der Stadtrat beschließt den Ausbau des Gehwegs an der Industriestraße von der Driescherstraße bis zur Graf-Konrad-Straße. Der Gehweg soll eine durchgängige Breite von mindestens 2,00 m erhalten.

**Warum ist das wichtig?**
- Mehr Sicherheit für Schulkinder auf dem Weg zur Theresia-Gerhardinger-Grundschule
- Barrierefreie Nutzung durch breiteren Gehweg
- Bessere Trennung von Fuß- und Fahrverkehr`,
    kategorie: "verkehr",
    status: "angenommen",
    datum: "2026-01-15",
    sitzung: "Stadtratssitzung Januar 2026",
    abstimmung: {
      dafuer: 21,
      dagegen: 0,
      abwesend: 4,
      details: []
    },
    timeline: [
      { datum: "2026-01-15", ereignis: "Im Stadtrat beschlossen" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  {
    id: "3",
    titel: "Fahrradschutzstreifen Industriestraße (Probebetrieb)",
    kurzfassung: "Ein Fahrradschutzstreifen an der Industriestraße wird für ein Jahr probeweise markiert.",
    beschreibung: `Antrag von Drittem Bürgermeister Dr. Stanglmaier, dem Bündnis 90/DIE GRÜNEN sowie Eltern der Theresia-Gerhardinger-Grundschule.

**Beschluss:**
Der Stadtrat beschließt, auf der rechten Seite der Industriestraße beginnend in Höhe der Einmündung zur Driescherstraße bis zur Gutenbergstraße einen Fahrradschutzstreifen probeweise für ein Jahr anzubringen.

**Evaluation:**
Nach Ablauf des Jahres werden die gesammelten Erfahrungen dem Stadtrat zur weiteren Entscheidung vorgelegt.

**Hinweis:**
Dies war eine knappe Abstimmung - 8 Stadträte stimmten dagegen.`,
    kategorie: "verkehr",
    status: "angenommen",
    datum: "2026-01-15",
    sitzung: "Stadtratssitzung Januar 2026",
    abstimmung: {
      dafuer: 14,
      dagegen: 8,
      abwesend: 3,
      details: []
    },
    timeline: [
      { datum: "2026-01-15", ereignis: "Knapp im Stadtrat angenommen (14:8)" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  {
    id: "4",
    titel: "Wirtschaftsförderung - Neue Vollzeitstelle",
    kurzfassung: "Im Stellenplan 2026 wird eine zusätzliche Vollzeitstelle eines Wirtschaftsförderers geschaffen.",
    beschreibung: `Der Stadtrat beschließt die Schaffung einer neuen Stelle für die Wirtschaftsförderung in Moosburg.

**Details:**
- Eine zusätzliche Vollzeitstelle eines Wirtschaftsförderers
- Eingruppierung erfolgt nach Stellenbeschreibung gemäß Tarifrecht
- Zusätzliches Budget von 30.000 Euro für Wirtschaftsförderung und Förderung von Start-Up-Unternehmen

**Ziele:**
- Stärkung des Wirtschaftsstandorts Moosburg
- Unterstützung lokaler Unternehmen
- Ansiedlung neuer Betriebe`,
    kategorie: "finanzen",
    status: "angenommen",
    datum: "2026-01-15",
    sitzung: "Stadtratssitzung Januar 2026",
    abstimmung: {
      dafuer: 16,
      dagegen: 6,
      abwesend: 3,
      details: []
    },
    timeline: [
      { datum: "2026-01-15", ereignis: "Im Stadtrat beschlossen (16:6)" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  
  // === DEZEMBER 2025 ===
  {
    id: "5",
    titel: "Sondernutzungsgebühren - Satzungsänderung",
    kurzfassung: "Die Satzung über Gebühren für Sondernutzungen am öffentlichen Verkehrsraum wurde geändert.",
    beschreibung: `Antrag der Freien Wähler zur Änderung der Sondernutzungsgebühren.

**Änderungen:**
- Abrechnung nach Quadratmetern statt pauschal
- Gewerbliche Bauzaunbanner: 10 Euro je angefangener Woche
- Nichtgewerbliche Bauzaunbanner: 5 Euro je angefangener Woche

**Warum diese Änderung?**
- Fairere Berechnung nach tatsächlichem Flächenverbrauch
- Klare Unterscheidung zwischen gewerblicher und privater Nutzung`,
    kategorie: "finanzen",
    status: "angenommen",
    datum: "2025-12-18",
    sitzung: "Stadtratssitzung Dezember 2025",
    abstimmung: {
      dafuer: 20,
      dagegen: 0,
      abwesend: 5,
      details: []
    },
    timeline: [
      { datum: "2025-12-18", ereignis: "Einstimmig im Stadtrat beschlossen" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  {
    id: "6",
    titel: "Tariftreue bei öffentlichen Aufträgen",
    kurzfassung: "Die Stadt ergänzt einen Hinweis zur Einhaltung tarifvertraglicher Regelungen in Ausschreibungen.",
    beschreibung: `Antrag von Stadtrat Strobl (Die Linke) zur Einführung von Tariftreue bei der Vergabe öffentlicher Aufträge.

**Beschluss:**
Die Stadt Moosburg sieht derzeit von einer verpflichtenden Einführung von Tariftreueregelungen für alle öffentlichen Aufträge ab.

**Kompromiss:**
In künftigen Ausschreibungen wird folgender Satz ergänzt: Der Auftragnehmer hat bei der Ausführung des Auftrags alle für ihn geltenden tarifvertraglichen Regelungen einzuhalten.`,
    kategorie: "finanzen",
    status: "angenommen",
    datum: "2025-12-18",
    sitzung: "Stadtratssitzung Dezember 2025",
    abstimmung: {
      dafuer: 18,
      dagegen: 3,
      abwesend: 4,
      details: []
    },
    timeline: [
      { datum: "2025-12-18", ereignis: "Im Stadtrat beschlossen (18:3)" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  
  // === NOVEMBER 2025 ===
  {
    id: "7",
    titel: "Neubau Lagerhalle Kochbauerstraße",
    kurzfassung: "Das gemeindliche Einvernehmen für eine landwirtschaftliche Lagerhalle in Moosburg-Aich wurde erteilt.",
    beschreibung: `Der Bau-, Planungs- und Umweltausschuss hat das gemeindliche Einvernehmen erteilt.

**Vorhaben:**
- Neubau einer landwirtschaftlichen Lagerhalle
- Standort: Kochbauerstraße 1, Moosburg-Aich

**Hinweis:**
Standardmäßige Baugenehmigung für landwirtschaftliche Zwecke.`,
    kategorie: "bau",
    status: "angenommen",
    datum: "2025-11-20",
    sitzung: "Stadtratssitzung November 2025",
    stadtteil: "Aich",
    abstimmung: {
      dafuer: 11,
      dagegen: 0,
      abwesend: 0,
      details: []
    },
    timeline: [
      { datum: "2025-11-20", ereignis: "Einstimmig im Bauausschuss genehmigt" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  },
  {
    id: "8",
    titel: "Mehrfamilienhaus Landshuter Straße - Ablehnung",
    kurzfassung: "Das gemeindliche Einvernehmen für ein Mehrfamilienhaus an der Landshuter Straße wurde verweigert.",
    beschreibung: `Der Bauausschuss hat das gemeindliche Einvernehmen für diesen Vorbescheid verweigert.

**Geplantes Vorhaben:**
- Neubau eines Mehrfamilienhauses mit überdachten Garagenstellplätzen
- Aufstockung an der Landshuter Straße 6 und 8

**Begründung der Ablehnung:**
- Das Maß der baulichen Nutzung fügt sich nicht in die Umgebung ein
- Gebäudehöhe und Geschossigkeit passen nicht zur bestehenden Bebauung
- Die Umgebung ist von zweigeschossigen Baukörpern mit steilen Satteldächern geprägt`,
    kategorie: "bau",
    status: "abgelehnt",
    datum: "2025-11-20",
    sitzung: "Stadtratssitzung November 2025",
    abstimmung: {
      dafuer: 0,
      dagegen: 11,
      abwesend: 0,
      details: []
    },
    timeline: [
      { datum: "2025-11-20", ereignis: "Einvernehmen einstimmig verweigert" },
    ],
    kommentare: [],
    buergerAbstimmung: {
      dafuer: 0,
      dagegen: 0
    }
  }
];

export const naechsteSitzung = {
  datum: "2026-02-19",
  uhrzeit: "19:00",
  ort: "Rathaus Moosburg, Großer Sitzungssaal",
  tagesordnung: [
    "Genehmigung des Protokolls der letzten Sitzung",
    "Haushaltsplan 2025 - Erste Lesung",
    "Photovoltaik auf städtischen Gebäuden - Beratung",
    "Sanierung der Grundschule Nord - Vergabe Architekt",
    "Verschiedenes"
  ]
};

export const kategorien = {
  verkehr: { label: "Verkehr", farbe: "#0077B6" },
  umwelt: { label: "Umwelt & Klima", farbe: "#06D6A0" },
  soziales: { label: "Soziales & Familie", farbe: "#E056A0" },
  finanzen: { label: "Finanzen", farbe: "#FFD166" },
  kultur: { label: "Kultur & Bildung", farbe: "#9B5DE5" },
  bau: { label: "Bauen & Wohnen", farbe: "#FF8800" },
};

export const stadtteile = [
  "Altstadt",
  "Stadtpark",
  "Nord",
  "Süd",
  "Gewerbegebiet",
  "Aich"
];
