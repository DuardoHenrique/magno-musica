import { useEffect, useRef, useState } from 'react';
import { COPY } from '@/constants';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export function SocialProofSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = COPY.socialProof.testimonials;
  const totalItems = testimonials.length;

  // Mostra 3 itens por vez no desktop, 1 no mobile
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card',
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: 'power2.out',
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
    <section ref={sectionRef} className="py-[140px] bg-surface-elevated/30 border-y border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {COPY.socialProof.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden px-4 -mx-4 pb-10 md:pb-20">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / (window?.innerWidth < 768 ? 1 : 3))}%)` }}
            >
              {testimonials.map((testimonial, index) => {
                const isMiddle = index === (currentIndex + 1) % totalItems;
                return (
                  <div 
                    key={index} 
                    className={`w-full md:w-1/3 flex-shrink-0 px-4 transition-all duration-700 ease-in-out ${
                      isMiddle ? 'md:translate-y-16' : 'md:translate-y-0'
                    }`}
                  >
                    <div className="testimonial-card glass p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 relative h-full flex flex-col">
                      <Quote className="w-10 h-10 text-primary/40 absolute top-6 right-6" />
                      
                      <div className="flex-grow">
                        <div className="flex text-primary mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-base md:text-lg text-text-muted italic leading-relaxed">
                          "{testimonial.content}"
                        </p>
                      </div>
                      
                      <div className="mt-8 border-t border-white/10 pt-6 flex items-center gap-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <h4 className="font-bold text-text text-sm md:text-base">{testimonial.name}</h4>
                          <p className="text-xs text-text-muted">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-4 md:mt-8">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-primary' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
