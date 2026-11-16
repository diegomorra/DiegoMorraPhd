// Project folders and projects. Single source of truth for the "Research
// Projects", "Exhibitions" and "Design Stuff" folders on the desktop and for
// the matching sections of the text version.
// Project texts are based on the published papers (abstracts) and on the
// author's own description of his role.

import { projectImages, type ProjectImage } from "./projectImages";

export interface ProjectLink {
  label: string;
  href: string;
}

/** One work inside a project that groups several (e.g. three toolkits). */
export interface ProjectPart {
  title: string;
  /** One-sentence summary. */
  summary?: string;
  period?: string;
  role?: string;
  context?: string;
  methods?: string[];
  /** Body paragraphs. */
  body: string[];
  /** Ids from publications.ts */
  publicationIds?: string[];
}

export interface Project {
  id: string;
  title: string;
  period?: string;
  /** One-sentence summary. */
  summary: string;
  role?: string;
  context?: string;
  funding?: string;
  methods?: string[];
  /** Body paragraphs. */
  body: string[];
  /** Ids from publications.ts */
  publicationIds?: string[];
  links?: ProjectLink[];
  /** Short highlight shown prominently (e.g. an award). */
  highlight?: string;
  /** Design work only: design discipline, shown above the project name. */
  discipline?: string;
  /**
   * A project that groups several works: one section per work, each with its
   * own text, role and publications.
   */
  parts?: ProjectPart[];
}

/** The project folders on the desktop. */
export type ProjectGroupId = "research" | "exhibitions" | "design";

export interface ProjectGroup {
  id: ProjectGroupId;
  /** Folder name on the desktop and section title in the text version. */
  name: string;
  /** Shown in the folder's side panel. */
  intro: string;
  /** Lists the projects directly, without sub-folders. */
  flat?: boolean;
}

export const projectGroups: Record<ProjectGroupId, ProjectGroup> = {
  research: {
    id: "research",
    name: "Research Projects",
    intro: "Research projects, grouped by theme.",
  },
  exhibitions: {
    id: "exhibitions",
    name: "Exhibitions",
    intro:
      "Public exhibitions translating research data into spatial and interactive experiences.",
    flat: true,
  },
  design: {
    id: "design",
    name: "Design Stuff",
    intro:
      "Selected work from Diego’s practice as a communication and interaction designer.",
    flat: true,
  },
};

export interface ResearchLine {
  id: string;
  /** Short label used as folder name on the desktop. */
  name: string;
  /** Full title used in headings. */
  title: string;
  /** Desktop folder that contains this folder. */
  group: ProjectGroupId;
  /**
   * A topic that is a single project: shown as that project's document at the
   * top level of the desktop folder, instead of as a sub-folder.
   */
  standalone?: boolean;
  projects: Project[];
}

export const researchLines: ResearchLine[] = [
  {
    id: "urban-accessibility",
    group: "research",
    name: "Urban Accessibility through AI",
    title: "Urban accessibility through AI",
    standalone: true,
    projects: [
      {
        id: "sidewalk-ai-scanner",
        title: "Urban Accessibility through AI",
        summary:
          "A web app that lets anyone map sidewalk accessibility with a smartphone camera and Visual AI.",
        role: "Lead author (Phil. Trans. R. Soc. A 2024) · Co-author (preprint 2026)",
        context: "MIT Senseable City Lab",
        methods: [
          "Crowdsourced smartphone imagery",
          "Computer vision",
          "Participatory mapping",
        ],
        body: [
          "Evaluating sidewalk accessibility is usually a manual, time-consuming task that requires specialized personnel, and the lack of sidewalk accessibility datasets limits automated approaches.",
          "Sidewalk AI Scanner is a web app for quick, crowdsourced and low-cost sidewalk mapping: people capture images with their smartphones, and dedicated algorithms automatically identify features such as sidewalk width, obstacles and pavement conditions. Rather than replacing high-resolution sensing, the approach uses crowdsourcing to build scalable, city-level accessibility data that supports community empowerment and participatory planning.",
          "Published in Philosophical Transactions of the Royal Society A, in the theme issue “Co-creating the future: participatory cities and digital governance”.",
          "A follow-up study (preprint, 2026) tests whether vision-language models can reliably assess sidewalk width, slope and pavement condition from pedestrian-level imagery, using conformal prediction on 514 images from Seoul with field-measured ground truth. No attribute is yet precise enough for compliance assessment, but calibration shows which ones can support a first screening of sidewalks; the annotated images are released as a dataset.",
        ],
        publicationIds: ["rsta-2024-sidewalk", "arxiv-2026-vlm-sidewalk"],
      },
    ],
  },
  {
    id: "well-being",
    group: "research",
    name: "Well-being",
    title: "Well-being",
    projects: [
      {
        id: "uwb-deck",
        title: "Urban Well-being",
        summary:
          "A participatory card game to explore what urban well-being means to citizens in different cities.",
        role: "Lead author",
        context: "MIT Senseable City Lab",
        methods: [
          "Card-based participatory method",
          "Workshops in multiple cities",
          "Thematic analysis",
        ],
        body: [
          "Urban well-being is a complex, multidimensional construct shaped by sociocultural and geographic context, yet it is usually assessed through standardized indicators that miss local priorities.",
          "The Urban Well-Being Deck (UWBdeck) is a card-based method to explore citizens’ situated perceptions of urban well-being. Eight workshops across multiple cities engaged 140 participants, who produced 256 proposals. A thematic analysis identified 22 themes of urban well-being, showing variation across cities and dimensions under-represented in existing indexes.",
          "Published at ACM CHI 2026.",
        ],
        publicationIds: ["chi-2026-uwb"],
      },
      {
        id: "iotgo",
        title: "Digital Well-being",
        period: "2021 – 2023",
        summary:
          "A phygital toolkit that engages students in designing smart things and reflecting on social digital well-being.",
        role: "Co-author",
        context:
          "Politecnico di Milano, with the Free University of Bozen-Bolzano",
        methods: ["Phygital toolkit", "Studies in high schools"],
        body: [
          "IoTgo is a toolkit of cards and digital components that helps non-experts, such as school students and artists, understand a design context, ideate smart things for it, make them communicate and program them with patterns.",
          "Studies in high schools showed how the toolkit structures rapid prototyping and acts as a prompt for students’ reflection on technology. A related study with 24 high-school pupils and their teachers framed this as design for social digital well-being: engaging young people in making technology for a social goal and reflecting on its impact on society.",
        ],
        publicationIds: [
          "ijhcs-2023-wellbeing",
          "avi-2022-phygital",
          "avi-2022-iotgo",
          "avi-2022-digital-wellbeing-ws",
          "empathy-2022-reflection",
        ],
      },
      {
        id: "children-wellbeing",
        title: "Children’s Well-being",
        summary:
          "Physical–digital systems that motivate children to connect with nature, and a speaker-lamp concept that helps parents and children build daily routines.",
        body: [],
        parts: [
          {
            title: "Children–Nature Interaction",
            summary:
              "Integrated physical–digital systems that motivate children to connect with nature and learn from it.",
            role: "Co-author",
            context: "Politecnico di Milano",
            body: [
              "Children spend less time outdoors and more time with screens. Starting from the idea that technology and open-air activities need not be mutually exclusive, this project designed integrated physical–digital systems that support playful, creative and educational outdoor experiences without distracting children from nature.",
              "Through design-based research, the work outlines design considerations for technology that supports children–nature interaction.",
            ],
            publicationIds: ["ijcci-2023-nature"],
          },
          {
            title: "Guru",
            summary:
              "Interactive speaker-lamp concept that helps parents and children build daily routines.",
            body: [
              "Guru is a concept for a connected speaker-lamp, companion app and service that supports families through the rhythms of the day, from bedtime stories to morning routines. Its interaction language favours soft light cues and minimal screens, encouraging shared family time.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phd-thesis",
    group: "research",
    name: "Ph.D. Thesis",
    title: "Ph.D. thesis",
    standalone: true,
    projects: [
      {
        id: "phd-thesis",
        title: "Ph.D. Thesis",
        period: "2021 – 2025",
        summary:
          "Accessible design toolkits and AI for including people with intellectual disability in IoT programming.",
        role: "Ph.D. candidate · Supervisor: Prof. Maristella Matera",
        context:
          "Ph.D. Programme in Information Technology, DEIB, Politecnico di Milano",
        highlight:
          "Springer Award 2025, Ph.D. Programme in Information Technology",
        body: [
          "Smart objects and Internet of Things (IoT) technologies could support autonomy and inclusion, yet people with intellectual disability are rarely involved in ideating, building or programming them. The thesis “Leveraging accessible design toolkits and AI for the inclusivity of individuals with intellectual disability in IoT programming” addresses this gap through participatory design studies with three toolkits and with conversational AI.",
          "The findings are synthesized into design guidelines for accessible making toolkits, focused on fostering understanding, agency and engagement, and show the value of hybrid tangible–digital interaction for addressing physical and cognitive challenges.",
          "The thesis received the Springer Award of the Ph.D. Programme in Information Technology at Politecnico di Milano and is summarized in the Springer volume Special Topics in Information Technology.",
        ],
        publicationIds: ["springer-2026-guidelines"],
        links: [
          {
            label: "Full text on POLITesi",
            href: "https://www.politesi.polimi.it/handle/10589/232832",
          },
          {
            label: "Springer chapter (open access)",
            href: "https://link.springer.com/content/pdf/10.1007/978-3-032-12359-6_2.pdf",
          },
        ],
      },
    ],
  },
  {
    id: "accessible-toolkits",
    group: "research",
    name: "Accessible Rapid-Prototyping Toolkits",
    title: "Accessible rapid-prototyping toolkits",
    standalone: true,
    projects: [
      {
        id: "prototyping-toolkits",
        title: "Accessible Rapid-Prototyping Toolkits",
        period: "2020 – 2024",
        summary:
          "Card-based and tangible toolkits that let people with intellectual disability co-design, build and rapidly prototype their own smart objects.",
        body: [],
        parts: [
          {
            title: "COBO",
            period: "2020 – 2021",
            summary:
              "A card-based phygital toolkit to co-design smart outdoor experiences with people with intellectual disability.",
            role: "Designer and researcher (M.Sc. thesis) · Co-author",
            context: "Politecnico di Milano, with Fraternità ed Amicizia onlus",
            methods: ["Co-design workshops", "Card-based toolkit", "Voice assistant"],
            body: [
              "COBO started as a Master's thesis at Politecnico di Milano, developed with Fraternità ed Amicizia onlus, a Milanese organization supporting people with intellectual disability. It pairs a tangible card-based board with a tablet app featuring “Virginia”, a voice assistant that guides participants through interactive scenarios.",
              "Designed for co-design sessions led by educators and caregivers, COBO scaffolds creativity and self-expression for adults who are often left out of technology design. The work produced a working prototype and a co-design method, published at INTERACT 2021 and at the EMPATHY workshop, and became the starting point of the Ph.D. research.",
            ],
            publicationIds: [
              "interact-2021-cobo",
              "empathy-2021-young-adults",
              "empathy-2020-cards",
            ],
          },
          {
            title: "MakeNodes",
            summary:
              "A tangible toolkit that lets people with intellectual disability build networks of connected smart objects.",
            role: "Lead author (Ph.D. research)",
            context: "Politecnico di Milano",
            methods: ["Tangible toolkit", "Making workshops", "Field evaluation"],
            body: [
              "Accessible electronics toolkits have started to let people with intellectual disability create their own smart objects, but they rarely convey the idea at the core of the IoT: objects that connect to, and communicate with, each other.",
              "MakeNodes is a set of input and output “nodes” that can be paired to make any object or surface smart. It guides participants through collaborative, hands-on making of smart-thing networks that address their own needs. The study draws lessons on the role of physical and visual elements, hands-on exploration and interaction robustness in making IoT toolkits accessible.",
            ],
            publicationIds: ["ijhcs-2024-makenodes"],
          },
          {
            title: "Rapid-Prototyping Toolkit",
            summary:
              "A toolkit for people with intellectual disability to rapidly prototype, together, smart things for their shared environment.",
            role: "Co-author",
            context:
              "Politecnico di Milano, with the Free University of Bozen-Bolzano",
            methods: ["Card-based and micro-electronics tools", "Workshops"],
            body: [
              "Micro-electronics and card-based tools are increasingly used to prototype smart devices with non-experts. This project asked which features of such tools actually engage people with intellectual disability in prototyping.",
              "The toolkit supports small groups in rapidly prototyping their own ideas of smart things for a shared environment. Two workshops with eight participants with intellectual disability revealed engaging and disengaging features, from which the paper draws lessons for designing similar toolkits.",
            ],
            publicationIds: ["ijhcs-2024-rapid"],
          },
        ],
      },
    ],
  },
  {
    id: "conversational-ai",
    group: "research",
    name: "Conversational AI for Accessible Home Automation",
    title: "Conversational AI for accessible home automation",
    standalone: true,
    projects: [
      {
        id: "llm-home-automation",
        title: "Conversational AI for Accessible Home Automation",
        period: "2023 – 2026",
        summary:
          "Can large language models help people with intellectual disability program their smart homes?",
        role: "Lead author (IJHCS 2026) · Co-author (AVI 2024, CoPDA 2026)",
        context:
          "Politecnico di Milano, with the University of Trento and Fondazione Bruno Kessler",
        methods: [
          "Large language models",
          "End-user development",
          "Exploratory sessions with users, caregivers and stakeholders",
        ],
        body: [
          "Smart-home technologies could support the autonomy and safety of people with intellectual disability, but configuring them requires technical expertise. End-user development (EUD) aims to let non-experts set up automations themselves; this project asks whether large language models (LLMs) can make EUD accessible.",
          "A first study evaluated how ChatGPT-4 translates end users’ natural-language automation rules into ready-to-deploy Python code: it resolved 94% of the instructions, but the generated code still contained ambiguities with possible safety implications. Exploratory sessions with people with intellectual disability, caregivers and stakeholders then tested an LLM-powered conversational interface for shaping smart-home behaviours, showing that iterative clarifications in conversation can make automation programming more accessible.",
          "A further study with 14 people with intellectual disability, who wrote home automation rules in natural language, found that about a third of the pseudo-code generated by ChatGPT-4o contained practical errors, and that six rules produced actions with direct safety implications, such as opening all doors and windows during a fire: LLM-based tools for non-expert users need dedicated safety validation.",
          "The work outlines design implications for LLM-based assistants that “trigger autonomy, not just automation”.",
        ],
        publicationIds: [
          "ijhcs-2026-llm",
          "copda-2026-ambiguous",
          "avi-2024-chatgpt",
        ],
      },
    ],
  },
  {
    id: "sport-accessibility",
    group: "research",
    name: "Sport Accessibility",
    title: "Sport accessibility",
    standalone: true,
    projects: [
      {
        id: "vibs",
        title: "Sport Accessibility",
        summary:
          "A vibro-tactile swimming cap to help blind and visually impaired swimmers feel safe and independent.",
        role: "Co-author",
        context: "Politecnico di Milano",
        methods: ["Human-centred design with two Paralympic swimmers", "Sensory substitution"],
        body: [
          "Swimming has positive effects on body perception and self-confidence, but presents many barriers for blind and visually impaired athletes.",
          "This study investigated the challenges blind and visually impaired swimmers face and, through a human-centred process involving two Paralympic swimmers, led to the design of VIBS, a vibro-tactile swimming cap based on sensory substitution.",
        ],
        publicationIds: ["chitaly-2023-swim"],
      },
    ],
  },
  {
    id: "diy-iot-sensors",
    group: "research",
    name: "DIY IoT and Sensors",
    title: "DIY IoT and sensors",
    standalone: true,
    projects: [
      {
        id: "flatburn",
        title: "DIY IoT and Sensors",
        summary:
          "An open-source, solar-powered environmental sensor that turns vehicles into mobile sensing platforms.",
        role: "Device making",
        context: "MIT Senseable City Lab, City Scanner programme",
        body: [
          "Flatburn is an open-source, solar-powered environmental sensor developed at the MIT Senseable City Lab within the City Scanner programme. Mounted on vehicles, it passively collects data such as air quality and temperature, turning everyday journeys into city-wide datasets.",
          "Diego worked mainly on the making of the device, building the hardware that is released as open source so that other research groups, municipalities and citizen-science initiatives can replicate it.",
        ],
        links: [
          { label: "Flatburn website", href: "https://senseable.mit.edu/flatburn/" },
        ],
      },
    ],
  },
  {
    id: "exhibitions",
    group: "exhibitions",
    name: "Exhibitions",
    title: "Exhibitions",
    projects: [
      {
        id: "biennale-venice-2025",
        title: "Venice Architecture Biennale",
        period: "2025 · Rome 2026",
        summary:
          "Re-Leaf and Data Clouds, two installations at the 19th International Architecture Exhibition.",
        role: "Co-author · Team coordination, installation design and digital material",
        context:
          "MIT Senseable City Lab · “Intelligens. Natural. Artificial. Collective.”, La Biennale di Venezia",
        body: [
          "Two MIT Senseable City Lab projects were presented at the 19th International Architecture Exhibition – La Biennale di Venezia (2025), “Intelligens. Natural. Artificial. Collective.”. Diego is a co-author of both and mainly coordinated the team, designed the installation and produced the digital material.",
          "RE-LEAF (Artificial section) looks at trees as agents of natural cooling in cities. An interactive catalogue spanning thousands of tree species for Los Angeles, Amsterdam, Dubai and Rome is paired with maps of the cooling generated by vegetation in each climate, showing how strategic planting can lower heat exposure. In 2026 the project was shown again at Palazzo delle Esposizioni in Rome, in the exhibition “Re-Leaf – Vedere la città attraverso i suoi alberi”.",
          "DATA CLOUDS (Collective section) enters the favelas of Rio de Janeiro. LiDAR scanning and photogrammetry reveal the spatial logic of informal settlements and the challenges their inhabitants face, from structural safety to land tenure. The installation centres on a suspended 1:50 model of Rocinha, Rio’s largest favela, an immersive corridor of LiDAR and photogrammetric views, and an interactive projection on how technology can support positive change in informal urbanism.",
        ],
        links: [
          {
            label: "Re-Leaf at La Biennale di Venezia",
            href: "https://www.labiennale.org/it/architettura/2025/artificial/re-leaf",
          },
          {
            label: "Data Clouds at La Biennale di Venezia",
            href: "https://www.labiennale.org/it/architettura/2025/collective/data-clouds",
          },
          {
            label: "Re-Leaf at Palazzo delle Esposizioni, Rome",
            href: "https://www.palazzoesposizioniroma.it/mostra/re-leaf-seeing-the-city-through-its-trees",
          },
        ],
      },
      {
        id: "mapping-invisible",
        title: "Mapping the [in]visible",
        period: "2023",
        summary:
          "Exhibition at the MIT Museum on twenty years of research at the MIT Senseable City Lab.",
        role: "Co-author · Organizing team, exhibition focus and digital material",
        context: "MIT Museum, Cambridge (MA)",
        body: [
          "Mapping the [in]visible is the exhibition at the MIT Museum that presented twenty years of MIT Senseable City Lab research on cities, from sensor networks to mobility patterns and the invisible signals that shape urban life.",
          "Diego was part of the team that organized the exhibition and defined its focus, and worked on the production of its digital material.",
        ],
        links: [
          {
            label: "MIT DUSP: 20 Years of Mapping the [in]visible",
            href: "https://dusp.mit.edu/news/20-years-mapping-invisible",
          },
        ],
      },
      {
        id: "state-of-decay",
        title: "State of Decay",
        period: "2020",
        summary:
          "Physical data visualization of ISTAT 2011 census data on abandoned buildings across Italian regions.",
        context: "“Mediazioni Algoritmiche” exhibition, Politecnico di Milano",
        body: [
          "State of Decay translates the 2011 ISTAT census data on abandoned residential buildings in Italy into a physical installation. Each Italian region is rendered as a handmade object whose mass, height and surface correspond to the density and condition of disused buildings in that territory, so that visitors compare regions by touch and weight rather than by chart.",
          "The work was exhibited at Politecnico di Milano’s “Mediazioni Algoritmiche” show in early 2020.",
        ],
      },
    ],
  },
  {
    id: "design-stuff",
    group: "design",
    name: "Design Stuff",
    title: "Design stuff",
    projects: [
      {
        id: "lemonsoda",
        title: "Lemonsoda",
        discipline: "UX & UI design",
        summary:
          "Website redesign aligned with the brand identity and communication goals.",
        body: [
          "A redesign of the brand’s online presence around its identity, using bold typography, generous spacing and product-led storytelling to present the company’s heritage and product range on desktop and mobile.",
        ],
      },
      {
        id: "design-strategies",
        title: "Design+Strategies",
        discipline: "Web design & identity",
        summary:
          "Website for the Politecnico di Milano research group on strategic design for innovation.",
        context: "Politecnico di Milano",
        body: [
          "Design+Strategies is the digital home of the Politecnico di Milano research group dedicated to strategic design and innovation. The site presents the group’s research lines, projects, publications and people to academic peers and to potential collaborators outside academia, with a visual language derived from the Politecnico identity.",
        ],
        links: [
          {
            label: "designplusstrategies.polimi.it",
            href: "https://www.designplusstrategies.polimi.it",
          },
        ],
      },
      {
        id: "stradanove",
        title: "Stradanove",
        discipline: "Visual identity",
        period: "2020",
        summary:
          "Visual identity for a youth platform promoted by the City of Modena.",
        context: "Public tender winner · City of Modena",
        body: [
          "Stradanove is the refreshed visual identity of a long-running youth platform of the City of Modena. The system spans logo, palette, typography and a flexible illustration language that adapts to the platform’s many programmes, from events to support services and cultural campaigns.",
          "The proposal won a public tender in 2020.",
        ],
      },
      {
        id: "thesis-book",
        title: "Master Thesis Book",
        discipline: "Editorial design",
        period: "2021",
        summary:
          "Editorial design of the book documenting the COBO research project.",
        context: "Politecnico di Milano · Fraternità ed Amicizia onlus",
        body: [
          "The book documenting the COBO research, designed to communicate a co-design methodology to both academic and lay readers. Theoretical chapters alternate with field documentation, prototype photographs and visual frameworks, in a layout built for clarity and accessibility.",
        ],
      },
      {
        id: "solo-la-luce",
        title: "Solo la Luce",
        discipline: "Photography",
        summary:
          "Photographic series on abandoned buildings in northern Italy, where light becomes the subject.",
        context: "Exhibited at Affordable Art Fair Milano and Panova Gallery",
        body: [
          "A long-running personal photography project documenting abandoned buildings across northern Italy. Rather than dwelling on decay, the series traces how natural light claims forgotten interiors, treating light as both subject and structure. Selected images were exhibited at the Affordable Art Fair Milano and at Panova Gallery.",
        ],
      },
      {
        id: "new-gold-rush",
        title: "Traces of the New Gold Rush",
        discipline: "Data visualization",
        summary:
          "Visualization of cryptocurrency market history and the carbon footprint of mining over two years.",
        context: "DensityDesign Final Synthesis Studio, Politecnico di Milano",
        body: [
          "Traces of the New Gold Rush reads two years of cryptocurrency activity through market dynamics and energy consumption, overlaying Bitcoin’s price trajectory with estimated CO₂ emissions from mining to show how speculative cycles translate into environmental costs.",
        ],
        links: [
          {
            label: "Project website",
            href: "https://densitydesign.github.io/teaching-dd15/course-results/es01/group03/",
          },
        ],
      },
      {
        id: "memetic-warfare",
        title: "Memetic Warfare Archive",
        discipline: "Data visualization",
        summary:
          "Website archiving and analyzing memes from a politically charged subreddit to study propaganda techniques.",
        context: "DensityDesign Final Synthesis Studio, Politecnico di Milano",
        body: [
          "Memetic Warfare Archive catalogues and analyzes a curated set of memes from politically charged subreddits, treating each image as a unit of propaganda. The archive organizes memes by visual rhetoric, themes and propagation patterns, offering a navigable taxonomy of how online communities weaponize humour.",
        ],
        links: [
          {
            label: "Project website",
            href: "https://densitydesign.github.io/teaching-dd15/course-results/es03/group03/",
          },
        ],
      },
    ],
  },
];

export interface ProjectWithImages extends Project {
  images: ProjectImage[];
}

export function findProject(
  projectId: string,
): { project: ProjectWithImages; line: ResearchLine } | undefined {
  for (const line of researchLines) {
    const p = line.projects.find((x) => x.id === projectId);
    if (p) return { project: { ...p, images: projectImages[p.id] ?? [] }, line };
  }
  return undefined;
}

/** Sub-folders of one of the two desktop folders. */
export function linesOfGroup(group: ProjectGroupId): ResearchLine[] {
  return researchLines.filter((l) => l.group === group);
}

/** All the projects of a desktop folder, in order. */
export function projectsOfGroup(group: ProjectGroupId): Project[] {
  return linesOfGroup(group).flatMap((l) => l.projects);
}

export function findLine(lineId: string): ResearchLine | undefined {
  return researchLines.find((l) => l.id === lineId);
}

export function imagesFor(projectId: string): ProjectImage[] {
  return projectImages[projectId] ?? [];
}
