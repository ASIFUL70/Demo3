# Premium BBA Student Portfolio Website

A modern, responsive, minimalist personal brand website designed specifically for **Bachelor of Business Administration (BBA) students** and final-year candidates. Designed to highlight strategic coursework, data analytics skills, business case studies, and career potential to recruiters, HR managers, and corporate employers.

Built strictly with **HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript**. No complex build systems, Node modules, or front-end frameworks required.

---

## 📁 Repository & Folder Structure

```
.
├── index.html                  # Home Page (Hero, Intro, Featured Case Studies, Skills, Education)
├── about.html                  # About Me Page (Biography, Career Direction, Timeline, Coursework)
├── projects.html               # Projects & Case Studies Page (Filterable Grid & Interactive Modals)
├── resume.html                 # Web Resume & Print-Friendly Layout (@media print)
├── contact.html                # Contact Page (Direct channels & Validated Form with Mailto Fallback)
├── js/
│   └── main.js                 # Core JavaScript (Mobile Nav, Active State, Filters, Modals, Validation)
├── assets/
│   ├── images/
│   │   ├── favicon.svg         # Site Favicon Icon
│   │   ├── profile-placeholder.svg # Profile Photo Placeholder
│   │   ├── project-market-research.svg # Case Study Graphic 1
│   │   ├── project-financial-analysis.svg # Case Study Graphic 2
│   │   └── project-digital-strategy.svg # Case Study Graphic 3
│   └── resume.pdf              # Downloadable Resume PDF Placeholder
└── README.md                   # Documentation & Customization Guide
```

---

## 🚀 Quick Start / Local Development

Since this portfolio uses Tailwind CSS via CDN and pure Vanilla JS, no build step or `npm install` is required.

### Running Locally with Python
```bash
# In your terminal, navigate to the repository root directory:
python3 -m http.server 8000
```
Then open your browser and navigate to: **`http://localhost:8000`**

### Running with VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## ✏️ Customization Guide for Students

All personal data, headlines, and project details are designed to be easily editable. Search for `[Your Full Name]` or `EDITABLE:` comments across the HTML files.

### 1. Updating Personal Details & Contact Info
Search across `index.html`, `about.html`, `resume.html`, and `contact.html` to update:
- **Full Name:** Replace `Alex Morgan` with your name.
- **Headline:** e.g., `BBA Final-Year Student | Aspiring Business Analyst | Market Research Enthusiast`
- **University:** Replace `State University School of Business`.
- **Specialization / Major:** e.g., `Business Analytics & Strategic Management`
- **Graduation Date:** e.g., `May 2025`
- **Email & Phone:** Replace `alex.morgan.bba@example.com` and `(555) 019-2834`. Also update the default email target in `js/main.js` (`alex.morgan.bba@example.com`).
- **LinkedIn Profile URL:** Replace `https://linkedin.com/in/example-alex-morgan`.

### 2. Replacing the Profile Photo
1. Place your professional headshot image (JPG, PNG, or WebP format) in `assets/images/profile.jpg`.
2. Open `index.html` and `about.html`, and update the `src` attribute:
   ```html
   <img src="assets/images/profile.jpg" alt="Your Name - BBA Final-Year Student" class="...">
   ```

### 3. Replacing the Resume PDF
1. Export your resume as a PDF file named `resume.pdf`.
2. Replace the file at `assets/resume.pdf`.
3. The "Download CV" buttons across all pages and `resume.html` will automatically serve your updated PDF.

### 4. Adding or Editing Case Studies (`projects.html`)
To add a new project card on `projects.html`:
1. Duplicate one of the `<article class="project-card ...">` blocks inside `projects.html`.
2. Set the `data-category` attribute to match your project category (`marketing`, `finance`, `business-analysis`, `strategy`, or `academic`).
3. Set the `data-modal-target` to point to a unique modal ID (e.g., `modal-project-6`).
4. Duplicate a modal container `<div id="modal-project-6" class="modal-backdrop ...">` at the bottom of `projects.html` and update its title, business problem, role, methods, findings, and recommendations.

### 5. Connecting a Form Service (Formspree or Netlify Forms)

#### Option A: Using Formspree (Free & Easy)
1. Register a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy your Form ID (e.g. `https://formspree.io/f/xeqwyzlk`).
3. In `contact.html`, change the `<form>` tag:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contact-form" class="space-y-5">
   ```

#### Option B: Using Netlify Forms
If deploying on Netlify, simply add `data-netlify="true"` to your `<form>` tag in `contact.html`:
```html
<form name="contact" method="POST" data-netlify="true" id="contact-form" class="space-y-5">
```

---

## 🌐 Deployment Guide

### Deploying to GitHub Pages
1. Push your repository to GitHub.
2. In your repository settings on GitHub, navigate to **Pages** (under Code and automation).
3. Under **Build and deployment**, set Source to **Deploy from a branch**.
4. Select the `main` or `master` branch and folder `/ (root)`, then click **Save**.
5. Your website will be live in 1-2 minutes at `https://yourusername.github.io/repository-name`.

### Deploying to Netlify
1. Log into [Netlify](https://www.netlify.com).
2. Click **Add new site** &rarr; **Import an existing project**.
3. Connect your GitHub repository.
4. Leave build settings empty (since it is pure static HTML/JS) and click **Deploy site**.

---

## 🎨 Design & Accessibility Features

- **Tailwind CSS Utility Design:** Clean corporate palette with slate backgrounds, dark charcoal headings, and subtle sky blue accents.
- **Accessibility & Contrast:** WCAG compliant color contrast ratios, explicit `aria-expanded`, `aria-pressed`, `aria-modal`, visible focus rings, and screen-reader labels.
- **Responsive Layout:** Mobile-first responsive grids and mobile dropdown navigation.
- **Print Optimization:** Dedicated `@media print` rules on `resume.html` for clean browser printing (`Ctrl+P`).
- **No Heavy Dependencies:** LightweightVanilla JS script for maximum speed and instant rendering.
