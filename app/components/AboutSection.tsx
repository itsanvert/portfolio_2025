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
        staggerChildren: 0.15,
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Profile Card */}
          <motion.div
            className="col-span-1 flex flex-col items-center"
            variants={fadeInUp}
          >
            <Card className="w-full bg-gradient-to-br from-primary/10 to-muted/40 p-0 shadow-xl rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="relative h-[320px] w-full">
                <Image
                  src="/me.jpg"
                  alt="Profile picture of San Vert"
                  className="object-cover w-full h-full"
                  priority
                  width={500}
                  height={320}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {t("about.status", "Available for work")}
                  </motion.div>
                </div>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <motion.h2
                  className="text-2xl font-bold text-primary mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {t("about.title", "Full-Stack Developer & IT Professional")}
                </motion.h2>
                <motion.p
                  className="text-muted-foreground mb-6"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-all duration-200 hover:shadow-md"
                  aria-label="Download Resume"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  {t("about.resume", "Download Resume")}
                </motion.a>
              </div>
            </Card>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="col-span-2 space-y-6 md:space-y-8"
            variants={fadeInUp}
          >
            {/* Education */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("about.education.title", "Education")}
                  </h2>
                </div>
                <div className="space-y-6">
                  {/* University */}
                  <div className="pl-2 border-l-2 border-primary/20">
                    <h3 className="text-lg font-medium text-foreground">
                      {t(
                        "about.education.degree",
                        "Bachelor of Computer Science"
                      )}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(
                        "about.education.university",
                        "Samdech Preah Mahasangharajah Bour Kry University"
                      )}
                      <span className="mx-2">•</span>
                      {t("about.education.period", "2022 – Present")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t(
                        "about.education.specialization",
                        "Expected Graduation: 2026"
                      )}
                    </p>
                  </div>
                  {/* High School */}
                  <div className="pl-2 border-l-2 border-primary/20">
                    <h3 className="text-lg font-medium text-foreground">
                      {t("about.education.highSchool", "High School Diploma")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(
                        "about.education.highSchoolName",
                        "Samdech Preah Mahasangharajah Bour Kry High School"
                      )}
                      <span className="mx-2">•</span>
                      {t("about.education.highSchoolPeriod", "2021 – 2022")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
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
              <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("about.experience.title", "Professional Experience")}
                  </h2>
                </div>
                <div className="space-y-6">
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
                      <h3 className="text-lg font-medium text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {exp.company}
                        <span className="mx-2">•</span>
                        {exp.period}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Skills & Certifications Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              variants={fadeInUp}
            >
              {/* Technical Skills */}
              <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("about.skills.title", "Technical Skills")}
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {t("about.skills.development", "Development")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {t("about.skills.it", "IT & Networking")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {itSkills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium"
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
              <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="w-5 h-5 text-primary" />
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
                      {t("about.certifications.certTitle", "Certifications")}
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          icon: <Server className="w-4 h-4 text-primary" />,
                          text: t(
                            "about.certifications.ccna1",
                            "CCNA Level 1 (Completed, 2024)"
                          ),
                        },
                        {
                          icon: <Server className="w-4 h-4 text-yellow-500" />,
                          text: t(
                            "about.certifications.ccna2",
                            "CCNA Level 2 (In Progress)"
                          ),
                        },
                        {
                          icon: <Globe className="w-4 h-4 text-blue-500" />,
                          text: t(
                            "about.certifications.toefl",
                            "TOEFL ITP: 407 (CEFR A2)"
                          ),
                        },
                        {
                          icon: <Globe className="w-4 h-4 text-green-500" />,
                          text: t(
                            "about.certifications.ielts",
                            "IELTS Academic: Band 4.5 (CEFR B1)"
                          ),
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-sm text-muted-foreground">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {t("about.languages.title", "Languages")}
                    </h3>
                    <div className="space-y-3">
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
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm font-medium">
                            {lang.language}
                          </span>
                          <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
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
              <Card className="bg-background/80 dark:bg-muted/60 p-6 rounded-2xl shadow-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("about.projects.title", "Notable Projects")}
                  </h2>
                </div>
                <div className="space-y-6">
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
                      <h3 className="text-lg font-medium text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {project.details}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Button */}
            <motion.div
              className="flex justify-center lg:justify-end pt-4"
              variants={fadeInUp}
            >
              <motion.a
                href="mailto:itsanvert@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-all duration-200 hover:shadow-md"
                aria-label={t("about.cta", "Get In Touch")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                {t("about.cta", "Get In Touch")}
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </HydrationBoundary>
  );
}
