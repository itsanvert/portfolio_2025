// lib/interfaces.ts
export interface Video {
  _type?: "courseVideo";
  title: string;
  url: string;
  duration: string;
}

export interface Resource {
  _id: string;
  _type?: "resource";
  title: string;
  url: string;
  type: "article" | "video" | "tutorial" | "code" | "documentation" | "tool";
  description?: string;
}

export interface Week {
  _key: string;
  _type?: "week";
  weekNumber: number;
  title: string;
  topics: string[];
  activities?: string[];
  resources?: Resource[];
}

export interface Course {
  _id: string;
  _type?: "course";
  title: string;
  slug: { current: string };
  description: string;
  shortDescription: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  thumbnail: string; // Resolved URL from thumbnail.asset->url
  price: number;
  instructor: string;
  category:
    | "web-development"
    | "mobile-development"
    | "data-science"
    | "machine-learning"
    | "design"
    | "business"
    | "devops"
    | "cybersecurity";
  tags: string[];
  isPublished: boolean;
  videos?: Video[];
  requirements?: string[];
  whatYouWillLearn: string[];
  weeklySchedule?: Week[];
  featured: boolean;
}
export interface ProjectsCard {
  sourceLink: any;
  demoLink: string;
  _id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  imageUrl: string;
}
