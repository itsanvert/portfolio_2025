// interfaces.ts
export interface Video {
  _type?: "courseVideo"; // Added by Sanity for typed objects
  title: string;
  url: string; // URL string (http or https)
  duration: string; // String, e.g., "5 min"
}

export interface Resource {
  _id: string;
  _type?: "resource"; // Added by Sanity for documents
  title: string;
  url: string; // URL string (http or https)
  type: "article" | "video" | "tutorial" | "code" | "documentation" | "tool";
  description?: string;
}

export interface Week {
  _key: string; // Required for array items in Sanity
  _type?: "week"; // Added by Sanity for typed objects
  weekNumber: number; // 1–52 per schema validation
  title: string;
  topics: string[]; // At least one topic required
  activities?: string[];
  resources?: Resource[]; // References to resource documents
}

export interface Course {
  _id: string;
  _type?: "course"; // Added by Sanity for documents
  title: string;
  slug: { current: string };
  description: string; // 100–1000 characters
  shortDescription: string; // Max 200 characters
  duration: string; // e.g., "8 weeks"
  level: "beginner" | "intermediate" | "advanced";
  lessons: number; // Minimum 1
  thumbnail: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  price: number; // Minimum 0
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
  tags: string[]; // 1–10 tags
  isPublished: boolean; // Default false
  videos?: Video[]; // Optional array of course videos
  requirements?: string[]; // Optional prerequisites
  whatYouWillLearn: string[]; // 3–10 items
  weeklySchedule?: Week[]; // Optional array of weeks
  featured: boolean; // Default false
}
export interface ProjectsCard {
  _id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  imageUrl: string;
  sourceCodeUrl: string;
}
