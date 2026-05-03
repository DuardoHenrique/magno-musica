import { useEffect, useRef, useState } from 'react';
import { COPY } from '@/constants';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Play, X } from 'lucide-react';
import gsap from 'gsap';
import { trackCTAClick } from '@/utils/trackingEvents';

import magnoImage from '@/assets/magno.webp';

export function HeroSection({ onOpenContact, isLoading }) {
  const heroRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const handleCTAClick = () => {
    trackCTAClick('hero');
    onOpenContact();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Criamos a timeline, mas ela não começa automaticamente (paused: true)
      const tl = gsap.timeline({ paused: true });

      tl.fromTo('.hero-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
      
      tl.fromTo('.hero-image-wrap',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
        "-=1" // Começa um pouco antes de terminar o texto
      );

      // Função que inicia a animação
      const startAnimation = () => {
        tl.play();
      };

      // Se não houver loader (isLoading falso logo de cara), ou quando o evento disparar
      if (!isLoading) {
        startAnimation();
      } else {
        window.addEventListener('loaderExiting', startAnimation);
      }

      return () => {
        window.removeEventListener('loaderExiting', startAnimation);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []); // Sem dependências para garantir que a animação não reinicie nunca

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Content */}
          <div className="max-w-2xl">
            <div className="hero-text opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Aulas Presenciais em Terra Boa</span>
            </div>
            
            <h1 className="hero-text opacity-0 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {COPY.hero.headline}
            </h1>
            
            <p className="hero-text opacity-0 text-lg md:text-xl text-text-muted mb-8 leading-relaxed max-w-lg">
              {COPY.hero.subheadline}
            </p>
            
            <div className="hero-text opacity-0 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={handleCTAClick}
              >
                {COPY.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
               <Button 
                size="lg" 
                variant="ghost" 
                className="group"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 w-5 h-5 text-primary" />
                Ver metodologia
              </Button>
            </div>
          </div>

          {/* Visual Anchor */}
          <div className="hero-image-wrap opacity-0 relative">
            <div 
              className="aspect-[4/5] rounded-2xl overflow-hidden relative group border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              
              {/* Imagem de base */}
              <img 
                src={magnoImage} 
                alt="Professor de Música Magno Oliveira" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />


            </div>
          </div>
          
        </div>
      </div>
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-xl" 
            onClick={() => setShowVideo(false)}
          />
          <div className={`relative w-full ${isMobile ? 'max-w-[85vw] aspect-[9/16]' : 'max-w-5xl aspect-video'} rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 animate-zoomIn bg-black`}>
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-black transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              src="/videos/apresentacao-comprimida.mp4" 
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}
