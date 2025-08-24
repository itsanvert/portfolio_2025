import Image from "next/image";
import { ProjectsCard } from "../lib/interface";
import { client } from "../lib/sanity";

async function getData(): Promise<ProjectsCard[]> {
  const query = `*[_type == 'project'] | order(_createdAt desc) {
    title,
    _id,
    link,
    demoLink,
    sourceLink,
    description,
    tags,
    "imageUrl": image.asset->url
  }`;

  try {
    const data = await client.fetch(
      query,
      {},
      {
        next: { revalidate: 60, tags: ["projects"] },
      }
    );
    return data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

const ProjectCard = ({ project }: { project: ProjectsCard }) => {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {(project.demoLink || project.link) && (
            <a
              href={project.demoLink || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              View Demo
            </a>
          )}

          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Source Code
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {(project.demoLink || project.link) && (
            <a
              href={project.demoLink || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200"
            >
              Live Demo
            </a>
          )}

          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors duration-200"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      No Projects Available
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      Projects will appear here once they are published.
    </p>
  </div>
);

export default async function ProjectsPage() {
  const projects = await getData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of projects showcasing various technologies and
            approaches
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: ProjectsCard) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
