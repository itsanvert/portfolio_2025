"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Mail,
  Award,
  Globe,
  Server,
  Download,
  Trophy,
  Star,
  Zap,
  Target,
  FileText,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Lightbulb,
} from "lucide-react";
import { HydrationBoundary } from "./HydrationBoundary";

export function AboutSection() {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  };

  const achievements = [
    {
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      title: t(
        "about.projects.universityWebsite",
        "University Website Development"
      ),
      description: t(
        "about.projects.universityWebsiteDesc",
        "Developed & launched sbku.edu.kh serving 2000+ students"
      ),
      year: t("about.projects.universityWebsiteYear", "2025"),
      category: "Development",
    },
    {
      icon: <Award className="w-5 h-5 text-blue-500" />,
      title: t("about.certifications.ccna1", "CCNA Certification"),
      description: t(
        "about.certifications.ccna2",
        "Completed Level 1 with distinction, Level 2 in progress"
      ),
      year: "2024",
      category: "Certification",
    },
    {
      icon: <Users className="w-5 h-5 text-green-500" />,
      title: t("about.experience.previous.ictTeacher", "ICT Education Impact"),
      description: t(
        "about.experience.previous.ictDescription",
        "Teaching ICT courses and providing computer maintenance services"
      ),
      year: "2023-2025",
      category: "Education",
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-purple-500" />,
      title: t("about.projects.ums", "University Management System"),
      description: t(
        "about.projects.umsDesc",
        "Comprehensive management system for university operations and research activities"
      ),
      year: "2025",
      category: "Innovation",
    },
    {
      icon: <Globe className="w-5 h-5 text-indigo-500" />,
      title: t("about.languages.title", "Multilingual Proficiency"),
      description: `${t("about.certifications.ielts", "IELTS Academic: Band 4.5")} • ${t("about.certifications.toefl", "TOEFL ITP: 407")}`,
      year: "2024",
      category: "Language",
    },
    {
      icon: <Zap className="w-5 h-5 text-orange-500" />,
      title: t("about.skills.title", "Technical Skills"),
      description: t(
        "about.skills.development",
        "Full-stack development expertise with modern technologies"
      ),
      year: "2024",
      category: "Skills",
    },
  ];

  const technicalSkills = {
    frontend: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    backend: ["Laravel", "Node.js", "Express.js", "Prisma ORM"],
    database: ["PostgreSQL", "SQL Server", "MySQL", "Supabase"],
    infrastructure: ["Docker", "Linux Server", "Windows Server 2022"],
    other: ["C#", "Crystal Reports", "REST APIs", "Git"],
  };

  const stats = [
    {
      number: "4+",
      label: t("about.experience.title", "Years Experience"),
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      number: "15+",
      label: t("about.projects.title", "Projects Completed"),
      icon: <Target className="w-4 h-4" />,
    },
    {
      number: "150+",
      label: t("about.experience.previous.ictDescription", "Students Taught"),
      icon: <Users className="w-4 h-4" />,
    },
    {
      number: "2000+",
      label: t("about.projects.universityWebsiteDesc", "Website Users"),
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  return (
    <HydrationBoundary>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.div
          className="space-y-8 sm:space-y-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
            variants={fadeInUp}
          >
            {/* Profile Card */}
            <motion.div className="lg:col-span-1" variants={scaleIn}>
              <Card className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-0 shadow-2xl rounded-3xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-3xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                <div className="relative h-[350px] w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src="/me.jpg"
                    alt="Profile picture of San Vert"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    priority
                    width={400}
                    height={350}
                    quality={95}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <motion.div
                    className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {t("guestbook.signForFree", "Available")}
                  </motion.div>
                </div>

                <div className="relative p-6 text-center">
                  <motion.h1
                    className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {t("nav.firstname", "Vert")} {t("nav.lastname", "San")}
                  </motion.h1>
                  <motion.p
                    className="text-lg font-semibold text-foreground/90 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t("about.title", "Full-Stack Developer & IT Professional")}
                  </motion.p>
                  <motion.div
                    className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{t("about.location", "Phnom Penh, Cambodia")}</span>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <a
                      href="/resume/resume.pdf"
                      download
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <Download className="w-4 h-4" />
                      {t("hero.resume", "Resume")}
                    </a>
                    <a
                      href="/resume/achievements.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-secondary/20"
                    >
                      <FileText className="w-4 h-4" />
                      {t("about.certifications.title", "Achievements")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <motion.div className="lg:col-span-2 space-y-6" variants={fadeInUp}>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {t("about.title", "About Me")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {t(
                    "about.description",
                    "I am Vert San, a passionate software developer and IT professional with expertise in both frontend and backend technologies. I have experience in web development, IT support, and teaching."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-background/80 dark:bg-muted/60 p-4 rounded-2xl border border-border/50 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                    variants={scaleIn}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex justify-center mb-2 text-primary group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Key Achievements Section */}
          <motion.div variants={fadeInUp}>
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl font-bold text-foreground mb-3"
                variants={fadeInUp}
              >
                <Trophy className="inline w-8 h-8 text-yellow-500 mr-3" />
                {t("about.projects.title", "Key Achievements")}
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                {t(
                  "about.projects.description",
                  "Highlighted accomplishments that showcase growth, impact, and technical excellence"
                )}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 bg-background rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300 flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {achievement.category}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {achievement.year}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-2 leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills & Experience Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={fadeInUp}
          >
            {/* Technical Excellence */}
            <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("about.skills.title", "Technical Excellence")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "about.skills.subtitle",
                      "Modern full-stack development"
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {Object.entries(technicalSkills).map(
                  ([category, skills], index) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 capitalize">
                        {t(
                          `about.skills.${category}`,
                          category.replace(/([A-Z])/g, " $1").trim()
                        )}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/10 hover:border-primary/20 transition-all duration-200 hover:scale-105 cursor-default"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.05 * skillIndex + 0.1 * index,
                            }}
                            whileHover={{ y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>

            {/* Professional Journey */}
            <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("about.experience.title", "Professional Journey")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "about.experience.subtitle",
                      "Building expertise through diverse roles"
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    role: t(
                      "about.experience.current.position",
                      "Volunteer Web Developer"
                    ),
                    company: t(
                      "about.experience.current.company",
                      "SBKU University"
                    ),
                    period: "2025 – Present",
                    description: t(
                      "about.experience.current.description",
                      "Leading university website development"
                    ),
                    highlight: true,
                  },
                  {
                    role: t(
                      "about.experience.previous.ictTeacher",
                      "ICT Teacher"
                    ),
                    company: t("about.experience.previous.ictCompany", "PPISA"),
                    period: "2023 – 2025",
                    description: t(
                      "about.experience.previous.ictDescription",
                      "Teaching & computer maintenance"
                    ),
                    highlight: false,
                  },
                  {
                    role: t(
                      "about.experience.previous.itSupport",
                      "IT Support"
                    ),
                    company: t(
                      "about.experience.previous.itCompany",
                      "Bright Kids School"
                    ),
                    period: "2023 – 2024",
                    description: t(
                      "about.experience.previous.itDescription",
                      "Comprehensive IT support"
                    ),
                    highlight: false,
                  },
                ].map((exp, index) => (
                  <motion.div
                    key={index}
                    className={`relative pl-6 pb-4 ${index !== 2 ? "border-l-2 border-primary/20" : ""}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div
                      className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${exp.highlight ? "bg-primary" : "bg-primary/40"} border-4 border-background`}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-medium text-foreground text-sm">
                        {exp.role}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-primary/80 font-medium mb-1">
                      {exp.company}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={fadeInUp}
          >
            {/* Education */}
            <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {t("about.education.title", "Education")}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">
                      {t(
                        "about.education.degree",
                        "Bachelor of Computer Science"
                      )}
                    </h3>
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                      {t("about.education.current", "Current")}
                    </span>
                  </div>
                  <p className="text-sm text-primary/80 font-medium mb-1">
                    {t("about.education.university", "SBKU University")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("about.education.period", "2022 – 2026 (Expected)")}
                  </p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/40 rounded-full border-4 border-background" />
                  <h3 className="font-medium text-foreground mb-1">
                    {t("about.education.highSchool", "High School Diploma")}
                  </h3>
                  <p className="text-sm text-primary/80 font-medium mb-1">
                    {t("about.education.highSchoolName", "SBKU High School")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("about.education.highSchoolPeriod", "2021 – 2022")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Certifications & Languages */}
            <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {t(
                    "about.certifications.title",
                    "Certifications & Languages"
                  )}
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    {t(
                      "about.certifications.certTitle",
                      "Professional Certifications"
                    )}
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: t(
                          "about.certifications.ccna1",
                          "CCNA Level 1 (Completed, 2024)"
                        ),
                        status: t("processing.title", "Completed"),
                        year: "2024",
                        icon: <Server className="w-4 h-4 text-green-500" />,
                        color: "green",
                      },
                      {
                        name: t(
                          "about.certifications.ccna2",
                          "CCNA Level 2 (In Progress)"
                        ),
                        status: t("about.projects.umsStatus", "In Progress"),
                        year: "2025",
                        icon: <Server className="w-4 h-4 text-yellow-500" />,
                        color: "yellow",
                      },
                    ].map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {cert.icon}
                          <div>
                            <p className="text-sm font-medium">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {cert.year}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            cert.color === "green"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {cert.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    {t("about.languages.title", "Languages")}
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        lang: t("about.languages.khmer", "Khmer"),
                        level: "Native",
                        progress: 100,
                      },
                      {
                        lang: t("about.languages.english", "English"),
                        level: "B1 (IELTS 4.5)",
                        progress: 65,
                      },
                      {
                        lang: t("about.languages.chinese", "Chinese"),
                        level: "Fair",
                        progress: 40,
                      },
                    ].map((language, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{language.lang}</span>
                          <span className="text-muted-foreground text-xs">
                            {language.level}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${language.progress}%` }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                              duration: 1,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10"
            variants={fadeInUp}
          >
            <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {t("about.cta.title", "Let's Build Something Amazing Together")}
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {t(
                  "about.cta.description",
                  "Ready to collaborate on your next project or discuss opportunities in web development and IT solutions."
                )}
              </p>
              <motion.a
                href="mailto:itsanvert@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-semibold shadow-xl hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                {t("about.cta.button", "Get In Touch")}
                <Star className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </HydrationBoundary>
  );
}
