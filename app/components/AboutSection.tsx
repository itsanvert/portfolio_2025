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

export function AboutSection() {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Profile Card */}
        <motion.div
          className="col-span-1 flex flex-col items-center"
          variants={fadeInUp}
        >
          <Card className="w-full bg-gradient-to-br from-primary/10 to-muted/40 p-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="relative h-[340px] w-full">
              <Image
                src="/me.jpg"
                alt="Profile picture of San Vert"
                className="object-cover w-full h-full"
                priority
                width={500}
                height={340}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {t("about.title", "Full-Stack Developer & IT Professional")}
              </h2>
              <p className="text-muted-foreground text-center mb-4">
                {t(
                  "about.description",
                  "Computer Science student with hands-on experience in web development, IT support, and network administration. Passionate about creating scalable solutions and contributing to educational technology initiatives."
                )}
              </p>
              <a
                href="/resume/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-all duration-200"
                aria-label="Download Resume"
              >
                <Download className="w-5 h-5" />
                {t("about.resume", "Download Resume")}
              </a>
            </div>
          </Card>
        </motion.div>

        {/* Details Card */}
        <motion.div className="col-span-2 space-y-8" variants={fadeInUp}>
          {/* Education */}
          <Card className="bg-white/80 dark:bg-muted/60 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("about.education.title", "Education")}
              </h2>
            </div>
            <div className="space-y-4">
              {/* University */}
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {t("about.education.degree", "Bachelor of Computer Science")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.education.university",
                    "Samdech Preah Mahasangharajah Bour Kry University"
                  )}
                  {" • "}
                  {t("about.education.period", "2022 – Present")}
                </p>
                <p className="text-muted-foreground mt-1">
                  {t(
                    "about.education.specialization",
                    "Expected Graduation: 2026"
                  )}
                </p>
              </div>
              {/* High School */}
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {t("about.education.highSchool", "High School Diploma")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.education.university",
                    "Samdech Preah Mahasangharajah Bour Kry High School"
                  )}
                  {" • "}
                  {t("about.education.highSchoolPeriod", "2021 – 2022")}
                </p>
                <p className="text-muted-foreground mt-1">
                  {t(
                    "about.education.highSchoolGrad",
                    "Graduated November 2022"
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Experience */}
          <Card className="bg-white/80 dark:bg-muted/60 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("about.experience.title", "Professional Experience")}
              </h2>
            </div>
            <div className="space-y-4">
              {/* Experience items */}
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t(
                    "about.experience.current.position",
                    "Volunteer Web Developer"
                  )}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.experience.current.company",
                    "Samdech Preah Mahasanghara Bour Kry University"
                  )}{" "}
                  • {t("about.experience.current.period", "2025 – Present")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.experience.current.description",
                    "Developed and maintain the official university website (sbku.edu.kh). Currently developing a University Management System for research projects."
                  )}
                </p>
              </div>
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t(
                    "about.experience.previous.freelance",
                    "Freelance Graphic Designer"
                  )}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.experience.previous.freelanceCompany",
                    "Kampufreelancer"
                  )}{" "}
                  •{" "}
                  {t(
                    "about.experience.previous.freelancePeriod",
                    "2024 – 2025"
                  )}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.experience.previous.freelanceDescription",
                    "Designed kid cards and various digital assets for clients."
                  )}
                </p>
              </div>
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t(
                    "about.experience.previous.ictTeacher",
                    "ICT Teacher & Computer Maintenance"
                  )}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.experience.previous.ictCompany",
                    "Phnom Penh International Standard Academy"
                  )}{" "}
                  •{" "}
                  {t(
                    "about.experience.previous.ictPeriod",
                    "2023 – 2025 (Part-time)"
                  )}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.experience.previous.ictDescription",
                    "Teaching ICT courses and providing computer maintenance services."
                  )}
                </p>
              </div>
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t("about.experience.previous.itSupport", "IT Support")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.experience.previous.itCompany",
                    "Bright Kids School"
                  )}{" "}
                  • {t("about.experience.previous.itPeriod", "2023 – 2024")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.experience.previous.itDescription",
                    "Provided comprehensive IT support and technical assistance."
                  )}
                </p>
              </div>
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t(
                    "about.experience.previous.salesDesigner",
                    "Sales & Graphic Designer"
                  )}
                </h3>
                <p className="text-muted-foreground">
                  {t("about.experience.previous.salesCompany", "AddMii.com")} •{" "}
                  {t("about.experience.previous.salesPeriod", "2022 – 2023")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.experience.previous.salesDescription",
                    "Combined sales responsibilities with graphic design projects."
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="bg-white/80 dark:bg-muted/60 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("about.skills.title", "Technical Skills")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {technicalSkills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                  whileHover={{ scale: 1.08 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {itSkills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors duration-200"
                  whileHover={{ scale: 1.08 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>

          {/* Certifications & Languages */}
          <Card className="bg-white/80 dark:bg-muted/60 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("about.certifications.title", "Certifications & Languages")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certifications */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t("about.certifications.certTitle", "Certifications")}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "about.certifications.ccna1",
                        "CCNA Level 1 (Completed, 2024)"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "about.certifications.ccna2",
                        "CCNA Level 2 (In Progress)"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "about.certifications.toefl",
                        "TOEFL ITP: 407 (CEFR A2)"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      {t(
                        "about.certifications.ielts",
                        "IELTS Academic: Band 4.5 (CEFR B1)"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {/* Languages */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t("about.languages.title", "Languages")}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {t("about.languages.khmer", "Khmer")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("about.languages.khmerLevel", "Native")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {t("about.languages.english", "English")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("about.languages.englishLevel", "Intermediate")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {t("about.languages.chinese", "Chinese")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t("about.languages.chineseLevel", "Fair")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Notable Projects */}
          <Card className="bg-white/80 dark:bg-muted/60 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("about.projects.title", "Notable Projects")}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t(
                    "about.projects.universityWebsite",
                    "University Website Development"
                  )}
                </h3>
                <p className="text-muted-foreground">
                  {t("about.projects.universityWebsiteUrl", "sbku.edu.kh")} •{" "}
                  {t("about.projects.universityWebsiteYear", "2025")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.projects.universityWebsiteDesc",
                    "Developed and maintain the official university website with modern web technologies."
                  )}
                </p>
              </div>
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t("about.projects.barcodePOS", "Barcode POS System")}
                </h3>
                <p className="text-muted-foreground">
                  {t(
                    "about.projects.barcodePOSProject",
                    "University Event Project"
                  )}{" "}
                  • {t("about.projects.barcodePOSYear", "2024")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.projects.barcodePOSDesc",
                    "Built using C#, SQL Server, and Crystal Reports for university event management."
                  )}
                </p>
              </div>
              <div className="pl-9 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium text-foreground">
                  {t("about.projects.ums", "University Management System")}
                </h3>
                <p className="text-muted-foreground">
                  {t("about.projects.umsProject", "Research Project")} •{" "}
                  {t("about.projects.umsStatus", "In Development")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t(
                    "about.projects.umsDesc",
                    "Comprehensive management system for university operations and research activities."
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Button */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-end"
          >
            <a
              href="mailto:itsanvert@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-all duration-200"
              aria-label={t("about.cta", "Get In Touch")}
            >
              <Mail className="w-5 h-5" />
              {t("about.cta", "Get In Touch")}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
