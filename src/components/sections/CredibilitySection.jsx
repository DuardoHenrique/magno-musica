import { useEffect, useRef, useState } from 'react';
import { COPY } from '@/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StatCounter({ target }) {
  const [displayValue, setDisplayValue] = useState('0');
  const counterRef = useRef(null);

  useEffect(() => {
    // Extract number and non-numeric parts (like + or %)
    const numericPart = parseInt(target.replace(/[^0-9]/g, ''), 10);
    const suffix = target.replace(/[0-9]/g, '');
    const prefix = target.startsWith('+') ? '+' : '';
    const cleanSuffix = suffix.replace('+', ''); // Avoid double plus

    const obj = { value: 0 };
    
    const tl = gsap.to(obj, {
      value: numericPart,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 90%',
      },
      onUpdate: () => {
        const current = Math.floor(obj.value);
        setDisplayValue(`${prefix}${current}${cleanSuffix}`);
      }
    });

    return () => {
      tl.kill();
    };
  }, [target]);

  return <span ref={counterRef}>{displayValue}</span>;
}

export function CredibilitySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 border-y border-white/5 bg-surface-elevated/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/5">
          {COPY.credibility.stats.map((stat, index) => (
            <div key={index} className="stat-item flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl md:text-4xl font-display font-bold text-primary mb-2 text-glow">
                <StatCounter target={stat.number} />
              </span>
              <span className="text-xs md:text-sm text-text-muted font-medium uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
