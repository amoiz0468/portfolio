import Head from 'next/head';
import { useState } from 'react';
import { FiLayers } from 'react-icons/fi';
import ProjectModal from '../components/ProjectModal';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import AppleProjectCard from '../components/AppleProjectCard';
import { projects } from '../data/portfolio';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Projects | Muhammad Abdul Moiz</title>
        <meta
          name="description"
          content="Selected work by Muhammad Abdul Moiz spanning AI systems, full-stack products, and cloud-native software engineering."
        />
      </Head>

      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Portfolio Gallery"
            eyebrowIcon={<FiLayers />}
            title="Selected software and AI projects"
            subtitle="Explore end-to-end architectures across Generative AI, cloud deployments, and scalable backend platforms."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <AppleProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(index)}
            />
          ))}
        </div>
      </section>

      {selectedProject !== null ? (
        <ProjectModal
          open={selectedProject !== null}
          title={projects[selectedProject].title}
          description={projects[selectedProject].description}
          stack={projects[selectedProject].stack}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
}
