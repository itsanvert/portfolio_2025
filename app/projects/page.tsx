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
        },
      },
    };

    return (
      <motion.div
        className="group relative overflow-hidden bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl shadow-gray-900/40 hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-3"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Section */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {(project.demoLink || project.link) && (
              <motion.a
                href={project.demoLink || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-xl backdrop-blur-sm"
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
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/90 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-xl border border-gray-600/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                {t("nav.project_desktop", "Code")}
              </motion.a>
            )}
          </div>

          {/* Corner Accent */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="relative p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-xl text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex gap-1 ml-3 flex-shrink-0">
              {(project.demoLink || project.link) && (
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
              )}
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <motion.span
                  key={tagIndex}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-300 border border-cyan-700/30 rounded-full font-medium backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + tagIndex * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 3 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-800/50 text-gray-400 border border-gray-600/30 rounded-full font-medium backdrop-blur-sm">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {(project.demoLink || project.link) && (
              <a
                href={project.demoLink || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold transition-all duration-300 rounded-xl shadow-lg hover:shadow-cyan-500/25"
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
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600/50 hover:border-gray-500 text-white text-sm font-bold transition-all duration-300 rounded-xl shadow-lg"
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
        className="text-center py-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="relative w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl border border-gray-700/50"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-3xl blur-xl" />
          <Code2 className="relative w-12 h-12 text-gray-400" />
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-4">
          {t("projects.title", "No Projects Available")}
        </h3>
        <p className="text-gray-400 text-xl max-w-lg mx-auto leading-relaxed">
          {t(
            "projects.description",
            "Projects will appear here once they are published."
          )}
        </p>
      </motion.div>
    );
  };

  const LoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-700/50 overflow-hidden"
        >
          <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          <div className="p-8 space-y-4">
            <div className="h-6 bg-gray-800 rounded-xl animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-800 rounded-lg animate-pulse" />
              <div className="h-4 bg-gray-800 rounded-lg animate-pulse w-3/4" />
            </div>
            <div className="flex gap-3 pt-2">
              <div className="h-10 bg-gray-800 rounded-xl animate-pulse flex-1" />
              <div className="h-10 bg-gray-800 rounded-xl animate-pulse flex-1" />
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

    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:32px_32px]"></div>

          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/6 left-1/5 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:px-8 lg:px-12 z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative p-4 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl blur-xl" />
                <Code2 className="relative w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("projects.title", "My Projects")}
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t(
                "projects.description",
                "Here are some of the cool projects I've built recently."
              )}
            </motion.p>

            {/* Animated Divider */}
            <motion.div
              className="relative mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm" />
            </motion.div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
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
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="relative inline-flex items-center gap-8 px-12 py-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-3xl blur-xl" />

                <div className="relative text-center">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
                    {projects.length}
                  </div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                    {t("nav.projects", "Projects")}
                  </div>
                </div>

                <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />

                <div className="relative text-center">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                    {projects.reduce(
                      (acc, project) => acc + (project.tags?.length || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">
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
