// Invited talks, academic service and press. Single source of truth for the
// About window (talks, service), Internet Explorer and the text version.

export interface TeachingItem {
  role: string;
  course: string;
  programme: string;
  org: string;
  duration: string;
}

export interface Talk {
  year: string;
  kind: string;
  title?: string;
  event: string;
  place: string;
  href?: string;
}

export interface ServiceVenue {
  venue: string;
  full: string;
  years?: string;
}

export interface PressLink {
  source: string;
  label: string;
  href: string;
}

/** Not shown on the site at the moment (see the CV). */
export const teaching: TeachingItem[] = [
  {
    role: "Teaching Assistant",
    course: "Inclusive Digital Technologies",
    programme: "M.Sc. in Industrial and Information Engineering",
    org: "Politecnico di Milano",
    duration: "2 years",
  },
  {
    role: "Teaching Assistant",
    course: "Design for Complexity (workshop)",
    programme: "M.Sc. in Product-Service System Design",
    org: "Politecnico di Milano",
    duration: "2 years",
  },
  {
    role: "Thesis tutoring",
    course: "M.Sc. students",
    programme: "M.Sc. in Communication Design, School of Design",
    org: "Politecnico di Milano",
    duration: "2 years",
  },
  {
    role: "Teaching Assistant",
    course: "Interaction Design Lab",
    programme: "M.Sc. in Communication Design, School of Design",
    org: "Politecnico di Milano",
    duration: "4 years",
  },
  {
    role: "Teaching Assistant",
    course: "Il Fotografo e il Progetto (photography)",
    programme: "B.Sc. in Communication Design, School of Design",
    org: "Politecnico di Milano",
    duration: "5 years",
  },
];

export const talks: Talk[] = [
  {
    year: "2026",
    kind: "Guest lecture",
    title: "Sensing Cities: Methods and Tools from MIT Senseable City Lab",
    event: "SUSTech School of Design",
    place: "Shenzhen, China",
  },
  {
    year: "2026",
    kind: "Webinar",
    title: "AI to evaluate, monitor and improve accessibility of sidewalks",
    event: "Academy Sondotécnica",
    place: "Online",
  },
  {
    year: "2026",
    kind: "Speaker",
    event: "MIT Future Fest, School of Architecture and Planning",
    place: "MIT, Cambridge (MA)",
  },
  {
    year: "2026",
    kind: "Guest lecturer and tutor",
    event:
      "ENHANCE Alliance Summer School “Designing Regenerative Neighbourhoods: New European Bauhaus and Technological Competitiveness”",
    place: "Faculty of Architecture and Design, NTNU, Norway",
  },
  {
    year: "2026",
    kind: "Speaker",
    title: "Make Cities Talk Back",
    event:
      "DO IMPACT: Dati e AI per l’economia sociale, School of Management, Politecnico di Milano",
    place: "Milan, Italy",
    href: "https://www.som.polimi.it/events/do-impact-dati-e-ai-per-leconomia-sociale/",
  },
  {
    year: "2026",
    kind: "Speaker",
    title: "Giving Sense to Sensing",
    event: "Department of Industrial Design, KAIST",
    place: "South Korea",
  },
  {
    year: "2025",
    kind: "Webinar",
    title: "Make Cities Talk Back",
    event: "Data Science for Common Good international webinar",
    place: "Online",
  },
  {
    year: "2025",
    kind: "Guest lecture",
    title: "Giving Sense to Sensing",
    event:
      "Human–Computer Interaction for Business, Free University of Bozen-Bolzano",
    place: "Bolzano, Italy",
  },
  {
    year: "2024",
    kind: "Invited talk",
    event:
      "Social Entrepreneurship, M.Sc. in Management Engineering, Politecnico di Milano",
    place: "Milan, Italy",
  },
];

export const workshopOrganization = [
  {
    year: "2026",
    role: "Co-organizer",
    event:
      "CIVICS 2026 – Citizen Science Advanced Interfaces: from Sensing to Sensemaking",
    detail: "Workshop co-located with AVI 2026, Venice, Italy",
  },
];

export const programCommittees: ServiceVenue[] = [
  {
    venue: "ASSETS 2026",
    full: "International ACM SIGACCESS Conference on Computers and Accessibility",
  },
  {
    venue: "AVI 2026",
    full: "International Conference on Advanced Visual Interfaces",
  },
  {
    venue: "ECSCW 2026",
    full: "EUSSET Conference on Computer-Supported Cooperative Work",
  },
];

export const reviewing: ServiceVenue[] = [
  {
    venue: "CHI",
    full: "ACM CHI Conference on Human Factors in Computing Systems",
    years: "2026, 2023",
  },
  {
    venue: "CSCW",
    full: "ACM Conference on Computer-Supported Cooperative Work & Social Computing",
    years: "2025, 2024",
  },
  { venue: "DIS", full: "ACM Designing Interactive Systems", years: "2026" },
  {
    venue: "INTERACT",
    full: "IFIP TC13 International Conference on Human-Computer Interaction",
    years: "2025, 2023, 2021",
  },
  {
    venue: "MobileHCI",
    full: "ACM International Conference on Mobile Human-Computer Interaction",
    years: "2024, 2023",
  },
  {
    venue: "IDC",
    full: "ACM Interaction Design and Children Conference",
    years: "2022",
  },
  {
    venue: "IJHCS",
    full: "International Journal of Human-Computer Studies",
    years: "2026",
  },
  {
    venue: "IJCCI",
    full: "International Journal of Child-Computer Interaction",
    years: "2026, 2025, 2024, 2023",
  },
  {
    venue: "IJGI",
    full: "ISPRS International Journal of Geo-Information",
    years: "2024",
  },
];

export const pressLinks: PressLink[] = [
  {
    source: "MIT DUSP",
    label: "20 Years of Mapping the [in]visible",
    href: "https://dusp.mit.edu/news/20-years-mapping-invisible",
  },
  {
    source: "La Biennale di Venezia",
    label: "Data Clouds, Biennale Architettura 2025",
    href: "https://www.labiennale.org/it/architettura/2025/collective/data-clouds",
  },
  {
    source: "La Biennale di Venezia",
    label: "Re-Leaf, Biennale Architettura 2025",
    href: "https://www.labiennale.org/it/architettura/2025/artificial/re-leaf",
  },
  {
    source: "Palazzo delle Esposizioni, Rome",
    label: "Re-Leaf: Seeing the City Through Its Trees",
    href: "https://www.palazzoesposizioniroma.it/mostra/re-leaf-seeing-the-city-through-its-trees",
  },
  {
    source: "Politecnico di Milano School of Management",
    label: "DO IMPACT: Data and AI for the social economy",
    href: "https://www.som.polimi.it/events/do-impact-dati-e-ai-per-leconomia-sociale/",
  },
  {
    source: "POLITesi",
    label:
      "Ph.D. thesis: Leveraging accessible design toolkits and AI for the inclusivity of individuals with intellectual disability in IoT programming",
    href: "https://www.politesi.polimi.it/handle/10589/232832",
  },
  {
    source: "diegomorra.github.io",
    label: "Previous website",
    href: "https://diegomorra.github.io/index.html",
  },
];
