import { profile } from '../../data/portfolio';

/**
 * Intelligent French Fallback Engine for Moiz's Portfolio AI Twin
 * Strictly ZERO emojis.
 */
export function generateFrenchFallbackReply(q: string): string {
  // 1. GREETINGS & CASUAL HELLOS
  if (
    /^(bonjour|salut|coucou|hello|hi|hey|bonsoir|bienvenue|salutations|yo)\b/i.test(q) ||
    q === 'bonjour' ||
    q === 'salut' ||
    q === 'coucou'
  ) {
    return `Bonjour ! Ravi d'échanger avec vous.

Je suis le double numérique IA de **Muhammad Abdul Moiz**. Vous pouvez explorer :
- **DevOps & Software Factory Cloud** : Automatisation CI/CD, conteneurisation Docker, déploiements AWS/GCP, SonarQube & métriques DORA
- **Pourquoi recruter Moiz** : Microservices haute disponibilité, pipelines GenAI, agents intelligents & leadership pédagogique
- **Passions & Hobbies** : Cuisine, voyages, poésie, photographie, fitness & échecs
- **Formation Académique** : MSc en Technologies de l'Information à l'**EPITECH Paris** & BSCS à **FAST-NUCES**
- **Expérience** : Assistant Pédagogique à l'**EPITECH Paris** & Ingénieur Logiciel chez **Brackets**
- **Projets Phares** : *DoctorIQ*, *Brackets Genie*, *VIF*, *Ledgeroo*, *Trinity*, et *Zoidberg 2.0*
- **Stack Technique** : Python (FastAPI/Django), TypeScript, React 18, Vue 3, Elixir, Docker, AWS, GCP, PyTorch
- **Opportunité Ciblée** : Recherche active d'une **Alternance de 12 mois (dès Septembre 2026)** ou CDI/CDD à Paris ou en télétravail

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
? Quels sont vos projets phares (DoctorIQ, Brackets Genie, Ledgeroo, VIF) ?
? Quels sont vos centres d'intérêt et passions en dehors du travail ?`;
  }

  // 2. DEVOPS & INFRASTRUCTURE CLOUD
  if (
    /\b(devops|ci[\s/-]?cd|docker|conteneur(isation)?|aws|gcp|cloud|infrastructure|reverse proxy|nginx|apache|deploiement|dora|sonarqube)\b/i.test(q)
  ) {
    return `### Compétences DevOps & Infrastructure Cloud

J'ai une solide expérience de production en ingénierie DevOps pour concevoir des infrastructures fiables, des environnements conteneurisés et des chaînes de déploiement continu :

- **Conteneurisation & Orchestration Docker** : Conception de builds Docker multi-étapes optimisés pour des images ultra-légères. Standardisation des environnements locaux et staging avec Docker Compose.
- **CI/CD Automatisée & DevSecOps** : Mise en œuvre de pipelines automatisés de test, de linting et de livraison via **GitLab CI** et **GitHub Actions YAML**. Configuration des règles de fusion **gitStream** et des contrôles de qualité **SonarQube** (70% à 90%+ de couverture).
- **Visibilité de Livraison & Métriques DORA** : Suivi des 4 métriques clés (Fréquence de Déploiement, Lead Time, Change Failure Rate, MTTR) pour mesurer et optimiser la vélocité.
- **Plateformes Cloud (AWS & GCP)** : Déploiement et sécurisation de services sur **AWS (EC2, S3, Lambda, Bedrock, LightSail)** et **GCP**, avec gestion stricte des identités IAM et des variables d'environnement.
- **Reverse Proxies & Durcissement Sécurité** : Déploiement d'APIs derrière **Nginx** et **Apache**, automatisation des certificats SSL/TLS Let's Encrypt et routage WebSocket.
- **Files de Tâches Asynchrones** : Architecture haute concurrence avec **Celery** et **Redis** pour les traitements distribués lourds (ex: extraction OCR et LLM dans *DoctorIQ*).
- **Administration Systèmes & Linux** : Maîtrise approfondie des systèmes Linux (systemd, gestion de processus, bash). J'enseigne également Docker et Linux aux étudiants d'EPITECH Paris.

### Services DevOps Proposés :
1. **Mise en place de Software Factory & CI/CD** : Pipelines GitLab CI ou GitHub Actions avec tests automatisés, SonarQube et publication d'images Docker.
2. **Tableaux de bord DORA & Vélocité Logicielle** : Mesure continue de la fréquence et de la fiabilité des livraisons.
3. **Dockerisation & Migration de Conteneurs** : Modularisation de monolithes ou microservices via Dockerfiles multi-étapes.
4. **Architecture & Déploiements Cloud** : Mise en production résiliente d'APIs et de services ML sur AWS et GCP.
5. **Reverse Proxy, SSL & Sécurité Web** : Configuration Nginx, HTTPS automatique et limitation de débit.

### Projets DevOps Phares :
- **Trinity DevOps Software Factory** : Builds Docker multi-étapes, contrôles SonarQube stricts et livraison conteneurisée derrière Nginx.
- **DoctorIQ Cloud Architecture** : Cluster de workers asynchrones haute performance sur AWS (EC2, S3, Lambda) avec Celery et Redis.
- **Livraison DORA & gitStream** : Automatisation de la revue de code et de la fusion avec métriques de livraison en temps réel.

### Suggestions de questions :
? Parlez-moi de l'architecture cloud et Celery de DoctorIQ.
? Quelle est votre stack technique backend et bases de données ?
? Quels types de contrats et disponibilités avez-vous sur Paris ?`;
  }

  // 3. ALTERNANCE & RECHERCHE DE CONTRAT
  if (/\b(alternance|contrat|stage|emploi|recrutement|disponibilit(e|é)|rythme|septembre|embauche|cdd|cdi)\b/i.test(q)) {
    return `### Disponibilité & Recherche d'Alternance (Septembre 2026)

Je recherche activement une **Alternance de 12 mois** à compter de **Septembre 2026** basée en Île-de-France (Paris) ou en télétravail :

- **Rythme** : Adapté au programme Master of Science de l'**EPITECH Paris**.
- **Statut Légal** : Autorisation complète et valide de travail en France.
- **Postes Ciblés** :
  * Ingénieur DevOps / Cloud Infrastructure / Platform Engineer
  * Ingénieur Machine Learning / GenAI Specialist
  * Ingénieur Logiciel Back-End / Full-Stack
- **Atouts Clés** : Expérience industrielle concrète, autonomie sur les pipelines CI/CD, leadership technique et rigueur pédagogique acquise à EPITECH Paris.
- **Contact Direct** : \`${profile.email}\` | \`${profile.phone}\`

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
? Quels projets en intelligence artificielle avez-vous réalisés ?`;
  }

  // 4. PROJETS SPECIFIQUES
  // 4a. DoctorIQ
  if (/doctoriq|doctor\s*iq|medical|sante|santé|clinique/i.test(q)) {
    return `### DoctorIQ — Plateforme IA d'Extraction Médicale

**DoctorIQ** est un système en production d'extraction de données cliniques conçu pour éliminer les goulots d'étranglement administratifs :
- **Réduction de 70% de la Latence** : Combinaison d'un OCR précis et de prompt engineering itératif avec les APIs OpenAI et Anthropic Claude.
- **Workers Asynchrones Haute Performance** : Architecture développée en **Python (Django REST)**, **Celery** et **Redis** pour ingérer des lots massifs de dossiers cliniques sans bloquer les requêtes clients.
- **Rapports Automatisés** : Extraction validée et compilation instantanée de comptes-rendus médicaux structurés en PDF.
- **Infrastructure Cloud** : Conteneurisé avec **Docker** et hébergé sur **AWS (EC2, S3, Lambda)** selon les standards de conformité de données sensibles.

### Suggestions de questions :
? Parlez-moi de Brackets Genie et de son architecture temps réel.
? Quelles sont vos compétences en DevOps et Cloud ?
? Pourquoi recruter Moiz pour une équipe d'ingénierie ?`;
  }

  // 4b. Brackets Genie
  if (/genie|brackets\s*genie|copilot|assistant\s*ia/i.test(q)) {
    return `### Brackets Genie — Copilote IA Temps Réel d'Entreprise

**Brackets Genie** est un assistant conversationnel haute vitesse pour la productivité d'équipe :
- **Streaming Bidirectionnel Temps Réel** : Implémenté via **WebSockets** et **FastAPI** pour un streaming fluide de réponses sans latence.
- **Orchestration Multi-Agents** : Construit avec **LangGraph** et **LangChain** pour router dynamiquement les requêtes complexes vers des sous-agents spécialisés.
- **Mémoire Conversationnelle & Contextuelle** : Maintien de l'historique et état de dialogue avec cache **Redis** ultra-rapide.
- **Interface Réactive** : Développée avec **React 18** et **Tailwind CSS**.

### Suggestions de questions :
? Parlez-moi du projet VIF et de la solidarité alimentaire.
? Quelles sont vos compétences et vos services en DevOps et Cloud ?`;
  }

  // 4c. VIF
  if (/vif|solidaire|solidarit(e|é)|alimentaire|bordeaux/i.test(q)) {
    return `### VIF (Vers Une Infinité De Femmes) — Plateforme Solidaire

Projet mené en tant que **Chef de Projet** et architecte technique pour optimiser la logistique de solidarité alimentaire :
- **Rôle de Leader Technique** : Coordination d'une équipe de développeurs, gestion des sprints agiles et communication avec l'association.
- **Pipeline GitLab CI & Qualité** : Déploiement continu avec tests automatisés et surveillance des métriques DORA.
- **Architecture Applicative** : Application mobile **React Native (Expo)** et console d'administration **Vue 3 / Vite** connectées à une API **Python**.
- **Impact Concret** : Plus de 10 000 repas distribués et réduction de 40% du temps de dispatch logistique.

### Suggestions de questions :
? Parlez-moi du projet FinTech Ledgeroo.
? Quels sont vos projets phares en DevOps et Cloud ?`;
  }

  // 4d. Ledgeroo
  if (/ledgeroo|comptabilit(e|é)|stripe|fintech|facturation/i.test(q)) {
    return `### Ledgeroo — Solution SaaS FinTech & Facturation

Plateforme de gestion financière pour les PME et indépendants :
- **Paiements & Abonnements Sécurisés** : Intégration complète de l'API **Stripe** (gestion des webhooks, abonnements récurrents et factures conformes).
- **Sécurité des Données Financières** : Chiffrement de bout en bout des transactions bancaires et conformité fiscale.
- **Backend Robuste** : Développé en **Python (FastAPI)** avec base relationnelle **PostgreSQL** et migrations automatisées.
- **Tableau de Bord Analytique** : Visualisation en temps réel des flux de trésorerie avec **React** et graphiques dynamiques.

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Parlez-moi de votre rôle à l'EPITECH Paris.`;
  }

  // 5. FORMATION ACADEMIQUE & EPITECH PARIS
  if (/\b(ecole|ecoles|etudes|formation|epitech|fast|diplome|universit(e|é)|scolarit(e|é))\b/i.test(q)) {
    return `### Formation Académique d'Excellence

Mon parcours combine une rigueur théorique en informatique fondamentale et une pédagogie par projets intensive :

1. **EPITECH Paris (2025 – 2027)**
   - **Diplôme** : Master of Science (MSc) in Information Technology
   - **Activités** : Assistant Pédagogique (encadrement et évaluation de promotions d'étudiants en C, C++, Linux, Docker et architecture logicielle).
   - **Projets Clés** : Conception de moteurs logiciels avancés, systèmes distribués et virtualisation.

2. **FAST-NUCES (2020 – 2024)**
   - **Diplôme** : Bachelor of Science in Computer Science (BSCS)
   - **Fondations** : Algorithmique avancée, structures de données, systèmes d'exploitation, bases de données relationnelles et intelligence artificielle.

### Suggestions de questions :
? Parlez-moi de votre rôle d'assistant pédagogique à EPITECH Paris.
? Quels sont vos projets phares en DevOps et Cloud ?
? Quelles sont vos disponibilités pour une alternance ?`;
  }

  // 6. CONTACT & COORDONNEES
  if (/\b(contact(er)?|email|mail|telephone|téléphone|coordonn[eé]es|joindre|ecrire|écrire|linkedin|github)\b/i.test(q)) {
    return `### Coordonnées & Prise de Contact Directe

Vous pouvez me joindre directement via les canaux suivants :

- **Email Direct** : [${profile.email}](mailto:${profile.email})
- **Téléphone** : [${profile.phone}](tel:${profile.phone.replace(/\s+/g, '')})
- **Localisation** : ${profile.location} (disponible sur site à Paris, en hybride ou à distance)
- **LinkedIn** : [${profile.linkedin}](${profile.linkedin})
- **GitHub** : [${profile.github}](${profile.github})
- **Formulaire Web** : Vous pouvez également m'envoyer un message via le formulaire sécurisé de la page Contact.

### Suggestions de questions :
? Quelle est votre disponibilité pour une alternance à partir de septembre 2026 ?
? Quelles sont vos compétences principales en ingénierie logicielle ?`;
  }

  // 7. PASSIONS & CENTRES D'INTERET
  if (/\b(passion|passions|loisir|loisirs|interet|interets|sport|cuisine|voyage|echecs|poesie|photographie)\b/i.test(q)) {
    return `### Passions & Centres d'Intérêt au-delà du Code

En dehors de l'ingénierie, je cultive des disciplines qui nourrissent la créativité, la rigueur et l'équilibre :

- **Cuisine & Gastronomie** : Exploration culinaire précise, associant équilibre des saveurs, patience et sens du détail.
- **Voyages & Découvertes** : Curiosité pour les nouvelles cultures et adaptation rapide aux environnements internationaux.
- **Poésie & Écriture** : Rigueur stylistique, concision et sens de la nuance.
- **Photographie Urbaine** : Sens de la composition visuelle et de l'observation minutieuse.
- **Sport & Fitness** : Constance, discipline d'entraînement et persévérance mentale.
- **Jeu d'Échecs** : Pensée stratégique, anticipation des variantes et prise de décision sous contrainte de temps.

### Suggestions de questions :
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
? Quelles sont vos compétences et vos services en DevOps et Cloud ?`;
  }

  // 8. POURQUOI RECRUTER MOIZ
  if (/\b(pourquoi|recruter|embaucher|atouts|points forts|valeur|difference)\b/i.test(q)) {
    return `### Pourquoi recruter Muhammad Abdul Moiz ?

Voici ce que j'apporte concrètement à une équipe d'ingénierie de haut niveau :

1. **Double Compétence Production & Pédagogie** : Capacité démontrée à concevoir des architectures robustes et à transmettre les bonnes pratiques aux pairs.
2. **Excellence DevOps & DevSecOps** : Automatisation complète des chaînes CI/CD, tests systématiques, contrôles SonarQube et visibilité par métriques DORA.
3. **Maîtrise de l'IA Générative Appliquée** : Conception d'agents autonomes (LangGraph), pipelines RAG et streaming temps réel avec gains de performance mesurés.
4. **Rigueur d'Exécution & Autonomie** : Pratique éprouvée des méthodologies agiles, esprit d'initiative et orientation vers l'impact mesurable.
5. **Polyvalence Multilingue** : Évolution fluide en environnement international (Anglais courant C1, Français professionnel B1.1).

### Suggestions de questions :
? Quelles sont vos disponibilités pour une alternance à partir de septembre 2026 ?
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, VIF).
? Comment vous contacter directement ?`;
  }

  // 9. DEFAULT FRENCH FALLBACK (Friendly & Comprehensive)
  return `Je suis à votre disposition en tant que double numérique IA de **Muhammad Abdul Moiz**. Vous pouvez explorer :

- **DevOps & Software Factory** : GitLab CI, GitHub Actions, Docker, AWS & GCP, SonarQube, métriques DORA
- **Formation & Écoles** : MSc Technologies de l'Information à l'**EPITECH Paris** & BSCS à **FAST-NUCES**
- **Expérience en Entreprise** : Enseignement à l'**EPITECH Paris** & développement backend chez **Brackets**
- **Projets Phares** : *DoctorIQ* (santé & OCR/LLM), *Brackets Genie* (WebSockets & LangGraph), *VIF* (logistique solidaire), *Ledgeroo* (FinTech Stripe), et *Trinity Suite*
- **Stack Technique** : Python (FastAPI, Django), TypeScript, React 18, Vue 3, Elixir, Docker, AWS, GCP, PyTorch
- **Opportunité Ciblée** : Recherche d'une **Alternance de 12 mois (dès Septembre 2026)** à Paris ou en télétravail
- **Contact Direct** : [${profile.email}](mailto:${profile.email})

### Suggestions de questions :
? Quelles sont vos compétences et vos services en DevOps et Cloud ?
? Pourquoi un recruteur devrait-il engager Muhammad Abdul Moiz ?
? Parlez-moi de vos projets phares (DoctorIQ, Brackets Genie, Ledgeroo, VIF) ?
? Quelles sont vos disponibilités pour une alternance en septembre 2026 ?`;
}
