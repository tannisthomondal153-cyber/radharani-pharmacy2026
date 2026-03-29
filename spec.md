# Radharani Pharmacy

## Current State
New project — no existing source files.

## Requested Changes (Diff)

### Add
- Full React SPA for Radharani Pharmacy – Chemist & Druggist
- Glassmorphic premium UI with Framer Motion animations
- Public pages: Hero, Doctors Roster, Payments, Location, Medicine Order Form
- Admin panel at /admin with login protection (Tannistho / PopularPenny_077)
- Admin sections: Doctor Management (CRUD), Inquiries, Global Settings
- React Context API for global state (doctors, settings, auth) with localStorage persistence
- WhatsApp integration: https://wa.me/919831279222?text=Hello%20Radharani%20Pharmacy,%20I%20want%20to%20order%20medicines:%20
- UPI payments block: SBIBHIM.INSTANT92788270875563486@SBIPAY
- Google Maps embed at coordinates 22.698917, 88.442500
- 9 seeded doctors in context

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Set up React Router with public and admin routes
2. Create AppContext with doctors, settings, auth, inquiries state
3. Build public layout: Header, Hero, Doctors, Payments, Location, OrderForm, Footer
4. Build admin layout: Login, Dashboard with sidebar, Doctor CRUD, Inquiries table, Settings
5. Wire all WhatsApp links, UPI block, Google Maps iframe
6. Add Framer Motion animations to all sections
7. Ensure full mobile responsiveness
