import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils/cn';
import { trackModalOpen, trackFormSubmit, trackLeadCaptured } from '@/utils/trackingEvents';

const INSTRUMENTS = [
  'Violão',
  'Teclado',
  'Violino',
  'Canto',
  'Contrabaixo',
  'Flauta',
  'Trompete',
  'Acordeon',
  'Violoncelo'
];

export function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instrument, setInstrument] = useState('');
  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      
      if (e.key === 'Tab' && isOpen) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return;
        
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      // iOS Scroll Lock fix
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      window.addEventListener('keydown', handleKeyDown);
      // Track modal open
      trackModalOpen('contact_form');
      // Focus first input
      setTimeout(() => {
        document.getElementById('name')?.focus();
      }, 100);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

      window.removeEventListener('keydown', handleKeyDown);
      // Reset state when closing
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setWhatsapp('');
        setInstrument('');
        setErrors({});
      }, 300);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, '');
    setName(value);
    if (value.trim()) setErrors((prev) => ({ ...prev, name: null }));
  };

  const handleWhatsappChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    setWhatsapp(value);
    if (value.length === 15) setErrors((prev) => ({ ...prev, whatsapp: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!whatsapp) newErrors.whatsapp = 'WhatsApp é obrigatório';
    if (!instrument) newErrors.instrument = 'Selecione um instrumento';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackFormSubmit('error');
      return;
    }

    // Success flow
    setSubmitted(true);
    trackFormSubmit('success');
    trackLeadCaptured();
    
    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
      const message = encodeURIComponent(`Olá Professor Magno! Meu nome é ${name}. Tenho interesse em aulas de ${instrument}.`);
      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
      onClose();
      setSubmitted(false);
      setName('');
      setWhatsapp('');
      setInstrument('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-lg bg-surface-elevated border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300"
      >
        <button 
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-4 top-4 text-text-muted hover:text-primary transition-colors focus-visible:ring-offset-surface-elevated"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="text-center py-12 animate-zoomIn" role="status" aria-live="polite">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-primary/20 text-primary rounded-full flex items-center justify-center border border-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-zoomIn [animation-delay:200ms]">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <h3 id="modal-title" className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">
              Obrigado, <span className="text-primary">{name.split(' ')[0]}</span>!
            </h3>
            <p className="text-text-muted text-lg max-w-sm mx-auto leading-relaxed">
              Te retornaremos em breve.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h3 id="modal-title" className="text-3xl font-display font-bold text-white mb-2">Dar o primeiro passo</h3>
              <p className="text-text-muted">Preencha abaixo para falarmos no WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-muted">Seu Nome</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Digite seu nome"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "w-full bg-background border rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.name ? "border-red-500" : "border-white/10"
                  )}
                />
                {errors.name && <p id="name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="whatsapp" className="text-sm font-medium text-text-muted">WhatsApp</label>
                <input
                  id="whatsapp"
                  type="text"
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  placeholder="(99) 99999-9999"
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                  className={cn(
                    "w-full bg-background border rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.whatsapp ? "border-red-500" : "border-white/10"
                  )}
                />
                {errors.whatsapp && <p id="whatsapp-error" role="alert" className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="instrument" className="text-sm font-medium text-text-muted">Qual instrumento deseja aprender?</label>
                <div className="relative">
                  <select
                    id="instrument"
                    value={instrument}
                    onChange={(e) => {
                      setInstrument(e.target.value);
                      if (e.target.value) setErrors((prev) => ({ ...prev, instrument: null }));
                    }}
                    aria-invalid={!!errors.instrument}
                    aria-describedby={errors.instrument ? "instrument-error" : undefined}
                    className={cn(
                      "w-full bg-background border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none",
                      errors.instrument ? "border-red-500" : "border-white/10"
                    )}
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    <option value="" disabled className="text-white/20">Selecione uma opção</option>
                    {INSTRUMENTS.map((inst) => (
                      <option key={inst} value={inst} className="bg-surface-elevated">{inst}</option>
                    ))}
                  </select>
                </div>
                {errors.instrument && <p id="instrument-error" role="alert" className="text-red-500 text-xs mt-1">{errors.instrument}</p>}
              </div>

              <Button type="submit" className="w-full h-12 text-lg mt-4">
                Enviar Informações
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
