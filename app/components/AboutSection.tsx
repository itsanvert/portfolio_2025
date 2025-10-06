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
  Download,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Globe,
  Rocket,
  Heart,
} from "lucide-react";
import { HydrationBoundary } from "./HydrationBoundary";
import { useState } from "react";

export function AboutSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("skills");

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    {
      number: "4+",
      label: t("about.experience.title", "Years Experience"),
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "15+",
      label: t("about.projects.title", "Projects"),
      icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "150+",
      label: t("about.experience.previous.ictDescription", "Students"),
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      number: "2000+",
      label: t("about.projects.universityWebsiteDesc", "Users"),
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  const skills = [
    { name: "Next.js", level: 90 },
    { name: "React", level: 85 },
    { name: "Laravel", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "PostgreSQL", level: 85 },
    { name: "Docker", level: 70 },
  ];

  const achievements = [
    {
      icon: <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t("about.projects.universityWebsite", "University Website"),
      description: t(
        "about.projects.universityWebsiteDesc",
        "Serving 2000+ students"
      ),
    },
    {
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t("about.certifications.ccna1", "CCNA Certified"),
      description: t("about.certifications.ccna2", "Level 1 with distinction"),
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: t("about.experience.previous.ictTeacher", "Teaching Impact"),
      description: t(
        "about.experience.previous.ictDescription",
        "150+ students taught"
      ),
    },
  ];

  const experience = [
    {
      role: t(
        "about.experience.current.position",
        "Web Developer & Website Administrator"
      ),
      company: t(
        "about.experience.current.company",
        "Preah Reach Mohasangkrach Bourei University"
      ),
      period: t("about.experience.current.period", "2023 - 2025"),
      current: true,
    },

    {
      role: t(
        "about.experience.previous.ictTeacher",
        "ICT Teacher & Computer Repair"
      ),
      company: t(
        "about.experience.previous.ictCompany",
        "Phnom Penh International School"
      ),
      period: t(
        "about.experience.previous.ictPeriod",
        "2023 - 2025 (Part-time)"
      ),
      current: false,
    },
    {
      role: t(
        "about.experience.previous.frontendDeveloper",
        "Frontend Developer"
      ),
      company: t("about.experience.previous.frontendCompany", "AddMii.com"),
      period: t("about.experience.previous.frontendPeriod", "2022 - 2023"),
      current: false,
    },
  ];

  const education = [
    {
      degree: t(
        "about.education.degree",
        "Bachelor of Science in Computer Science"
      ),
      institution: t(
        "about.education.university",
        "Preah Reach Mohasangkrach Bourei University"
      ),
      period: t("about.education.period", "2022 - Present"),
      description: t(
        "about.education.specialization",
        "Expected to graduate in 2026"
      ),
      current: true,
    },
    {
      degree: t("about.education.highSchool", "High School Diploma"),
      institution: t(
        "about.education.highSchoolName",
        "Samdech Preah Mahasanghara Bour Kry High School"
      ),
      period: t("about.education.highSchoolPeriod", "2021 - 2022"),
      description: t(
        "about.education.highSchoolGrad",
        "Graduated November 2022"
      ),
      current: false,
    },
  ];

  const certifications = [
    {
      name: t("about.certifications.ccna1", "CCNA Level 1"),
      status: t("about.certifications.ccna1", "Completed, 2024"),
    },
    {
      name: t("about.certifications.ccna2", "CCNA Level 2"),
      status: t("about.certifications.ccna2", "In Progress"),
    },
    {
      name: t("about.certifications.toefl", "TOEFL ITP"),
      status: "407 (CEFR A2)",
    },
    {
      name: t("about.certifications.ielts", "IELTS Academic"),
      status: "Band 4.5 (CEFR B1)",
    },
  ];

  const languages = [
    {
      name: t("about.languages.khmer", "Khmer"),
      level: t("about.languages.khmerLevel", "Native"),
    },
    {
      name: t("about.languages.english", "English"),
      level: t("about.languages.englishLevel", "Intermediate"),
    },
    {
      name: t("about.languages.chinese", "Chinese"),
      level: t("about.languages.chineseLevel", "Basic"),
    },
  ];

  return (
    <HydrationBoundary>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-32">
        <motion.div
          className="space-y-12 sm:space-y-16 lg:space-y-20"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Section Header */}
          <motion.div variants={fadeIn} className="text-center">
            <motion.div
              className="inline-block mb-4 sm:mb-6 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-[3px] bg-black dark:bg-white" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-black dark:text-white mb-4">
              {t("about.title", "About Me")}
            </h2>
            <p className="text-base sm:text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto px-2">
              {t(
                "about.description",
                "I'm San Vert, a passionate software developer and IT specialist with expertise in both front-end and back-end development. I have experience in web development, IT support, and teaching. I'm currently pursuing a Bachelor's degree in Computer Science while working on various projects and teaching IT as a part-time job."
              )}
            </p>
          </motion.div>

          {/* Profile & Stats Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
            variants={fadeIn}
          >
            {/* Profile Card */}
            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }}>
              <Card className="relative overflow-hidden rounded-none border-4 border-black dark:border-white bg-white dark:bg-black group">
                <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden">
                  <Image
                    src="/me.jpg"
                    alt={t("hero.alt", "San Vert's Photo")}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    width={600}
                    height={500}
                    quality={95}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black dark:bg-white text-white dark:text-black px-3 sm:px-4 py-1.5 sm:py-2 font-bold text-xs uppercase tracking-wider border-2 border-white dark:border-black"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  >
                    {t("about.available", "Available")}
                  </motion.div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2">
                      {t("nav.firstname", "San")} {t("nav.lastname", "Vert")}
                    </h1>
                    <p className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                      {t("about.title", "Full-Stack Developer")}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {t("about.location", "Phnom Penh, Cambodia")}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white dark:bg-black">
                  <motion.a
                    href="/resume/Resume_Web_Developer_SAN_VERT.pdf"
                    download
                    className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-bold text-white dark:text-black bg-black dark:bg-white border-2 border-black dark:border-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:shadow-none text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("hero.resume", "Resume")}
                  </motion.a>
                  <motion.a
                    href="/resume/achievements.pdf"
                    className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-bold text-black dark:text-white bg-white dark:bg-black border-2 border-black dark:border-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:shadow-none text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("about.achievements", "Achievements")}
                  </motion.a>
                </div>
              </Card>
            </motion.div>

            {/* Stats & Achievements */}
            <div className="space-y-6 sm:space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="p-4 sm:p-6 text-center border-4 border-black dark:border-white bg-white dark:bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        {stat.icon}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-black dark:text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Achievements */}
              <div className="space-y-3 sm:space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <Card className="p-4 sm:p-6 border-4 border-black dark:border-white bg-white dark:bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black flex-shrink-0">
                          {achievement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-base sm:text-lg mb-1 leading-tight">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interactive Tabs Section */}
          <motion.div variants={fadeIn}>
            <Card className="p-6 sm:p-8 border-4 border-black dark:border-white bg-white dark:bg-black">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center">
                {[
                  {
                    id: "skills",
                    label: t("about.skills.title", "Skills"),
                    icon: <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                  {
                    id: "experience",
                    label: t("about.experience.title", "Experience"),
                    icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                  {
                    id: "education",
                    label: t("about.education.title", "Education"),
                    icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                  {
                    id: "certifications",
                    label: t("about.certifications.title", "Certifications"),
                    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 font-black text-xs sm:text-sm uppercase tracking-wider border-2 transition-all duration-200 flex-shrink-0 ${
                      activeTab === tab.id
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                        : "bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.label
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === "skills" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">
                      {t("about.skills.title", "Technical Skills")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <span className="font-black text-base sm:text-lg">
                              {skill.name}
                            </span>
                            <span className="text-sm font-bold">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 sm:h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white overflow-hidden">
                            <motion.div
                              className="h-full bg-black dark:bg-white"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="space-y-6">
                    <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">
                      {t("about.experience.title", "Work Experience")}
                    </h3>
                    <div className="space-y-6">
                      {experience.map((exp, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l-4 border-black dark:border-white last:border-transparent"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ x: 8 }}
                        >
                          <div
                            className={`absolute -left-2 sm:-left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 border-4 border-black dark:border-white rounded-full ${
                              exp.current
                                ? "bg-black dark:bg-white"
                                : "bg-white dark:bg-black"
                            }`}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className="font-black text-base sm:text-lg leading-tight">
                              {exp.role}
                            </h4>
                            {exp.current && (
                              <span className="text-xs font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-2 sm:px-3 py-1 w-fit mt-2 sm:mt-0">
                                {t("about.current", "Current")}
                              </span>
                            )}
                          </div>
                          <p className="text-base font-bold mb-1 leading-tight">
                            {exp.company}
                          </p>
                          <p className="text-sm text-black/60 dark:text-white/60">
                            {exp.period}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "education" && (
                  <div className="space-y-6 sm:space-y-8">
                    <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">
                      {t("about.education.title", "Education")}
                    </h3>
                    <div className="space-y-6 sm:space-y-8">
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l-4 border-black dark:border-white last:border-transparent"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ x: 8 }}
                        >
                          <div
                            className={`absolute -left-2 sm:-left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 border-4 border-black dark:border-white rounded-full ${
                              edu.current
                                ? "bg-black dark:bg-white"
                                : "bg-white dark:bg-black"
                            }`}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h4 className="font-black text-base sm:text-lg leading-tight">
                              {edu.degree}
                            </h4>
                            {edu.current && (
                              <span className="text-xs font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-2 sm:px-3 py-1 w-fit mt-2 sm:mt-0">
                                {t("about.current", "Current")}
                              </span>
                            )}
                          </div>
                          <p className="text-base font-bold mb-1 leading-tight">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-black/60 dark:text-white/60 mb-2">
                            {edu.period}
                          </p>
                          <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                            {edu.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "certifications" && (
                  <div className="space-y-6">
                    <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">
                      {t(
                        "about.certifications.title",
                        "Certifications & Languages"
                      )}
                    </h3>

                    {/* Certifications */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">
                        {t("about.certifications.certTitle", "Certifications")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {certifications.map((cert, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 sm:p-4 border-2 border-black dark:border-white bg-white dark:bg-black"
                          >
                            <div className="font-black text-base sm:text-lg mb-1 leading-tight">
                              {cert.name}
                            </div>
                            <div className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                              {cert.status}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">
                        {t("about.languages.title", "Languages")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {languages.map((lang, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 sm:p-4 border-2 border-black dark:border-white bg-white dark:bg-black text-center"
                          >
                            <div className="font-black text-base sm:text-lg mb-1 leading-tight">
                              {lang.name}
                            </div>
                            <div className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                              {lang.level}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={fadeIn} whileHover={{ y: -8 }}>
            <Card className="relative overflow-hidden p-6 sm:p-8 lg:p-12 text-center border-4 border-black dark:border-white bg-white dark:bg-black hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transition-all duration-300">
              <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white">
                  {t("about.ctaTitle", "Let's Work Together")}
                </h2>
                <p className="text-base sm:text-lg text-black/60 dark:text-white/60 px-2">
                  {t(
                    "about.ctaDescription",
                    "Have a project in mind? I'm always open to discussing new opportunities and creative ideas."
                  )}
                </p>
                <motion.a
                  href="mailto:itsanvert@gmail.com"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 font-black text-base sm:text-lg text-white dark:text-black bg-black dark:bg-white border-4 border-black dark:border-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:shadow-none"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  {t("about.cta", "Get In Touch")}
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </HydrationBoundary>
  );
}
