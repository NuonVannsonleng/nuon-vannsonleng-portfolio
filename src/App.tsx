import { useState } from 'react';
import { Background } from './components/Background';
import { CursorGlow } from './components/CursorGlow';
import { Loader } from './components/Loader';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import {
  aboutIntro,
  certificates,
  highlights,
  navLinks,
  projects,
  siteMeta,
  skillCategories,
  socialLinks,
  timelineEntries,
  typingPhrases,
} from './data/data';

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader name={siteMeta.name} onDone={() => setLoading(false)} />;
  }

  const heroStats = [
    {
      icon: 'code' as const,
      value: projects.length,
      label: 'Total Projects',
      sublabel: 'Web solutions crafted',
    },
    {
      icon: 'award' as const,
      value: certificates.length,
      label: 'Certificates',
      sublabel: 'Skills validated',
    },
    {
      icon: 'stack' as const,
      value: skillCategories.reduce((total, category) => total + category.skills.length, 0),
      label: 'Tech Skills',
      sublabel: 'Tools I work with',
    },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Header logoText={siteMeta.logoText} links={navLinks} />
      <main id="main-content">
        <Hero
          greeting={siteMeta.heroGreeting}
          typingPhrases={typingPhrases}
          name={siteMeta.name}
          photoUrl={siteMeta.profileImage}
          socialLinks={socialLinks}
          stats={heroStats}
          cvUrl={siteMeta.cvUrl}
        />
        <About intro={aboutIntro} highlights={highlights} />
        <Experience entries={timelineEntries} />
        <PortfolioShowcase
          projects={projects}
          certificates={certificates}
          skillCategories={skillCategories}
        />
        <Contact socialLinks={socialLinks} />
      </main>
      <Footer name={siteMeta.name} tagline={siteMeta.footerTagline} />
    </>
  );
}
