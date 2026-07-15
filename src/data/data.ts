import type {
  Certificate,
  Highlight,
  NavLink,
  Project,
  SkillCategory,
  SocialLink,
  TimelineEntry,
} from '../types';

/*
 * All site content lives here — edit this file and every section
 * updates automatically, no JSX edits needed.
 */

export const siteMeta = {
  name: 'Nuon Vannsonleng',
  logoText: 'Nuon Vannsonleng',
  heroGreeting: "Hi, I'm Nuon Vannsonleng",
  footerTagline: 'Crafted with passion and code.',
  email: 'vannsonlengonline567@gmail.com',
  phone: '096 225 4806',
  location: 'Phnom Penh, Cambodia',
  /**
   * Profile photo shown in the hero (served from the `public/` folder).
   */
  profileImage: '/profile.jpg',
  /**
   * Downloadable CV/résumé for the hero button — drop your PDF at
   * `public/cv.pdf` (same convention as profileImage above).
   */
  cvUrl: '/cv.pdf',
};

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Rotating hero role text — derived from the RUPP Faculty of Engineering
 * Information Technology Engineering (BITE) program focus areas: software
 * engineering, web systems, and mobile application development.
 */
export const typingPhrases: string[] = [
  'IT Engineering Student',
  'Full-Stack Web Developer',
  'Mobile App Developer',
  'Software Engineer in Training',
];

export const aboutIntro: string =
  "I'm Sonleng, a passionate individual who thrives in community and " +
  'technology activities. I enjoy stepping out of my comfort zone to take on ' +
  'new challenges, allowing me to grow both personally and professionally. I ' +
  'believe in continuous learning, embracing new experiences, and pushing my ' +
  'limits to develop new skills and perspectives.';

export const highlights: Highlight[] = [
  {
    icon: 'lightbulb',
    title: 'Passion',
    description:
      'I thrive in community and technology activities — turning ideas into reality through design, media, and code.',
  },
  {
    icon: 'book',
    title: 'Learning',
    description:
      'I believe in continuous learning, embracing new experiences, and pushing my limits to develop new skills.',
  },
  {
    icon: 'target',
    title: 'Goals',
    description:
      'My goal is to grow as an IT engineer and contribute to meaningful projects that make a positive difference.',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
    ],
  },
  {
    title: 'Backend',
    skills: [{ name: 'Node.js' }, { name: 'Python' }, { name: 'SQL' }],
  },
  {
    title: 'Tools',
    skills: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'Figma' }, { name: 'Vite' }],
  },
];

export const timelineEntries: TimelineEntry[] = [
  {
    period: '2025 — Present',
    title: 'Bachelor of Information Technology Engineering',
    organization: 'Royal University of Phnom Penh',
    description:
      'Studying Information Technology Engineering, building a foundation in programming, web technology, and problem solving.',
  },
  {
    period: '2025',
    title: 'Intern — Graphic Designer, Cameraman & Content Creator',
    organization: 'RUPP UICC',
    description:
      'Created visual designs and digital content for various projects, assisted in filming, photography, and video production, and developed creative thinking and teamwork through hands-on experience.',
  },
  {
    period: '2025',
    title: 'Volunteer',
    organization: 'RUPP Sangkran & Angkor Sangkran',
    description:
      'Helped organize community events — learned to work with different kinds of people, communicate effectively as part of a team, and solve problems on the spot.',
  },
  {
    period: '2012 — 2024',
    title: 'High School Education (BACII)',
    organization: 'Golden Valley Academy of HOPE worldwide',
    description:
      'Graduated with the BACII diploma. Joined the GVA Study Tour to Singapore (2023) and the GVA Charity Event in Kampot (2022), building confidence, independence, and a global perspective.',
  },
];

export const projects: Project[] = [
  {
    title: 'RUPPER Connect — University Learning Portal',
    description:
      'A clean digital campus workspace for attendance, grades, schedules, announcements, and daily academic coordination, built for RUPP students and faculty.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/rupper-connect.png',
    imageAlt: 'RUPPER Connect university learning portal homepage',
    demoUrl: 'https://class-connect-pro-rupp.vercel.app',
    repoUrl: 'https://github.com/NuonVannsonleng/rupper-connect',
  },
  {
    title: 'Project Title Two',
    description:
      'Placeholder description of the project — what it does, the problem it solves, and what you built. Two to three sentences reads well here.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Title Three',
    description:
      'Placeholder description of the project — a shorter one-liner also looks fine in the card layout.',
    stack: ['Python', 'SQL'],
    repoUrl: '#',
  },
];

export const certificates: Certificate[] = [
  {
    title: 'Certificate Title One',
    issuer: 'Issuing Organization',
    date: '2025',
    description:
      'Placeholder description of what this certificate covers and the skills it validates — swap in your real certificates here.',
  },
  {
    title: 'Certificate Title Two',
    issuer: 'Issuing Organization',
    date: '2024',
    description:
      'Placeholder description — add a credential link once you have the certificate to show off.',
    credentialUrl: '#',
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/NuonVannsonleng', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/nuon-vannsonleng-708006422', icon: 'linkedin' },
  { label: 'Facebook', url: 'https://www.facebook.com/NuonVannsonlengL/', icon: 'facebook' },
  { label: 'Instagram', url: 'https://www.instagram.com/nuonvannsonleng/', icon: 'instagram' },
  { label: 'Telegram', url: 'https://t.me/NuonVannsonleng', icon: 'telegram' },
  { label: 'Email', url: `mailto:${siteMeta.email}`, icon: 'mail' },
];
