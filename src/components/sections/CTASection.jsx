import { useEffect, useRef } from 'react';
import { COPY } from '@/constants';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ctaImage from '@/assets/cta-final.jpeg';
import ctaImageMobile from '@/assets/cta-final-mobile.jpeg';

export function CTASection({ onOpenContact }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content',
        { opacity: 0, scale: 0.9, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden h-screen">
      <div className="cta-content relative w-full h-full overflow-hidden shadow-2xl flex items-start md:items-center">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ctaImage} 
            alt="Professor Magno Oliveira segurando instrumento em fundo premium" 
            className="hidden md:block w-full h-full object-cover"
          />
          <img 
            src={ctaImageMobile} 
            alt="Professor Magno Oliveira segurando instrumento em fundo premium - versão mobile" 
            className="block md:hidden w-full h-full object-cover"
          />
          {/* Gradiente apenas na direita para legibilidade da copy, esquerda nítida para o personagem */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-10 md:pt-0">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Espaço para o personagem na esquerda */}
            <div className="hidden md:block" />
            
            {/* Copy na direita, alinhada à esquerda */}
            <div className="flex flex-col items-start text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-display">
                {COPY.cta.title}
              </h2>
              <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-xl">
                {COPY.cta.description}
              </p>
              
              <Button 
                size="lg" 
                className="w-full max-w-xl text-xl group px-12 h-20 shadow-2xl shadow-primary/30"
                onClick={onOpenContact}
              >
                {COPY.cta.button}
                <ArrowRight className="ml-4 w-8 h-8 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
