"use client";

import Image from "next/image";
import { ProjectsCard } from "../lib/interface";
import { client } from "../lib/sanity";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, Code2, Tag, Filter } from "lucide-react";

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

  return (
    <motion.div
      layout
      className="group relative bg-white dark:bg-black border-4 border-black dark:border-white overflow-hidden transition-all duration-500 ease-out hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] rounded-lg"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden bg-black/5 dark:bg-white/5">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-4">
          {(project.demoLink || project.link) && (
            <motion.a
              href={project.demoLink || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-white hover:bg-black hover:text-white transition-all duration-300 flex-shrink-0 rounded-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {t("nav.project_web", "Demo")}
              </span>
              <span className="sm:hidden">Demo</span>
            </motion.a>
          )}

          {project.sourceLink && (
            <motion.a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-all duration-300 flex-shrink-0 rounded-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {t("nav.project_desktop", "Code")}
              </span>
              <span className="sm:hidden">Code</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-start sm:items-center justify-between">
          <motion.h3
            className="font-black text-base sm:text-lg md:text-xl text-black dark:text-white leading-tight uppercase tracking-tight flex-1 pr-2 sm:pr-3 break-words"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
          {(project.demoLink || project.link) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 ml-2 sm:ml-3"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
            </motion.div>
          )}
        </div>

        <motion.p
          className="text-black/70 dark:text-white/70 text-sm leading-relaxed line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <AnimatePresence>
          {project.tags && project.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {project.tags.slice(0, 4).map((tag: string, tagIndex: number) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 sm:px-2.5 md:px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: tagIndex * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <Tag className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                  <span className="truncate max-w-[60px] sm:max-w-[80px]">
                    {tag}
                  </span>
                </motion.span>
              ))}
              {project.tags.length > 4 && (
                <motion.span
                  className="inline-flex items-center px-2 sm:px-2.5 md:px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  +{project.tags.length - 4}
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
          {(project.demoLink || project.link) && (
            <motion.a
              href={project.demoLink || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-4 py-2.5 sm:py-3 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 active:shadow-none rounded-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{t("projects.demo", "Demo")}</span>
            </motion.a>
          )}

          {project.sourceLink && (
            <motion.a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-4 py-2.5 sm:py-3 bg-white dark:bg-black text-black dark:text-white text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 active:shadow-none rounded-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>{t("projects.code", "Code")}</span>
            </motion.a>
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
      className="text-center py-16 sm:py-24 md:py-32"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-black dark:bg-white mx-auto mb-6 sm:mb-8 md:mb-10 flex items-center justify-center border-4 border-black dark:border-white rounded-full"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        <Code2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white dark:text-black" />
      </motion.div>
      <motion.h3
        className="text-2xl sm:text-3xl md:text-4xl font-black text-black dark:text-white mb-3 sm:mb-4 uppercase tracking-tight"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t("projects.no_projects", "No Projects Yet")}
      </motion.h3>
      <motion.p
        className="text-black/60 dark:text-white/60 text-base sm:text-lg max-w-md mx-auto px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {t("projects.no_projects_desc", "Check back later for new creations.")}
      </motion.p>
    </motion.div>
  );
};

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <motion.div
        key={i}
        className="bg-white dark:bg-black border-4 border-black dark:border-white overflow-hidden rounded-lg"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="h-48 sm:h-56 md:h-60 lg:h-64 bg-black/5 dark:bg-white/5 animate-pulse" />
        <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
          <div className="h-5 sm:h-6 bg-black/5 dark:bg-white/5 rounded animate-pulse w-3/4" />
          <div className="space-y-2">
            <div className="h-3 sm:h-4 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            <div className="h-3 sm:h-4 bg-black/5 dark:bg-white/5 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 sm:h-10 bg-black/5 dark:bg-white/5 rounded animate-pulse flex-1" />
            <div className="h-9 sm:h-10 bg-black/5 dark:bg-white/5 rounded animate-pulse flex-1" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState<string>("all");
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getData();
        setProjects(data);

        // Extract unique tags
        const tags = Array.from(new Set(data.flatMap((p) => p.tags || [])));
        setAllTags(tags);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    filterTag === "all"
      ? projects
      : projects.filter((p) => p.tags?.includes(filterTag));

  const totalTechnologies = projects.reduce(
    (acc, project) => acc + (project.tags?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative Line */}
          <motion.div
            className="w-16 sm:w-20 md:w-24 h-[3px] sm:h-[4px] bg-black dark:bg-white mx-auto mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />

          {/* Title */}
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="p-2 sm:p-3 bg-black dark:bg-white border-4 border-black dark:border-white rounded-full"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Code2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white dark:text-black" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-black dark:text-white uppercase tracking-tighter">
              {t("projects.title", "Projects")}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t(
              "projects.description",
              "A collection of my recent work and experiments"
            )}
          </motion.p>
        </motion.div>

        {/* Filter */}
        {allTags.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setFilterTag("all")}
              className={`px-3 sm:px-4 py-2 border-2 border-black dark:border-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${
                filterTag === "all"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-black text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              {t("projects.all", "All")}
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 sm:px-4 py-2 border-2 border-black dark:border-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                  filterTag === tag
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-white dark:bg-black text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="truncate max-w-[60px] sm:max-w-[80px]">
                  {tag}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingState />
          ) : filteredProjects.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project: ProjectsCard, index: number) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        {!loading && projects.length > 0 && (
          <motion.div
            className="mt-16 sm:mt-20 md:mt-32 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-6 sm:px-12 py-6 sm:py-8 bg-white dark:bg-black border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-1 sm:mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {projects.length}
                </motion.div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60 dark:text-white/60">
                  {t("nav.projects", "Projects")}
                </div>
              </motion.div>
              <div className="w-[3px] sm:w-[4px] h-12 sm:h-16 bg-black dark:bg-white" />
              <motion.div
                className="text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-1 sm:mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {totalTechnologies}
                </motion.div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/60 dark:text-white/60">
                  {t("projects.technologies", "Technologies")}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
