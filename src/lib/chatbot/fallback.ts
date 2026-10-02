import { profile } from '../../data/portfolio';
import { ChatMessage } from './types';
import { generateFrenchFallbackReply } from './fallback-fr';

function isFrenchQuery(q: string): boolean {
  // If the query contains English question starters, keep in English unless lang === 'fr'
  if (/\b(are\s+you|what\s+is|tell\s+me|why\s+should|do\s+you|how\s+can|can\s+you|who\s+are)\b/i.test(q)) {
    return false;
  }
  return /\b(bonjour|salut|coucou|parle[rz]?|quelles?|comment|pourquoi|competences?|centres?\s*d'int[eé]r[eê]t|disponibilit[eé]|recherchez-vous|qui\s*es-tu|pr[eé]sente[rz]?)\b/i.test(q);
}

export function generateHumanFallbackReply(messages: ChatMessage[], lang: 'en' | 'fr' = 'en'): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const q = lastUserMsg.trim().toLowerCase();

  // If page language is French, or user wrote in French, delegate to dedicated French engine
  if (lang === 'fr' || isFrenchQuery(q)) {
    return generateFrenchFallbackReply(q);
  }

  // 1. GREETINGS & CASUAL HELLOS
  if (
    /^(hi|hello|hey|salam|hola|good morning|good afternoon|good evening|yo|wassup|greetings|howdy)\b/i.test(q) ||
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey'
  ) {
    return `Hello! Great to connect with you.

I'm **Muhammad Abdul Moiz**'s AI twin. You can explore:
- **DevOps & Cloud Software Factory**: CI/CD automation, Docker containerization, AWS/GCP deployments, SonarQube gates & DORA metrics
- **Why Hire Moiz**: High-throughput microservices, GenAI pipelines, multi-step agents & mentoring leadership
- **Passions & Hobbies**: Cooking, traveling, poetry, photography, fitness & chess
- **Schools & Studies**: MSc at **EPITECH Paris** & BSCS at **FAST-NUCES**
- **Experience**: Pedagogical Assistant at **EPITECH Paris** & Associate Software Engineer at **Brackets**
- **Featured Projects**: *DoctorIQ*, *Brackets Genie*, *VIF*, *Ledgeroo*, *Trinity*, and *Zoidberg 2.0*
- **Technical Stack**: Python (FastAPI/Django), TypeScript, React 18, Vue 3, Elixir, Docker, AWS, GCP, PyTorch
- **Target Opportunity**: Seeking 12-Month Alternance (Sept 2026) or CDI/CDD in Paris/Remote

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? What are your passions and hobbies outside of work?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).`;
  }

  // 2. DEVOPS EXPERIENCE & DEVOPS SERVICES (HIGH PRIORITY: Matched before generic experience)
  if (
    /\b(devops|ci[\s/-]?cd|docker|container(ization)?|aws|gcp|cloud infrastructure|reverse proxy|nginx|apache reverse|kubernetes)\b/i.test(q)
  ) {
    return `### DevOps Experience & Cloud Capabilities

I have hands-on production DevOps experience building reliable infrastructure, containerized environments, and automated delivery pipelines:

- **Containerization & Docker Orchestration**: Engineering multi-stage Docker builds optimized for minimal image sizes and rapid rebuilds. Standardizing local and staging environments with Docker Compose.
- **Automated CI/CD & DevSecOps**: Designing automated test, lint, and build release gates using **GitLab CI** and **GitHub Actions YAML**. Configuring **gitStream** auto-merge rules and **SonarQube** code quality gates to enforce zero-regression delivery before cloud deployment.
- **Delivery Visibility & DORA Metrics**: Tracking key maturity indicators (**Deployment Frequency**, **Lead Time for Changes**, **Change Failure Rate**, **MTTR**) to maintain high release velocity.
- **Cloud Infrastructure (AWS & GCP)**: Deploying, securing, and operating compute, storage, and networking on **AWS (EC2, S3, Lambda, Bedrock, LightSail)** and **GCP**, including IAM role configuration and environment secrets management.
- **Reverse Proxies & Production Hardening**: Deploying web services and API endpoints behind **Nginx** and **Apache** reverse proxies, managing automated SSL/TLS certificates (Let's Encrypt), CORS policies, and WebSocket routing.
- **Asynchronous Task Queues**: Architecting high-concurrency worker systems using **Celery** and **Redis** for distributed asynchronous workloads (e.g., OCR processing and LLM pipelines in *DoctorIQ*).
- **Systems & Linux Administration**: Deep familiarity with Linux internals, systemd, process management, and shell scripting. I also teach and mentor engineering cohorts at EPITECH Paris in Linux and Docker containerization.

### DevOps Services Offered:
1. **Software Factory & CI/CD Pipeline Setup**: Custom GitLab CI or GitHub Actions workflows with automated test execution, SonarQube quality gates, gitStream auto-merge, and Docker image publishing.
2. **DORA Metrics Dashboard & Delivery Velocity**: Implementing release tracking dashboards to measure and improve deployment frequency and recovery times.
3. **Dockerization & Container Migration**: Containerizing monolithic or microservice architectures with clean multi-stage Dockerfiles and multi-container Docker Compose.
4. **Cloud Deployment & Architecture (AWS / GCP)**: Deploying resilient backend APIs (FastAPI, Django, Node.js), frontend apps, and machine learning services onto AWS or GCP.
5. **Reverse Proxy, SSL & Web Security**: Setting up Nginx/Apache reverse proxies, automated Let's Encrypt HTTPS, domain DNS routing, and rate limiting.
6. **Asynchronous Worker & Queue Infrastructure**: Implementing Redis and Celery worker pools for background job execution and event-driven architectures.

### Featured DevOps Projects:
- **Trinity DevOps Software Factory**: Automated multi-stage Docker builds, SonarQube static analysis gates (enforcing 70%+ to 90%+ test coverage), and containerized delivery via Nginx reverse proxy on Linux.
- **DoctorIQ Cloud Architecture**: High-throughput distributed asynchronous worker cluster on AWS (EC2, S3, Lambda) with Celery and Redis to process clinical OCR without blocking user requests.
- **DORA Metrics & gitStream Delivery**: Continuous delivery pipeline tracking the 4 key DORA metrics (Deployment Frequency, Lead Time, Change Failure Rate, MTTR) with automated PR merge policies.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? What is your full backend and database tech stack?
? What roles and contracts are you available for in Paris?`;
  }

  // 2. SPECIFIC PROJECTS & SPECIALIZED CAPABILITIES (High Priority)
  // 2a. DOCTOR IQ PROJECT
  if (/doctoriq|doctor\s*iq|medical|clinical\s*document|healthcare\s*backend/i.test(q)) {
    return `### DoctorIQ — AI Healthcare & Medical Extraction Platform

**DoctorIQ** is a production clinical document extraction system that solved healthcare extraction bottlenecks:
- **70% Latency Reduction**: Combined high-accuracy OCR with iterative prompt engineering across **OpenAI API** and **Anthropic Claude API** to slash document processing turnaround time by 70%.
- **High-Throughput Asynchronous Workers**: Architected with **Python (Django REST)**, **Celery**, and **Redis** to ingest and process large batches of clinical records without blocking client APIs.
- **Automated Document Deliverables**: Automated extraction of structured medical data, diagnostic validation, and automated PDF report compilation.
- **Cloud Infrastructure**: Containerized with **Docker** and deployed on **AWS (EC2, S3, Lambda)** with HIPAA-compliant data policies.

### Suggested Inquiries:
? Tell me about Brackets Genie and agentic WebSockets.
? Tell me about Ledgeroo and FinTech Stripe integration.
? What DevOps experience do you have with AWS and Docker?`;
  }

  // 2b. BRACKETS GENIE & AGENTIC ORCHESTRATION / LANGGRAPH
  if (/genie|agentic|langgraph|websocket|voice\s*call|multi[\s-]*step\s*agent|anthropic|claude api/i.test(q)) {
    return `### Brackets Genie — Real-Time Conversational AI & Agentic Orchestration

**Brackets Genie** is an interactive multi-agent platform for voice calls, data rectification, and real-time meeting intelligence:
- **Sub-50ms Streaming Latency**: Built with bidirectional **WebSockets** and **FastAPI** to stream token-by-token responses and call telemetry with instantaneous user feedback.
- **Multi-Agent Orchestration**: Implemented multi-step agent workflows using **LangGraph** and **LangChain**, dynamically routing tasks between **Anthropic Claude API** and **OpenAI API**.
- **Dynamic Frontend Architecture**: Engineered responsive telemetry dashboards in **React 18** and **TypeScript** with performance-tuned hooks and Context state loops.
- **Automated CI/CD**: Enforced automated testing gates and containerized delivery with **Docker** and GitHub Actions.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Time Manager and high-concurrency Elixir.
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 2c. TAMIAMI FITNESS & BOOKING AUTOMATION (DIALOGFLOW / OCR)
  if (/tamiami|lead\s*engine|n8n|selenium|scraper/i.test(q) || (/fitness/i.test(q) && /booking|dialogflow|tamiami|bot/i.test(q)) || /tamiami fitness/i.test(q)) {
    return `### Tamiami Fitness & Intelligent Automation Systems

- **Tamiami Fitness AI Booking Hub**: Built a customer acquisition and booking agent using **Node.js**, **Express**, and **Dialogflow NLP**, integrated with custom document OCR models on **AWS Lambda**, **DynamoDB**, and **GCP** — automating 90% of member bookings.
- **Automated Scrapers & Bots**: Engineered high-throughput Python **Selenium bots**, LinkedIn automation flows, and low-code **n8n** automation pipelines for asynchronous data harvesting and CSV validation.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Brackets Genie and real-time WebSockets.
? What DevOps and cloud services do you offer?`;
  }

  // 2d. VIF (VEOLIA / ENGIE IT ECOSYSTEM & FOOD SOLIDARITY)
  if (/vif\b|solidarity|food\s*solidarity|food\s*waste|lead\s*on\s*vif/i.test(q)) {
    return `### VIF — Real-Time Food Solidarity Platform & Project Leadership

On **VIF**, I served as **Project Lead** managing the full web and mobile product lifecycle:
- **End-to-End Ownership**: Scoped stakeholder requirements, authored functional specifications, coordinated cross-functional squads (backend, mobile, DevOps), and oversaw iterative sprint delivery.
- **Full-Stack Architecture**: **FastAPI** backend microservices, **React Native (TypeScript)** mobile application, **PostgreSQL**, and containerized tiers.
- **Delivery Velocity & DORA Metrics**: Configured GitLab CI pipelines, branch protection, and tracked **DORA Metrics** (Deployment Frequency, Lead Time, MTTR) to ensure zero-regression releases.
- **Agile Coordination**: Facilitated standups, sprint planning, retrospectives, and backlog prioritization using **Jira** and **ClickUp**.

### Suggested Inquiries:
? Tell me about your Trinity Suite and Software Factory pipeline.
? Tell me about Ledgeroo and FinTech Stripe architecture.
? What DevOps and cloud services do you offer?`;
  }

  // 2e. LEDGEROO & FINTECH
  if (/ledgeroo|fintech|stripe|payment\s*gateway|financial\s*backend/i.test(q)) {
    return `### Ledgeroo — Secure FinTech Backend & Learning Hub

**Ledgeroo** is a production financial web platform engineered for secure transaction management and accounting workflows:
- **Encrypted Transaction Handling**: Designed resilient transaction processing with strict database locking in **Django 4.2** and **PostgreSQL**.
- **Payment Gateway Integration**: Integrated automated **Stripe API** webhooks for billing, payment validation, and automated PDF invoice generation.
- **Automated Cloud Delivery**: Automated CI/CD deployment on **AWS** with Docker containerization and pre-production validation workflows.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Time Manager and real-time Elixir tracking.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 2f. TRINITY SUITE (DEV-WEB, DEV-APP, DEVOPS)
  if (/trinity|software\s*factory|sonarqube|paypal|open\s*food\s*facts|grocery/i.test(q)) {
    return `### Trinity Suite — Dev-Web, Dev-App & DevOps Software Factory

The **Trinity Suite** represents a complete multi-tier enterprise supply chain ecosystem built at EPITECH:
- **Trinity Dev-Web (Management Portal)**: Full-stack platform built with **Django REST** and **React 18 TypeScript**. Maintained **70%+ to 90%+ pytest test coverage**, Postman API collections, and **SonarQube** code quality gates.
- **Trinity Dev-App (Grocery Mobile Client)**: Mobile client built with **React Native**, Django REST, JWT authentication, **PayPal checkout integration**, and barcode scanning via **Open Food Facts API**.
- **Trinity DevOps (Software Factory Pipeline)**: Automated builds, SonarQube quality gates, multi-environment deployment, health checks, and containerized delivery via **Nginx** reverse proxy and **Docker Compose** on Linux.

### Suggested Inquiries:
? Tell me about your DevOps experience and CI/CD pipelines.
? Tell me about VIF and project management leadership.
? What is your full backend and database tech stack?`;
  }

  // 2g. TIME MANAGER & HIGH CONCURRENCY (ELIXIR / VUE 3)
  if (/time\s*manager|elixir|phoenix|functional\s*programming/i.test(q)) {
    return `### Time Manager — High-Concurrency Real-Time Tracking Tool

**Time Manager** is an enterprise tracking application designed for concurrent live event streams:
- **Functional Concurrency in Elixir**: Architected the backend using **Elixir** and the **Phoenix framework**, leveraging BEAM processes for lightweight concurrency, fault tolerance, and sub-millisecond socket events.
- **Reactive Frontends (Vue 3 & React)**: Designed responsive client dashboards in **Vue 3** (Composition API, Pinia state management) and **React** with real-time WebSocket state synchronization.
- **Security & Authorization**: Implemented JSON Web Token (JWT) authentication, Role-Based Access Control (RBAC), and relational tracking in **PostgreSQL**.

### Suggested Inquiries:
? Tell me about Brackets Genie and agentic WebSockets.
? Tell me about DoctorIQ and medical document processing.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 2h. DEVSECOPS, DORA METRICS & GITSTREAM
  if (/dora|gitstream|devsecops|sast|delivery\s*velocity|mttr|release\s*gate/i.test(q)) {
    return `### DevSecOps, DORA Metrics & Modern Software Delivery

I specialize in establishing modern software delivery standards and metrics-driven development:
- **DORA Metrics Visibility Dashboard**: Tracking the 4 key metrics of delivery maturity: **Deployment Frequency**, **Lead Time for Changes**, **Change Failure Rate**, and **Mean Time to Recovery (MTTR)**.
- **Automated Git Workflows (gitStream)**: Configured auto-merge rules for safe PRs, automated reviewer routing based on changed files, and branch protection policies.
- **Static Quality & Security Gates**: Integrated **SonarQube** code scanning, automated linting, vulnerability screening (SAST), and mandatory test coverage thresholds (70%+ to 90%+).
- **Zero-Downtime Releases**: Multi-stage Docker optimization, blue/green deployments, and Nginx reverse proxy health checks.

### Suggested Inquiries:
? Tell me about your Trinity DevOps Software Factory pipeline.
? What DevOps services do you offer for high-growth teams?
? Tell me about your cloud infrastructure on AWS and GCP.`;
  }

  // 2i. ZOIDBERG 2.0 / COMPUTER VISION / MACHINE LEARNING
  if (/zoidberg|benchmarking|computer vision|deep learning|densenet|cnn|pytorch|tensorflow|pca/i.test(q)) {
    return `### Zoidberg 2.0 & Computer Vision Engineering

- **Zoidberg 2.0**: End-to-end medical image benchmarking pipeline comparing 6 supervised architectures: **DenseNet121**, custom **CNNs**, **SVM**, **Random Forest**, **KNN**, and **Logistic Regression**.
- **Rigorous Validation**: Implemented PCA feature reduction, 5-fold stratified cross-validation to prevent dataset bias, and systematic **ROC-AUC** / **F1-score** metric reporting.
- **Production CV Endpoint**: Deployed real-time computer vision inference on **AWS LightSail** behind an Apache reverse proxy managing SSL routes for a mobile client.

### Suggested Inquiries:
? Tell me about DoctorIQ and multimodal document processing.
? What are your core machine learning frameworks and tools?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 2j. FRONTEND & MOBILE CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /front[\s-]*end|react|vue|react[\s-]*native|mobile\s*(development|app|client)|ui[\s/-]?ux|pinia|frontend\s*capabilities/i.test(q)
  ) {
    return `### Frontend & Mobile Architecture Capabilities

I build high-performance, responsive web and mobile interfaces focused on sub-second rendering, dynamic state management, and ergonomic UX:

- **Modern Web Interfaces (React 18 & TypeScript)**: Architecting modular component systems, custom hooks, and streaming state synchronization.
- **Reactive State & Dashboards (Vue 3 & Pinia)**: Utilizing the Vue 3 Composition API and Pinia store architecture for clean, reactive, and maintainable client code.
- **Cross-Platform Mobile (React Native)**: Developing native iOS and Android experiences with JWT authentication, hardware camera barcode scanning, and external payment SDKs.
- **Real-Time Data Streaming**: Integrating bidirectional WebSockets for low-latency voice telemetry, live collaboration, and instant updates.

### Featured Frontend & Mobile Projects:
- **Brackets Genie**: Built responsive telemetry dashboards in **React 18** and **TypeScript** with real-time **WebSocket** streams connecting users to multi-step AI agents.
- **Time Manager**: Designed dual reactive frontends in **Vue 3** (Composition API, Pinia) and **React** with live synchronization against an Elixir backend.
- **Trinity Dev-App**: Engineered a cross-platform mobile client with **React Native**, **Open Food Facts API** camera barcode scanning, and **PayPal** checkout.

### Suggested Inquiries:
? Tell me about Brackets Genie and agentic WebSockets.
? What backend architectures and frameworks do you build with?
? What DevOps services do you offer for frontend deployments?`;
  }

  // 2k. BACKEND & MICROSERVICES CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /back[\s-]*end|microservice|distributed\s*system|api\s*design|rest\s*api|fastapi|django|celery|redis|elixir|phoenix|backend\s*capabilities/i.test(q)
  ) {
    return `### Backend & Distributed Microservices Capabilities

I design resilient, high-throughput backend services and asynchronous distributed pipelines:

- **Asynchronous Python Backends**: Building high-speed RESTful microservices with **FastAPI** and **Django REST Framework**, leveraging async event loops and Pydantic validation.
- **High-Concurrency Systems (Elixir & Phoenix)**: Utilizing the Erlang BEAM runtime for fault-tolerant, concurrent process execution and lightweight socket channels.
- **Distributed Worker Pools (Celery & Redis)**: Offloading heavy, long-running computational jobs (such as document OCR, LLM inference, and report compilation) to asynchronous background workers.
- **Relational & Document Databases**: Designing normalized schemas, connection pooling, and ACID-compliant transactional flows with **PostgreSQL**, **SQLite**, and **DynamoDB**.
- **Robust Security**: Enforcing JSON Web Tokens (JWT), Role-Based Access Control (RBAC), and automated SonarQube quality gates.

### Featured Backend Projects:
- **DoctorIQ**: Built asynchronous clinical ingestion microservices with **Python (Django REST)**, **Celery**, and **Redis**, slashing processing latency by 70%.
- **Ledgeroo**: Engineered a secure FinTech backend with strict database locking in **Django 4.2**, **PostgreSQL**, and automated **Stripe API** webhook billing.
- **Time Manager**: Architected an enterprise live tracking backend in **Elixir** and **Phoenix**, achieving sub-millisecond socket concurrency.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? What are your DevOps capabilities with Docker and CI/CD?
? Tell me about your machine learning and GenAI capabilities.`;
  }

  // 2l. APPLIED GENAI & MACHINE LEARNING CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /ai\b|genai|generative\s*ai|llm|agentic|langgraph|langchain|rag|computer\s*vision|machine\s*learning|deep\s*learning|ai\s*capabilities/i.test(q)
  ) {
    return `### Applied Generative AI & Machine Learning Capabilities

I combine deep machine learning foundations with applied agentic engineering for enterprise automation:

- **Agentic Multi-Step Systems**: Building cyclic graph workflows using **LangGraph** and **LangChain** with tool invocation, state preservation, and fallback routing.
- **Model Orchestration & Prompt Optimization**: Integrating **Anthropic Claude API** and **OpenAI API** models with structured outputs, prompt caching, and cost-efficient token utilization.
- **Empirical Machine Learning & CV**: Deep experience training, tuning, and evaluating models with **PyTorch**, **TensorFlow**, and **Scikit-learn**, applying stratified cross-validation and ROC-AUC metrics.
- **Multimodal Document Processing**: Combining optical character recognition (OCR) with LLM parsing to transform unstructured visual documents into validated JSON schemas.

### Featured AI & Machine Learning Projects:
- **Brackets Genie**: Multi-agent conversational system using **LangGraph**, **Claude API**, and **FastAPI WebSockets** with sub-50ms token streaming.
- **DoctorIQ**: Multimodal clinical document extraction system reducing turnaround time by 70% with OCR and LLM synthesis.
- **Zoidberg 2.0**: Empirical medical imaging benchmark evaluating **DenseNet121**, custom **CNNs**, and ensemble classifiers with 5-fold cross-validation.
- **Tamiami Fitness**: NLP booking assistant using **Dialogflow** and custom OCR models on **AWS Lambda** automating 90% of bookings.

### Suggested Inquiries:
? Tell me about Brackets Genie and LangGraph agent orchestration.
? Tell me about DoctorIQ and clinical document extraction.
? What backend architectures do you use to serve ML models?`;
  }

  // 2m. PROJECT MANAGEMENT & AGILE LEADERSHIP CAPABILITIES (DOMAIN-ADAPTIVE)
  if (
    /project\s*management|agile|scrum|product\s*owner|sprint|leadership|jira|clickup|team\s*lead|pm\s*capabilities/i.test(q)
  ) {
    return `### Project Management & Agile Technical Leadership

I lead engineering teams by combining technical clarity, transparent sprint communication, and delivery metrics:

- **Agile Scrum Methodology**: Facilitating sprint planning, backlog grooming, daily standups, and retrospectives to maintain steady velocity and team alignment.
- **Task Management & Tooling**: Utilizing **Jira**, **ClickUp**, and GitHub Projects with clear acceptance criteria and issue tracking.
- **Metrics-Driven Delivery (DORA)**: Tracking Deployment Frequency, Lead Time, Change Failure Rate, and MTTR to systematically identify and eliminate bottlenecks.
- **Pedagogical Mentoring & Growth**: Mentoring junior developers and student cohorts, running architecture workshops, and establishing high standards through constructive code reviews.

### Featured Leadership Experience:
- **VIF Project Lead**: Led a cross-functional team of 4 software engineers in delivering an enterprise sports platform on schedule through 2-week Agile sprints and PR reviews.
- **EPITECH Paris Pedagogical Assistant**: Guided engineering student cohorts through complex systems programming, Docker containerization, and clean code practices.
- **Trinity DevOps Software Factory**: Implemented automated SonarQube quality gates and gitStream workflows to safeguard team release cadence.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? Tell me about VIF and your project leadership experience.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 3. PASSIONS & HOBBIES (Cooking, Traveling, Poetry, Photography, Fitness, etc.)
  if (
    /passion|hobb(y|ies)|loisir|free time|outside of work|life beyond code|cooking|cook|food|travel|travelling|traveling|poesie|poetry|photograph(y|ie)|\b(sport|sports|gym)\b|chess/i.test(q) ||
    (/\bfitness\b/i.test(q) && !/tamiami/i.test(q))
  ) {
    return `### Passions & Life Beyond Code

Beyond software engineering and deep learning, I invest my energy in creative, exploratory, and disciplined pursuits:

- **Cooking & Gastronomy**: Passionate about culinary creation, blending authentic heritage spices with French bistro techniques. I love hosting meals that bring friends and team members together.
- **Traveling & Cultural Exploration**: Visiting historical European cities, architectural landmarks, museums, and distinct regional cultures across France and internationally.
- **Poésie / Poetry**: Deep appreciation for classical and modern poetry and creative writing that sharpens clarity of language, metaphor, and mindful thought.
- **Photographie / Photography**: Capturing urban geometry, Parisian street life, and the interplay between architecture and natural lighting.
- **Sport & Fitness**: Consistent strength conditioning, calisthenics, and cardiovascular conditioning. Builds mental discipline, physical resilience, and daily focus.
- **Tech Deep Dives & ArXiv**: Reading foundational machine learning preprints, distributed system post-mortems, and experimenting with agentic frameworks.
- **Chess & Strategy**: Solving tactical chess puzzles and strategy games that test pattern recognition and calculation under constraints.

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).
? What is your current availability, working status, and location preference in Paris?`;
  }

  // 4. RECRUITER SPECIFIC: WHY HIRE MOIZ & KEY STRENGTHS
  if (
    /why hire|why should we hire|recruiter|notice period|when can you start|visa|work permit|sponsorship|contract type|why moiz|candidate/i.test(q)
  ) {
    return `### Why Hire Muhammad Abdul Moiz?

Here is what I bring to high-performing engineering organizations:

- **Dual Engineering Depth**: Real-world production experience building asynchronous microservices (Python, FastAPI, Django, Celery, Docker, AWS) combined with empirical ML research and GenAI agent systems.
- **Proven Pedagogical Leadership**: As Pedagogical Assistant at EPITECH Paris, I train engineering student cohorts daily, proving exceptional technical vulgarization, empathy, and mentoring skills.
- **End-to-End Ownership**: From system architecture, database optimization, and Docker standardization to CI/CD release gates and reverse proxies.
- **International & Cross-Functional**: Fluent English (C1) and working French (B1) with hands-on Agile/Scrum delivery experience in international teams.
- **Immediate Value in Paris & Remote**: Flexible for full-time CDI, CDD, or contract roles with student working rights / talent passport eligibility.

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).
? What is your current availability, working status, and location preference in Paris?`;
  }

  // 5. SPECIFIC: WHAT IS EPITECH?
  if (
    /what is epitech|about epitech|tell me about epitech|epitech school|epitech paris|what is epitech paris/i.test(q)
  ) {
    return `### EPITECH Paris (European Institute of Information Technology)

**EPITECH** is a renowned French computer science and software engineering Grande École founded in Paris in 1999, famous for its hands-on, project-based peer-learning model that mirrors real-world production environments.

**My dual connection to EPITECH Paris:**
- **Master of Science in Information Technology (2025–2027)**: I am actively pursuing my advanced graduate degree here, specializing in distributed systems, software architecture, and technical leadership.
- **Pedagogical Assistant (September 2024 – Present)**: I am also employed by EPITECH Paris to train and mentor engineering student cohorts in Linux internals, Docker containerization, backend architectures, and algorithmic problem-solving.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? What did you study at FAST-NUCES?
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 6. SPECIFIC: WHAT SCHOOLS HAVE YOU BEEN PART OF? / EDUCATION / STUDIES
  if (
    /(what|which)\s*(school|university|college|institution)|where did you (study|go to school)|what is your education|education|academic background|studies|study history|universit(y|ies)|degrees?/i.test(q)
  ) {
    return `### Academic Foundation & Schools

I have been part of two leading engineering institutions:

1. **EPITECH Paris** *(Paris, France | 2025 – 2027)*
   - **Degree**: Master of Science in Information Technology (MSc IT)
   - **Focus**: Advanced software architectures, distributed cloud systems, and technical leadership.
   - **Role**: Simultaneously serving as **Pedagogical Assistant**, mentoring student cohorts in modern Linux systems, Docker, and algorithms.

2. **FAST-NUCES** *(2020 – 2024)*
   - **Degree**: Bachelor of Science in Computer Science (BSCS)
   - **Focus**: Rigorous computer science foundations including data structures, algorithmic complexity, operating systems, and machine learning.

### Suggested Inquiries:
? Tell me about your role as Pedagogical Assistant at EPITECH Paris.
? What was your focus at FAST-NUCES?
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 7. SPECIFIC: WHAT IS FAST-NUCES?
  if (/fast[\s-]*nuces|fast university|national university of computer/i.test(q)) {
    return `### FAST-NUCES (National University of Computer & Emerging Sciences)

**FAST-NUCES** is widely recognized as one of the premier computer science universities in Pakistan, known for its intense mathematical rigor, operating systems focus, and competitive programming culture.

- **My Degree**: Bachelor of Science in Computer Science (BSCS, 2020–2024).
- **Core Focus**: Algorithms, data structures, distributed computing, database internals, and computer vision.
- **Outcome**: Built the deep computer science foundation that powers my current machine learning and backend engineering work at EPITECH and in industry.

### Suggested Inquiries:
? Tell me about your Master of Science program at EPITECH Paris.
? Tell me about your featured machine learning projects (Zoidberg 2.0).
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 8. PEDAGOGICAL ASSISTANT / TEACHING / MENTORING
  if (/pedagogical|assistant|mentor|teaching|teach|students|workshops|vulgarization/i.test(q)) {
    return `### Pedagogical Assistant @ EPITECH Paris
*September 2024 – Present | Paris, France*

In my role as Pedagogical Assistant, I bridge advanced engineering theory with hands-on practice for engineering cohorts:
- **Cohort Mentoring**: Guiding engineering students through Linux internals, multi-stage Docker containerization, low-level systems, and algorithmic problem-solving.
- **Technical Workshops**: Designing and facilitating interactive modules translating abstract concepts (such as distributed backends and AI architectures) into working code.
- **Technical Vulgarization**: Cultivating the ability to explain complex technical designs clearly to diverse teams and stakeholders.

### Suggested Inquiries:
? Tell me about your engineering work at Brackets Private Limited.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 9. BRACKETS PRIVATE LIMITED / INDUSTRY EXPERIENCE
  if (/brackets|associate software engineer|previous job|industry experience/i.test(q)) {
    return `### Associate Software Engineer @ Brackets Private Limited
*July 2024 – August 2025 | International / Remote*

At Brackets, I worked in cross-functional Agile/Scrum sprints delivering production software:
- **Backend & APIs**: Developed high-throughput REST APIs and modular microservices using **Python (FastAPI, Django)** and **Node.js**.
- **DevOps & Cloud**: Standardized containerization with **Docker** and built automated **CI/CD pipelines** deploying workloads onto **AWS and GCP**.
- **Applied GenAI**: Engineered multimodal OCR-to-LLM pipelines using **OpenAI API** and **LangChain** for enterprise document processing.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Brackets Genie and real-time WebSockets.
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 10. GENERAL EXPERIENCE / WORK HISTORY
  if (/experience|career|work history|where have you worked|jobs|companies/i.test(q)) {
    return `### Professional Experience Overview

1. **Pedagogical Assistant @ EPITECH Paris** *(Sept 2024 – Present | Paris, France)*
   - Mentoring engineering cohorts in modern software architecture, Linux, Docker, and algorithms.
   - Designing hands-on instructional workshops and technical challenges.

2. **Associate Software Engineer @ Brackets Private Limited** *(July 2024 – Aug 2025 | Remote)*
   - High-throughput REST APIs & microservices with Python (FastAPI/Django) and Node.js.
   - Multi-cloud CI/CD automation and containerized deployments across AWS and GCP.
   - Enterprise OCR-to-LLM document processing pipelines with OpenAI and LangChain.

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 17. ALL PROJECTS / PORTFOLIO SHOWCASE
  if (/projects?|portfolio|what have you built|inventions|showcase/i.test(q)) {
    return `### Featured Engineering Portfolio (8 Key Projects)

1. **DoctorIQ**: Multimodal healthcare document platform cutting turnaround time by 70% with OCR, Claude/OpenAI APIs, Celery, and AWS.
2. **Brackets Genie**: Real-time multi-agent conversational platform with LangGraph, LangChain, sub-50ms WebSockets, and Claude/OpenAI.
3. **VIF**: Food solidarity web & mobile platform led from functional specs to production delivery with FastAPI, React Native, and DORA tracking.
4. **Ledgeroo**: Secure FinTech backend with encrypted transactions, automated Stripe API billing, and AWS CI/CD.
5. **Trinity Suite (Dev-Web, Dev-App, DevOps)**: Complete Software Factory pipeline with SonarQube quality gates, 90%+ test coverage, Django REST, React 18, and React Native PayPal checkout.
6. **Time Manager**: High-concurrency real-time tracking tool in Elixir (Phoenix), Vue 3 & React, PostgreSQL, and WebSockets.
7. **Tamiami Fitness**: AI booking automation and OCR pipeline on AWS Lambda and DynamoDB, automating 90% of bookings.
8. **Zoidberg 2.0**: Medical image deep learning benchmarking pipeline evaluating 6 CNN/DenseNet121 models with stratified CV and ROC-AUC.

Which project would you like to explore in detail?

### Suggested Inquiries:
? Tell me about DoctorIQ and clinical document extraction.
? Tell me about Brackets Genie and agentic WebSockets.
? Tell me about Ledgeroo and FinTech Stripe integration.`;
  }

  // 18. TECH STACK & SKILLS
  if (/skills?|tech\s*stack|technologies|tools|what do you use|languages\s*do\s*you\s*code/i.test(q)) {
    return `### Core Technical Stack & Capabilities

- **Backend & Microservices**: Python (FastAPI, Django), TypeScript, Node.js, Elixir (Phoenix), PostgreSQL, Redis, Celery, WebSockets.
- **Frontend & Mobile**: React 18, Vue 3, React Native (TypeScript), Tailwind CSS, State Synchronization, Performance-tuned Hooks.
- **DevOps, DevSecOps & Cloud**: Docker & Compose, GitLab CI, GitHub Actions YAML, AWS (EC2, S3, Lambda, Bedrock, SageMaker), GCP, SonarQube, DORA Metrics, gitStream, Nginx.
- **Generative AI & Agentic Systems**: LangGraph (multi-step agents), LangChain, Anthropic Claude API, OpenAI API, Gemini Pro, RAG pipelines, Prompt Engineering.
- **Data Science & ML**: PyTorch, TensorFlow, scikit-learn, DenseNet121, CNNs, PCA, OpenCV, Pandas.

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Tell me about DoctorIQ's cloud & Celery architecture.
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?`;
  }

  // 19. SPECIFIC TECH: PYTHON / DOCKER / AWS / FASTAPI / ELIXIR / VUE
  if (/\b(python|fastapi|django)\b/i.test(q)) {
    return `**Python** is my core language for both high-concurrency backends and machine learning:
- **FastAPI**: Used for asynchronous microservices in platforms like *VIF* and *Brackets Genie*.
- **Django**: Paired with Celery, Redis, and PostgreSQL for robust enterprise systems like *DoctorIQ*, *Ledgeroo*, and *Trinity Dev-Web*.
- **ML & GenAI**: Daily production use with PyTorch, TensorFlow, LangGraph, LangChain, and Anthropic/OpenAI APIs.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? Do you have experiences of DevOps and what services do you offer as DevOps?
? What is your full backend and database tech stack?`;
  }

  if (/\b(docker|aws|gcp|devops|cloud|ci\/cd|kubernetes)\b/i.test(q)) {
    return `### Cloud & DevOps Engineering
- **Containerization**: Standardizing local and cloud setups with multi-stage **Docker** and Docker Compose.
- **CI/CD & DevSecOps**: Automated release gates with **GitLab CI**, **GitHub Actions**, **gitStream**, and **SonarQube** code quality scans.
- **Cloud Deployments**: 20+ production deployments across **AWS (EC2, S3, Lambda, LightSail)** and **GCP**, with DORA metrics tracking.

### Suggested Inquiries:
? Tell me about DoctorIQ's cloud & Celery architecture.
? What is your full backend and database tech stack?
? What roles and contracts are you available for in Paris?`;
  }

  // 20. SPOKEN LANGUAGES
  if (/language|speak|fluent|french|english|urdu/i.test(q)) {
    return `### Spoken Languages

- **English**: **C1** — Full professional, technical, and client-facing fluency.
- **French**: **B1.1** — Working proficiency, actively communicating and studying in Paris.
- **Urdu**: **Native** speaker.

### Suggested Inquiries:
? What is your current availability, working status, and location preference in Paris?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Tell me about your academic background at EPITECH Paris.`;
  }

  // 21. LOCATION / PARIS
  if (/location|paris|france|where (are you|do you live|based)/i.test(q)) {
    return `I am currently based in **Paris, France**!

I study and mentor at EPITECH Paris and am available for opportunities in Paris/Île-de-France (on-site or hybrid) as well as remote roles internationally.

### Suggested Inquiries:
? What is your current availability, working status, and location preference in Paris?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 22. AVAILABILITY, ALTERNANCE & TARGET OPPORTUNITY
  if (/hire|available|availability|opportunity|job|contract|internship|roles|work together|alternan|apprenti|work[\s-]*study|contrat de pro|september 2026|septembre 2026/i.test(q)) {
    return `### Availability & Target Opportunity (September 2026)

**Current Status**: Actively seeking a **12-Month Alternance / Apprenticeship / Work-Study** starting from **September 2026** (or CDI, CDD, or internship leading to alternance)!

**Target Roles**:
- **Software Engineer (Backend / Full-Stack)**: Python (FastAPI, Django), TypeScript, React 18, Vue 3, Node.js
- **DevOps & Cloud Engineer / DevSecOps**: CI/CD pipelines, Docker, AWS/GCP, SonarQube, DORA metrics, Nginx
- **AI & Data Engineer / GenAI Specialist**: LangGraph, LangChain, Claude API, OpenAI, RAG, PyTorch
- **Junior Web Project Manager**: Agile/Scrum sprint coordination (Jira, ClickUp), functional specifications, delivery ownership

**Key Details**:
- **Location**: Paris, France (Available for on-site, hybrid, remote, or relocation)
- **Work Authorization**: Full working rights in France (student working rights / talent passport eligible)
- **Languages**: Fluent English (C1 - Client-Facing/Technical), Working French (B1.1), Native Urdu

Connect directly with me at **${profile.email}** or on [LinkedIn](${profile.linkedin})!

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Do you have experiences of DevOps and what services do you offer as DevOps?
? What is your full backend and database tech stack?`;
  }

  // 18. CONTACT DETAILS
  if (/contact|email|phone|reach|message|linkedin|github/i.test(q)) {
    return `### Direct Contact Details

- **Email**: [${profile.email}](mailto:${profile.email})
- **Phone**: [${profile.phone}](tel:${profile.phone.replace(/\s+/g, '')})
- **LinkedIn**: [linkedin.com/in/moizghauri](${profile.linkedin})
- **GitHub**: [github.com/amoiz0468](${profile.github})
- **Location**: ${profile.location} (Paris, France)

### Suggested Inquiries:
? What roles and contract types are you open to?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).`;
  }

  // 19. WHO ARE YOU / BIO
  if (/(who are you|about you|tell me about yourself|introduce yourself|bio|summary)/i.test(q)) {
    return `I'm **Muhammad Abdul Moiz**, a Software & Machine Learning Engineer based in Paris.

Currently, I'm pursuing my **MSc in Information Technology at EPITECH Paris** while working as a **Pedagogical Assistant** mentoring engineering student cohorts. Previously, I was an **Associate Software Engineer at Brackets**, building high-throughput microservices, containerized infrastructure, and multimodal OCR-to-LLM pipelines.

### Suggested Inquiries:
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Do you have experiences of DevOps and what services do you offer as DevOps?
? What are your passions and hobbies outside of work?`;
  }

  // 20. THANKS & HUMOR
  if (/thank|thanks|merci|cool|awesome|great|good job|nice/i.test(q)) {
    return `You're very welcome! Let me know if there's anything else about my projects, tech stack, or experience at EPITECH and Brackets that you'd like to explore.

### Suggested Inquiries:
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Zoidberg 2.0).
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Do you have experiences of DevOps and what services do you offer as DevOps?`;
  }

  // 23. INTELLIGENT COMPREHENSIVE DEFAULT (Friendly & Helpful, never rigid)
  return `I'm here to help as Muhammad Abdul Moiz's AI twin. You can explore:

- **DevOps & Software Factory**: GitLab CI, GitHub Actions, Docker, AWS & GCP deployments, SonarQube quality gates, DORA metrics
- **Schools & Studies**: MSc in Information Technology at **EPITECH Paris** & BSCS at **FAST-NUCES**
- **Roles & Experience**: Teaching at **EPITECH Paris** & backend engineering at **Brackets Private Limited**
- **Featured Projects**: *DoctorIQ* (AI healthcare OCR/LLM), *Brackets Genie* (real-time WebSockets & LangGraph), *VIF* (food solidarity), *Ledgeroo* (FinTech Stripe), *Trinity Suite*, and *Zoidberg 2.0*
- **Technical Stack**: Python (FastAPI, Django), TypeScript, React 18, Vue 3, Elixir, Docker, AWS, GCP, PyTorch, LangChain, LangGraph
- **Target Opportunity**: Seeking a **12-Month Alternance (from September 2026)** or CDI/CDD in Paris/Remote
- **Direct Contact**: Reach me directly at \`${profile.email}\`

### Suggested Inquiries:
? Do you have experiences of DevOps and what services do you offer as DevOps?
? Why should a recruiter hire Muhammad Abdul Moiz for engineering roles?
? Tell me about your featured projects (DoctorIQ, Brackets Genie, Ledgeroo, VIF).
? What are your passions and hobbies outside of work?`;
}

/**
 * Call Google Gemini API
 */
