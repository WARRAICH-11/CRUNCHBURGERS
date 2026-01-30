import { useState } from 'react';
import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ThemeToggle } from './components/ThemeToggle';
import { ParticleBackground } from './components/ParticleBackground';

export default function Root() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}>
      <ParticleBackground isDark={isDark} />
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <WhatsAppButton />
      <Navigation isDark={isDark} />
      <Outlet context={{ isDark }} />
    </div>
  );
}
