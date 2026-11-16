// Single source of truth for the personal / academic profile.
// Used by the Windows 98 desktop (About, CV, Contacts windows) and by the
// prerendered text version (/text/).

export interface Appointment {
  period: string;
  role: string;
  org: string;
  place: string;
  note?: string;
}

export interface Degree {
  period: string;
  degree: string;
  org: string;
  details?: string[];
  url?: { label: string; href: string };
}

export interface Award {
  year: string;
  title: string;
  org: string;
  note: string;
}

export interface ProfileLink {
  label: string;
  href: string;
  display: string;
}

export const profile = {
  name: "Diego Morra",
  fullName: "Diego Morra, Ph.D.",
  position: "Postdoctoral Researcher",
  lab: "MIT Senseable City Lab",
  institution: "Massachusetts Institute of Technology",
  location: "Cambridge, MA, USA",
  photo: {
    src: "/DM_profilepic.png",
    alt: "Diego Morra speaking into a microphone at a public event",
  },
  /** Title of the bio: the focus of the research in one line. */
  headline: "Accessibility through making, AI and participatory methods",
  /** Short bio, shown first in the Bio window and in the text version. */
  statement: [
    "Diego Morra is a Postdoctoral Researcher at the MIT Senseable City Lab, where his research focuses on how to make cities more accessible and improve citizen well-being by combining artificial intelligence with participatory methods.",
    "Diego works across human–computer interaction, accessibility and urban computing, and his research connects two questions: how can technology be designed to better support people with disabilities, and how can it help citizens and people with disabilities shape the city they live in?",
    "He holds a Ph.D. cum laude in Information Technology from Politecnico di Milano (DEIB), where his thesis on accessible design toolkits and AI for including people with intellectual disability in IoT programming received the Springer Award of the doctoral programme. Trained as a communication and interaction designer, he publishes in venues such as ACM CHI, the International Journal of Human-Computer Studies and Philosophical Transactions of the Royal Society A.",
  ],
  interests: [
    "Human-Computer Interaction (HCI)",
    "Accessibility and Wellbeing",
    "Co-design and Participatory Methods",
    "IoT and Tangible Technologies",
    "Urban Sensing and Citizen Science",
    "LLMs and Computer Vision",
  ],
};

export const appointments: Appointment[] = [
  {
    period: "2025 – present",
    role: "Postdoctoral Researcher",
    org: "MIT Senseable City Lab, Massachusetts Institute of Technology",
    place: "Cambridge, MA, USA",
  },
  {
    period: "Jan – Mar 2026",
    role: "Lab Lead",
    org: "Senseable City Seoul",
    place: "Seoul, South Korea",
    note: "Start-up and operational coordination of the lab's Seoul branch, including research direction and institutional partnerships.",
  },
  {
    period: "Feb – Dec 2023",
    role: "Visiting Ph.D. Researcher",
    org: "MIT Senseable City Lab, Massachusetts Institute of Technology",
    place: "Cambridge, MA, USA",
    note: "Supported by the Roberto Rocca Doctoral Fellowship.",
  },
];

export const education: Degree[] = [
  {
    period: "2021 – 2025",
    degree: "Ph.D. in Information Technology, cum laude",
    org: "Department of Electronics, Information and Bioengineering (DEIB), Politecnico di Milano",
    details: [
      "Thesis: “Leveraging accessible design toolkits and AI for the inclusivity of individuals with intellectual disability in IoT programming”",
      "Supervisor: Prof. Maristella Matera · Defended May 2025",
    ],
    url: {
      label: "Read the thesis on POLITesi",
      href: "https://www.politesi.polimi.it/handle/10589/232832",
    },
  },
  {
    period: "2018 – 2021",
    degree: "M.Sc. in Communication Design, 110/110 cum laude",
    org: "Politecnico di Milano",
    details: [
      "Thesis: COBO, a phygital toolkit for co-designing interactive outdoor experiences with people with intellectual disability",
    ],
  },
  {
    period: "2015 – 2018",
    degree: "B.Sc. in Communication Design",
    org: "Politecnico di Milano",
  },
];

export const awards: Award[] = [
  {
    year: "2025",
    title: "Springer Award",
    org: "Ph.D. Programme in Information Technology, Politecnico di Milano",
    note: "Ph.D. thesis selected among the best of the programme and published in the Springer series Special Topics in Information Technology.",
  },
  {
    year: "2023",
    title: "Roberto Rocca Doctoral Fellowship",
    org: "Progetto Rocca, MIT and Politecnico di Milano",
    note: "12-month fellowship supporting doctoral research at the Massachusetts Institute of Technology.",
  },
];

export const emails = [
  { label: "MIT", address: "d_morra@mit.edu" },
  { label: "Personal", address: "diegomorra.dm@gmail.com" },
];

/** Address for accessibility feedback and suggestions. */
export const feedbackEmail = emails[1].address;

export const SCHOLAR_URL =
  "https://scholar.google.com/citations?user=GJynx_QAAAAJ";
export const ORCID_URL = "https://orcid.org/0000-0001-7275-6219";

export const academicLinks: ProfileLink[] = [
  {
    label: "Google Scholar",
    href: SCHOLAR_URL,
    display: "scholar.google.com/citations?user=GJynx_QAAAAJ",
  },
  { label: "ORCID", href: ORCID_URL, display: "0000-0001-7275-6219" },
  {
    label: "DBLP",
    href: "https://dblp.org/pid/276/8239.html",
    display: "dblp.org/pid/276/8239",
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Diego-Morra",
    display: "researchgate.net/profile/Diego-Morra",
  },
];

export const otherLinks: ProfileLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/diegomorra",
    display: "github.com/diegomorra",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/diegomorra/",
    display: "linkedin.com/in/diegomorra",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/diegomorra",
    display: "@diegomorra",
  },
];

export const cv = {
  pdf: "/CV_Morra_2026.pdf",
  updated: "November 2026",
};

/** Prerendered text version of the whole site (see src/accessible/). */
export const TEXT_VERSION_URL = "/text/";
