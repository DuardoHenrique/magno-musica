import { useState, useEffect } from 'react';

export function useConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    setConsent(stored); // 'accepted' | 'rejected' | null
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setConsent('rejected');
  };

  return { consent, accept, reject, hasConsent: consent === 'accepted' };
}
