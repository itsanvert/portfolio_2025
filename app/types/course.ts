export interface Video {
  id: string;
  title: string;
  url: string;
  duration: string;
  description: string;
  thumbnail?: string;
  order: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  lessons: number;
  thumbnail: string;
  videos: Video[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  videoId: string;
  progress: number;
  completed: boolean;
  lastWatched: Date;
}
