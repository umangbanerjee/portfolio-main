export interface NavItem {
  label: string;
  href: string;
}

export interface PersonalContent {
  name: string;
  heroRoleTag: string;
  headlinePrefix: string;
  headlineCursive: string;
  headlineLine2: string;
  bio: string;
  cutoutImage: string;
  email: string;
  linkedin: string;
  github: string;
  x?: string;
  location: string;
  college: string;
}

export interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface WhoIAmContent {
  tag: string;
  headline: string;
  paragraphs: string[];
  githubHandle?: string;
  githubUrl?: string;
  portrait: {
    image: string;
    alt: string;
    badgeLeft: string;
    badgeRight: string;
  };
}

export interface EducationItem {
  num: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface ProjectItem {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: string;
  status: "Shipped" | "In progress" | "Production" | "Deployed" | "Concluded";
  href: string;
  slug?: string;
}

export interface WorkHistoryItem {
  num: string;
  role: string;
  company: string;
  logo: string;
  logoAlt: string;
  period: string;
  location: string;
}

export interface RejectedFeature {
  feature: string;
  whyRejected: string;
  shippedAlternative: string;
}

export interface ProjectBlueprint {
  inputs: string[];
  coreEngine: string[];
  outputs: string[];
  phases: string[];
}

export interface ProjectFriction {
  tag: string;
  title: string;
  problem: string;
  resolution: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  timeline: string;
  status?: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string; isTodo?: boolean }[];
  screenshots?: {
    laptopMockup?: string;
    productShowcase?: string;
    secondaryShowcase?: string;
    tertiaryShowcase?: string;
  };
  blueprint?: ProjectBlueprint;
  frictions?: ProjectFriction[];
  tldr: string;
  problem: string;
  solution?: string;
  whoItsFor?: string;
  myRole: string[];
  keyDecisions?: { decision: string; rationale: string; tradeoff: string }[];
  rejectedFeatures?: RejectedFeature[];
  whatIShipped: string[];
  results?: { summary: string; items: string[] };
  whatIdDoDifferently?: string;
}

export interface SkillSubgroup {
  title: string;
  skills: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  description: string;
  subgroups: SkillSubgroup[];
}

export interface SkillsetContent {
  tag: string;
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  categories: SkillCategory[];
}

export interface PortfolioContent {
  navLinks: NavItem[];
  personal: PersonalContent;
  clientLogos: ClientLogo[];
  whoIAm: WhoIAmContent;
  education: EducationItem[];
  selectedWork: {
    tag: string;
    title: string;
    subtitle: string;
    allProjectsLabel?: string;
    allProjectsUrl?: string;
    projects: ProjectItem[];
  };
  workHistory: {
    tag: string;
    title: string;
    items: WorkHistoryItem[];
  };
  skillset: SkillsetContent;
  projects: CaseStudy[];
}

