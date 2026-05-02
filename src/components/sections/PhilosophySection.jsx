import { useEffect, useRef } from 'react';
import { COPY } from '@/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getFramePath = (index, isMobile) => {
  const folder = isMobile ? '/frame-video-mobile' : '/frames-video';
  return `${folder}/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;
};

export function PhilosophySection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const isMobile = window.innerWidth < 768;
    const frameCount = isMobile ? 240 : 180;
    
    // Set canvas dimensions
    canvas.width = isMobile ? 720 : 1920; // Lower res for mobile
    canvas.height = isMobile ? 1280 : 1080; // Vertical aspect for mobile if applicable, or keep 1080

    const images = [];
    const scrollObj = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i, isMobile);
      images.push(img);
    }

    const render = () => {
      const frameIndex = Math.round(scrollObj.frame);
      const img = images[frameIndex];
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Cover aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    if (images[0] && images[0].complete) {
      render();
    } else if (images[0]) {
      images[0].onload = render;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            anticipatePin: 1,
            scrub: isMobile ? 0.2 : 0.5,
            start: 'top top',
            end: isMobile ? '+=200%' : '+=400%',
          }
        });

        // Animate the frames
        tl.to(scrollObj, {
          frame: frameCount - 1,
          ease: 'none',
          onUpdate: render,
          duration: 1, // Normalized timeline duration
        }, 0);

        // Animate the texts
        const stepDuration = 1 / COPY.philosophy.steps.length;
        
        textRefs.current.forEach((textRef, i) => {
          const enterTime = i * stepDuration;
          const leaveTime = enterTime + stepDuration * 0.7; // Fade out before next starts
          
          // Initial state
          gsap.set(textRef, { autoAlpha: 0, y: 50 });

          // Fade in
          tl.to(textRef, 
            { autoAlpha: 1, y: 0, duration: stepDuration * 0.2, ease: 'power2.out' },
            enterTime
          );
          
          // Fade out
          tl.to(textRef, {
            autoAlpha: 0,
            y: -50,
            duration: stepDuration * 0.2,
            ease: 'power2.in'
          }, leaveTime);
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: isMobile ? 0.2 : 0.5,
            start: 'top top',
            end: isMobile ? '+=200%' : '+=400%',
          }
        });

        // Simple opacity fade without movement
        const stepDuration = 1 / COPY.philosophy.steps.length;
        textRefs.current.forEach((textRef, i) => {
          const enterTime = i * stepDuration;
          const leaveTime = enterTime + stepDuration * 0.7;
          
          gsap.set(textRef, { autoAlpha: 0, y: 0 });
          tl.to(textRef, { autoAlpha: 1, duration: stepDuration * 0.2 }, enterTime);
          tl.to(textRef, { autoAlpha: 0, duration: stepDuration * 0.2 }, leaveTime);
        });
        
        // Still animate frames but maybe slower/simpler if needed
        tl.to(scrollObj, {
          frame: frameCount - 1,
          ease: 'none',
          onUpdate: render,
          duration: 1,
        }, 0);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-[100dvh] bg-black overflow-hidden relative">
      <canvas 
        ref={canvasRef} 
        role="img"
        aria-label="Vídeo artístico em stop-motion mostrando a filosofia e metodologia de ensino do Professor Magno"
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
      />
      
      <div className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 z-20 w-full text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-primary">
          {COPY.philosophy.title}
        </h2>
      </div>

      <div className="absolute inset-0 flex items-start md:items-center justify-center md:justify-end px-4 md:px-16 lg:px-32 z-10">
        <div className="relative w-full max-w-xl h-auto min-h-[400px]">
          {COPY.philosophy.steps.map((step, index) => (
            <div 
              key={index} 
              ref={el => textRefs.current[index] = el}
              className="absolute inset-0 flex flex-col justify-start md:justify-center items-start text-left pt-40 md:pt-0"
            >
              <div 
                className="glass group py-12 md:py-32 px-8 md:px-14 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-2xl bg-black/40 w-full"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  // Interactive Light
                  const light = e.currentTarget.querySelector(`.light-effect-${index}`);
                  if (light) {
                    gsap.to(light, {
                      x: x - 160,
                      y: y - 160,
                      duration: 0.5,
                      ease: 'power2.out'
                    });
                  }

                  // 3D Tilt Effect
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = ((y - centerY) / centerY) * -12; // Incline up to 12 degrees
                  const rotateY = ((x - centerX) / centerX) * 12;

                  gsap.to(e.currentTarget, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.04,
                    duration: 0.5,
                    ease: 'power2.out'
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                  });
                }}
              >
                {/* Interactive Light - Balanced intensity */}
                <div className={`light-effect-${index} absolute w-80 h-80 bg-primary/40 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
                     style={{ left: 0, top: 0 }}
                />
                
                {/* Secondary static glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                <div className="relative z-10 pointer-events-none">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-sm">
                    {step.title}
                  </h3>
                  <div className="h-2 w-20 bg-primary rounded-full mb-8 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]" />
                  <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/50 opacity-0 md:opacity-80" />
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 pointer-events-none bg-gradient-to-l from-background via-background/90 to-transparent opacity-0 md:opacity-100" />
    </section>
  );
}
