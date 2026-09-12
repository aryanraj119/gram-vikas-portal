# Premium Gram Panchayat Digital Platform

## Goal
Rebuild the blank project as a complete, multilingual-ready civic platform for a Maharashtra Gram Panchayat. The experience will use the specified navy, off-white, and emerald system; Plus Jakarta Sans; authentic rural-Maharashtra imagery; accessible controls; and clear demo-data labels wherever live integrations are unavailable.

## Build scope

### 1. Foundation and shared experience
- Create the semantic design system, typography, spacing, 12px cards, accessible focus states, reduced-motion behavior, and responsive breakpoints.
- Build a shared sticky header, language selector, global search, accessibility tools, mobile quick actions, comprehensive footer, and consistent page layout.
- Model all demo content as reusable typed data so a future admin system can replace it without redesigning pages.

### 2. Homepage in the required order
- Build the photographic village welcome, prominent categorized search, village statistics, alerts, citizen services, news, progress, projects, schemes, infrastructure, culture, farmer/employment, education/youth, environment, grievances, achievements, community invitation, and footer.
- Add the requested weather, Panchayat message, welcome video, progress indicators, and citizen-first shortcuts.
- Keep important actions reachable in one or two taps, especially certificates, tax, complaints, schemes, forms, meetings, emergency contacts, and project progress.

### 3. Complete route structure
Create dedicated, shareable pages with unique metadata for:
- About and leadership
- Projects and Sankalp tracker
- Schemes and beneficiary information
- Announcements, circulars, downloads, and calendar
- Infrastructure and village maps
- Finance and budget transparency
- Citizen services and tax payment
- Culture, tourism, heritage, gallery, and village voices
- Employment, skills, talent, women’s empowerment, and farmer support
- Education and youth
- Grievances and feedback
- Environment and Adopt a Tree
- Agriculture and livelihood
- “My Village, My Progress” dashboard

### 4. Rich interactions
- Implement client-side search, filters, autocomplete, calendars, galleries/lightboxes, before/after image comparison, scheme filtering, ward comparison, document filtering, and complaint timeline demonstrations.
- Build map-style interfaces with accessible markers and filters, clearly presented as demo coverage/base-map data until a mapping/data service is connected.
- Use lightweight, readable charts and progress graphics for budgets, impact, grievances, sustainability, schemes, and ward performance.
- Add polished empty, loading, success, validation, and unavailable-data states.

### 5. Content and visual assets
- Generate a cohesive set of authentic rural Maharashtra visuals for the village, infrastructure, agriculture, culture, education, environment, and community stories.
- Use realistic but explicitly labeled sample statistics, people, contacts, budgets, and records; avoid inventing them as official facts.
- Structure English, Marathi, and Hindi strings for switching without layout changes; translate primary navigation and high-priority citizen actions in this first implementation.

### 6. Quality and verification
- Verify keyboard use, labels, tap targets, contrast, readable type, mobile menus, and reduced motion.
- Test key workflows at desktop and mobile sizes: search, service discovery, scheme filtering, document download states, complaint tracking, gallery, maps, and dashboards.
- Confirm every route renders, navigation works, metadata is unique, and no placeholder page remains.

## Technical approach
- TanStack Start + React + TypeScript + Tailwind CSS v4.
- Reusable domain components and typed content collections rather than page-level hardcoding.
- Lucide for one consistent icon family; CSS/SVG-based accessible charts where practical.
- Frontend-only demo workflows for this phase. Live weather, GIS, payments, authentication, complaint submission, file storage, and admin publishing will remain explicit integration points until services and official data are connected.

## Delivery notes
- The first build will preserve every requested concept through dedicated pages or clearly linked modules, while keeping the homepage focused on the specified overview flow.
- Any sample phone numbers, people, amounts, schedules, beneficiaries, and development figures will be marked as demonstration content and must be replaced with verified Panchayat data before publication.
