# GRAVE — Premium Cold Drinks (React + Vite)

A responsive multi-page beverage storefront concept with a cinematic editorial look.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Included
- Home, Drinks collection, product details, About, Journal and Contact pages
- Responsive navigation and shopping bag drawer
- Product search, category filters and price sorting
- Add-to-cart quantity controls
- Contact form validation and local success state
- Footer newsletter form with local confirmation state
- Framer Motion entrance and hover animations
- User-provided Sprite, Fanta Orange and Coca-Cola product photography in `public/images`

## Notes
- This is a frontend demo. The contact and newsletter forms show local confirmation only; connect an API/email provider for delivery.
- Checkout/payment is not connected to a payment gateway.
- Campa, Coca-Cola, Pepsi, Mountain Dew, Sprite, Fanta, Thums Up and 7UP are third-party trademarks. This independent concept catalogue is not affiliated with or endorsed by those brands. Some product photos are illustrative and sample prices are not live retail prices.


## V6 visual refresh
- Redesigned review wall with larger editorial headings, quote-led cards, stronger rating summary and author details.
- Larger, bolder typography across review cards, FAQ, footer and contact experience.
- Improved review form with a clearer heading, star picker and stronger submit action.
- Rebuilt contact page with a premium hero, contact detail cards, message form panel and responsive layout.
- Review submissions remain browser-local demo data; contact submissions remain local-only until an API/email service is connected.


## V7 video feature
- Added the supplied portrait drink-pouring MP4 as a cinematic homepage feature section.
- Video is hosted locally in `public/videos`, compressed to 1080×1920 H.264 with fast-start metadata, and works without an external video URL.
- It starts muted, loops, supports inline mobile playback and includes native playback controls plus a local poster image.


## V8 cinematic playback polish
- Removed native video controls and all visible playback time / download UI.
- Video now runs muted, autoplay, looping and inline, with no visible control chrome.
- Disabled picture-in-picture and right-click context menu on the video element, and added a gentle slow camera-drift zoom animation.
- Note: browsers may still expose media through developer tools or network inspection; frontend code cannot make a public video file impossible to download.


## V9 premium motion refresh
- Added a thin, spring-animated scroll progress indicator.
- Added scroll-triggered reveal animations for page sections, products, reviews, FAQs and contact details; newly mounted route content is observed too.
- Added smooth route transitions with a subtle fade, lift and blur.
- Added a slow floating motion to the hero product, ambient glow, animated scroll cue, and a moving brand marquee that pauses on hover.
- Added refined navigation underline, button, product image, review card and footer hover transitions.
- Kept the cinematic video clean: no native controls, no visible timer or download button, muted autoplay, inline looping, and a subtle camera drift.
- Uses the existing `framer-motion` dependency and lightweight CSS/IntersectionObserver effects; no extra animation package installation is required.
- Respects `prefers-reduced-motion` and keeps the layout responsive.


## V10 — GRAVE Club accounts and Cola Classics visual
- Added responsive sign-up and sign-in pages with password confirmation, field validation, show/hide password and helpful error states.
- Added a member account page with initials avatar, profile details, editable name/phone/city, member-since date, sign-out and an empty order-history state.
- Added a header account/sign-in shortcut and footer account links.
- Added the user's uploaded Coca-Cola bottle artwork as a locally hosted Cola Classics editorial feature on the homepage and as the auth-page visual.
- Frontend demo authentication stores profile/session data in this browser only and uses salted PBKDF2 password hashing via Web Crypto. This is not production authentication: connect Django REST Framework, server-side password hashing, secure HttpOnly cookies/tokens, email verification and password reset before accepting real customer accounts or orders.
- Order history is a designed empty state; no real orders are recorded until checkout and backend APIs are connected.
