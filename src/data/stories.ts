import { IconType } from 'react-icons';
import {
  FiCpu,
  FiServer,
  FiCloud,
  FiActivity,
  FiAward,
} from 'react-icons/fi';

export type StoryItem = {
  step: string;
  eyebrow: string;
  icon: IconType;
  title: string;
  subtitle: string;
  context: string;
  badge: string;
  badgeColor: string;
  description: string;
  highlights: string[];
  metric: string;
  metricLabel: string;
  tag: string;
  stack: string[];
};

export const STORIES: StoryItem[] = [
  {
    step: '01',
    eyebrow: 'Applied Generative AI',
    icon: FiCpu,
    title: 'Autonomous Agent Systems & Multimodal AI',
    subtitle: 'Transforming experimental LLMs into high-throughput production platforms.',
    context: 'DoctorIQ Platform & GenAI Workflows',
    badge: 'Live In Production',
    badgeColor: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
    description:
      'Engineered multimodal document extraction and real-time streaming platforms. Combined high-precision OCR with LLM orchestration (OpenAI API, Google Gemini Pro, LangChain) and async Celery workers to cut document extraction time by 70%.',
    highlights: [
      'DoctorIQ Platform: OCR-to-LLM pipeline slashing document extraction time by 70% with structured JSON outputs.',
      'Real-time bidirectional token streaming using WebSockets in Python and Node.js.',
      'Autonomous multi-agent workflows, vector retrieval (RAG), and prompt engineering in Agile sprints.',
    ],
    metric: '70%',
    metricLabel: 'Extraction latency reduction in DoctorIQ medical pipeline',
    tag: 'Production GenAI',
    stack: ['Python', 'OpenAI API', 'Gemini Pro', 'LangChain', 'Celery', 'Redis', 'AWS'],
  },
  {
    step: '02',
    eyebrow: 'Backend & Microservices',
    icon: FiServer,
    title: 'Modular Microservices & Distributed Architecture',
    subtitle: 'High-concurrency RESTful backends engineered for zero request blocking.',
    context: 'Associate Software Engineer @ Brackets',
    badge: 'High Concurrency',
    badgeColor: 'text-violet-300 border-violet-500/30 bg-violet-500/10',
    description:
      'Architected modular backend microservices and high-concurrency REST APIs using Python (FastAPI, Django) and Node.js. Decoupled CPU-intensive workloads via Celery task queues and Redis brokers to maintain consistent sub-100ms API response latencies.',
    highlights: [
      'Engineered modular microservices and high-throughput REST APIs handling high concurrent request loads.',
      'Decoupled asynchronous worker queuing with Celery, Redis message brokers, and live WebSocket feeds.',
      'Optimized PostgreSQL schemas with connection pooling, transactional integrity, and automated migrations.',
    ],
    metric: '8+',
    metricLabel: 'Core tech stacks mastered across Python, Node.js, and Cloud backends',
    tag: 'Backend Architecture',
    stack: ['FastAPI', 'Django', 'Node.js', 'PostgreSQL', 'Redis', 'Celery', 'WebSockets'],
  },
  {
    step: '03',
    eyebrow: 'Cloud & Infrastructure',
    icon: FiCloud,
    title: 'Resilient Cloud Deployment & Continuous Delivery',
    subtitle: 'Multi-cloud containerization on AWS and GCP with automated CI/CD gates.',
    context: 'DevOps Workflows & Cloud Infrastructure',
    badge: 'Automated CI/CD',
    badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    description:
      'Standardized development and production execution environments using multi-stage Docker builds and Docker Compose. Constructed automated testing, linting, and deployment pipelines using GitHub Actions and GitLab CI across AWS and GCP.',
    highlights: [
      'Standardized container environments across local, staging, and production using multi-stage Dockerfiles.',
      'Automated testing and continuous delivery gates with GitHub Actions and GitLab CI ensuring zero-defect merges.',
      'Orchestrated scalable workloads across AWS (EC2, S3, LightSail) and Google Cloud Platform.',
    ],
    metric: '20+',
    metricLabel: 'Cloud and DevOps production deployments executed across AWS and GCP',
    tag: 'Cloud & CI/CD',
    stack: ['Docker', 'AWS EC2 / S3', 'GCP', 'GitHub Actions', 'GitLab CI', 'Linux'],
  },
  {
    step: '04',
    eyebrow: 'Machine Learning Research',
    icon: FiActivity,
    title: 'Deep Learning Research & Computer Vision Inference',
    subtitle: 'Empirical benchmarking, stratified cross-validation, and production inference.',
    context: 'Zoidberg 2.0 & Freshie Deployments',
    badge: 'Empirical ML',
    badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
    description:
      'Engineered automated medical image benchmarking pipelines (Zoidberg 2.0) comparing six convolutional and transfer-learning architectures with stratified cross-validation. Deployed real-time computer vision inference endpoints behind reverse proxies.',
    highlights: [
      'Automated deep learning benchmarking pipeline evaluating DenseNet121 and custom CNN architectures.',
      'Stratified 5-fold cross-validation preventing dataset bias and ensuring clinical-grade accuracy.',
      'Production computer vision inference deployed on AWS LightSail behind Apache reverse proxy with SSL routing.',
    ],
    metric: '10+',
    metricLabel: 'AI, Deep Learning, and Computer Vision project implementations & benchmarks',
    tag: 'Deep Learning & CV',
    stack: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'CNN', 'DenseNet121'],
  },
  {
    step: '05',
    eyebrow: 'Mentorship & Leadership',
    icon: FiAward,
    title: 'Pedagogical Mentorship & Engineering Delivery',
    subtitle: 'EPITECH Paris Assistant & Brackets Engineer | MSc IT + BSCS | English C1 & French B1.',
    context: 'EPITECH Paris & Industry Experience',
    badge: 'Paris Academic Lead',
    badgeColor: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
    description:
      'Serving as Pedagogical Assistant at EPITECH Paris mentoring student cohorts in Linux internals, Docker, and algorithms, following 13 months as Associate Software Engineer at Brackets. Dual-degree rigor (MSc IT at EPITECH, BSCS at FAST-NUCES) with C1 English & B1 French.',
    highlights: [
      'Mentored engineering cohorts through modern software architecture, Linux environments, and Docker setups.',
      'Designed and facilitated interactive workshops, advancing technical vulgarization for complex systems.',
      'Cross-cultural collaboration in international teams across English (C1 Fluent) and French (B1 Working).',
    ],
    metric: 'EPITECH',
    metricLabel: 'Paris Pedagogical Assistant & Engineering Cohort Mentor (2024–Present)',
    tag: 'Leadership & Delivery',
    stack: ['Systems Architecture', 'Linux Internals', 'Agile / Scrum', 'English C1', 'French B1'],
  },
];
