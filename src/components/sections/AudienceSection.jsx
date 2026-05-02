import { useEffect, useRef } from 'react';
import { COPY } from '@/constants';
import gsap from 'gsap';

export function AudienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.audience-card',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, // slightly faster stagger for 4 items
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[140px] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {COPY.audience.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COPY.audience.cards.map((card, index) => (
            <div 
              key={index} 
              className="audience-card relative flex flex-col h-[420px] rounded-[20px] overflow-hidden bg-surface-elevated/30 border border-white/5 shadow-lg shadow-black/40 group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
            >
              {/* Image Box - 60% */}
              <div className="relative h-[60%] w-full overflow-hidden bg-background">
                {/* Subtle dark overlay - only on desktop, clear on mobile */}
                <div className="absolute inset-0 bg-black/0 md:bg-black/40 md:group-hover:bg-black/0 transition-all duration-500 z-10" />
                
                {/* Gradient for smooth transition - much more subtle on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/90 to-transparent z-20 opacity-40 md:opacity-100 md:group-hover:opacity-40 transition-opacity duration-500" />
                
                <img 
                  src={card.image} 
                  alt={`Público alvo Magno Musica: ${card.title} - ${card.description}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Box - 40% */}
              <div className="relative h-[40%] px-6 pb-6 pt-2 flex flex-col justify-start bg-surface-elevated/30 z-30">
                <h3 className="text-xl font-bold mb-2 font-display text-white leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
