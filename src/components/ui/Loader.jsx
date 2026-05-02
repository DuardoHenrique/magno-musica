import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MESSAGES = [
  "Afinando cordas...",
  "Ajustando a acústica...",
  "Hora do show"
];

export const Loader = ({ isLoading, onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const containerRef = useRef(null);
  const waveRef = useRef(null);
  const textRef = useRef(null);
  const barsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Dispara evento para os outros componentes começarem a se revelar
        // sem causar re-renderizações globais do React
        window.dispatchEvent(new CustomEvent('loaderExiting'));

        // Saída definitiva e suave
        gsap.to(containerRef.current, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => {
            onComplete(); // Avisa ao App que acabou
          }
        });
      }
    });

    // 1. Setup inicial
    gsap.set(containerRef.current, { yPercent: 0, autoAlpha: 1 });
    
    // 2. Animação das Barras
    barsRef.current.forEach((bar, index) => {
      gsap.to(bar, {
        height: "60%",
        duration: 0.3 + (index % 3) * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // 3. Sequência de Texto
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.1 }
    );

    for (let i = 1; i < MESSAGES.length; i++) {
      tl.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        delay: i === 1 ? 2.5 : 1.0,
        onComplete: () => {
          setCurrentMessage(i);
          gsap.set(textRef.current, { y: 10 });
        }
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3
      });
    }

    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
      gsap.killTweensOf(barsRef.current);
      gsap.killTweensOf(containerRef.current);
    };
  }, []); // Só roda ao montar

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-primary overflow-hidden ${isLoading ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ willChange: 'transform, opacity' }}
      data-lenis-prevent
    >
      {/* Soundwave Container */}
      <div 
        ref={waveRef}
        className="flex items-center justify-center gap-1.5 h-16 mb-8"
      >
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            ref={el => barsRef.current[i] = el}
            className="w-1 bg-primary rounded-full h-2"
          />
        ))}
      </div>

      {/* Messages */}
      <div className="h-8 overflow-hidden flex items-center justify-center">
        <p 
          ref={textRef}
          className="text-primary font-display text-xl md:text-2xl tracking-widest uppercase font-medium"
        >
          {MESSAGES[currentMessage]}
        </p>
      </div>

      {/* Subtle Noise Texture overlay to match design */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay" />
    </div>
  );
};
