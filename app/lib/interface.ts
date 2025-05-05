export interface ProjectsCard {
  _id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  imageUrl: string;
}

export interface Video {
  title: string;
  url: string;
  duration?: string;
  description?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  thumbnail: any; // Sanity image type
  price: number;
  instructor: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  videos?: Video[];
  requirements?: string[];
  whatYouWillLearn?: string[];
}
