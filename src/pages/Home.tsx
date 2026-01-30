import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { Hero } from '../components/Hero';
import { MenuShowcase } from '../components/MenuShowcase';
import { Testimonials } from '../components/Testimonials';
import { OrderSection } from '../components/OrderSection';

interface OutletContext {
  isDark: boolean;
}

export default function Home() {
  const { isDark } = useOutletContext<OutletContext>();
  const [konamiActivated, setKonamiActivated] = useState(false);

  // Konami code: ↑↑↓↓←→←→BA
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setKonamiActivated(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Hero isDark={isDark} />
      <MenuShowcase isDark={isDark} konamiActivated={konamiActivated} />
      <Testimonials isDark={isDark} />
      <OrderSection isDark={isDark} />
    </>
  );
}
