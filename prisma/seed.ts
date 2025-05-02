import { prisma } from "../lib/prisma";

async function main() {
  const courses = [
    {
      title: "Web Development Fundamentals",
      description:
        "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
      duration: "8 weeks",
      level: "Beginner",
      lessons: 24,
      thumbnail: "/courses/web-dev.jpg",
    },
    {
      title: "Full Stack Development with Next.js",
      description:
        "Master modern web development with Next.js, React, and Node.js.",
      duration: "12 weeks",
      level: "Intermediate",
      lessons: 36,
      thumbnail: "/courses/nextjs.jpg",
    },
    {
      title: "Database Design & Management",
      description:
        "Learn SQL, database design, and management with practical projects.",
      duration: "6 weeks",
      level: "Intermediate",
      lessons: 18,
      thumbnail: "/courses/database.jpg",
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { title: course.title },
      update: {},
      create: course,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
