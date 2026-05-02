import { useState, useEffect } from 'react';
import { useConsent } from '@/hooks/useConsent';
import { Button } from './Button';
import { initGA4 } from '@/hooks/useAnalytics';

export function CookieBanner() {
  const { consent, accept, reject } = useConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no consent has been given yet
    if (consent === null) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  if (!isVisible || consent !== null) return null;

  const handleAccept = () => {
    accept();
    setIsVisible(false);
    initGA4(); // Initialize analytics immediately after acceptance
  };

  const handleReject = () => {
    reject();
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[110] animate-fadeUp">
      <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-white font-display font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-primary text-xl">🍪</span>
              Respeitamos sua privacidade
            </h4>
            <p className="text-text-muted text-sm leading-relaxed">
              Utilizamos cookies para entender como você interage com nosso site e oferecer uma experiência personalizada. Ao aceitar, você concorda com nossa política de privacidade.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1"
              onClick={handleAccept}
            >
              Aceitar
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={handleReject}
            >
              Apenas essenciais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
