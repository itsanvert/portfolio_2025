"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Tag,
  User,
  DollarSign,
  Filter,
  ChevronDown,
  Search,
  Play,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/lib/181n";
import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Video {
  title: string;
  url: string;
  duration?: string;
  description?: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  lessons: number;
  thumbnail: {
    asset: {
      _ref: string;
    };
  };
  videos: Video[];
}

type SortOption =
  | "duration-asc"
  | "duration-desc"
  | "lessons-asc"
  | "lessons-desc";

export default function CoursePage() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("duration-asc");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, verify the Sanity client configuration
        if (
          !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
          !process.env.NEXT_PUBLIC_SANITY_DATASET
        ) {
          throw new Error(
            "Sanity configuration is missing. Please check your environment variables."
          );
        }

        // Simplified query for testing
        const query = `*[_type == "course"] {
          _id,
          title,
          description,
          duration,
          level,
          lessons,
          thumbnail,
          videos
        }`;

        console.log("Fetching courses with query:", query);

        // Add timeout to the fetch request
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        );

        const fetchPromise = client.fetch(query);
        const data = await Promise.race([fetchPromise, timeoutPromise]);

        console.log("Fetched data:", data);

        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received from Sanity");
        }

        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        let errorMessage = "Failed to fetch courses. ";

        if (err instanceof Error) {
          if (err.message.includes("timeout")) {
            errorMessage +=
              "Request timed out. Please check your internet connection.";
          } else if (err.message.includes("CORS")) {
            errorMessage +=
              "CORS error. Please check your Sanity CORS settings.";
          } else if (
            err.message.includes("401") ||
            err.message.includes("403")
          ) {
            errorMessage +=
              "Authentication error. Please check your Sanity token.";
          } else {
            errorMessage += err.message;
          }
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Apply sorting
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t("Course.errors.tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          {t("Course.title")}
        </motion.h1>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("Course.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">{t("Course.filters.allLevels")}</option>
              <option value="beginner">{t("Course.filters.beginner")}</option>
              <option value="intermediate">
                {t("Course.filters.intermediate")}
              </option>
              <option value="advanced">{t("Course.filters.advanced")}</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="duration-asc">
                {t("Course.filters.sortBy.durationAsc")}
              </option>
              <option value="duration-desc">
                {t("Course.filters.sortBy.durationDesc")}
              </option>
              <option value="lessons-asc">
                {t("Course.filters.sortBy.lessonsAsc")}
              </option>
              <option value="lessons-desc">
                {t("Course.filters.sortBy.lessonsDesc")}
              </option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="relative h-48">
                <Image
                  src={urlFor(course.thumbnail).url()}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {course.level}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    <Play className="inline-block w-4 h-4 mr-1" />
                    {course.videos?.length || 0}{" "}
                    {t("Course.courseDetails.videosCount")}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {course.lessons} lessons
                  </span>
                </div>

                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                  {t("Course.viewCourse")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <Image
                  src={urlFor(selectedCourse.thumbnail).url()}
                  alt={selectedCourse.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {selectedCourse.title}
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {selectedCourse.level}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    {selectedCourse.duration}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    <Play className="inline-block w-4 h-4 mr-1" />
                    {selectedCourse.videos?.length || 0} videos
                  </span>
                </div>

                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p>{selectedCourse.description}</p>
                </div>

                {/* Video List */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {t("Course.courseDetails.videos")}
                  </h3>
                  <div className="space-y-3">
                    {selectedCourse.videos?.map((video, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="flex items-center">
                          <Play className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {video.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t("Course.courseDetails.duration")}:{" "}
                              {video.duration}
                            </p>
                          </div>
                        </div>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                          {t("Course.courseDetails.watch")}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                  {t("Course.enrollNow")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
