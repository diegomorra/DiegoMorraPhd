export interface Project {
  id: string;
  title: string;
  year?: string;
  description: string;
  longDescription?: string;
  url?: string;
  context?: string;
  images?: string[];
}

const OLD_SITE = "https://diegomorra.github.io";

const IMAGES: Record<string, string[]> = {
  cobo: [
    "https://i.ibb.co/hXvTfL8/08.png",
    "https://i.ibb.co/HCxm7tc/rendering-Vista-corrente-con-schermo.jpg",
    "https://i.ibb.co/ngh6cHL/interactive-objects-render-5-0.jpg",
    "https://i.ibb.co/rdKcQRn/Schermata-2021-05-02-alle-21-30-36.png",
    "https://i.ibb.co/H2HGbxF/reading-low.jpg",
    "https://i.ibb.co/mh06nD7/prototipo-alphaok-10-min.jpg",
    "https://i.ibb.co/HPQK9Zj/prototipo-alphaok-11-min.jpg",
    "https://i.ibb.co/T296Ytm/prototipo-alphaok-6-min.jpg",
  ],
  "thesis-book": [
    "https://i.ibb.co/tZC0sQY/DSC-7815-min.jpg",
    "https://i.ibb.co/27ptVPc/DSC-7873-min.jpg",
    "https://i.ibb.co/6r3s4Y9/DSC-7818-min.jpg",
    "https://i.ibb.co/stDkpcc/DSC-7823-min.jpg",
    "https://i.ibb.co/xHNM94c/DSC-7838-min.jpg",
    "https://i.ibb.co/FnyjQKf/DSC-7846-min.jpg",
    "https://i.ibb.co/tmHhwxb/DSC-7908-min.jpg",
    "https://i.ibb.co/K5VnVBg/DSC-7896-min.jpg",
  ],
  stradanove: [
    "https://i.ibb.co/FWBMyd8/stradanove01.png",
    "https://i.ibb.co/vj20VGg/stradanove02.jpg",
    "https://i.ibb.co/pWkgfg0/stradanove03.jpg",
    "https://i.ibb.co/Jv6Vb64/stradanove07.jpg",
    "https://i.ibb.co/Wyrx8WB/stradanove04.jpg",
    "https://i.ibb.co/bvqNbSB/stradanove08.jpg",
    "https://i.ibb.co/wL0Fk0F/stradanove09.png",
  ],
  "state-of-decay": [
    "https://i.ibb.co/fqytCV2/statedecay03.jpg",
    "https://i.ibb.co/nDLq6Sp/statedecay04.jpg",
    "https://i.ibb.co/NWTPVDK/statedecay06.jpg",
    "https://i.ibb.co/LdS87Vt/statedecay02.jpg",
    "https://i.ibb.co/71zHtW5/statedecay05.jpg",
    "https://i.ibb.co/NntGycQ/statedecay01.jpg",
  ],
  guru: [
    "https://i.ibb.co/N1zRvV8/Schermata-2021-05-02-alle-22-27-25.png",
    "https://i.ibb.co/526h6Sf/Guru-Product.png",
    "https://i.ibb.co/n8wbqSz/Guru-bambino.jpg",
    "https://i.ibb.co/RcN5L4C/Schermata-2021-05-02-alle-22-27-59.png",
    "https://i.ibb.co/GnQW2g8/Schermata-2021-05-02-alle-22-28-46.png",
  ],
  "solo-la-luce": [
    "https://i.ibb.co/S6Mf36b/DSC-0634-3.jpg",
    "https://i.ibb.co/jMyzFnw/Firmamento.jpg",
    "https://i.ibb.co/6yqzdNX/IMG-3054.jpg",
    "https://i.ibb.co/NNCghhq/dsc-0902-1.jpg",
    "https://i.ibb.co/34wspbv/dsc-0648-profincorp-1.jpg",
  ],
  lightdrop: [
    "https://i.ibb.co/q9KtKVk/phone-crack-light-min.jpg",
    "https://i.ibb.co/0QhDwCS/sfondo-telefoni.jpg",
  ],
  lemonsoda: [
    "https://i.ibb.co/jJPqy5C/schermatasitolemon-min.jpg",
    "https://i.ibb.co/4s6rS00/telefonolemon-min.jpg",
  ],
  "new-gold-rush": ["https://i.ibb.co/c16N1Dz/Dataviz01.png"],
  "memetic-warfare": ["https://i.ibb.co/sRdfB0X/MWA-01.png"],
  "design-strategies": [
    `${OLD_SITE}/assets/Designstrategies/Ds1.png`,
    `${OLD_SITE}/assets/Designstrategies/Ds2.png`,
    `${OLD_SITE}/assets/Designstrategies/Ds3.png`,
    `${OLD_SITE}/assets/Designstrategies/Ds4.png`,
    `${OLD_SITE}/assets/Designstrategies/Ds5.jpg`,
  ],
  piantala: [
    `${OLD_SITE}/assets/piantala/pl2.png`,
    `${OLD_SITE}/assets/piantala/pl3.png`,
    `${OLD_SITE}/assets/piantala/pl1.png`,
    `${OLD_SITE}/assets/piantala/pl4.png`,
  ],
  "mapping-invisible": [
    `${OLD_SITE}/assets/Sclmuseum/SCL_mockup.jpg`,
    `${OLD_SITE}/assets/Sclmuseum/SCL1.jpg`,
    `${OLD_SITE}/assets/Sclmuseum/SCL3.jpeg`,
    `${OLD_SITE}/assets/Sclmuseum/SCL7.jpeg`,
  ],
  flatburn: [
    `${OLD_SITE}/assets/Sclmuseum/flatburn0.jpg`,
    `${OLD_SITE}/assets/Sclmuseum/flatburn1.jpg`,
  ],
  "biennale-venice-2025": [
    "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/re-leaf1.jpg",
    "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/releaf01.jpg",
    "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/releaf02.jpg",
    "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/dataclouds.jpg",
    "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/dataclouds01.jpg",
    "https://static.labiennale.org/files/styles/full_screen_slide/public/architettura/2025/1300x600/dataclouds02.jpg",
  ],
};

function withImages(p: Project): Project {
  return { ...p, images: IMAGES[p.id] };
}

export interface ProjectCategory {
  id: string;
  name: string;
  projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
  {
    id: "research",
    name: "Research",
    projects: [
      {
        id: "cobo",
        title: "COBO",
        description:
          "Phygital toolkit to co-design interactive experiences with people with intellectual disabilities.",
        longDescription:
          "COBO emerged from a Master's thesis at Politecnico di Milano, developed in collaboration with Fraternità ed Amicizia onlus, a Milanese organization supporting people with intellectual disabilities. The toolkit pairs a tangible card-based board with a tablet app featuring \"Virginia\", a voice assistant guiding users through interactive scenarios. Designed for co-design sessions led by educators and caregivers, COBO scaffolds creativity and self-expression for adults who are often sidelined from technology making. The project produced a working prototype and a methodological framework, later refined into peer-reviewed publications in HCI and assistive technology venues.",
        context: "Politecnico di Milano - Fraternità ed amicizia onlus",
      },
      {
        id: "flatburn",
        title: "Flatburn",
        description:
          "Website for the open-source, solar-powered sensing platform deployed on vehicles to collect environmental data.",
        longDescription:
          "Flatburn is the public-facing site for an open-source, solar-powered environmental sensor developed at the MIT Senseable City Lab as part of the City Scanner program. The device clips onto rooftops or vehicles and passively collects data on air quality, temperature, and road conditions, turning everyday journeys into citywide datasets. The site documents the hardware, its assembly process, and the participatory framework around it, making the technology approachable to other research groups, municipalities, and citizen-science initiatives. The visual language balances technical clarity with the Senseable Lab's data-driven aesthetic.",
        url: "https://senseable.mit.edu/flatburn/",
        context: "MIT Senseable City Lab - City Scanner",
      },
      {
        id: "guru",
        title: "Guru",
        description:
          "Interactive speaker-lamp that helps parents and children build daily routines.",
        longDescription:
          "Guru is a connected speaker-lamp system designed with a user-centered approach to support families through the rhythms of the day — bedtime stories, morning routines, mindful pauses. The product family includes the physical device, a companion mobile app, and a service-oriented website that ties the experience together. The interaction language prioritizes soft light cues and minimal screens, favoring shared family time over individual screen consumption. The project was developed end-to-end through field research, prototyping with families, and iterative user testing.",
      },
      {
        id: "thesis-book",
        title: "Master Thesis Book",
        description:
          "Editorial design of the book documenting the COBO research project.",
        longDescription:
          "The Master Thesis Book is the editorial output of the COBO research, designed to communicate a complex co-design methodology to both academic and lay readers. The volume interleaves theoretical chapters with field documentation, prototype photographs, and visual frameworks, supported by generous spacing, layered typography, and explanatory iconography. The design choices echo the inclusive ethos of the research itself — accessibility, clarity, and patience for readers approaching the topic for the first time. The book was developed alongside the thesis and printed for the defense at Politecnico di Milano.",
        context: "Politecnico di Milano - Fraternità ed amicizia onlus",
      },
    ],
  },
  {
    id: "public-exhibitions",
    name: "Public Exhibitions",
    projects: [
      {
        id: "biennale-venice-2025",
        title: "Venice Architecture Biennale",
        year: "2025",
        description:
          "Two installations at the 19th International Architecture Exhibition: Re-Leaf and Data Clouds.",
        longDescription:
          "Two projects developed at the MIT Senseable City Lab were presented at the 19th International Architecture Exhibition - La Biennale di Venezia (2025).\n\nRE-LEAF (Artificial section) focuses on trees as agents of natural cooling in urban areas, demonstrating how shading and evapotranspiration are vital tools for urban design under climate pressure. Los Angeles, Amsterdam, Dubai, and Rome are featured in an interactive catalog spanning thousands of tree species, alongside maps that visualize the cooling pathways generated by vegetation in each climate. The installation surfaces the tangible benefits of increased urban canopy, showing how strategic tree placement can lower heat exposure and reshape urban life through nature-based solutions.\nMore: https://www.labiennale.org/it/architettura/2025/artificial/re-leaf\n\nDATA CLOUDS (Collective section) enters the favelas of Rio de Janeiro to surface their resilience, ingenuity, and the possibilities for improvement. LiDAR scanning and photogrammetry reveal the intricate spatial logic of these informal settlements and the challenges their inhabitants face — from structural safety to land tenure. The installation centers on a suspended 1:50 scale model of Rocinha, Rio's largest favela, paired with an immersive corridor where symmetric LiDAR and photogrammetric views translate raw data into 3D space. A final interactive projection invites reflection on how technologies like LiDAR and blockchain can support positive change in informal urbanism.\nMore: https://www.labiennale.org/it/architettura/2025/collective/data-clouds",
        url: "https://www.labiennale.org/it/architettura/2025/collective/data-clouds",
        context: "MIT Senseable City Lab - La Biennale di Venezia",
      },
      {
        id: "mapping-invisible",
        title: "Mapping the [in]visible",
        description:
          "Exhibition at the MIT Museum for the 20th anniversary of the Senseable City Lab.",
        longDescription:
          "Mapping the [in]visible is the major exhibition celebrating twenty years of research at the MIT Senseable City Lab, held at the MIT Museum in Cambridge. The show presents two decades of data-driven research on cities — from sensor networks to social flows, mobility patterns, and the invisible signals that shape urban life. Design contributions spanned mockups, large-format prints, interactive displays, and the spatial layout that translates abstract datasets into tangible artifacts. The exhibition opened in 2025 and was received internationally as a milestone in computational urbanism.",
        url: "https://dusp.mit.edu/news/20-years-mapping-invisible",
        context: "MIT Museum - Senseable City Lab",
      },
      {
        id: "state-of-decay",
        title: "State of Decay",
        year: "2020",
        description:
          "Physical data visualization of ISTAT 2011 census data on abandoned buildings across Italian regions.",
        longDescription:
          "State of Decay translates the 2011 ISTAT census data on abandoned residential buildings in Italy into a physical installation. Each Italian region is rendered as a custom-made object whose mass, height, and surface qualities correspond to the density and condition of disused buildings in that territory. Visitors are invited to handle the objects, comparing regions by touch and weight rather than by chart. The work was exhibited at Politecnico di Milano's \"Mediazioni Algoritmiche\" show in early 2020, exploring how data can leave the screen and inhabit space.",
        context: "\"Mediazioni Algoritmiche\" exhibition - Politecnico di Milano",
      },
    ],
  },
  {
    id: "data-viz",
    name: "Data Visualization",
    projects: [
      {
        id: "new-gold-rush",
        title: "Traces of the New Gold Rush",
        description:
          "Visualization of cryptocurrency financial history and carbon footprint emissions over two years.",
        longDescription:
          "Traces of the New Gold Rush reads two years of cryptocurrency activity through the dual lens of market dynamics and energy consumption. The visualization overlays Bitcoin's price trajectory with estimated CO₂ emissions from mining operations, surfacing how speculative cycles translate into tangible environmental costs. Developed at Politecnico di Milano within the DensityDesign Final Synthesis Studio, the piece combines time-series data with annotations that connect market events to global energy footprints. The result is a critical reading of an industry usually narrated only through financial gains.",
        url: "https://densitydesign.github.io/teaching-dd15/course-results/es01/group03/",
      },
      {
        id: "memetic-warfare",
        title: "Memetic Warfare Archive",
        description:
          "Website archiving and analyzing memes from a politically charged subreddit to study propaganda techniques.",
        longDescription:
          "Memetic Warfare Archive is a research-led visualization that catalogs and analyzes a curated subset of memes from politically charged subreddits, treating each image as a unit of cultural propaganda. The archive structures memes by visual rhetoric, themes, and propagation patterns, offering a navigable taxonomy of how online communities weaponize humor. The work emerged from the DensityDesign Final Synthesis Studio at Politecnico di Milano and contributes to the growing field of visual culture studies through a computational lens. The interface invites exploration through both casual browsing and analytical filters.",
        url: "https://densitydesign.github.io/teaching-dd15/course-results/es03/group03/",
      },
    ],
  },
  {
    id: "commission",
    name: "Commission",
    projects: [
      {
        id: "stradanove",
        title: "Stradanove",
        year: "2020",
        description:
          "Visual identity for a youth meeting space promoted by the city of Modena.",
        longDescription:
          "Stradanove is the refreshed visual identity for a long-running youth platform of the city of Modena and the Emilia-Romagna region, redesigned for the digital-first generation. The system spans logo, palette, typography, and a flexible illustration language that adapts to the platform's many programs — events, support services, and cultural campaigns. The proposal won a public tender in 2020 and was rolled out across web, print, and social channels. The identity speaks to contemporary teenagers without losing the institutional trust of its civic mandate.",
        context: "Public tender winner",
      },
      {
        id: "lemonsoda",
        title: "Lemonsoda",
        description:
          "Website redesign aligned with the brand identity and communication goals.",
        longDescription:
          "The Lemonsoda redesign reimagines the brand's online presence around a refreshed identity and a tighter narrative. The new site uses bold typography, generous spacing, and product-led storytelling to communicate the company's heritage and product range. Desktop and mobile experiences were designed end-to-end with attention to performance, accessibility, and clear calls-to-action across the funnel. The project delivered final designs, a basic component system, and developer-ready specs.",
      },
      {
        id: "lightdrop",
        title: "Lightdrop",
        description:
          "Social network concept that nudges users from virtual connections toward real-world activities.",
        longDescription:
          "Lightdrop is a concept social platform that flips the usual metric of engagement: success is measured not by screen time but by how often virtual matches translate into in-person activities. Users connect through interest-based \"drops\" — short-lived gatherings around concrete things to do together. The design language is intentionally minimal and warm, encouraging short, frequent interactions rather than infinite scroll. The project covered branding, app flow design, and onboarding.",
      },
      {
        id: "piantala",
        title: "PiantaLa",
        description:
          "Interactive quiz game where players plant trees by answering environmental questions.",
        longDescription:
          "PiantaLa is a multiplayer quiz game that turns environmental literacy into a competitive, optimistic experience. Players answer questions on sustainability topics and earn \"CO₂ coins\" that map to real reforestation pledges, blurring the line between education and direct impact. The design balances levity — colorful cards, clear progression, social rivalry — with the gravity of climate education. The system was developed end-to-end, from game mechanics to visual identity to interface design.",
      },
      {
        id: "design-strategies",
        title: "Design+Strategies",
        description:
          "Platform for the Politecnico di Milano research group focused on strategic design for innovation.",
        longDescription:
          "Design+Strategies is the digital home of the Politecnico di Milano research group dedicated to strategic design and innovation across public, private, and third-sector organizations. The site presents the group's research lines, ongoing projects, publications, and people, navigable both by academic peers and by potential collaborators outside academia. The visual language draws from the Politecnico identity while introducing a distinct system suited to long-form research content. Built as a full-stack project, the site supports content updates by the researchers themselves.",
        url: "https://www.designplusstrategies.polimi.it",
        context: "Politecnico di Milano",
      },
      {
        id: "perle-vetro",
        title: "Giuoco delle Perle di Vetro",
        description:
          "Accessible booktrailer for Hermann Hesse's 1943 novel, in three sensory versions.",
        longDescription:
          "Giuoco delle Perle di Vetro is an accessible booktrailer for Hermann Hesse's 1943 novel, designed in three versions — one for general audiences, one for deaf viewers with visual emphasis and captions, and one for blind viewers with rich audio description. The piece is built around 3D models produced in Cinema 4D and animated in After Effects, evoking the abstract universe Hesse describes through tactile-feeling typography and translucent geometry. The project explored how a single narrative artifact can carry meaning across sensory channels without compromising tone. It was completed as coursework on accessible communication design.",
      },
    ],
  },
  {
    id: "personal",
    name: "Personal",
    projects: [
      {
        id: "solo-la-luce",
        title: "Solo la Luce",
        description:
          "Photographic series on abandoned buildings in northern Italy, where light becomes the subject.",
        longDescription:
          "Solo la Luce is a long-running personal photography project documenting abandoned buildings across northern Italy. Rather than dwelling on decay, the series traces how natural light claims forgotten interiors — pooling on floors, slicing through broken roofs, redrawing rooms that no one inhabits anymore. The work hovers between documentary and abstraction, treating light as both subject and structural element. Selected images from the series were exhibited at the Affordable Art Fair Milano and at Panova Gallery.",
        context: "Exhibited at Affordable Art Fair Milano and Panova Gallery",
      },
    ],
  },
];

export function findProject(projectId: string): Project | undefined {
  for (const cat of projectCategories) {
    const p = cat.projects.find((p) => p.id === projectId);
    if (p) return withImages(p);
  }
  return undefined;
}
