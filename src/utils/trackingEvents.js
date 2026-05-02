import { trackEvent } from '@/hooks/useAnalytics';

// ─── Intention Events ──────────────────────────────────────────
export const trackCTAClick = (location) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: location, // 'navbar' | 'hero' | 'philosophy' | 'cta_final'
  });
};

// ─── Conversion Events ─────────────────────────────────────────
export const trackModalOpen = (trigger) => {
  trackEvent('modal_open', {
    event_category: 'conversion',
    event_label: trigger,
  });
};

export const trackFormSubmit = (status) => {
  trackEvent('form_submit', {
    event_category: 'conversion',
    event_label: status, // 'success' | 'error'
  });
};

export const trackLeadCaptured = () => {
  // Main Conversion Event
  trackEvent('lead_captured', {
    event_category: 'conversion',
    event_label: 'contact_modal',
    value: 1,
  });
};

// ─── Engagement Events ─────────────────────────────────────────
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    non_interaction: true,
  });
};
