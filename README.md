# AIJobWatch India

An independent, research-grounded static intelligence platform estimating artificial intelligence exposure scores, automatable task decompositions, impact timelines, and practical upskilling transition pathways across the Indian labor market.

---

## Table of Contents
1. [Overview & Tech Stack](#overview--tech-stack)
2. [Project Architecture](#project-architecture)
3. [How to Run Locally](#how-to-run-locally)
4. [How to Add a New Job Profile](#how-to-add-a-new-job-profile)
5. [How to Deploy to Cloudflare Pages](#how-to-deploy-to-cloudflare-pages)
6. [How to Submit Sitemap to Google Search Console](#how-to-submit-sitemap-to-google-search-console)
7. [AdSense & Affiliate Monetization Integration](#adsense--affiliate-monetization-integration)
8. [Ethical Estimation Principles](#ethical-estimation-principles)

---

## 1. Overview & Tech Stack

AIJobWatch answers one fundamental question for Indian workers, students, and educators: **"Will AI take my job, and when?"**

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Editorial serif headings + clean sans body)
- **Routing**: React Router DOM (Single-Page Static Architecture)
- **SEO & Social Share**: `react-helmet-async`, Open Graph, Twitter Cards, Schema.org JSON-LD (`FAQPage`, `Article`, `BreadcrumbList`, `WebApplication`)
- **Icons**: Lucide React
- **Zero Backend / Serverless**: 100% powered by fast, local JSON databases in `/src/data/`

---

## 2. Project Architecture

```
├── public/
│   ├── robots.txt            # Search engine crawler permissions
│   └── sitemap.xml           # XML sitemap with 40 jobs, 11 sectors, blog & pages
├── src/
│   ├── components/
│   │   ├── AdSlot.tsx        # Reserved, clearly labeled AdSense placements
│   │   ├── AffiliateBox.tsx  # Reusable upskilling and certification recommendations
│   │   ├── Breadcrumbs.tsx   # Unboxed navigation with BreadcrumbList schema
│   │   ├── CircularScore.tsx # SVG circular AI Exposure Gauge (0-100)
│   │   ├── CookieConsent.tsx # DPDP & Google AdSense compliant cookie manager
│   │   ├── DisclaimerBanner.tsx # Epistemic research disclaimer component
│   │   ├── Footer.tsx        # Authoritative publication footer
│   │   ├── Navbar.tsx        # Editorial masthead + instant search modal + dark mode
│   │   ├── SearchBar.tsx     # Fuzzy search with instant autocomplete
│   │   ├── SEOHelmet.tsx     # Unified meta tags, canonical, OG, Twitter & JSON-LD
│   │   └── ShareButtons.tsx  # Copy link (with toast), WhatsApp, X (Twitter)
│   ├── data/
│   │   ├── blog.json         # Research essays & in-depth analyses
│   │   ├── jobs.json         # Complete 40-job dataset with Indian salaries & tasks
│   │   ├── sectors.json      # 11 Indian economic sectors
│   │   └── timeline.json     # Chronological milestones from 2023 to 2035
│   ├── pages/
│   │   ├── AboutPage.tsx     # Editorial mission & team principles
│   │   ├── BlogListPage.tsx  # Dispatch directory
│   │   ├── BlogPostPage.tsx  # Article template with Article schema
│   │   ├── ComparePage.tsx   # Side-by-side career comparison tool
│   │   ├── ContactPage.tsx   # Direct mailto contact (no backend form)
│   │   ├── DisclaimerPage.tsx# Legal & epistemic disclosure
│   │   ├── HomePage.tsx      # Masthead, search, top 6 risk/safe, directory
│   │   ├── JobPage.tsx       # Reusable template for all 40 jobs
│   │   ├── MethodologyPage.tsx # Scoring equation, PLFS/NASSCOM citations
│   │   ├── PrivacyPolicyPage.tsx # DPDP Act & GDPR compliant privacy policy
│   │   ├── SectorPage.tsx    # Sector risk, jobs ranking, emerging net roles
│   │   ├── TermsPage.tsx     # Terms of use
│   │   └── TimelinePage.tsx  # Interactive sector-filtered timeline
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── App.tsx               # Route declarations & theme provider
│   ├── index.css             # Tailwind base, typography & print styling
│   └── main.tsx              # Application entrypoint
├── metadata.json
├── package.json
└── tsconfig.json
```

---

## 3. How to Run Locally

### Prerequisites
- Node.js version 18.0 or newer
- npm version 9.0 or newer

### Setup & Run
```bash
# 1. Clone repository
git clone https://github.com/your-username/aijobwatch.git
cd aijobwatch

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser. Hot reloading and responsive inspection are active.

### Build & Preview
```bash
# Production bundle build
npm run build

# Preview production build locally
npm run preview
```

---

## 4. How to Add a New Job Profile

To add a new job to the index, append an entry to `/src/data/jobs.json`. Follow this exact schema:

```json
{
  "slug": "data-center-technician",
  "title": "Data Center Operations Technician",
  "sector": "it-software",
  "sectorName": "IT & Software Services",
  "score": 38,
  "label": "Low",
  "timeline": "2031-2036",
  "confidence": "High",
  "summary": "Rack cabling, server motherboard hot-swapping, and cooling diagnostics require hands-on physical presence in hyperscale facilities.",
  "tasks": [
    { "name": "Monitoring thermal temperature telemetry", "status": "now", "note": "Automated DCIM software monitors chiller loops" },
    { "name": "Hot-swapping failed hard drives and NVMe sticks", "status": "unlikely", "note": "Requires physical dexterity and static discharge grounding" },
    { "name": "Tracing cut fiber optic patch cables", "status": "unlikely", "note": "Manual cable management and light meter testing" }
  ],
  "aiWillDo": [
    "Predict server hardware failures 48 hours before crash",
    "Dynamically route cooling airflow based on compute load"
  ],
  "humansWillDo": [
    "Physically replace dead server trays and optical transceivers",
    "Manage high-voltage UPS and diesel backup generator switchgear"
  ],
  "skillsToLearn": [
    "Fiber optic testing (OTDR)",
    "Hyperscale DCIM platforms",
    "Industrial cooling & liquid cooling thermodynamics"
  ],
  "toolsToLearn": ["Fluke CableIQ", "Schneider EcoStruxure", "Linux CLI"],
  "saferCareers": [
    { "title": "Cloud Solutions Architect", "slug": "cloud-architect" }
  ],
  "indiaNote": "India's data center capacity (Mumbai, Chennai, Noida) is tripling due to data localization laws, creating strong physical demand.",
  "salaryRangeINR": "₹3.5 Lakh - ₹7.0 Lakh / year",
  "hiringTrend": "Growing",
  "faqs": [
    {
      "q": "Can robots replace data center technicians?",
      "a": "Robotic grippers struggle with tight rack spaces and complex cable bundles. Humans remain essential."
    }
  ],
  "lastUpdated": "October 2026"
}
```

After adding a job:
1. Add the URL to `/public/sitemap.xml`:
   ```xml
   <url><loc>https://aijobwatch.in/jobs/data-center-technician</loc><lastmod>2026-10-07</lastmod><priority>0.9</priority></url>
   ```
2. The job will automatically appear in search, autocomplete, comparison tools, and the sector directory without changing any component code!

---

## 5. How to Deploy to Cloudflare Pages

AIJobWatch is built as a zero-backend, ultra-fast static application perfectly suited for Cloudflare Pages with zero server maintenance.

### Method A: Git Integration (Recommended)
1. Push your repository to **GitHub** or **GitLab**.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Cloudflare will automatically build, optimize, and deploy your site to global edge nodes with free SSL and DDoS mitigation.
6. Under **Custom Domains**, add your domain (e.g. `aijobwatch.in`).

### Single Page Application (SPA) Routing on Cloudflare
Ensure client-side URLs (`/jobs/:slug`, `/compare`, `/timeline`) route correctly by including a `_redirects` file in your `public/` directory (or Cloudflare's automatic SPA fallback):
```
/*    /index.html   200
```
*(This file is already supported in Vite build outputs).*

---

## 6. How to Submit Sitemap to Google Search Console

Submitting your sitemap ensures all 40 career profiles and 11 sector indexes get crawled and indexed quickly.

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your property using **Domain** or **URL prefix** (e.g. `https://aijobwatch.in`).
3. Verify ownership via DNS TXT record (if using Cloudflare, add the TXT record in your Cloudflare DNS tab).
4. Once verified, click **Sitemaps** in the left sidebar under the "Index" section.
5. In the "Add a new sitemap" input, enter:
   ```
   sitemap.xml
   ```
6. Click **Submit**. Google will process the 55+ URLs and begin indexing with structured snippets (`FAQPage` on jobs and `BreadcrumbList`).

---

## 7. AdSense & Affiliate Monetization Integration

### Google AdSense Setup
1. In `index.html`, paste your AdSense client script in the `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
2. Open `/src/components/AdSlot.tsx` and replace the placeholder text with your `<ins>` block:
   ```tsx
   <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   ```
3. The app includes a compliant **Cookie Consent Banner** (`/src/components/CookieConsent.tsx`) supporting AdSense privacy requirements.

### Course Affiliate Links
Edit `/src/components/AffiliateBox.tsx` to insert your referral links from:
- Coursera / DeepLearning.AI
- UpGrad / Great Learning
- SWAYAM / NPTEL partnerships

---

## 8. Ethical Estimation Principles

1. **No Fatalistic Language**: We use words like *"estimated"*, *"task modification"*, and *"diffusion velocity"*.
2. **Confidence Metric**: Every score is accompanied by a High/Medium/Low confidence interval.
3. **Task-Level Decomposition**: Jobs do not vanish overnight; component tasks are automated sequentially.
4. **Actionable Empowerment**: Every evaluation ends with specific skills to learn, tools to adopt, and safer careers to explore.
