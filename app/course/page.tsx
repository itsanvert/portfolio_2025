"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Tag,
  User,
  DollarSign,
  ArrowRight,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

// Initialize Sanity Image Builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder
    .image(source)
    .width(400)
    .height(250)
    .auto("format")
    .quality(80); // Adjust image size and quality
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Debounced search query handler
  const debouncedSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const query = `*[_type == "course" && isPublished == true] {
          _id,
          title,
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
          videos,
          requirements,
          whatYouWillLearn
        }`;
        const data = await client.fetch(query);
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Sorting
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

  // Open Modal
  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Explore Our Courses
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover a wide range of courses designed to help you achieve your
          goals and advance your career.
        </p>
      </motion.div>

      {/* Course filter controls */}
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for a course..."
            className="px-4 py-2 border rounded-md focus:outline-none"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border rounded-md focus:outline-none"
          >
            <option value="duration-asc">Duration (Asc)</option>
            <option value="duration-desc">Duration (Desc)</option>
            <option value="lessons-asc">Lessons (Asc)</option>
            <option value="lessons-desc">Lessons (Desc)</option>
          </select>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col shadow-lg rounded-lg border">
              <CardHeader className="relative">
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(course.thumbnail).toString()}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-2xl font-semibold">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm text-gray-600">
                  {course.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-auto">
                <div className="text-lg font-semibold text-primary">
                  ${course.price.toFixed(2)}
                </div>
                <Button
                  variant="default"
                  onClick={() => handleOpenModal(course)}
                  aria-label={`Learn more about ${course.title}`}
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedCourse.title}
            </h2>
            <div className="aspect-video mb-4">
              {selectedCourse.videos && selectedCourse.videos.length > 0 && (
                <iframe
                  width="100%"
                  height="315"
                  // Assuming each video has a 'url' field that holds the video URL
                  src={selectedCourse.videos[0]?.url} // Access the 'url' field of the first video
                  title="Course Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Description</h3>
              <p>{selectedCourse.description}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Technologies</h3>
              <p>{selectedCourse.requirements}</p>
            </div>
            <Button variant="destructive" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
