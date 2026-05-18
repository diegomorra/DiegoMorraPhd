export interface Project {
  id: string;
  title: string;
  year?: string;
  description: string;
  longDescription?: string;
  url?: string;
  context?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
  {
    id: "ux-ui",
    name: "UX & UI Design",
    projects: [
      {
        id: "cobo",
        title: "COBO",
        description:
          "Phygital toolkit to co-design interactive experiences with people with intellectual disabilities.",
        longDescription:
          "Master's thesis at Politecnico di Milano in collaboration with Fraternità ed amicizia onlus. Made of an interactive board and a tablet app with the voice assistant \"Virginia\", it supports cognitive and behavioral rehabilitation paths.",
        context: "Politecnico di Milano - Fraternità ed amicizia onlus",
      },
      {
        id: "guru",
        title: "Guru",
        description:
          "Interactive speaker-lamp helping parents and children build daily routines.",
        longDescription:
          "A system made of a device, an app and a website. Designed with a user-centered approach to support families through the rituals of the day.",
      },
      {
        id: "lightdrop",
        title: "Lightdrop",
        description:
          "Social network connecting users by interests and pushing them to organize activities in the real world.",
      },
      {
        id: "lemonsoda",
        title: "Lemonsoda",
        description:
          "Website redesign aligned with the brand identity and communication goals. Desktop and mobile versions.",
      },
      {
        id: "design-strategies",
        title: "Design+Strategies",
        description:
          "Platform for the Politecnico di Milano research group focused on strategic design for innovation.",
        url: "https://www.designplusstrategies.polimi.it",
        context: "Politecnico di Milano",
      },
      {
        id: "flatburn",
        title: "Flatburn",
        description:
          "Website for the open-source, solar-powered sensing platform deployed on vehicles to collect environmental data.",
        url: "https://senseable.mit.edu/flatburn/",
        context: "MIT Senseable City Lab - City Scanner",
      },
    ],
  },
  {
    id: "data-viz",
    name: "Data Visualization",
    projects: [
      {
        id: "state-of-decay",
        title: "State of Decay",
        year: "2020",
        description:
          "Physical data visualization of ISTAT 2011 census data on abandoned buildings across Italian regions.",
        context: "\"Mediazioni Algoritmiche\" exhibition - Politecnico di Milano",
      },
      {
        id: "new-gold-rush",
        title: "Traces of the New Gold Rush",
        description:
          "Visualization of cryptocurrency financial history and carbon footprint emissions over two years.",
        url: "https://densitydesign.github.io/teaching-dd15/course-results/es01/group03/",
      },
      {
        id: "memetic-warfare",
        title: "Memetic Warfare Archive",
        description:
          "Website archiving and analyzing memes from a specific subreddit to study propaganda techniques and memetic warfare strategies.",
        url: "https://densitydesign.github.io/teaching-dd15/course-results/es03/group03/",
      },
    ],
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    projects: [
      {
        id: "stradanove",
        title: "Stradanove",
        year: "2020",
        description:
          "Visual identity for a virtual meeting space for teenagers, promoted by the city of Modena and the Emilia-Romagna region.",
        context: "Public tender winner",
      },
    ],
  },
  {
    id: "editorial",
    name: "Editorial Design",
    projects: [
      {
        id: "thesis-book",
        title: "Master Thesis Book",
        description:
          "COBO: a phygital interactive toolkit for co-designing smart interactive experiences with people with Intellectual disability.",
        context: "Politecnico di Milano - Fraternità ed amicizia onlus",
      },
    ],
  },
  {
    id: "photography",
    name: "Photography",
    projects: [
      {
        id: "solo-la-luce",
        title: "Solo la Luce",
        description:
          "Photographic series on abandoned buildings in northern Italy, where light becomes the central subject in forgotten architectural spaces.",
      },
    ],
  },
  {
    id: "video",
    name: "Video",
    projects: [
      {
        id: "perle-vetro",
        title: "Giuoco delle Perle di Vetro",
        description:
          "Accessible booktrailer for Hermann Hesse's 1943 novel, made with 3D models in Cinema 4D and After Effects. Includes versions for deaf and blind audiences.",
      },
    ],
  },
  {
    id: "game",
    name: "Game Design",
    projects: [
      {
        id: "piantala",
        title: "PiantaLa",
        description:
          "Interactive quiz game where players earn CO2 coins to plant trees. Multiplayer competition focused on environmental sustainability.",
      },
    ],
  },
  {
    id: "exhibition",
    name: "Exhibition Design",
    projects: [
      {
        id: "mapping-invisible",
        title: "Mapping the [in]visible",
        description:
          "Exhibition at the MIT Museum for the 20th anniversary of the Senseable City Lab. Data-driven approaches to understanding urban navigation and social connections.",
        url: "https://dusp.mit.edu/news/20-years-mapping-invisible",
        context: "MIT Museum - Senseable City Lab",
      },
    ],
  },
];

export function findProject(projectId: string): Project | undefined {
  for (const cat of projectCategories) {
    const p = cat.projects.find((p) => p.id === projectId);
    if (p) return p;
  }
  return undefined;
}
