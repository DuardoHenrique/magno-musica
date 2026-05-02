import { COPY } from '@/constants';
import { useRef, useEffect, useState } from 'react';

export function GallerySection() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  // Garantir que comece do início ao montar
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        const isEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 100;
        
        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-[140px] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
          {COPY.gallery.title}
        </h2>
      </div>

      {/* Container com scroll horizontal e imagens sobrepostas */}
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="w-full flex overflow-x-auto pb-12 pt-8 px-4 md:px-[10vw] snap-x snap-mandatory custom-scrollbar -space-x-6 md:-space-x-12 scroll-smooth"
      >
        {COPY.gallery.images.map((image, index) => (
          <div 
            key={index} 
            className="snap-center shrink-0 w-[280px] md:w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-500 hover:-translate-y-6 hover:rotate-2 hover:z-20 z-10 border border-white/10 grayscale-[30%] hover:grayscale-0"
          >
            <img 
              src={image} 
              alt={`Momento real de aula Magno Musica - Foto ${index + 1}`} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Overlay sutil que some no hover */}
            <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
