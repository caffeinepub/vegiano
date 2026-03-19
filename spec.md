# VEGIANO - Fresh Vegetable Delivery Website

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full multi-section marketing website for VEGIANO fresh vegetable delivery brand
- Hero section with farm background image, headline, subtext, and CTA buttons
- About Us section with brand story emphasizing direct-from-farm sourcing
- Products section with 6 vegetable cards (image, name, price, Add to Cart button)
- Cart system: floating cart icon with item count, add/remove items, quantity management
- Why Choose Us section with 4 benefit cards
- Order section with form (name, phone, address, selected items) that opens WhatsApp with pre-filled message to 8293692735
- Delivery Information section with areas served and delivery times
- Testimonials section with 3 dummy customer reviews
- Contact section with phone, WhatsApp button, and Kolkata location
- Footer with logo, quick links, social icons
- Floating WhatsApp chat button
- Smooth scrolling navigation
- Fully responsive / mobile-friendly layout

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Build single-page React app with all sections in App.tsx
2. Cart state managed via React useState (items array)
3. Order form sends WhatsApp deep link with pre-filled message containing order details
4. Floating WhatsApp button always visible bottom-right
5. Smooth scroll via CSS scroll-behavior and anchor links
6. Responsive layout with Tailwind CSS breakpoints
7. Green/white/light-brown color palette via Tailwind custom classes
8. Product images sourced from generated assets
