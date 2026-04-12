"use client";

import Image from "next/image";
import { ProjectsCard } from "../lib/interface";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, Code2, Tag, Filter, Search } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectsCard;
  index: number;
}) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="project-card-wrapper">
      <motion.div
        layout
        className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 dark:hover:border-white/25 hover:shadow-2xl hover:shadow-purple-500/10"
        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {/* Image Section */}
        <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden bg-black/5 dark:bg-white/5">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/5 dark:bg-white/5">
              <Code2 className="w-12 h-12 text-black/20 dark:text-white/20" />
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {(project.demoLink || project.link) && (
              <a
                href={project.demoLink || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/60 dark:bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-violet-500 hover:border-violet-400 transition-colors"
                title={t("nav.project_web", "Demo")}
              >
                <Eye className="w-4 h-4" />
              </a>
            )}
            {project.sourceLink && (
              <a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/60 dark:bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-violet-500 hover:border-violet-400 transition-colors"
                title={t("nav.project_desktop", "Code")}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Gradient Overlay bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          {/* Tags floating on image */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/20 bg-black/40 backdrop-blur-md text-white"
              >
                <Tag className="w-2.5 h-2.5 opacity-70" />
                {tag}
              </span>
            ))}
            {project.tags && project.tags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/20 bg-black/40 backdrop-blur-md text-white">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-black dark:text-white leading-tight flex-1">
              {project.title}
            </h3>
            {(project.demoLink || project.link) && (
              <ExternalLink className="w-4 h-4 text-black/40 dark:text-white/40 flex-shrink-0 mt-1 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-300" />
            )}
          </div>

          <p className="text-black/60 dark:text-white/50 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Action Buttons styled natively */}
          <div className="flex gap-3 pt-3">
            {(project.demoLink || project.link) && (
              <motion.a
                href={project.demoLink || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500 border border-violet-500/20 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 text-xs sm:text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Eye className="w-4 h-4" />
                {t("projects.demo", "Demo")}
              </motion.a>
            )}

            {project.sourceLink && (
              <motion.a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 text-xs sm:text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4" />
                {t("projects.code", "Code")}
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="text-center py-20 sm:py-32 rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
        whileHover={{ rotate: 180, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Code2 className="w-12 h-12 text-violet-400" />
      </motion.div>
      <h3 className="text-3xl font-bold text-black dark:text-white mb-3">
        {t("projects.no_projects", "No Projects Yet")}
      </h3>
      <p className="text-black/50 dark:text-white/40 text-lg max-w-md mx-auto">
        {t("projects.no_projects_desc", "Check back later for new creations.")}
      </p>
    </motion.div>
  );
};

const LoadingState = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 overflow-hidden animate-pulse"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <div className="h-48 sm:h-56 bg-black/5 dark:bg-white/5" />
        <div className="p-5 space-y-3">
          <div className="h-5 bg-black/10 dark:bg-white/5 rounded-xl w-3/4" />
          <div className="h-3 bg-black/10 dark:bg-white/5 rounded-xl" />
          <div className="h-3 bg-black/10 dark:bg-white/5 rounded-xl w-3/4" />
          <div className="flex gap-2 mt-2">
            <div className="h-8 bg-black/10 dark:bg-white/5 rounded-xl flex-1" />
            <div className="h-8 bg-black/10 dark:bg-white/5 rounded-xl flex-1" />
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
  const [filterTag, setFilterTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Using our secure API route bypassing CORS
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);

        const tags = Array.from(new Set(data.flatMap((p: ProjectsCard) => p.tags || [])));
        setAllTags(tags as string[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-title",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".projects-subtitle",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".projects-search",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.5)" }
      );
      gsap.fromTo(
        ".projects-filter",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stat-wrapper",
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const filteredProjects = projects.filter((p) => {
    const matchesTag = filterTag === "all" || p.tags?.includes(filterTag);
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const totalTechnologies = projects.reduce(
    (acc, project) => acc + (project.tags?.length || 0),
    0
  );

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm">
            <Code2 className="w-8 h-8 text-violet-500 dark:text-violet-400" />
          </div>
          
          <h1 className="projects-title text-5xl sm:text-6xl lg:text-7xl font-black text-black dark:text-white uppercase tracking-tighter mb-6 opacity-0">
            {t("projects.title", "Projects")}
          </h1>

          {/* Subtitle */}
          <p className="projects-subtitle text-lg sm:text-xl text-black/60 dark:text-white/50 max-w-2xl mx-auto leading-relaxed mb-10 opacity-0">
            {t(
              "projects.description",
              "A collection of my recent work and experiments in web development."
            )}
          </p>

          {/* Search & Filter */}
          <div className="projects-search opacity-0 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 dark:text-white/30" />
              <input
                type="text"
                placeholder={t("projects.search", "Search projects...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-black/10 dark:focus:bg-white/8 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Tags Filter */}
        {!loading && allTags.length > 0 && (
          <div className="projects-filter opacity-0 flex flex-wrap justify-center gap-2 mb-12">
            <motion.button
              onClick={() => setFilterTag("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                filterTag === "all"
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-3.5 h-3.5" />
              {t("projects.all", "All")}
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filterTag === tag
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project: ProjectsCard, index: number) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        {!loading && projects.length > 0 && (
          <div className="stat-wrapper mt-24 sm:mt-32 border-t border-black/10 dark:border-white/10 pt-16">
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                { label: t("nav.projects", "Projects"), num: projects.length, gradient: "from-violet-500 to-purple-500" },
                { label: t("projects.technologies", "Technologies"), num: totalTechnologies, gradient: "from-cyan-500 to-blue-500" },
                { label: t("projects.commits", "Commits"), num: 500, gradient: "from-emerald-500 to-teal-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={`stat-card relative rounded-2xl p-6 text-center border border-black/10 dark:border-white/10 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 dark:to-white/[0.02] backdrop-blur-sm hover:border-violet-500/30 dark:hover:border-white/20 transition-all duration-300 group cursor-default opacity-0 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <div
                    className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.num}+
                  </div>
                  <div className="text-black/50 dark:text-white/50 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
