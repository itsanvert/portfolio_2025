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

  const technicalSkills: string[] = [
    "Next.js",
    "Laravel",
    "Node.js",
    "Express.js",
    "React",
    "Prisma ORM",
    "PostgreSQL",
    "SQL Server",
    "MySQL",
    "Supabase",
    "Docker",
    "REST APIs",
    "C#",
    "Crystal Reports",
  ];

  const itSkills: string[] = [
    "Windows Server 2022",
    "Linux Server",
    "Network Configuration",
    "Firewall Management",
    "CCNA",
    "IT Troubleshooting",
    "Cybersecurity",
  ];

  return (
    <HydrationBoundary>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Profile Card - Better responsive layout */}
          <motion.div
            className="col-span-1 lg:col-span-2 order-1"
            variants={fadeInUp}
          >
            <Card className="w-full bg-gradient-to-br from-primary/10 to-muted/40 p-0 shadow-xl rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 h-fit">
              <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] w-full">
                <Image
                  src="/me.jpg"
                  alt="Profile picture of San Vert"
                  className="object-cover w-full h-full"
                  priority
                  width={500}
                  height={360}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-background/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {t("about.status", "Available for work")}
                  </motion.div>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col items-center text-center">
                <motion.h2
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-2 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {t("about.title", "Full-Stack Developer & IT Professional")}
                </motion.h2>
                <motion.p
                  className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {t(
                    "about.description",
                    "Computer Science student with hands-on experience in web development, IT support, and network administration."
                  )}
                </motion.p>
                <motion.a
                  href="/resume/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-all duration-200 hover:shadow-md text-sm sm:text-base w-full sm:w-auto justify-center"
                  aria-label="Download Resume"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t("about.resume", "Download Resume")}
                </motion.a>
              </div>
            </Card>
          </motion.div>

          {/* Details Section - Better responsive grid */}
          <motion.div
            className="col-span-1 lg:col-span-3 order-2 space-y-4 sm:space-y-6 lg:space-y-8"
            variants={fadeInUp}
          >
            {/* Education */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background/80 dark:bg-muted/60 p-4 sm:p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {t("about.education.title", "Education")}
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {/* University */}
                  <div className="pl-2 border-l-2 border-primary/20">
                    <h3 className="text-base sm:text-lg font-medium text-foreground leading-tight">
                      {t(
                        "about.education.degree",
                        "Bachelor of Computer Science"
                      )}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <span className="block sm:inline">
                        {t(
                          "about.education.university",
                          "Samdech Preah Mahasangharajah Bour Kry University"
                        )}
                      </span>
                      <span className="mx-0 sm:mx-2 block sm:inline text-primary/60">
                        •
                      </span>
                      <span className="block sm:inline">
                        {t("about.education.period", "2022 – Present")}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      {t(
                        "about.education.specialization",
                        "Expected Graduation: 2026"
                      )}
                    </p>
                  </div>
                  {/* High School */}
                  <div className="pl-2 border-l-2 border-primary/20">
                    <h3 className="text-base sm:text-lg font-medium text-foreground leading-tight">
                      {t("about.education.highSchool", "High School Diploma")}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <span className="block sm:inline">
                        {t(
                          "about.education.highSchoolName",
                          "Samdech Preah Mahasangharajah Bour Kry High School"
                        )}
                      </span>
                      <span className="mx-0 sm:mx-2 block sm:inline text-primary/60">
                        •
                      </span>
                      <span className="block sm:inline">
                        {t("about.education.highSchoolPeriod", "2021 – 2022")}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      {t(
                        "about.education.highSchoolGrad",
                        "Graduated November 2022"
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Experience */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background/80 dark:bg-muted/60 p-4 sm:p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {t("about.experience.title", "Professional Experience")}
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      title: t(
                        "about.experience.current.position",
                        "Volunteer Web Developer"
                      ),
                      company: t(
                        "about.experience.current.company",
                        "Samdech Preah Mahasanghara Bour Kry University"
                      ),
                      period: t(
                        "about.experience.current.period",
                        "2025 – Present"
                      ),
                      description: t(
                        "about.experience.current.description",
                        "Developed and maintain the official university website (sbku.edu.kh). Currently developing a University Management System for research projects."
                      ),
                    },
                    {
                      title: t(
                        "about.experience.previous.freelance",
                        "Freelance Graphic Designer"
                      ),
                      company: t(
                        "about.experience.previous.freelanceCompany",
                        "Kampufreelancer"
                      ),
                      period: t(
                        "about.experience.previous.freelancePeriod",
                        "2024 – 2025"
                      ),
                      description: t(
                        "about.experience.previous.freelanceDescription",
                        "Designed kid cards and various digital assets for clients."
                      ),
                    },
                    {
                      title: t(
                        "about.experience.previous.ictTeacher",
                        "ICT Teacher & Computer Maintenance"
                      ),
                      company: t(
                        "about.experience.previous.ictCompany",
                        "Phnom Penh International Standard Academy"
                      ),
                      period: t(
                        "about.experience.previous.ictPeriod",
                        "2023 – 2025 (Part-time)"
                      ),
                      description: t(
                        "about.experience.previous.ictDescription",
                        "Teaching ICT courses and providing computer maintenance services."
                      ),
                    },
                    {
                      title: t(
                        "about.experience.previous.itSupport",
                        "IT Support"
                      ),
                      company: t(
                        "about.experience.previous.itCompany",
                        "Bright Kids School"
                      ),
                      period: t(
                        "about.experience.previous.itPeriod",
                        "2023 – 2024"
                      ),
                      description: t(
                        "about.experience.previous.itDescription",
                        "Provided comprehensive IT support and technical assistance."
                      ),
                    },
                    {
                      title: t(
                        "about.experience.previous.salesDesigner",
                        "Sales & Graphic Designer"
                      ),
                      company: t(
                        "about.experience.previous.salesCompany",
                        "AddMii.com"
                      ),
                      period: t(
                        "about.experience.previous.salesPeriod",
                        "2022 – 2023"
                      ),
                      description: t(
                        "about.experience.previous.salesDescription",
                        "Combined sales responsibilities with graphic design projects."
                      ),
                    },
                  ].map((exp, index) => (
                    <div
                      key={index}
                      className="pl-2 border-l-2 border-primary/20"
                    >
                      <h3 className="text-base sm:text-lg font-medium text-foreground leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <span className="block lg:inline">{exp.company}</span>
                        <span className="mx-0 lg:mx-2 block lg:inline text-primary/60">
                          •
                        </span>
                        <span className="block lg:inline">{exp.period}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Skills & Certifications Grid - Improved responsive */}
            <motion.div
              className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
              variants={fadeInUp}
            >
              {/* Technical Skills */}
              <Card className="bg-background/80 dark:bg-muted/60 p-4 sm:p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {t("about.skills.title", "Technical Skills")}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                      {t("about.skills.development", "Development")}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {technicalSkills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                      {t("about.skills.it", "IT & Networking")}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {itSkills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="px-2 sm:px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-xs sm:text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Certifications & Languages */}
              <Card className="bg-background/80 dark:bg-muted/60 p-4 sm:p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {t(
                      "about.certifications.title",
                      "Certifications & Languages"
                    )}
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">
                      {t("about.certifications.certTitle", "Certifications")}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          icon: (
                            <Server className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                          ),
                          text: t(
                            "about.certifications.ccna1",
                            "CCNA Level 1 (Completed, 2024)"
                          ),
                        },
                        {
                          icon: (
                            <Server className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                          ),
                          text: t(
                            "about.certifications.ccna2",
                            "CCNA Level 2 (In Progress)"
                          ),
                        },
                        {
                          icon: (
                            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          ),
                          text: t(
                            "about.certifications.toefl",
                            "TOEFL ITP: 407 (CEFR A2)"
                          ),
                        },
                        {
                          icon: (
                            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          ),
                          text: t(
                            "about.certifications.ielts",
                            "IELTS Academic: Band 4.5 (CEFR B1)"
                          ),
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">
                      {t("about.languages.title", "Languages")}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          language: t("about.languages.khmer", "Khmer"),
                          level: t("about.languages.khmerLevel", "Native"),
                        },
                        {
                          language: t("about.languages.english", "English"),
                          level: t(
                            "about.languages.englishLevel",
                            "Intermediate"
                          ),
                        },
                        {
                          language: t("about.languages.chinese", "Chinese"),
                          level: t("about.languages.chineseLevel", "Fair"),
                        },
                      ].map((lang, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0"
                        >
                          <span className="text-xs sm:text-sm font-medium">
                            {lang.language}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-full w-fit">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Notable Projects */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background/80 dark:bg-muted/60 p-4 sm:p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                    {t("about.projects.title", "Notable Projects")}
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      title: t(
                        "about.projects.universityWebsite",
                        "University Website Development"
                      ),
                      details: `${t(
                        "about.projects.universityWebsiteUrl",
                        "sbku.edu.kh"
                      )} • ${t("about.projects.universityWebsiteYear", "2025")}`,
                      description: t(
                        "about.projects.universityWebsiteDesc",
                        "Developed and maintain the official university website with modern web technologies."
                      ),
                    },
                    {
                      title: t(
                        "about.projects.barcodePOS",
                        "Barcode POS System"
                      ),
                      details: `${t(
                        "about.projects.barcodePOSProject",
                        "University Event Project"
                      )} • ${t("about.projects.barcodePOSYear", "2024")}`,
                      description: t(
                        "about.projects.barcodePOSDesc",
                        "Built using C#, SQL Server, and Crystal Reports for university event management."
                      ),
                    },
                    {
                      title: t(
                        "about.projects.ums",
                        "University Management System"
                      ),
                      details: `${t(
                        "about.projects.umsProject",
                        "Research Project"
                      )} • ${t("about.projects.umsStatus", "In Development")}`,
                      description: t(
                        "about.projects.umsDesc",
                        "Comprehensive management system for university operations and research activities."
                      ),
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="pl-2 border-l-2 border-primary/20"
                    >
                      <h3 className="text-base sm:text-lg font-medium text-foreground leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {project.details}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Button - Better responsive */}
            <motion.div
              className="flex justify-center lg:justify-end pt-4"
              variants={fadeInUp}
            >
              <motion.a
                href="mailto:itsanvert@gmail.com"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-all duration-200 hover:shadow-md text-sm sm:text-base w-full sm:w-auto justify-center"
                aria-label={t("about.cta", "Get In Touch")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                {t("about.cta", "Get In Touch")}
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </HydrationBoundary>
  );
}