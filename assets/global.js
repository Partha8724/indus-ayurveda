/**
 * Indus Ayurveda - Global Shopify Theme Utilities
 * Contains global micro-interactions, accessibility helpers, and analytics.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✨ Indus Ayurveda theme loaded successfully. Optimized for Shopify Online Store 2.0.');
  
  // Accessibility: Handle outline focus for keyboard navigators
  document.body.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });
  
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });
});
