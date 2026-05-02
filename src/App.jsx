import { useState } from 'react';
import { SmoothScrolling } from '@/components/ui/SmoothScrolling';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ContactModal } from '@/components/ui/ContactModal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CredibilitySection } from '@/components/sections/CredibilitySection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { InstrumentsSection } from '@/components/sections/InstrumentsSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

import { GallerySection } from '@/components/sections/GallerySection';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { Loader } from '@/components/ui/Loader';
import { useEffect, useCallback } from 'react';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Initialize scroll tracking
  useScrollTracking();

  return (
    <>
      <Loader isLoading={isLoading} onComplete={handleLoadingComplete} />
      <SmoothScrolling>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-md focus:font-bold focus:shadow-2xl"
      >
        Pular para o conteúdo principal
      </a>
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <main id="main-content">
        <HeroSection onOpenContact={() => setIsContactOpen(true)} isLoading={isLoading} />
        <CredibilitySection />
        <AudienceSection />
        <PhilosophySection />
        <InstrumentsSection onOpenContact={() => setIsContactOpen(true)} />
        <SocialProofSection />
        <GallerySection />
        <CTASection onOpenContact={() => setIsContactOpen(true)} />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <WhatsAppButton />
      <CookieBanner />
    </SmoothScrolling>
    </>
  );
}

export default App;
