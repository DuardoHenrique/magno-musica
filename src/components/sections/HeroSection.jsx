import { useEffect, useRef, useState } from 'react';
import { COPY } from '@/constants';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Play, X } from 'lucide-react';
import gsap from 'gsap';
import { trackCTAClick } from '@/utils/trackingEvents';

import magnoImage from '@/assets/magno.webp';

export function HeroSection({ onOpenContact }) {
  const heroRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const handleCTAClick = () => {
    trackCTAClick('hero');
    onOpenContact();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.fromTo('.hero-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
      
      // Image scale in
      gsap.fromTo('.hero-image-wrap',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.6 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Content */}
          <div className="max-w-2xl">
            <div className="hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Aulas Presenciais em Terra Boa</span>
            </div>
            
            <h1 className="hero-text text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {COPY.hero.headline}
            </h1>
            
            <p className="hero-text text-lg md:text-xl text-text-muted mb-8 leading-relaxed max-w-lg">
              {COPY.hero.subheadline}
            </p>
            
            <div className="hero-text flex flex-col sm:flex-row gap-4">
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
          <div className="hero-image-wrap relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img 
                src={magnoImage} 
                alt="Professor de Música Magno Oliveira tocando instrumento em seu estúdio em Terra Boa" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 z-20 glass px-6 py-4 rounded-xl border border-white/10">
                <p className="font-display font-bold text-2xl text-primary">100%</p>
                <p className="text-sm text-text-muted">Foco em repertório prático</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-md" 
            onClick={() => setShowVideo(false)}
          />
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10 animate-zoomIn">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/ss-s3Ag8krY?autoplay=1"
              title="Metodologia Magno Música"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
