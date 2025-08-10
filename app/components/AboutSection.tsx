"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useTranslation } from "react-i18next";
// Removed unused import "@/lib/181n";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Mail,
  Award,
  Globe,
  Server,
} from "lucide-react";

export function AboutSection() {
  const { t } = useTranslation(); // Use translation hook

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hoverScale = {
    scale: 1.02,
    transition: { duration: 0.3 },
  };

  // Professional Skills with type safety
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Profile Image Section */}
        <motion.div
          className="col-span-1 relative"
          variants={fadeInUp}
          whileHover="hover"
          aria-label="Profile picture"
        >
          <motion.div
            className="relative h-[500px] w-full rounded-2xl overflow-hidden group"
            variants={{
              initial: { scale: 1 },
              animate: { scale: 1 },
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
            <Image
              src="/me.jpg"
              alt="Profile picture of San Vert"
              className="object-cover w-full h-full"
              priority
              width={500}
              height={500}
            />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="col-span-1 lg:col-span-2 space-y-8"
          variants={fadeInUp}
        >
          {/* Main Title and Description */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-8 hover:bg-muted/60 transition-colors duration-300">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
                variants={fadeInUp}
              >
                {t("about.title", "Full-Stack Developer & IT Professional")}
              </motion.h1>
              <motion.p
                className="text-muted-foreground lg:text-lg leading-relaxed"
                variants={fadeInUp}
              >
                {t(
                  "about.description",
                  "Computer Science student with hands-on experience in web development, IT support, and network administration. Passionate about creating scalable solutions and contributing to educational technology initiatives."
                )}
              </motion.p>
            </Card>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("about.education.title", "Education")}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="pl-9 border-l-2 border-primary/20">
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
                    )}{" "}
                    • {t("about.education.period", "2022 – Present")}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {t(
                      "about.education.specialization",
                      "Expected Graduation: 2026"
                    )}
                  </p>
                </div>
                <div className="pl-9 border-l-2 border-primary/20">
                  <h3 className="text-lg font-medium text-foreground">
                    {t("about.education.highSchool", "High School Diploma")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "about.education.university",
                      "Samdech Preah Mahasangharajah Bour Kry High School"
                    )}{" "}
                    • {t("about.education.highSchoolPeriod", "2021 – 2022")}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {t(
                      "about.education.highSchoolGrad",
                      "Graduated November 2022"
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("about.experience.title", "Professional Experience")}
                </h2>
              </div>
              <div className="space-y-4">
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
                    {t("about.experience.previous.salesCompany", "AddMii.com")}{" "}
                    •{" "}
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
          </motion.div>

          {/* Technical Skills Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("about.skills.title", "Technical Skills")}
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t("about.skills.development", "Development")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technicalSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t("about.skills.itNetworking", "IT & Networking")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {itSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Certifications & Languages Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t(
                    "about.certifications.title",
                    "Certifications & Languages"
                  )}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </motion.div>

          {/* Notable Projects Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
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
          </motion.div>

          {/* Contact Button */}
          {/* Contact Button */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="mailto:itsanvert@gmail.com"
              className="relative inline-block text-lg group w-full"
              aria-label={t("about.cta", "Get In Touch")}
            >
              <span className="relative z-10 block px-8 py-4 font-medium leading-tight border-2 border-primary rounded-xl shadow-lg overflow-hidden">
                {/* Static background */}
                <span className="absolute inset-0 rounded-xl bg-background transition-colors duration-300 ease-out"></span>

                {/* Rotating hover overlay */}
                <span className="absolute left-0 w-48 h-48 -ml-2 bg-primary transition-transform duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 group-hover:-rotate-180 ease"></span>

                {/* Text + Icon */}
                <span className="relative flex items-center justify-center gap-2 transition-colors duration-300 ease-out group-hover:text-background z-10">
                  <Mail className="w-5 h-5" />
                  {t("about.cta", "Get In Touch")}
                </span>
              </span>

              {/* Bottom hover fill effect */}
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 bg-primary hover:text-black rounded-xl transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-xl"
              ></span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
