# RP Hall website: requirements checklist

Source: `RP_Website_.pdf` (24 pages, shared in chat; not yet saved to `docs/rph-requirements.pdf`).
Text in quotes is copied verbatim from the PDF.

Status key: `[x]` done (files listed), `[~]` built, waiting on content (see TODO), `[-]` skipped (reason given).

How content was handled:
- PDF body text is used verbatim.
- UI copy visible in the reference screenshots (headings, taglines, button labels) is used as shown.
- Data in the screenshots (figures, notices, sample projects and funding needs) is used as sample data. List entries show a "Sample" tag; figures are flagged under Q3.
- Claims about real people or companies in the mockups (alumni names, job postings, an award) were left out. Where the PDF itself uses placeholder templates ("Alumnus Name", "YYYY"), those templates are used.

## A. Global design

> Round 8 replaced the palette and fonts (items 3 to 5) with the editorial look; see R8-1 and R8-2.

1. [~] Logo from page 1. Hand-traced SVG, close to the original; replace with the official file (Q2). `src/components/Logo.jsx`, `src/assets/rp-logo.svg`, `public/favicon.svg`
2. [x] Logo is the Home link, no "Home" text in the navbar. `src/components/Navbar.jsx`
3. [x] Palette tokens (Cream `#FAF3E6`, Card ivory `#FFFAF1`, Stats band `#F3E6CF`, Maroon `#6B1523`, Deep maroon `#470D18`, Gold `#B8892B`, Light gold `#F3D58A`). `src/styles/tokens.css`
4. [x] Accent ramp sampled from the page-2 swatches (`--ember`, `--brick`, `--flame`, `--orange`, `--amber`); `--flame` is the donate colour. `src/styles/tokens.css`
5. [x] Fonts: Cinzel for h1–h3, Source Sans 3 for body and UI, Tiro Devanagari Hindi for the motto. Defined once, same on every page. `index.html`, `src/styles/tokens.css`, `src/styles/base.css`
6. [~] Sample photos from Wikimedia Commons (credits in `public/images/credits.json`). Only `rp-hall.jpg` shows the hall. `public/images/`, `src/data/images.js`
7. [x] Shared footer: logo, links, social icons, copyright, motto. Social URLs missing (Q19). `src/components/Footer.jsx`, `src/data/site.js`
8. [x] Responsive at 375px (also checked at 320px) and desktop; no horizontal overflow on any page. All CSS files.

## B. Structure, roles and auth

9. [x] Public navbar: logo, "Hall council", "Our legacy", "Gallery", "Innovation" in section-1 order. `src/auth/roles.js`
10. [x] Login icon at the right of the navbar; account menu with log out once logged in. `src/components/Navbar.jsx`, `src/pages/Login.jsx`
11. [x] One `role` field (`student`, `alumni`, `hall_council`, `warden`) and one permissions map. `src/auth/roles.js`
12. [x] Route guards on every role page; logged-out visitors go to login, wrong role sees "No access". Checked via navbar and direct URLs. `src/auth/RequireAccess.jsx`, `src/App.jsx`, `src/pages/Forbidden.jsx`
13. [x] Student: "Notice Board / Announcements (home page)". `src/features/home/NoticeBoard.jsx`, `src/pages/Home.jsx`
14. [x] Student: "Register a Complaint (New Complaint Tab in navbar)". `src/pages/NewComplaint.jsx`
15. [x] Student: "Projects / Startups (innovation tab)". `src/pages/innovation/Innovation.jsx`
16. [~] Student: "Hall Events / Calendar (home page)". Calendar works; no events supplied. `src/features/home/EventsCalendar.jsx`, `src/data/home.js`
17. [x] Student: "post a project" button on Innovation and a post form. `src/pages/innovation/PostProject.jsx`
18. [x] Hall Council: "View Active Complaints". `src/pages/Complaints.jsx`
19. [x] Hall Council: "View complaints by category". `src/pages/Complaints.jsx`
20. [x] Hall Council: "Identify most popular / high-frequency complaint categories" (sorted bar list, top one marked). `src/pages/Complaints.jsx`
21. [x] Alumni: "Donations / Funding (New Tab) - includes a leaderboard for best donar." `src/pages/Funding.jsx`
22. [x] Alumni: Recruitment tab; posts appear in Innovation. `src/pages/Recruitment.jsx`
23. [x] Alumni keep all public pages plus Funding and Recruitment. `src/auth/roles.js`
24. [x] Warden: complaints same as hall council, in the Complaints tab. `src/auth/roles.js`
25. [x] Warden: "Funding Requests" tab listing alumni offers. `src/pages/FundingRequests.jsx`
26. [x] Landing after login: every role goes to Home (round 3). `src/auth/roles.js`, `src/pages/Login.jsx`
27. [x] Test accounts only bundled when `VITE_ENABLE_TEST_ACCOUNTS=true`; verified the production `dist/` has no credentials. `vite.config.js`, `src/auth/testAccounts.js`, `src/auth/noAccounts.js`, `.env.development`, `.env.example`, `README.md`

## C. Home page

28. [x] Header with logo, "R.P. HALL OF RESIDENCE", "IIT KHARAGPUR". `src/components/Navbar.jsx`
29. [x] Hero with hall photo, "Excellence and Efficiency", "(श्रेष्ठता एवं दक्षता)", intro line and "Explore Our Hall" (links to Our Legacy). `src/pages/Home.jsx`
30. [~] Stats band with screenshot figures (Q3). `src/data/home.js`
31. [~] "R.P. Medal Tally" with screenshot figures (Q3); "View Detailed History" links to the GC section of Our Legacy. `src/pages/Home.jsx`
32. [~] Notice Board with filters; four sample notices from the screenshot. Student only (Q8). `src/features/home/NoticeBoard.jsx`
33. [~] Hall Events calendar, student only. No events supplied. `src/features/home/EventsCalendar.jsx`
34. [~] "Reflections from the Fraternity": Warden and Hall President cards. Messages and the warden's name missing (Q4). Carousel arrows dropped because both cards fit on screen. `src/pages/Home.jsx`
35. [~] "Notable Alumni" uses the PDF placeholder template until real profiles arrive (Q5). `src/pages/Home.jsx`, `src/data/alumni.js`

## D. Hall Council page

36. [x] Large bold "Hall Council" title. `src/pages/HallCouncil.jsx`
37. [~] Year pills: "Current Council", "2025–26", "2024–25", "2023–24", "Earlier Councils". Past councils show a pending note (Q16). `src/data/council.js`
38. [~] Card: photo (initials until photos arrive), name, designation, department (missing, Q16), phone. 10-digit numbers are tap-to-call. `src/pages/HallCouncil.jsx`
39. [x] Top row: two larger cards, Hall President and Second Senate Member. `src/pages/HallCouncil.jsx`, `src/pages/HallCouncil.css`
40. [x] Then three cards per row with all General Secretaries in PDF order. `src/pages/HallCouncil.css`
41. [x] All 15 members, names and numbers verbatim, in order. "GS" shown as "General Secretary, …". Three numbers have the wrong length in the source (Q15). `src/data/council.js`

## E. Gallery

42. [x] Header: "GALLERY" label, "Memories of RP Hall", tagline verbatim. `src/pages/gallery/GalleryLanding.jsx`
43. [x] Filter pills; picking one brings that album to the centre (Q11: uses the workflow categories). `src/pages/gallery/GalleryLanding.jsx`
44. [x] 3D album carousel with neighbours peeking and arrows. `src/components/Carousel3D.jsx`, `src/styles/gallery.css`
45. [x] Card: cover, title, theme line ("Light • Togetherness • RP Hall" for Illumination), "Explore album →" on the active card. `src/data/gallery.js`
46. [x] Dot pagination. `src/components/Carousel3D.jsx`
47. [x] Thumbnail strip ("Recent Highlights") that opens the lightbox. `src/pages/gallery/GalleryLanding.jsx`
48. [~] Illumination: photos by year. Sample photos. `src/pages/gallery/GalleryCategory.jsx`, `src/pages/gallery/YearPhotos.jsx`
49. [~] Rangoli: photos by year. Sample photos.
50. [~] General Championship: sport list, then each sport's photos with the year timeline (Q12). `src/pages/gallery/GallerySport.jsx`
51. [~] Alumni meet: photos by year. No photos supplied.
52. [~] Other hall activities: events per year, each event page with its photos and the year timeline. Events: Janmashtami, Sweet Eating Competition, Cleaning Drive. "Malaviya Jayanti" and "Malaviya Vatika Inauguration" from the screenshot were left out; they look like another hall's events. `src/pages/gallery/GalleryEvent.jsx`
53. [x] Year timeline uses the same pills as the Hall Council page. `src/components/Pills.jsx`
54. [x] Lightbox with counter, prev/next, keyboard and thumbnail strip. `src/components/Lightbox.jsx`
55. [x] Breadcrumbs on category, sport and event pages. `src/components/Breadcrumbs.jsx`

## F. Our Legacy

56. [x] Order: Hero, History & Memories, Alumni Achievements, GC Achievements & Winning History, Footer. `src/pages/Legacy.jsx`
57. [x] Hero with photos moving right to left continuously, "OUR LEGACY", short intro. Pauses under reduced motion. `src/pages/Legacy.jsx`, `src/pages/Legacy.css`
58. [~] "Moments that made us." carousel covering all nine topics from the PDF; each opens a card with a short description and a gallery link. Dated milestones and winning designs missing (Q6). `src/data/legacy.js`
59. [~] Alumni profile card with every field from the PDF; placeholder template until profiles arrive (Q5). `src/features/AlumniCard.jsx`
60. [x] Era selector on a timeline line ("All eras", "1970s–1990s", "2000s–2010s", "2011–Present"). `src/pages/Legacy.jsx`
61. [~] Zig-zag GC timeline; each year opens a modal with result, position, podiums, achievements, teams and highlights. No GC history supplied, so nodes show "YYYY" as in the PDF (Q6, Q13). `src/pages/Legacy.jsx`
62. [x] Modal lists podium finishes only; each event name links to its gallery page, plus a link to the GC gallery. `src/pages/Legacy.jsx`
63. [x] Page-17 layout kept, including the "Winning is a tradition." band (shows the medal tally). The prototype's fictional alumni and GC results were not carried over. `src/pages/Legacy.jsx`

## G. Innovation

64. [x] Public page. `src/App.jsx`
65. [x] Nobody can post before login. Students get "Post a project"; alumni get "Post an opportunity" (goes to Recruitment) (Q10). `src/pages/innovation/Innovation.jsx`
66. [~] Statistics band: "100+ Projects" from the PDF, the rest from the screenshot (Q3). Static numbers. `src/data/innovation.js`
67. [x] "What are RPians building?" with all five areas; each card filters Featured Projects. `src/pages/innovation/Innovation.jsx`
68. [x] "Contribute to Projects": each project shows description, people sought, skills, number needed, role, type, requirements and how to apply. Sample projects plus student posts. `src/features/innovation/OngoingProjectModal.jsx`
69. [x] Alumni Recruitment posts appear under "Explore Opportunities" with search and type filter. `src/pages/innovation/Innovation.jsx`, `src/features/innovation/OpportunityCard.jsx`
70. [~] Featured Projects with a detail page per project (name, description, team, timeline, aim, details, results, links, media). Sample projects; missing fields show "To be added". `src/pages/innovation/ProjectDetail.jsx`
71. [~] Final "Have something worth building?" section. Students go to the post form; everyone else goes to the external form once its URL is set, otherwise to login (Q10). `src/data/innovation.js`

## H. Alumni: Funding tab

72. [~] 4.1 Current Work & Initiatives shown first (sample initiatives). Earlier alumni-supported projects missing. `src/pages/Funding.jsx`, `src/data/funding.js`
73. [~] 4.2 Contribute / Fund Innovations: cards with a details view listing every field from the PDF. Sample needs; most fields "To be added". `src/pages/Funding.jsx`
74. [x] 4.3 all seven ways to contribute, verbatim; each opens an offer form. `src/data/funding.js`
75. [x] Donate button always visible: highlighted in the navbar on every alumni page, in the Funding header, and docked to the corner of the Funding page. `src/components/Navbar.jsx`, `src/pages/Funding.css`
76. [x] Donor leaderboard built from recorded pledges, opt-in per pledge. No payment gateway (Q7). `src/pages/Funding.jsx`
77. [x] Pledges and offers are stored and shown to the warden. `src/features/funding/SupportModal.jsx`, `src/pages/FundingRequests.jsx`

## I. Alumni: Recruitment tab

78. [x] Post form: company, role, type, location, deadline, skills, description, how to apply. `src/pages/Recruitment.jsx`
79. [x] Listing with search, type filter, "My posts only", remove for own posts, apply link. `src/pages/Recruitment.jsx`
80. [x] Posts appear in Innovation > Explore Opportunities. Checked logged out too. `src/lib/store.js`

## J. Complaints

81. [x] Student form (category, room, subject, details) and "Your complaints" with status. Categories proposed (Q14). `src/pages/NewComplaint.jsx`, `src/data/complaints.js`
82. [x] Hall Council and Warden dashboard: active/resolved/all, category filter, category frequency chart, status updates. `src/pages/Complaints.jsx`

## Verification (9 Oct 2026)

- `npm run build` and `npm run lint` (oxlint): no errors, no warnings.
- Headless Chrome walkthrough of all four accounts: correct landing page and navbar each time; every role page opened by direct URL with each other role shows "No access"; logged-out visitors are sent to login with a return link. Complaint filed as student appears for hall council and warden; project posted by student shows on Innovation; alumni pledge and mentorship offer show on warden's Funding Requests and the leaderboard; alumni job post shows on Innovation for logged-out visitors. Wrong password shows an error.
- No horizontal overflow at 375px or 320px on any page; desktop at 1366px.

## Round 2 (requested in chat, 11 Oct 2026)

R2-1. [x] Fill left and right margins on desktop: container widened from 1180px to 1840px, gutter scales with the screen. `src/styles/tokens.css`
R2-2. [x] Hall council can file complaints, post projects on Innovation, and see Funding Requests (same page as the warden). Permissions map only. `src/auth/roles.js`
R2-3. [x] Home redesigned after the supplied mockup: photo-left cards for the Warden and Hall President messages, photo-on-top Notable Alumni cards in an auto-advancing rail, medal icons instead of photos. `src/pages/Home.jsx`, `src/pages/Home.css`, `src/components/ProfileFeature.jsx`, `src/components/PortraitCard.jsx`, `src/components/Portrait.jsx`, `src/components/Rail.jsx`
R2-4. [x] Our Legacy, GC Achievements & Winning History: replaced the zig-zag with the scroll-drawn line from the supplied Responsibility.jsx (alternating cards, glowing line drawn through corner markers as you scroll, cards appear as the line reaches them). Gold on maroon instead of red on black, no emoji bursts. `src/features/legacy/GcTimeline.jsx`, `src/pages/Legacy.css`
R2-5. [x] Name blocks use the mockup styles: Hall President and Second Senate Member use the Warden-style card, all general secretaries and alumni use the Notable Alumni card. `src/pages/HallCouncil.jsx`, `src/features/AlumniCard.jsx`
R2-6. [x] "Moments that made us" and the Gallery albums: auto-advance every 4 seconds, no arrow buttons, cube-style 3D fold between cards (from the supplied screenshot). Swipe, horizontal trackpad scroll, arrow keys and dots also move it; pauses on hover or focus; dot shows time to next slide. `src/components/CubeCarousel.jsx`, `src/styles/components.css`
R2-7. [x] Milestones block removed from Our Legacy. `src/pages/Legacy.jsx`, `src/data/legacy.js`
R2-8. [~] Alumni Achievements: 12 profile slots (four per era) in a full-width auto-scrolling rail with era filter and count. Still the PDF placeholder template until real profiles arrive (Q5). `src/pages/Legacy.jsx`, `src/data/alumni.js`
R2-9. [x] Gallery Recent Highlights: full-width mosaic with large tiles, captions, zoom on hover and the lightbox. `src/pages/gallery/GalleryLanding.jsx`, `src/styles/gallery.css`, `src/data/gallery.js`
R2-10. [x] Innovation: same moving film-strip hero as Our Legacy and the same height; highlighted "Post your project" strip above "What are RPians building?" (log-in prompt for visitors, opportunity prompt for alumni). `src/pages/innovation/Innovation.jsx`, `src/components/FilmHero.jsx`
R2-11. [x] New Complaint: roll number field (format checked, e.g. 22CS10001); every field is required. Roll number shown on the complaints dashboard. `src/pages/NewComplaint.jsx`, `src/pages/Complaints.jsx`
R2-12. [x] Motion across the site: page fade on route change, scroll reveals, staggered hero text, slow zoom on hero photos, hover lift on cards. All of it is switched off under the system "reduce motion" setting. `src/styles/motion.css`, `src/components/Reveal.jsx`, `src/components/Layout.jsx`
R2-13. [x] Login: full-height split layout with the hall photo, logo and motto; footer now sits below the fold; icon fields, show/hide password, error shake. `src/pages/Login.jsx`, `src/pages/Login.css`, `src/styles/layout.css`

Verification: build and lint clean; all four roles re-walked (hall council files a complaint, posts a project, opens Funding Requests, is still blocked from Funding; warden cannot file complaints; alumni cannot open Funding Requests); roll number rejects "abc" and missing fields; no horizontal overflow at 320px, 375px, 1366px and 1920px.

## Round 3 (requested in chat, 11 Oct 2026)

R3-1. [x] Logged-in Home: Notice Board and Hall Events now sit above the Medal Tally. `src/pages/Home.jsx`
R3-2. [x] Notice Board was cut off on phones (grid column grew to fit the scrolling filter row). Fixed, and every page was re-audited for elements running past the screen edge at 320, 375, 440, 768 and 1024px for all roles. `src/pages/Home.css`
R3-3. [x] Gallery and "Moments that made us" carousel: auto-advance always on (every 4 s), page scroll moves it one card per 240px while it is on screen, side buttons on desktop, swipe on mobile. The side walls no longer overlap the heading or spill outside the page. `src/components/CubeCarousel.jsx`, `src/styles/components.css`
R3-4. [x] Featured Projects narrowed to 1280px, centred, with a shorter lead image. `src/pages/innovation/Innovation.css`
R3-5. [x] Hall council files complaints from a toggle on the Complaints page ("All complaints" / "File a complaint"); the separate New Complaint tab is hidden for them. Students keep their tab. `src/auth/roles.js`, `src/pages/Complaints.jsx`, `src/features/complaints/ComplaintForm.jsx`
R3-6. [x] Explore Opportunities on Innovation is only shown to logged-in users. `src/auth/roles.js`, `src/pages/innovation/Innovation.jsx`
R3-7. [x] GC timeline spans the full page width, and the line now always completes by the bottom of the page (it used to stop short when the page ended first). `src/pages/Legacy.css`, `src/features/legacy/GcTimeline.jsx`
R3-8. [x] Recent Highlights photo viewer was cut off under the navbar because the page-transition wrapper trapped it. Modals and the viewer now render at the top level of the page; the photo fits the screen with a fade between photos. `src/components/Lightbox.jsx`, `src/components/Modal.jsx`, `src/styles/layout.css`, `src/styles/gallery.css`
R3-9. [x] "Have something worth building?" removed for alumni and warden (still shown to visitors, students and hall council). `src/pages/innovation/Innovation.jsx`
R3-10. [x] Funding: "Your Funding Status" section at the top (total pledged, received, requests sent, offers, and each request with its status). The warden or hall council sets the status on Funding Requests: Request sent, In discussion, Received, Closed. `src/pages/Funding.jsx`, `src/pages/FundingRequests.jsx`, `src/data/funding.js`
R3-11. [x] Recruitment: application deadline is required and cannot be in the past, shown on every opening, and openings are deleted automatically once the deadline day has passed. `src/pages/Recruitment.jsx`, `src/features/innovation/useOpportunities.js`, `src/features/innovation/OpportunityCard.jsx`
R3-12. [x] Every login lands on Home; the old return-to-previous-page behaviour (which could land on "No access") is gone. `src/pages/Login.jsx`, `src/auth/RequireAccess.jsx`

Verification: build and lint clean; scripted run through all four roles covering each item above (landing page, nav, complaint toggle, opportunity visibility and expiry, deadline validation, pledge status flow from alumni to warden and back); no overflow at 320 to 1024px; GC line fully drawn at page bottom at 1920, 1366 and 375px.

## Round 4: glass look (requested in chat, 11 Oct 2026)

Replaces the original "no glassmorphism" rule at the user's request.

R4-1. [x] Glass theme layer: warm textured ground (light pools plus fine grain), frosted translucent cards, pills, inputs, buttons with a glossy edge, frosted dialogs. `src/styles/glass.css`
R4-2. [x] Frosted sticky header that the page scrolls under. `src/styles/glass.css`
R4-3. [x] Frosted text panels over hero photos on Home, Our Legacy, Innovation and every inner-page header; glass stats strips over the hero edge. `src/pages/Home.jsx`, `src/components/FilmHero.jsx`, `src/components/PageHero.jsx`, `src/styles/components.css`
R4-4. [x] Glass captions on the carousel, highlights mosaic and album banners; glass Medal Tally, tradition cards and GC timeline cards; glass photo viewer controls. `src/pages/Home.css`, `src/pages/Legacy.css`, `src/styles/gallery.css`, `src/styles/components.css`
R4-5. [x] Login: hall photo fills the page, brand and form on frosted panels. `src/pages/Login.jsx`, `src/pages/Login.css`
R4-6. [x] Phones: app-style frosted tab bar (Home, Legacy, Gallery, Innovation, Menu) as in the reference image; Menu opens a glass sheet with the role's other pages, Donate for alumni, and log in/out. `src/components/BottomNav.jsx`, `src/components/Layout.jsx`, `src/styles/glass.css`

Verification: build and lint clean; overflow audit clean at 320 to 768px for all roles; role walkthrough unchanged.

## Round 5 (requested in chat, 11 Oct 2026)

R5-1. [x] Events calendar toned down: flat dark panel, no glow or grid pattern, plain gold date, today shown with a thin outline. `src/pages/Home.css`
R5-2. [x] Home hero fills the screen below the navbar on desktop, with a scroll cue. On phones the whole photo is shown uncropped at the top and fades into the text below. `src/pages/Home.jsx`, `src/pages/Home.css`
R5-3. [x] Frosted boxes removed from everything that sits on a photo (hero text, page headers, carousel and highlight captions, album banners, stats strips, login). Text is back on a dark fade over the image. The navbar and phone tab bar keep their blur. Login is back to the split layout. `src/styles/components.css`, `src/styles/gallery.css`, `src/styles/glass.css`, `src/pages/Login.*`, `src/pages/Home.css`, `src/pages/innovation/Innovation.css`
R5-4. [x] Profile page at /profile for every role: photo upload (resized in the browser), basic information by role, hall details, contact, activity summary, edit form with validation. Linked from the account menu and the phone menu; the account button shows the photo. `src/pages/Profile.*`, `src/data/profile.js`, `src/features/profile/useProfile.js`, `src/components/Navbar.jsx`, `src/components/BottomNav.jsx`
R5-5. [x] Navbar hover: pill highlight, gold underline drawn from the centre, small lift; logo tilt on hover; account button ring. A load-in animation for the links was tried and dropped because Chrome sometimes failed to repaint the links under the frosted bar. `src/styles/layout.css`
R5-6. [x] README merge conflict from the GitHub merge resolved (kept the project README).

Verification: build and lint clean; profile flow tested (photo upload, invalid roll number rejected, save, photo in navbar, logged-out redirect); no overflow at 320, 375 and 440px for any role.

## Round 6: new palette and motion (requested in chat, 11 Oct 2026)

R6-1. [x] Whole site moved to the supplied palette: Vibrant Blue #2D8CFF (buttons, active pills, accents, links on dark), Navy #0A0F2C (headings, text, dark sections, footer), White (cards), Light Gray #F0F1F3 (page ground). Every hard-coded maroon, gold and cream value was remapped, not only the tokens. Medal gold/silver/bronze, the green "resolved" colour and the red error colour were kept for meaning. `src/styles/*.css`, `src/pages/**/*.css`, `public/favicon.svg`
R6-2. [x] Motion: light sweep across buttons on hover, pulse on Donate, slow blue glows behind pages, drifting dot grid on hero photos (as in the palette artwork), stat figures with "+" count up when shown, section rules draw in, blue edge on card hover, moving light along the footer top. All off under the system reduce-motion setting. `src/styles/motion.css`, `src/components/CountUp.jsx`, `src/components/FilmHero.jsx`, `src/components/PageHero.jsx`, `src/pages/Home.jsx`, `src/pages/innovation/Innovation.jsx`

Verification: build and lint clean; every page checked on desktop and at 440px; overflow audit clean at 320, 375 and 440px for all roles.

## Round 7 (requested in chat, 11 Oct 2026)

R7-1. [x] GC year pop-up redesigned: navy card that springs open, trophy drops in with slowly turning light rays, podium blocks (2nd, 1st, 3rd) rise one after another with medals popping in, per-place rows of event chips that link to their gallery pages, and a fixed action bar with a large "View GC photos" button. Opens as a bottom sheet on phones. Checked with temporary sample podium data, then reverted; real entries still show the "to be added" note (Q6). `src/features/legacy/GcDialog.jsx`, `src/pages/Legacy.css`, `src/pages/Legacy.jsx`, `src/components/Modal.jsx`

## Round 8: editorial look (requested in chat, 11 Oct 2026)

Replaces the blue and navy palette from round 6.

R8-1. [x] Palette after the Palazzo Daniele and Forma references: paper #EFEBE3 page, #F7F4EE cards, ink #1A1917 text and headings, taupe and stone accents, espresso dark sections, terracotta #D9482A for the main calls to action (Log in, Donate, primary buttons). All hard-coded colours remapped. `src/styles/*.css`, `src/pages/**/*.css`, `public/favicon.svg`
R8-2. [x] Type: Bodoni Moda for headings and figures (regular weight, text optical size so hairlines stay visible), Jost for text; navigation, buttons, pills, field labels and stat captions in small spaced capitals; wider-tracked wordmark. `index.html`, `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/glass.css`, `src/styles/layout.css`
R8-3. [x] Shapes: crisp 4 to 6px corners on cards and panels, hairline borders, flatter shadows; outlined pill for the current page in the navbar. `src/styles/*`

Verification: build and lint clean; pages checked on desktop and at 440px; overflow audit clean at 320, 375 and 440px for all roles.

## Open questions

Q1. Reference-screenshot copy. Current choice: headings and taglines used as shown; data treated as samples.
Q2. Logo source file (SVG or high-res PNG). Current logo is hand-traced.
Q3. Figures from screenshots only: 700+ Boarders, 80+ Hall Workers, 1959 Year of Establishment, 1000+ Alumni Network; medal tally (Illumination 12/9/8, Rangoli 10/7/6, GC 8/11/9); Innovation 12 startups, 8 patents, 25+ national, 15+ international, 40+ hackathon. Please confirm.
Q4. Warden's name and message, Hall President's message.
Q5. Alumni profiles. The homepage screenshot names Dr. Subra Suresh, Arvind Krishna, Parag Agrawal, Ajay Yadav and Amit Kalantri. As far as I know, several of them studied at other IITs, so they were not used.
Q6. GC history (years, results, podiums), dated milestones, winning designs, earlier alumni-funded projects.
Q7. Donations: payment gateway or bank details? Can donor names and amounts be public? Currently pledges are recorded and the warden follows up.
Q8. Notice Board and Events are student-only per section 2, but the homepage reference shows the Notice Board publicly. Who posts notices and events? There is no posting screen yet.
Q9. Landing page per role (defaults in item 26).
Q10. Which roles post what on Innovation, and the URL of the external project form for non-RP students.
Q11. Gallery pills: workflow categories used instead of "All, Illumination, Rangoli, GC, Hall Days, Achievements".
Q12. GC gallery: sport, then year (used) or year, then sport (reference)?
Q13. GC modal: full record and podium list combined.
Q14. Complaint categories: Mess, Maintenance, Electrical, Plumbing, Internet, Cleanliness, Security, Other (proposed).
Q15. Phone numbers with wrong length: Rishabh Setia "750367974", Malyank Verma "8278102", Jayesh Mahajan "91309228".
Q16. Council departments and photos; past councils; is "Current Council" 2026–27 given the separate "2025–26" pill?
Q17. Navbar order: section 1 order used.
Q18. Should hall_council accounts see the student Notice Board and events? Currently no. (Filing complaints is now allowed, see R2-2.)
Q19. Social media URLs.

## Skipped or deferred

- Real authentication and a shared database: there is no backend. Login uses local test accounts and submissions are stored in each browser's localStorage, so data is not shared between devices. `src/lib/store.js` is the single place to swap in an API.
- `scripts/seed-test-users`: not needed while auth is local; the accounts are in `src/auth/testAccounts.js`.
- Photo credits on the live site: Commons images need visible attribution if they ship publicly. They are meant to be replaced before launch; credits are in `public/images/credits.json` until then.

## Missing content (TODOs)

Logo file, hall photos, council departments and photos, past councils, warden details, messages, alumni profiles, GC history, milestones, notices and events, real innovation projects and figures, funding initiatives and contacts, social links, external project form URL.
