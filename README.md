# General Contractor Website Launch & Deployment Plan

This document serves as the official step-by-step log and execution guide for setting up, deploying, and maintaining the website for your dad's general contracting business.

---

## Overview & Architecture

```
[ Local Code ] ---> git push ---> [ GitHub Repository ] ---> Auto Deploy ---> [ Vercel / Live .com ]
                                                                                   |
                                                                        Linked to  v
                                                                 [ Google Business Profile ]
                                                                 (Local Maps & Reviews)
```

- **Hosting Platform:** Vercel (or Cloudflare Pages / Netlify)
- **Version Control:** GitHub
- **Domain Registrar:** Cloudflare / Namecheap / Porkbun
- **Local Business Listing:** Google Business Profile ([business.google.com](https://business.google.com))
- **Estimated Monthly Cost:** $1.00 – $7.00 / month

---

## Step-by-Step Execution Checklist

### [ ] Step 1: Buy Domain Name
- [ ] Choose domain name (e.g., `DadsContracting.com` or `[City]GeneralContractor.com`).
- [ ] Purchase domain on Cloudflare Registrar, Namecheap, or Porkbun (~$10-$14/year).

### [x] Step 2: Prepare & Finalize Website Code
- [x] Update company name, phone number, and service areas in `index.html`.
- [ ] Add contractor license number and insurance verification notice.
- [ ] Add actual past project photos to `assets/images/`.

### [x] Step 3: Create GitHub Repository & Push Code
- [x] Create a GitHub account at [github.com](https://github.com).
- [x] Create repository (`rdg-constructions-website`).
- [x] Run Git commands locally:
  ```bash
  git init
  git add .
  git commit -m "Initial website code"
  git remote add origin https://github.com/lsaacd/rdg-constructions-website.git
  git push -u origin main
  ```

### [x] Step 4: Connect Vercel Hosting (Auto-Deployment)
- [x] Create account at [vercel.com](https://vercel.com) using GitHub login.
- [x] Click **Add New Project** $\rightarrow$ Select `rdg-constructions-website` repository.
- [x] Click **Deploy** to generate initial staging URL ([https://rdg-constructions-website.vercel.app/](https://rdg-constructions-website.vercel.app/)).

### [ ] Step 5: Link Custom `.com` Domain to Vercel
- [ ] In Vercel Project Settings $\rightarrow$ **Domains** $\rightarrow$ Add `yourdomain.com`.
- [ ] Update DNS records (A Record / CNAME) at domain registrar pointing to Vercel.
- [ ] Verify free SSL certificate installation (HTTPS enabled automatically).

### [ ] Step 6: Create & Verify Google Business Profile
- [ ] Log into [business.google.com](https://business.google.com).
- [ ] Fill in business name, primary category (*General Contractor*), phone number, working hours, and service cities.
- [ ] **Add live website URL (`https://yourdomain.com`) to Google profile.**
- [ ] Complete Google verification (postcard or phone/video).

### [ ] Step 7: Connect Google Reviews to Website
- [ ] In Google Business dashboard, click **Get More Reviews** and copy direct review link.
- [ ] Paste review link into website's *"Leave a Google Review"* buttons.
- [ ] Push update to GitHub:
  ```bash
  git add .
  git commit -m "Added Google Review link"
  git push
  ```

### [ ] Step 8: Ongoing Maintenance Workflow
- Whenever updating site text, adding new project photos, or tweaking styles:
  1. Save changes locally.
  2. Push to GitHub (`git push origin main`).
  3. Vercel automatically deploys live site update within 15 seconds.

---

## Cost Summary Table

| Service | Provider | Monthly Cost | Yearly Cost |
| :--- | :--- | :--- | :--- |
| **Google Business Profile & Reviews** | Google | $0.00 | $0.00 |
| **GitHub Repository** | GitHub | $0.00 | $0.00 |
| **Vercel Web Hosting** | Vercel | $0.00 | $0.00 |
| **SSL Security Certificate** | Vercel | $0.00 | $0.00 |
| **Custom Domain (`.com`)** | Registrar | ~$1.00 / mo | ~$12.00 / yr |
| **Business Email (Optional)** | Google Workspace | $6.00 / mo | $72.00 / yr |
| **TOTAL (Essential)** | | **~$1.00 / mo** | **~$12.00 / yr** |

---

*Log generated for contractor website setup & automated GitHub/Vercel pipeline.*

---

## Appendix: Advanced Competitor Analysis (Web Scraping)

If you ever need to analyze a competitor's website to see what backend forms, integrations, or fonts they are using (like we did with Rossi Painting), you can use these command-line tools to extract their raw, public frontend code locally:

1. **Download a live website to a local file (retains original encoding):**
   ```bash
   curl.exe -sL https://example.com/ -o competitor_code.html
   ```

2. **Extract all `<script>` tags (to find CRMs, Hubspot, or WordPress plugins):**
   ```powershell
   powershell -c "Select-String -Pattern '<script' competitor_code.html | Out-File -FilePath scripts_utf8.txt -Encoding utf8"
   ```

3. **Search for exact colors or fonts (e.g., 'font-family'):**
   ```powershell
   powershell -c "Select-String -Pattern 'font-family: [^;]+' competitor_code.html | Select-Object -First 10"
   ```

*Note: These commands only pull the public HTML/CSS/JS that web browsers already download. They do not access private backend databases or sensitive server files.*
