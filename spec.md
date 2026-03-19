# VEGIANO

## Current State
Full-stack VEGIANO website with hero, about, products, why-us, order form, delivery, testimonials, contact, and footer sections. Cart drawer via Sheet component, floating WhatsApp button, fade-in animations, green/white/beige theme.

## Requested Changes (Diff)

### Add
- Sticky top announcement bar: "🚚 Same Day Delivery | 🥬 Fresh from Farms | 📞 Order on WhatsApp"
- Trust badges below hero CTA: "✔ 50+ Farmers | ✔ 100% Fresh | ✔ No Middleman"
- "Best Seller" / "Popular" tags on tomato and spinach product cards
- "Limited Stock" / "Fresh Today" badge variants on product cards
- Quantity selector (+ / -) on product cards before Add to Cart
- "⚡ Takes less than 30 seconds to order" line above order form
- Improved order button: "🚀 Place Order Instantly on WhatsApp"
- Auto-formatted WhatsApp message: Name / Address / Items
- Sticky mobile CTA button at bottom for order/WhatsApp
- Trust & social proof section above testimonials: "Trusted by 500+ Families in Kolkata", animated counters (Orders: 1200+, Rating: 4.8⭐)
- Delivery section: urgency line "Limited delivery slots available each day", "Order before 12 PM → Same Day Delivery" highlight
- Contact: bigger WhatsApp card, clickable WhatsApp button, "Instant Reply within minutes"
- Footer: "Direct from Farmers | No Storage | No Chemicals" + mini CTA to WhatsApp
- 5-second popup: "Get fresh vegetables today 🥬 – Order now on WhatsApp"
- Cart: UPI payment option (QR code + UPI ID), Cash on Delivery option, order confirmation screen with "✅ Order Placed Successfully!", "Send Order to WhatsApp" button
- Trust elements in cart/checkout: "Secure Payment", "Cash on Delivery Available", "Fresh Guarantee"

### Modify
- Hero CTA primary button: "Order Now on WhatsApp" (was "Order Now")
- Product cards: add zoom on image hover (already exists), add qty selector before Add to Cart
- WhatsApp floating button: keep pulse animation, shift to bottom-right
- Order form WhatsApp message format: structured Name/Address/Items
- Contact section: WhatsApp card larger/highlighted vs others
- Color palette: deepen to #1B5E20, more premium shadows, increased section spacing

### Remove
- Nothing removed

## Implementation Plan
1. Update index.css: deeper green tokens, premium shadow classes, counter animation keyframes, popup animation
2. Update App.tsx:
   - Add sticky top bar component above navbar
   - Update hero: new CTA wording, trust badges
   - Update ProductCard: qty selector state, Best Seller/Popular/Fresh Today/Limited Stock badges
   - Add SocialProof section (counters with animation) above testimonials
   - Update order section: urgency text, structured WhatsApp message
   - Update delivery section: urgency line, highlighted "Order before 12 PM" card
   - Update contact section: WhatsApp card larger/featured
   - Update footer: tagline + mini CTA
   - Add 5-second popup component
   - Add sticky mobile WhatsApp CTA button
   - Update cart/checkout: add payment method selection (UPI/COD), QR code placeholder, order confirmation screen
