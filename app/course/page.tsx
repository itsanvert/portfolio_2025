"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Play, Clock, BookOpen, Award } from "lucide-react";

import { useEffect, useState } from "react";
import { getCourses } from "../actions/course";

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  lessons: number;
  thumbnail: string;
}

export default function CoursePage() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!courses.length) return <div>No courses found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div
        className="space-y-12"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <motion.div className="text-center space-y-4" variants={fadeInUp}>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            {t("course.title", "My Courses")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "course.description",
              "Learn from comprehensive courses designed to help you master modern web development."
            )}
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
        >
          {courses.map((course) => (
            <motion.div
              key={course._id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden group">
                <div className="relative h-48 w-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground">{course.description}</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {course.lessons} {t("course.lessons", "lessons")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      <span>
                        {t(
                          `course.${course.level.toLowerCase()}`,
                          course.level
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
