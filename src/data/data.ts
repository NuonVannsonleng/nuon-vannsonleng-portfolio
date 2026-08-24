import type {
  Certificate,
  HeroTag,
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

/**
 * Hero profile card: the eyebrow line over the photo and the three
 * fact chips under it.
 */
export const heroRole = 'ITE Student · Web Developer';

export const heroTags: HeroTag[] = [
  { value: 'ITE', label: 'Student' },
  { value: 'Web', label: 'Developer' },
  { value: 'UI', label: 'Focused' },
];

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

/*
 * Project thumbnails live in `public/` and are referenced from the site
 * root, e.g. a file at `public/clipflow.png` is `imageUrl: '/clipflow.png'`.
 * Each card below already names the file it expects — drop the screenshot
 * in, uncomment the line, and it appears. Without one the card shows a
 * "Preview coming soon" placeholder.
 */
export const projects: Project[] = [
  {
    title: 'RUPPER Connect — University Learning Portal',
    description:
      'A clean digital campus workspace for attendance, grades, schedules, announcements, and daily academic coordination, built for RUPP students and faculty.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/rupper-connect.png',
    imageAlt: 'RUPPER Connect university learning portal homepage',
    demoUrl: 'https://class-connect-pro-rupp.vercel.app',
    repoUrl: 'https://github.com/NuonVannsonleng/RUPPER_Connect',
  },
  {
    title: 'ClipFlow — Public Media Downloader',
    description:
      'Paste a link to a publicly accessible video and ClipFlow returns the formats that are genuinely available for it — MP4 and WEBM for video, MP3, M4A, WAV and OPUS for audio — across a dozen platforms. Downloads need no account, files are swept away on a timer, and anything behind DRM, a login, or a paywall is refused outright rather than worked around.',
    stack: ['Next.js 15', 'TypeScript', 'Express', 'FFmpeg'],
    // imageUrl: '/clipflow.png',
    // imageAlt: 'ClipFlow downloader page with a pasted video link',
    demoUrl: 'https://clip-flow-swart.vercel.app',
    repoUrl: 'https://github.com/NuonVannsonleng/ClipFlow',
  },
  {
    title: 'FileFlow Converter — Convert Anything',
    description:
      'A file conversion app for documents, images, audio, video and archives: upload a file, pick a target format, download the result. The format picker is generated from the server\'s conversion registry filtered by the engines actually installed, so every option on screen is one the backend can really perform — the UI never offers a dead end.',
    stack: ['React', 'TypeScript', 'Express', 'FFmpeg'],
    // imageUrl: '/fileflow.png',
    // imageAlt: 'FileFlow Converter upload screen with format options',
    demoUrl: 'https://fileflow-converter.onrender.com',
    repoUrl: 'https://github.com/NuonVannsonleng/FileFlow-Converter',
  },
  {
    title: 'RyzzQuizz — Live Quiz Game',
    description:
      'A real-time, Kahoot-style quiz game. The host opens a room and shows a join code, players join with a nickname, and everyone answers against a synced timer while scores update live. Client and server share one typed WebSocket event contract, so a changed payload is a compile error on both sides instead of a runtime surprise.',
    stack: ['React', 'TypeScript', 'Socket.IO', 'Express'],
    // imageUrl: '/ryzzquizz.png',
    // imageAlt: 'RyzzQuizz lobby showing the room join code',
    demoUrl: 'https://ryzzquizz.onrender.com',
    repoUrl: 'https://github.com/NuonVannsonleng/RyzzQuizz',
  },
  {
    title: 'Still Here (For You)',
    description:
      'A quiet, cinematic single-page experience about waiting for someone: a monochrome moonlit palette, canvas rain and drifting stars, and sections for letters, memories, a diary, a mood tracker and a confession wall. What you write persists in local storage, and every animation stands down when the visitor prefers reduced motion.',
    stack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    // imageUrl: '/still-here.png',
    // imageAlt: 'Still Here (For You) landing screen at night',
    demoUrl: 'https://still-here-for-you.vercel.app',
    repoNote: 'Repo not published yet',
  },
];

/*
 * Certificate photos live in `public/` too — save the scan or photo as
 * `public/certificate-1.jpg` / `public/certificate-2.jpg`, then uncomment
 * the imageUrl line on the matching entry. Titles, issuers and the
 * descriptions below are still placeholders.
 */
export const certificates: Certificate[] = [
  {
    title: 'Certificate Title One',
    issuer: 'Issuing Organization',
    date: '2025',
    description:
      'Description coming soon — what this certificate covers and the skills it validates.',
    // imageUrl: '/certificate-1.jpg',
    // imageAlt: 'First certificate',
  },
  {
    title: 'Certificate Title Two',
    issuer: 'Issuing Organization',
    date: '2024',
    description:
      'Description coming soon — what this certificate covers and the skills it validates.',
    // imageUrl: '/certificate-2.jpg',
    // imageAlt: 'Second certificate',
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/NuonVannsonleng', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/nuon-vannsonleng-708006422', icon: 'linkedin' },
  { label: 'Facebook', url: 'https://www.facebook.com/mqchavrr/', icon: 'facebook' },
  { label: 'Instagram', url: 'https://www.instagram.com/mqchavrr/', icon: 'instagram' },
  { label: 'Telegram', url: 'https://t.me/mqchavrr', icon: 'telegram' },
  { label: 'Email', url: `mailto:${siteMeta.email}`, icon: 'mail' },
];
