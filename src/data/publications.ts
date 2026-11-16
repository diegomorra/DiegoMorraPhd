// Curated, canonical list of publications.
// Metadata checked against Crossref and CEUR (authors, venues, pages) and the CV.
// Citation counts are NOT stored here: they come from Google Scholar
// (see scholar.ts, updated by hand).

import { SCHOLAR_UPDATED, scholarCitations, scholarMetrics } from "./scholar";

export type PubType =
  | "journal"
  | "conference"
  | "chapter"
  | "short"
  | "workshop"
  | "preprint";

export interface Publication {
  id: string;
  title: string;
  /** Display names, in publication order. */
  authors: string[];
  year: number;
  /** Full venue name. */
  venue: string;
  /** Short label shown as a badge, e.g. "CHI '26". */
  venueShort?: string;
  type: PubType;
  /** Volume / pages / article number. */
  details?: string;
  /** Bare DOI, e.g. "10.1145/3772318.3791611". */
  doi?: string;
  /** Free-to-read full text; used as the title link when there is no DOI. */
  openAccessUrl?: string;
  /** Short highlight, e.g. an award. */
  note?: string;
  selected?: boolean;
}

/** How the site owner's name appears in author lists (highlighted in the UI). */
export const SELF_AUTHOR = "D. Morra";

export const PUB_TYPE_ORDER: PubType[] = [
  "journal",
  "conference",
  "chapter",
  "short",
  "workshop",
  "preprint",
];

export const PUB_TYPE_LABEL: Record<PubType, string> = {
  journal: "Journal articles",
  conference: "Full conference papers",
  chapter: "Book chapters",
  short: "Short papers and demos",
  workshop: "Workshop papers",
  preprint: "Preprints",
};

export const publications: Publication[] = [
  // ── Journal articles ────────────────────────────────────────────────
  {
    id: "ijhcs-2026-llm",
    title:
      "“Triggering autonomy, not just automation”: Design implications for LLM-based home automation assistants for people with intellectual disability",
    authors: [
      "D. Morra",
      "M. Andrao",
      "Q. Ai",
      "M. Mores",
      "M. Matera",
      "B. Treccani",
      "M. Zancanaro",
    ],
    year: 2026,
    venue: "International Journal of Human-Computer Studies",
    venueShort: "IJHCS",
    type: "journal",
    details: "vol. 218, art. 103938",
    doi: "10.1016/j.ijhcs.2026.103938",
    selected: true,
  },
  {
    id: "ijhcs-2024-makenodes",
    title:
      "MakeNodes: Opening connected-IoT making to people with intellectual disability",
    authors: ["D. Morra", "G. Caslini", "M. Mores", "F. Garzotto", "M. Matera"],
    year: 2024,
    venue: "International Journal of Human-Computer Studies",
    venueShort: "IJHCS",
    type: "journal",
    details: "vol. 190, art. 103325",
    doi: "10.1016/j.ijhcs.2024.103325",
    selected: true,
  },
  {
    id: "ijhcs-2024-rapid",
    title: "A rapid-prototyping toolkit for people with intellectual disabilities",
    authors: [
      "R. Gennari",
      "M. Matera",
      "A. Melonio",
      "M. Mores",
      "D. Morra",
      "M. Rizvi",
    ],
    year: 2024,
    venue: "International Journal of Human-Computer Studies",
    venueShort: "IJHCS",
    type: "journal",
    details: "vol. 192, art. 103347",
    doi: "10.1016/j.ijhcs.2024.103347",
    openAccessUrl:
      "https://www.sciencedirect.com/science/article/pii/S1071581924001307",
  },
  {
    id: "rsta-2024-sidewalk",
    title:
      "Mapping sidewalk accessibility with smartphone imagery and Visual AI: a participatory approach",
    authors: [
      "D. Morra",
      "X. Zhu",
      "C. Liu",
      "K. Fu",
      "F. Duarte",
      "S. Mora",
      "Z. He",
      "C. Ratti",
    ],
    year: 2024,
    venue:
      "Philosophical Transactions of the Royal Society A: Mathematical, Physical and Engineering Sciences",
    venueShort: "Phil. Trans. R. Soc. A",
    type: "journal",
    details: "vol. 382, art. 20240106",
    doi: "10.1098/rsta.2024.0106",
    note: "Theme issue “Co-creating the future: participatory cities and digital governance”",
    selected: true,
  },
  {
    id: "ijhcs-2023-wellbeing",
    title:
      "Design for social digital well-being with young generations: Engage them and make them reflect",
    authors: ["R. Gennari", "M. Matera", "D. Morra", "A. Melonio", "M. Rizvi"],
    year: 2023,
    venue: "International Journal of Human-Computer Studies",
    venueShort: "IJHCS",
    type: "journal",
    details: "vol. 173, art. 103006",
    doi: "10.1016/j.ijhcs.2023.103006",
    openAccessUrl:
      "https://www.sciencedirect.com/science/article/pii/S1071581923000125",
    selected: true,
  },
  {
    id: "ijcci-2023-nature",
    title:
      "Designing integrated physical–digital systems for children–nature interaction",
    authors: [
      "V. Caiola",
      "E. Cusumano",
      "M. Motta",
      "L. Piro",
      "M. Gelsomini",
      "D. Morra",
      "M. Rizvi",
      "M. Matera",
    ],
    year: 2023,
    venue: "International Journal of Child-Computer Interaction",
    venueShort: "IJCCI",
    type: "journal",
    details: "vol. 36, art. 100582",
    doi: "10.1016/j.ijcci.2023.100582",
    openAccessUrl:
      "https://www.sciencedirect.com/science/article/pii/S2212868923000193",
  },

  // ── Full conference papers ──────────────────────────────────────────
  {
    id: "chi-2026-uwb",
    title:
      "Exploring Citizens’ Perceptions of Urban Well-Being Through a Card-Based Game",
    authors: [
      "D. Morra",
      "S. Mora",
      "M. Woo",
      "S. Lee",
      "A. Kumar",
      "F. Duarte",
      "C. Ratti",
    ],
    year: 2026,
    venue:
      "Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems",
    venueShort: "CHI '26",
    type: "conference",
    details: "ACM, pp. 1–17",
    doi: "10.1145/3772318.3791611",
    openAccessUrl: "https://doi.org/10.1145/3772318.3791611",
    selected: true,
  },
  {
    id: "avi-2022-phygital",
    title: "A Phygital Toolkit for Rapidly Designing Smart Things at School",
    authors: ["R. Gennari", "M. Matera", "D. Morra", "M. Rizvi"],
    year: 2022,
    venue:
      "Proceedings of the 2022 International Conference on Advanced Visual Interfaces",
    venueShort: "AVI 2022",
    type: "conference",
    details: "ACM",
    doi: "10.1145/3531073.3531119",
    openAccessUrl:
      "https://bia.unibz.it/esploro/outputs/conferenceProceeding/A-Phygital-Toolkit-for-Rapidly-Designing/991006785790901241",
  },
  {
    id: "interact-2021-cobo",
    title:
      "COBO: A Card-Based Toolkit for Co-Designing Smart Outdoor Experiences with People with Intellectual Disability",
    authors: [
      "G. Cosentino",
      "D. Morra",
      "M. Gelsomini",
      "M. Matera",
      "M. Mores",
    ],
    year: 2021,
    venue:
      "Human-Computer Interaction – INTERACT 2021, Lecture Notes in Computer Science",
    venueShort: "INTERACT 2021",
    type: "conference",
    details: "Springer, pp. 149–169",
    doi: "10.1007/978-3-030-85623-6_11",
    openAccessUrl: "https://inria.hal.science/hal-04330961",
  },

  // ── Book chapters ───────────────────────────────────────────────────
  {
    id: "springer-2026-guidelines",
    title:
      "Engaging People with Intellectual Disabilities in IoT Prototyping: Design Guidelines for Accessible Making Toolkits",
    authors: ["D. Morra"],
    year: 2026,
    venue:
      "Special Topics in Information Technology (SpringerBriefs in Applied Sciences and Technology)",
    venueShort: "Springer",
    type: "chapter",
    details: "Springer, pp. 13–22",
    doi: "10.1007/978-3-032-12359-6_2",
    openAccessUrl:
      "https://link.springer.com/content/pdf/10.1007/978-3-032-12359-6_2.pdf",
    note: "Springer Award, Ph.D. Programme in Information Technology, Politecnico di Milano",
    selected: true,
  },

  // ── Short papers and demos ──────────────────────────────────────────
  {
    id: "avi-2024-chatgpt",
    title:
      "“This Sounds Unclear”: Evaluating ChatGPT capability in translating end-user prompts into ready-to-deploy Python code",
    authors: [
      "M. Andrao",
      "D. Morra",
      "T. Paccosi",
      "M. Matera",
      "B. Treccani",
      "M. Zancanaro",
    ],
    year: 2024,
    venue:
      "Proceedings of the 2024 International Conference on Advanced Visual Interfaces",
    venueShort: "AVI 2024",
    type: "short",
    details: "ACM",
    doi: "10.1145/3656650.3656693",
    openAccessUrl: "https://dl.acm.org/doi/pdf/10.1145/3656650.3656693",
  },
  {
    id: "chitaly-2023-swim",
    title:
      "Improving Swim Accessibility through Vibro-Tactile Sensory Substitution: A Preliminary Study",
    authors: ["E. Gibelli", "D. Morra", "M. Gelsomini", "M. Matera"],
    year: 2023,
    venue:
      "Proceedings of the 15th Biannual Conference of the Italian SIGCHI Chapter",
    venueShort: "CHItaly 2023",
    type: "short",
    details: "ACM",
    doi: "10.1145/3605390.3605418",
    openAccessUrl: "https://dl.acm.org/doi/pdf/10.1145/3605390.3605418",
  },
  {
    id: "avi-2022-iotgo",
    title: "Ready, Steady, Go: Playing and Rapidly Designing with IoTgo",
    authors: ["R. Gennari", "M. Matera", "A. Melonio", "D. Morra", "M. Rizvi"],
    year: 2022,
    venue:
      "Proceedings of the 2022 International Conference on Advanced Visual Interfaces",
    venueShort: "AVI 2022",
    type: "short",
    details: "ACM, demo",
    doi: "10.1145/3531073.3534463",
    openAccessUrl:
      "https://bia.unibz.it/esploro/outputs/abstract/Ready-Steady-Go-Playing-and-Rapidly/991006786292301241",
  },

  // ── Workshop papers ─────────────────────────────────────────────────
  {
    id: "copda-2026-ambiguous",
    title:
      "Do Ambiguous Prompts Lead to Risky Behavior? Insights from a Home Automation Study with Individuals with Intellectual Disabilities",
    authors: ["M. Andrao", "D. Morra", "G. Schiavo"],
    year: 2026,
    venue:
      "International Workshop on Cultures of Participation in the Digital Age (CoPDA), co-located with AVI",
    venueShort: "CoPDA 2026",
    type: "workshop",
    details: "CEUR Workshop Proceedings, vol. 4216",
    openAccessUrl: "https://ceur-ws.org/Vol-4216/paper11.pdf",
  },
  {
    id: "avi-2026-civics",
    title:
      "CIVICS – Citizen Science Advanced Interfaces: from Sensing to Sensemaking",
    authors: ["C. Prandi", "D. Morra", "S. Mora", "A. Martinetti"],
    year: 2026,
    venue:
      "Proceedings of the 2026 International Conference on Advanced Visual Interfaces",
    venueShort: "AVI '26",
    type: "workshop",
    details: "ACM, workshop proposal",
    doi: "10.1145/3811427.3811488",
    openAccessUrl: "https://doi.org/10.1145/3811427.3811488",
  },
  {
    id: "avi-2022-digital-wellbeing-ws",
    title:
      "Designing for Digital Social Well-being: a Different and Inclusive Perspective",
    authors: ["R. Gennari", "M. Matera", "D. Morra", "F. Puglisi", "M. Rizvi"],
    year: 2022,
    venue:
      "Workshop “Designing for Meaningful Interactions and Digital Wellbeing”, International Conference on Advanced Visual Interfaces (AVI)",
    venueShort: "AVI 2022",
    type: "workshop",
  },
  {
    id: "empathy-2022-reflection",
    title:
      "Enhancing Students’ Critical Reflection on Smart Things Design Through an End-User Development Toolkit",
    authors: ["D. Morra", "M. Rizvi"],
    year: 2022,
    venue:
      "International Workshop on Empowering People in Dealing with Internet of Things Ecosystems (EMPATHY)",
    venueShort: "EMPATHY 2022",
    type: "workshop",
    details: "CEUR Workshop Proceedings, pp. 56–61",
  },
  {
    id: "empathy-2021-young-adults",
    title:
      "Empowering Young Adults with Intellectual Disability to Design Smart Interactive Experiences",
    authors: [
      "D. Morra",
      "G. Cosentino",
      "M. Gelsomini",
      "M. Matera",
      "M. Mores",
    ],
    year: 2021,
    venue:
      "International Workshop on Empowering People in Dealing with Internet of Things Ecosystems (EMPATHY)",
    venueShort: "EMPATHY 2021",
    type: "workshop",
    details: "CEUR Workshop Proceedings, vol. 3053, pp. 28–32",
    openAccessUrl: "https://ceur-ws.org/Vol-3053/paper_6.pdf",
  },
  {
    id: "empathy-2020-cards",
    title:
      "A Card-based Toolkit for Co-Designing Smart Interactive Experiences with Subjects with Neurodevelopmental Disorders",
    authors: ["G. Cosentino", "M. Matera", "M. Mores", "D. Morra"],
    year: 2020,
    venue:
      "International Workshop on Empowering People in Dealing with Internet of Things Ecosystems (EMPATHY)",
    venueShort: "EMPATHY 2020",
    type: "workshop",
    details: "CEUR Workshop Proceedings, vol. 2702, pp. 20–24",
    openAccessUrl: "https://ceur-ws.org/Vol-2702/EMPATHY_2020_paper_4.pdf",
  },

  // ── Preprints ───────────────────────────────────────────────────────
  {
    id: "arxiv-2026-vlm-sidewalk",
    title:
      "Can VLMs Reliably Assess Sidewalk Accessibility Attributes from Pedestrian-Level Imagery?",
    authors: [
      "S. J. Lieu",
      "D. Morra",
      "C. Cadoni",
      "W. Song",
      "M. Mazzarello",
      "C. Ratti",
    ],
    year: 2026,
    venue: "arXiv preprint",
    venueShort: "arXiv",
    type: "preprint",
    details: "arXiv:2609.17882",
    doi: "10.48550/arXiv.2609.17882",
  },
];

export function doiUrl(doi: string): string {
  return `https://doi.org/${doi}`;
}

export function findPublication(id: string): Publication | undefined {
  return publications.find((p) => p.id === id);
}

export function citationsFor(p: Publication): number | undefined {
  return scholarCitations[p.id];
}

/** Publications of one type, newest first. */
export function publicationsOfType(type: PubType): Publication[] {
  return publications
    .filter((p) => p.type === type)
    .sort((a, b) => b.year - a.year);
}

/**
 * Counters shown above the list: the number of publications listed on this
 * site, and citations / h-index from the Google Scholar profile.
 */
export function publicationMetrics() {
  return {
    works: publications.length,
    totalCitations: scholarMetrics.citations,
    hIndex: scholarMetrics.hIndex,
    i10Index: scholarMetrics.i10Index,
    source: "Google Scholar",
    fetchedAt: SCHOLAR_UPDATED,
  };
}

/** "November 2026"-style date for the citation-data note. */
export function formatFetchedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
