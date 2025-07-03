"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ArrowRight,
  X,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { client } from "../lib/sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { Course } from "../lib/interface";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder
    .image(source)
    .width(600)
    .height(400)
    .auto("format")
    .quality(90);
}

type SortOption =
  | "duration-asc"
  | "duration-desc"
  | "lessons-asc"
  | "lessons-desc";

const CourseModal = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setIsMounted(true);
    if (course?.videos?.[0]?.videoFile?.asset?._ref) {
      const src = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${
        process.env.NEXT_PUBLIC_SANITY_DATASET
      }/${course.videos[0].videoFile.asset._ref
        .replace("file-", "")
        .replace("-mp4", ".mp4")}`;
      setVideoSrc(src);
    }
  }, [course]);

  useEffect(() => {
    if (isMounted) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {course.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {videoSrc && (
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={videoSrc}
                  poster={urlFor(course.thumbnail).toString()}
                />
              )}
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>{course.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span>{course.lessons} Lessons</span>
                </div>
              </div>

              {course.whatYouWillLearn && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    What You'll Learn
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    {course.whatYouWillLearn.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                onClick={onClose}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function CoursePage() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("duration-asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const debouncedSearch = useCallback(
    (query: string) => setSearchQuery(query),
    []
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const query = `*[_type == "course" && isPublished == true] {
          _id, title, description, shortDescription, duration, level, lessons,
          "thumbnail": thumbnail.asset->url, price, instructor, category,
          tags, videos, requirements, whatYouWillLearn
        }`;
        const data = await client.fetch(query);
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "duration-asc":
          return a.duration.localeCompare(b.duration);
        case "duration-desc":
          return b.duration.localeCompare(a.duration);
        case "lessons-asc":
          return a.lessons - b.lessons;
        case "lessons-desc":
          return b.lessons - a.lessons;
        default:
          return 0;
      }
    });
    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedLevel, sortBy]);

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            {t("Explore Our Courses")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t("Discover a wide range of courses designed to help you grow.")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative flex items-center">
              <Filter className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-10 pr-8 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="duration-asc">Duration (Asc)</option>
                <option value="duration-desc">Duration (Desc)</option>
                <option value="lessons-asc">Lessons (Asc)</option>
                <option value="lessons-desc">Lessons (Desc)</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="relative p-0 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={urlFor(course.thumbnail).toString()}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 dark:from-gray-900/50" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {course.shortDescription}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-2 flex-grow">
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge
                      variant="outline"
                      className="border-purple-200 dark:border-purple-400 text-purple-700 dark:text-purple-300"
                    >
                      {course.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${course.price.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                    onClick={() => handleOpenModal(course)}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {isModalOpen && selectedCourse && (
          <CourseModal course={selectedCourse} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
