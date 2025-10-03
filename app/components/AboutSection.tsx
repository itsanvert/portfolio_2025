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
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      number: "15+",
      label: t("about.projects.title", "Projects"),
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      number: "150+",
      label: t("about.experience.previous.ictDescription", "Students"),
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "2000+",
      label: t("about.projects.universityWebsiteDesc", "Users"),
      icon: <Globe className="w-6 h-6" />,
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
      icon: <Trophy className="w-7 h-7" />,
      title: t("about.projects.universityWebsite", "University Website"),
      description: t(
        "about.projects.universityWebsiteDesc",
        "Serving 2000+ students"
      ),
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: t("about.certifications.ccna1", "CCNA Certified"),
      description: t("about.certifications.ccna2", "Level 1 with distinction"),
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: t("about.experience.previous.ictTeacher", "Teaching Impact"),
      description: t(
        "about.experience.previous.ictDescription",
        "150+ students taught"
      ),
    },
  ];

  const experience = [
    {
      role: t("about.experience.current.position", "Volunteer Web Developer"),
      company: t("about.experience.current.company", "SBKU University"),
      period: "2025 – Present",
      current: true,
    },
    {
      role: t("about.experience.previous.ictTeacher", "ICT Teacher"),
      company: t("about.experience.previous.ictCompany", "PPISA"),
      period: "2023 – 2025",
      current: false,
    },
    {
      role: t("about.experience.previous.itSupport", "IT Support"),
      company: t("about.experience.previous.itCompany", "Bright Kids School"),
      period: "2023 – 2024",
      current: false,
    },
  ];

  return (
    <HydrationBoundary>
      <section className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <motion.div
          className="space-y-20"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Section Header */}
          <motion.div variants={fadeIn} className="text-center">
            <motion.div
              className="inline-block mb-6"
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-[3px] bg-black dark:bg-white" />
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-black dark:text-white mb-4">
              {t("about.title", "About Me")}
            </h2>
            <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              {t(
                "about.description",
                "Full-stack developer passionate about creating impactful solutions"
              )}
            </p>
          </motion.div>

          {/* Profile & Stats Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={fadeIn}
          >
            {/* Profile Card */}
            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }}>
              <Card className="relative overflow-hidden rounded-none border-4 border-black dark:border-white bg-white dark:bg-black group">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <Image
                    src="/me.jpg"
                    alt="Profile"
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    width={600}
                    height={500}
                    quality={95}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-6 right-6 bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-bold text-xs uppercase tracking-wider border-2 border-white dark:border-black"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  >
                    Available
                  </motion.div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-4xl font-black mb-2">
                      {t("nav.firstname", "Vert")} {t("nav.lastname", "San")}
                    </h1>
                    <p className="text-xl font-bold mb-3">
                      {t("about.title", "Full-Stack Developer")}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {t("about.location", "Phnom Penh, Cambodia")}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 flex gap-4 bg-white dark:bg-black">
                  <motion.a
                    href="/resume/resume.pdf"
                    download
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold text-white dark:text-black bg-black dark:bg-white border-2 border-black dark:border-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:shadow-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-5 h-5" />
                    Resume
                  </motion.a>
                  <motion.a
                    href="mailto:itsanvert@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold text-black dark:text-white bg-white dark:bg-black border-2 border-black dark:border-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:shadow-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-5 h-5" />
                    Contact
                  </motion.a>
                </div>
              </Card>
            </motion.div>

            {/* Stats & Achievements */}
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="p-6 text-center border-4 border-black dark:border-white bg-white dark:bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200">
                      <div className="flex justify-center mb-4">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-black text-black dark:text-white mb-1">
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
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <Card className="p-6 border-4 border-black dark:border-white bg-white dark:bg-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className="p-3 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-lg mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-black/60 dark:text-white/60">
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
            <Card className="p-8 border-4 border-black dark:border-white bg-white dark:bg-black">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  {
                    id: "skills",
                    label: "Skills",
                    icon: <Code2 className="w-5 h-5" />,
                  },
                  {
                    id: "experience",
                    label: "Experience",
                    icon: <Briefcase className="w-5 h-5" />,
                  },
                  {
                    id: "education",
                    label: "Education",
                    icon: <GraduationCap className="w-5 h-5" />,
                  },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-black text-sm uppercase tracking-wider border-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                        : "bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.icon}
                    {tab.label}
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
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black mb-6">
                      Technical Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-black text-lg">
                              {skill.name}
                            </span>
                            <span className="text-sm font-bold">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white overflow-hidden">
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
                    <h3 className="text-2xl font-black mb-6">
                      Work Experience
                    </h3>
                    {experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="relative pl-8 pb-8 border-l-4 border-black dark:border-white last:border-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ x: 8 }}
                      >
                        <div
                          className={`absolute -left-3 top-0 w-6 h-6 border-4 border-black dark:border-white ${
                            exp.current
                              ? "bg-black dark:bg-white"
                              : "bg-white dark:bg-black"
                          }`}
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className="font-black text-lg">{exp.role}</h4>
                          {exp.current && (
                            <span className="text-xs font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-3 py-1 w-fit">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-base font-bold mb-1">
                          {exp.company}
                        </p>
                        <p className="text-sm text-black/60 dark:text-white/60">
                          {exp.period}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === "education" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black mb-6">Education</h3>
                    <motion.div
                      className="relative pl-8 pb-8 border-l-4 border-black dark:border-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 8 }}
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-black dark:bg-white border-4 border-black dark:border-white" />
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-black text-lg">
                          {t(
                            "about.education.degree",
                            "Bachelor of Computer Science"
                          )}
                        </h4>
                        <span className="text-xs font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-3 py-1 flex-shrink-0 ml-2">
                          Current
                        </span>
                      </div>
                      <p className="text-base font-bold mb-1">
                        {t("about.education.university", "SBKU University")}
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        {t("about.education.period", "2022 – 2026 (Expected)")}
                      </p>
                    </motion.div>

                    <motion.div
                      className="relative pl-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      whileHover={{ x: 8 }}
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-white dark:bg-black border-4 border-black dark:border-white" />
                      <h4 className="font-black text-lg mb-1">
                        {t("about.education.highSchool", "High School Diploma")}
                      </h4>
                      <p className="text-base font-bold mb-1">
                        {t(
                          "about.education.highSchoolName",
                          "SBKU High School"
                        )}
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        {t("about.education.highSchoolPeriod", "2021 – 2022")}
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={fadeIn} whileHover={{ y: -8 }}>
            <Card className="relative overflow-hidden p-12 text-center border-4 border-black dark:border-white bg-white dark:bg-black hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transition-all duration-300">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-4xl lg:text-5xl font-black text-black dark:text-white">
                  Let's Work Together
                </h2>
                <p className="text-lg text-black/60 dark:text-white/60">
                  Have a project in mind? I'm always open to discussing new
                  opportunities and creative ideas.
                </p>
                <motion.a
                  href="mailto:itsanvert@gmail.com"
                  className="inline-flex items-center gap-3 px-10 py-5 font-black text-lg text-white dark:text-black bg-black dark:bg-white border-4 border-black dark:border-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 active:shadow-none"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-6 h-6" />
                  Get In Touch
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </HydrationBoundary>
  );
}
