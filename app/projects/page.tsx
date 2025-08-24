"use client";

import Image from "next/image";
import { ProjectsCard } from "../lib/interface";
import { client } from "../lib/sanity";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye, Code2, Calendar, Tag } from "lucide-react";

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

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectsCard;
  index: number;
}) => {
  const { t } = useTranslation();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="group relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/20 transition-all duration-500 hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-t-2xl">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {(project.demoLink || project.link) && (
            <motion.a
              href={project.demoLink || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 font-medium rounded-lg hover:bg-white transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
              {t("nav.project_web", "Demo")}
            </motion.a>
          )}

          {project.sourceLink && (
            <motion.a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              {t("nav.project_desktop", "Code")}
            </motion.a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex gap-1 ml-2 flex-shrink-0">
            {(project.demoLink || project.link) && (
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            )}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
              <motion.span
                key={tagIndex}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 rounded-full font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + tagIndex * 0.1 }}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded-full font-medium">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {(project.demoLink || project.link) && (
            <a
              href={project.demoLink || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
            >
              <Eye className="w-4 h-4" />
              {t("projects.title", "Live Demo")}
            </a>
          )}

          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-medium transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
            >
              <Github className="w-4 h-4" />
              {t("nav.project_desktop", "Source")}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-sm"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Code2 className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {t("projects.title", "No Projects Available")}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
        {t(
          "projects.description",
          "Projects will appear here once they are published."
        )}
      </p>
    </motion.div>
  );
};

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
      >
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-1" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse flex-1" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectsCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getData();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <motion.h1
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("projects.title", "My Projects")}
            </motion.h1>
          </div>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t(
              "projects.description",
              "Here are some of the cool projects I've built recently."
            )}
          </motion.p>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <LoadingState />
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project: ProjectsCard, index: number) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        {!loading && projects.length > 0 && (
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {t("nav.projects", "Projects")}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  {projects.reduce(
                    (acc, project) => acc + (project.tags?.length || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Technologies
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
