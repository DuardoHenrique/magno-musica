import { COPY } from '@/constants';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function GallerySection() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  // Garantir que comece do início ao montar
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
    <section className="py-[140px] overflow-hidden relative group/gallery">
      <div className="container mx-auto px-4 md:px-8 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
          {COPY.gallery.title}
        </h2>
      </div>

      {/* Navigation Buttons - Hidden on mobile, visible on hover on desktop */}
      <div className="hidden md:block">
        <button
          onClick={() => scroll('left')}
          aria-label="Ver imagem anterior"
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-primary hover:text-background"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Ver próxima imagem"
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/50 border border-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-primary hover:text-background"
        >
          <ChevronRight size={32} />
        </button>
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
