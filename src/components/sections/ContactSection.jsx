import { useEffect, useRef } from 'react';
import { COPY } from '@/constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Layout Mobile: Card em cima, Mapa embaixo */}
      <div className="lg:hidden bg-background py-16 px-4">
        <div className="contact-card glass p-8 rounded-3xl border border-white/20 w-full backdrop-blur-xl bg-zinc-900/95 relative overflow-hidden mb-8 shadow-2xl">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
          <h2 className="text-3xl font-bold mb-3 font-display">{COPY.contact.title}</h2>
          <p className="text-text-muted mb-8 text-base">{COPY.contact.subtitle}</p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{COPY.contact.address}</p>
                <p className="text-xs text-text-muted">{COPY.contact.addressDetail}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">WhatsApp / Telefone</p>
                <p className="text-xs text-text-muted">{COPY.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">E-mail</p>
                <p className="text-xs text-text-muted">{COPY.contact.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Atendimento</p>
                <p className="text-xs text-text-muted">Seg. a Sex., 08h às 20h</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-3xl overflow-hidden h-[350px] border border-white/10">
          <iframe 
            src={COPY.contact.mapUrl}
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
            className="w-full h-full border-0 grayscale-[50%] contrast-[1.2] invert-[0.9] hue-rotate-[180deg]"
          />
        </div>
      </div>

      {/* Layout Desktop: Card flutuando sobre o mapa */}
      <div className="hidden lg:block relative h-[700px] w-full">
        {/* Map Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe 
            src={COPY.contact.mapUrl}
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
            className="w-full h-full border-0 grayscale-[50%] contrast-[1.2] invert-[0.9] hue-rotate-[180deg]"
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-color" />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>

        {/* Floating Card */}
        <div className="container mx-auto px-8 h-full relative z-10 flex items-center pointer-events-none">
          <div className="contact-card glass p-12 rounded-3xl border border-white/20 max-w-md w-full backdrop-blur-xl bg-zinc-900/95 relative overflow-hidden pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
            <h2 className="text-4xl font-bold mb-4 font-display">{COPY.contact.title}</h2>
            <p className="text-text-muted mb-10 text-lg">{COPY.contact.subtitle}</p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">{COPY.contact.address}</p>
                  <p className="text-text-muted">{COPY.contact.addressDetail}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">WhatsApp / Telefone</p>
                  <p className="text-text-muted">{COPY.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">E-mail</p>
                  <p className="text-text-muted">{COPY.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">Horário de Atendimento</p>
                  <p className="text-text-muted">Segunda a Sexta, das 08h às 20h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
