# Premium Indian Wedding Invitation

## Experience
- Build a cinematic, mobile-first one-page invitation for **Aarav & Ananya** with ivory, maroon, blush, peach, and antique-gold styling.
- Open with an immersive couple portrait, ornamental frame, floating petals, invitation message, countdown, music control, and quick navigation.
- Use refined serif and handwritten typography, restrained glass effects, mandala/floral motifs, elegant dividers, and smooth section reveals.

## Interactive sections
- Add a pointer-driven scratch card that works with mouse and touch, reveals the wedding date, and celebrates completion.
- Add filterable function cards and a detailed schedule for Roka, Engagement, Haldi, Mehendi, Sangeet, Cocktail, Wedding, and Reception.
- Add a complete RSVP form with multi-event attendance, guest count, meal preference, message, validation, and animated confirmation.
- Add couple profiles, both families, relationship milestones, gallery lightbox, optional video, venue/location cards, travel and stay guidance, wishes, optional gifts, and a final invitation.
- Add music play/pause, WhatsApp RSVP, call, location, and back-to-top actions without autoplay.

## Reusable structure
- Keep names, dates, events, venues, profiles, family, gallery, travel, contacts, gifts, and theme choices in one central configuration object.
- Split the interface into focused reusable React components and use the existing design-system controls where appropriate.
- Keep submissions in the current browser session because no persistent guest service was requested.

## Technical details
- Use TanStack Start’s existing root route and a single page at `/`; no extra router is needed.
- Add Motion for React for staggered entrances, scroll reveals, timeline motion, and lightbox transitions.
- Implement the scratch surface with a canvas and unified pointer events; respect reduced-motion preferences.
- Use generated wedding imagery stored locally, lazy-load gallery media, and provide descriptive alternatives.
- Add page-specific title, description, Open Graph, Twitter card, canonical metadata, and favicon.
- Verify desktop and phone layouts, navigation, event filtering, scratch reveal, RSVP confirmation, gallery lightbox, and floating actions in the running preview.
