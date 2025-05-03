import { Course, Video, CourseProgress } from "@/app/types/course";

// Sample course data
const courses: Course[] = [
  {
    _id: "1",
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    duration: "8 weeks",
    level: "Beginner",
    lessons: 12,
    thumbnail: "/images/courses/web-dev.jpg",
    published: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    videos: [
      {
        id: "1-1",
        title: "HTML Basics",
        url: "https://youtu.be/RvP-6ynP1tI?list=RDRvP-6ynP1tI",
        duration: "45:00",
        description: "Learn the basics of HTML structure and elements",
        order: 1,
        thumbnail: "/images/courses/html-basics.jpg",
      },
      {
        id: "1-2",
        title: "CSS Fundamentals",
        url: "https://youtu.be/RvP-6ynP1tI?list=RDRvP-6ynP1tI",
        duration: "60:00",
        description: "Master CSS styling and layout techniques",
        order: 2,
        thumbnail: "/images/courses/css-fundamentals.jpg",
      },
    ],
  },
  {
    _id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts and modern frameworks.",
    duration: "10 weeks",
    level: "Intermediate",
    lessons: 15,
    thumbnail: "/images/courses/js-advanced.jpg",
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    videos: [
      {
        id: "2-1",
        title: "ES6 Features",
        url: "https://youtu.be/RvP-6ynP1tI?list=RDRvP-6ynP1tI",
        duration: "50:00",
        description: "Explore modern JavaScript features",
        order: 1,
        thumbnail: "/images/courses/es6-features.jpg",
      },
      {
        id: "2-2",
        title: "Async Programming",
        url: "https://youtu.be/RvP-6ynP1tI?list=RDRvP-6ynP1tI",
        duration: "55:00",
        description: "Master asynchronous programming in JavaScript",
        order: 2,
        thumbnail: "/images/courses/async-js.jpg",
      },
    ],
  },
];

// Sample progress data
const courseProgress: CourseProgress[] = [];

export async function getCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return courses.filter((course) => course.published);
}

export async function getCourseById(id: string): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return courses.find((course) => course._id === id) || null;
}

export async function getVideoById(
  courseId: string,
  videoId: string
): Promise<Video | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const course = courses.find((c) => c._id === courseId);
  return course?.videos.find((v) => v.id === videoId) || null;
}

export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return courseProgress.filter(
    (progress) => progress.userId === userId && progress.courseId === courseId
  );
}

export async function updateVideoProgress(
  userId: string,
  courseId: string,
  videoId: string,
  progress: number
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const existingProgress = courseProgress.find(
    (p) =>
      p.userId === userId && p.courseId === courseId && p.videoId === videoId
  );

  if (existingProgress) {
    existingProgress.progress = progress;
    existingProgress.completed = progress >= 0.95;
    existingProgress.lastWatched = new Date();
  } else {
    courseProgress.push({
      userId,
      courseId,
      videoId,
      progress,
      completed: progress >= 0.95,
      lastWatched: new Date(),
    });
  }
}
