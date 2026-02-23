# Verity Beta — Standalone Signup Page

A minimal, high-performance Next.js app for the Verity beta enrollment form.  
**Designed for Vercel deployment.**

---

## 🚀 Recent Updates for Vercel Deployment

I've refactored the project to ensure a "no problem" experience when hosting on Vercel:

1.  **Code Organization**: Extracted massive inline components into a dedicated `components/` directory (Icons, SuccessView).
2.  **API Integration**: Replaced the client-side simulation with a real Next.js Route Handler at `/api/enroll`. It's ready for you to plug in a database or webhook.
3.  **Modern Config**: Added `next.config.mjs` and updated `package.json` with standard linting and scripts for production environments.
4.  **Production Readiness**: Verified with a local build (`npm run build`) to ensure compatibility with Next.js 16 and Tailwind v4.

---

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4** (Modern CSS-first approach)
- **TypeScript**
- Zero external UI library dependencies (Pure, custom SVGs and styling)

---

## 📟 Run Locally

```bash
npm install
npm run dev        # → http://localhost:3000
```

---

## 🚢 Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Optimize for Vercel deployment"
   # Create a repo on GitHub and follow their instructions to push
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) → **Add New Project**.
   - Import your repository.
   - Vercel will automatically detect the Next.js settings.
   - Click **Deploy**.

Your form will be live at `https://your-project.vercel.app`.

---

## 🔌 Connecting a Backend (Supabase)

The form is currently configured to send data to **Supabase**. 

1. Create a table in your Supabase SQL Editor named `enrollments`:
   ```sql
   create table enrollments (
     id uuid default gen_random_uuid() primary key,
     email text not null,
     company text,
     crm text,
     data_pain text,
     lead_volume text,
     commitment boolean,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```
2. Copy your **Project URL** and **Anon Key** from the Supabase Dashboard.
3. Paste them into your `.env` file or Vercel Environment Variables.

---

## 🎨 Design

The visual design remains untouched as requested. It features the "Verity" high-end fintech aesthetic with 40px rounded corners, sleek dark mode transitions, and minimalist typography.

---

## ✅ Environment Variables

Currently, no environment variables are strictly required. If you add an API key for a service (like SendGrid or Supabase), add them in the Vercel Dashboard under **Project Settings → Environment Variables**.
