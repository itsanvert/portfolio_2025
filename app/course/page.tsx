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
import { useEffect, useState, useCallback, useMemo } from "react";
import { client } from "../lib/sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { debounce } from "lodash";
import FocusTrap from "focus-trap-react";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return source
    ? builder
        .image(source)
        .width(600)
        .height(400)
        .auto("format")
        .quality(90)
        .url()
    : "/fallback-image.jpg"; // Fallback image
}

interface Lesson {
  title: string;
  description?: string;
}

interface Video {
  title: string;
  url: string;
  duration?: string;
}

interface Resource {
  _id: string;
  title: string;
  url: string;
  type: string;
  description?: string;
}

interface Week {
  _key?: string;
  weekNumber: number;
  title: string;
  topics?: string[];
  activities?: string[];
  videos?: Video[];
  lessons?: Lesson[];
  resources?: Resource[];
}

interface Course {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  shortDescription: string;
  duration: string;
  level: string;
  lessons: number;
  thumbnail: any;
  price: number;
  instructor: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  videos?: Video[];
  requirements?: string[];
  whatYouWillLearn?: string[];
  weeklySchedule?: Week[];
  featured?: boolean;
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
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setIsMounted(true);
    if (course?.videos?.[0]?.url) {
      setVideoSrc(course.videos[0].url);
    } else if (course?.weeklySchedule?.[0]?.videos?.[0]?.url) {
      setVideoSrc(course.weeklySchedule[0].videos[0].url); // Fallback to first week's video
    } else {
      setVideoSrc("");
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

  const handleEnroll = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course._id }),
      });
      if (!response.ok) throw new Error("Failed to initiate checkout");
      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(t("Course.enrollmentError"));
    }
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      <FocusTrap>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50"
          onClick={onClose}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h2
                  id="modal-title"
                  className="text-3xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {course.title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={t("Course.closeModal")}
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                {videoSrc ? (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    src={videoSrc}
                    poster={urlFor(course.thumbnail)}
                    aria-label={t("Course.videoLabel", { title: course.title })}
                  />
                ) : (
                  <Image
                    src={urlFor(course.thumbnail)}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                )}
              </div>

              <ScrollArea className="max-h-[min(60vh,500px)] space-y-4 text-gray-600 dark:text-gray-300">
                <p className="text-lg">{course.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    <span className="text-md">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    <span className="text-md">{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-md font-semibold">
                      {t("Course.instructor")}:
                    </span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-md font-semibold">
                      {t("Course.price")}:
                    </span>
                    <span>${course.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-md font-semibold">
                      {t("Course.category")}:
                    </span>
                    <span>{t(`Course.filters.${course.category}`)}</span>
                  </div>
                </div>

                {course.tags?.length ? (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {t("Course.tags")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {course.requirements?.length ? (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {t("Course.requirements")}
                    </h3>
                    <ul className="list-disc pl-6 space-y-1 text-md">
                      {course.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {course.whatYouWillLearn?.length ? (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {t("Course.whatYouWillLearn")}
                    </h3>
                    <ul className="list-disc pl-6 space-y-1 text-md">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {course.weeklySchedule && course.weeklySchedule.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {t("Course.weeklySchedule")}
                    </h3>
                    <ul className="list-decimal pl-6 space-y-4">
                      {course.weeklySchedule.map(
                        (week: Week, index: number) => (
                          <li key={week._key || index} className="text-md">
                            <strong>
                              {t("Course.week")} {week.weekNumber}: {week.title}
                            </strong>
                            {week.topics?.length ? (
                              <div className="mt-1">
                                <h4 className="text-sm font-semibold">
                                  {t("Course.topics")}
                                </h4>
                                <ul className="list-disc pl-6 text-sm">
                                  {week.topics.map((topic, idx) => (
                                    <li key={idx}>{topic}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {week.activities?.length ? (
                              <div className="mt-1">
                                <h4 className="text-sm font-semibold">
                                  {t("Course.activities")}
                                </h4>
                                <ul className="list-disc pl-6 text-sm">
                                  {week.activities.map((activity, idx) => (
                                    <li key={idx}>{activity}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {week.videos?.length ? (
                              <div className="mt-1">
                                <h4 className="text-sm font-semibold">
                                  {t("Course.videos")}
                                </h4>
                                <ul className="list-disc pl-6 text-sm">
                                  {week.videos.map((video, idx) => (
                                    <li key={idx}>
                                      <a
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-600 dark:text-blue-400"
                                      >
                                        {video.title}
                                      </a>
                                      {video.duration && (
                                        <span className="text-gray-500 dark:text-gray-400">
                                          {" "}
                                          ({video.duration})
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {week.lessons?.length ? (
                              <div className="mt-1">
                                <h4 className="text-sm font-semibold">
                                  {t("Course.lessons")}
                                </h4>
                                <ul className="list-disc pl-6 text-sm">
                                  {week.lessons.map((lesson, idx) => (
                                    <li key={idx}>
                                      {lesson.title}
                                      {lesson.description && (
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                                          {lesson.description}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {week.resources?.length ? (
                              <div className="mt-1">
                                <h4 className="text-sm font-semibold">
                                  {t("Course.resources")}
                                </h4>
                                <ul className="list-disc pl-6 text-sm">
                                  {week.resources.map(
                                    (resource: Resource, idx) => (
                                      <li key={resource._id || idx}>
                                        <a
                                          href={resource.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="underline text-blue-600 dark:text-blue-400"
                                        >
                                          {resource.title}
                                        </a>{" "}
                                        (
                                        {t(
                                          `Course.resourceTypes.${resource.type}`
                                        )}
                                        )
                                        {resource.description && (
                                          <span className="block text-xs text-gray-500 dark:text-gray-400">
                                            {resource.description}
                                          </span>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            ) : null}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </ScrollArea>

              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                  onClick={onClose}
                >
                  {t("Course.close")}
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                  onClick={handleEnroll}
                >
                  {t("Course.enrollNow")}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </FocusTrap>
    </AnimatePresence>
  );
};

export default function CoursePage() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("duration-asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const perPage = 9;
  const maxRetries = 3;

  const debouncedSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 300),
    []
  );

  const fetchCourses = useCallback(async () => {
    if (retryCount >= maxRetries) {
      setError(t("Course.maxRetriesExceeded"));
      setLoading(false);
      return;
    }
    try {
      const query = `*[_type == "course" && isPublished == true] | order(_createdAt desc) [${(page - 1) * perPage}...${page * perPage}] {
        _id,
        title,
        slug { current },
        description,
        shortDescription,
        duration,
        level,
        lessons,
        "thumbnail": thumbnail.asset->url,
        price,
        instructor,
        category,
        tags,
        isPublished,
        featured
      }`;
      const countQuery = `count(*[_type == "course" && isPublished == true])`;
      const [data, total] = await Promise.all([
        client.fetch(query),
        client.fetch(countQuery),
      ]);
      setCourses(data);
      setTotalCourses(total);
      setRetryCount(0);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setRetryCount((prev) => prev + 1);
      setError(t("Course.error"));
    } finally {
      setLoading(false);
    }
  }, [t, page, retryCount]);

  const fetchCourseDetails = useCallback(
    async (courseId: string) => {
      try {
        const query = `*[_type == "course" && _id == $courseId][0] {
        _id,
        title,
        slug { current },
        description,
        shortDescription,
        duration,
        level,
        lessons,
        "thumbnail": thumbnail.asset->url,
        price,
        instructor,
        category,
        tags,
        isPublished,
        videos[] {
          title,
          url,
          duration
        },
        requirements,
        whatYouWillLearn,
        weeklySchedule[] {
          _key,
          weekNumber,
          title,
          topics,
          activities,
          videos[] {
            title,
            url,
            duration
          },
          lessons[] {
            title,
            description
          },
          resources[]->{
            _id,
            title,
            url,
            type,
            description
          }
        },
        featured
      }`;
        const data = await client.fetch(query, { courseId });
        if (!data) throw new Error("Course not found");
        setSelectedCourse(data);
        setIsModalOpen(true);
      } catch (err) {
        console.error("Error fetching course details:", err);
        alert(t("Course.detailsError"));
      }
    },
    [t]
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses, page]);

  const parseDuration = (duration: string): number => {
    const match = duration.match(/(\d+)\s*(weeks|hours|months)/i);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    if (unit === "months") return value * 4;
    if (unit === "hours") return value / (7 * 24);
    return value;
  };

  const filterAndSortCourses = useMemo(() => {
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
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "duration-asc":
          return parseDuration(a.duration) - parseDuration(b.duration);
        case "duration-desc":
          return parseDuration(b.duration) - parseDuration(a.duration);
        case "lessons-asc":
          return a.lessons - b.lessons;
        case "lessons-desc":
          return b.lessons - a.lessons;
        default:
          return 0;
      }
    });
    return filtered;
  }, [courses, searchQuery, selectedLevel, selectedCategory, sortBy]);

  const handleOpenModal = (course: Course) => {
    fetchCourseDetails(course._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const totalPages = Math.ceil(totalCourses / perPage);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card
                key={index}
                className="h-96 bg-gray-200 dark:bg-gray-700 animate-pulse"
              >
                <div className="aspect-video bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
                <div className="p-4 space-y-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16" />
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <p className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</p>
          {retryCount < maxRetries ? (
            <Button
              onClick={() => {
                setLoading(true);
                fetchCourses();
              }}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
            >
              {t("Course.tryAgain")}
            </Button>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              {t("Course.contactSupport")}{" "}
              <a
                href="mailto:support@example.com"
                className="underline text-blue-600 dark:text-blue-400"
              >
                support@example.com
              </a>
            </p>
          )}
        </div>
      </div>
    );
  }

  if (filterAndSortCourses.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            {t("Course.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t("Course.description")}
          </p>
        </motion.div>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            {t("Course.noResults")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            {t("Course.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t("Course.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("Course.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => debouncedSearch(e.target.value)}
              aria-label={t("Course.searchPlaceholder")}
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="relative flex items-center">
              <Filter className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                aria-label={t("Course.filters.levelLabel")}
              >
                <option value="all">{t("Course.filters.allLevels")}</option>
                <option value="beginner">{t("Course.filters.beginner")}</option>
                <option value="intermediate">
                  {t("Course.filters.intermediate")}
                </option>
                <option value="advanced">{t("Course.filters.advanced")}</option>
              </select>
            </div>

            <div className="relative flex items-center">
              <Filter className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                aria-label={t("Course.filters.categoryLabel")}
              >
                <option value="all">{t("Course.filters.allCategories")}</option>
                <option value="web-development">
                  {t("Course.filters.webDevelopment")}
                </option>
                <option value="mobile-development">
                  {t("Course.filters.mobileDevelopment")}
                </option>
                <option value="data-science">
                  {t("Course.filters.dataScience")}
                </option>
                <option value="machine-learning">
                  {t("Course.filters.machineLearning")}
                </option>
                <option value="design">{t("Course.filters.design")}</option>
                <option value="business">{t("Course.filters.business")}</option>
                <option value="devops">{t("Course.filters.devops")}</option>
                <option value="cybersecurity">
                  {t("Course.filters.cybersecurity")}
                </option>
              </select>
            </div>

            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-10 pr-8 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                aria-label={t("Course.filters.sortLabel")}
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterAndSortCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="relative p-0 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={urlFor(course.thumbnail)}
                      alt={course.title}
                      fill
                      className="object-cover transition-opacity duration-300 hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      {...(index < 3
                        ? { priority: true }
                        : { loading: "lazy" })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 dark:from-gray-900/60" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100">
                        {t(`Course.filters.${course.level}`)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {course.shortDescription}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags?.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                      >
                        {tag}
                      </Badge>
                    ))}
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
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${course.price.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-colors"
                    onClick={() => handleOpenModal(course)}
                    aria-label={t("Course.learnMoreLabel", {
                      title: course.title,
                    })}
                  >
                    {t("Course.learnMore")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
              aria-label={t("Course.previous")}
            >
              {t("Course.previous")}
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  variant={page === pageNum ? "default" : "outline"}
                  className={
                    page === pageNum
                      ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                  }
                  aria-label={`${t("Course.page")} ${pageNum}`}
                >
                  {pageNum}
                </Button>
              )
            )}
            <Button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
              aria-label={t("Course.next")}
            >
              {t("Course.next")}
            </Button>
          </div>
        )}

        {isModalOpen && selectedCourse && (
          <CourseModal course={selectedCourse} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
