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

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <SmoothScrolling>
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <main>
        <HeroSection onOpenContact={() => setIsContactOpen(true)} />
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
    </SmoothScrolling>
  );
}

export default App;
