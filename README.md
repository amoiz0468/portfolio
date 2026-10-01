# Muhammad Abdul Moiz — Software & Machine Learning Portfolio

Production portfolio of **Muhammad Abdul Moiz**, Software & Machine Learning Engineer based in Paris, France. Pursuing Master of Science in Information Technology at **EPITECH Paris** and serving as **Pedagogical Assistant**, previously Associate Software Engineer at **Brackets Private Limited**.

---

## Technical Highlights

- **Next.js & React 18**: High-performance static pre-rendering with dynamic serverless API routing.
- **AI Twin Chatbot (`/api/chat`)**: Multi-provider LLM support (Google Gemini, Groq, OpenAI, Together AI) paired with a resilient, zero-latency human fallback engine.
- **Defensive Cybersecurity**:
  - Sliding-window IP rate limiting (30 requests/minute).
  - Multi-vector sanitization (XSS, script injection, pseudo-protocols, and null bytes).
  - Strict security headers (`HSTS`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Content-Security-Policy`).
- **Apple-Inspired Design System**:
  - ProMotion 120Hz smooth scrolling tuned with Lenis.
  - Native Mobile-App UI/UX: Bottom navigation tab bar, swipeable snap carousel, and native bottom sheet drawer for the AI chatbot.
  - Bento grid telemetry, spotlight hover cards, and interactive terminal emulator.
- **Comprehensive Automated Testing**: Node test runner (`tsx --test`) covering intent routing, input sanitization, rate limiting, and project details.

---

## 8 Featured Projects

1. **DoctorIQ**: Multimodal healthcare document processing with OCR, Claude/OpenAI APIs, and Celery worker pools cutting turnaround time by 70%.
2. **Brackets Genie**: Real-time conversational AI and multi-agent orchestration with LangGraph, LangChain, and sub-50ms WebSockets.
3. **VIF**: Food solidarity platform led from functional specifications to delivery with FastAPI, React Native, and DORA metrics tracking.
4. **Ledgeroo**: Secure FinTech web platform with encrypted transactions, Stripe API billing, and AWS CI/CD.
5. **Trinity Suite**: Enterprise supply chain ecosystem featuring Django REST, React 18, React Native, and a complete Docker & SonarQube Software Factory pipeline.
6. **Time Manager**: Enterprise real-time tracking tool built with Elixir (Phoenix BEAM concurrency), Vue 3, React, and WebSockets.
7. **Tamiami Fitness**: Customer acquisition agent with Dialogflow NLP and AWS Lambda/DynamoDB OCR automating 90% of bookings.
8. **Zoidberg 2.0**: Medical image benchmarking pipeline evaluating 6 convolutional architectures with stratified cross-validation and ROC-AUC reporting.

---

## Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/amoiz0468/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*Note: If no API key is set, the chatbot automatically falls back to the deterministic local intelligence engine.*

### 4. Run development server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## Quality Gates & Verification

Run the full automated test suite:
```bash
npm test
```

Type checking:
```bash
npx tsc --noEmit
```

Linting:
```bash
npm run lint
```

Production build validation:
```bash
npm run build
```

---

## Deployment to Vercel

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import this GitHub repository.
4. Framework Preset: **Next.js** (auto-detected).
5. Build Command: `npm run build` (auto-detected).
6. Environment Variables (optional):
   - `GEMINI_API_KEY`: Your Google Gemini API key from AI Studio.
   - `GEMINI_MODEL`: `gemini-2.5-flash` (or preferred model).
7. Click **Deploy**.

---

## License

Personal portfolio repository. All rights reserved.
