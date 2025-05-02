"use client";
import { Card } from "@/components/ui/card";
import me from "../../public/me.jpg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "@/lib/181n";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, Mail } from "lucide-react";

export function AboutSection() {
  const { t } = useTranslation();

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

  // Get skills list from translations
  const skills = t("about.skills.list", { returnObjects: true }) as string[];

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
          whileHover={hoverScale}
        >
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
            <Image
              src={me}
              alt="Profile picture"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
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
                {t("about.title")}
              </motion.h1>
              <motion.p
                className="text-muted-foreground lg:text-lg leading-relaxed"
                variants={fadeInUp}
              >
                {t("about.description")}
              </motion.p>
            </Card>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("about.education.title")}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="pl-9 border-l-2 border-primary/20">
                  <h3 className="text-lg font-medium text-foreground">
                    {t("about.education.degree")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("about.education.university")} •{" "}
                    {t("about.education.period")}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {t("about.education.specialization")}
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
                  {t("about.experience.title")}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="pl-9 border-l-2 border-primary/20">
                  <h3 className="text-lg font-medium text-foreground">
                    {t("about.experience.current.position")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("about.experience.current.company")} •{" "}
                    {t("about.experience.current.period")}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {t("about.experience.current.description")}
                  </p>
                </div>
                <div className="pl-9 border-l-2 border-primary/20">
                  <h3 className="text-lg font-medium text-foreground">
                    {t("about.experience.previous.position")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("about.experience.previous.company")} •{" "}
                    {t("about.experience.previous.period")}
                  </p>
                  <p className="text-muted-foreground mt-2">
                    {t("about.experience.previous.description")}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={fadeInUp}>
            <Card className="border-none bg-muted/50 backdrop-blur-sm p-6 hover:bg-muted/60 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t("about.skills.title")}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Contact Button */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="mailto:itsanvert@gmail.com"
              className="relative inline-block text-lg group w-full"
            >
              <span className="relative z-10 block px-8 py-4 overflow-hidden font-medium leading-tight text-foreground transition-colors duration-300 ease-out border-2 border-primary rounded-xl group-hover:text-background shadow-lg">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-xl bg-background"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  {t("about.cta")}
                </span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-xl group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-xl"
              ></span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
