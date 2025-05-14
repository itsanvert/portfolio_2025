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

// Example Course type in ../lib/interface.ts

export interface Course {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  level: string;
  lessons: number;
  thumbnail: string;
  price: number;
  instructor: string;
  category: string;
  tags: string[];
  requirements: string[];
  whatYouWillLearn: string[];
  videos: {
    videoFile: {
      asset: {
        _ref: string;
        _type: string;
        url?: string; // optional if already resolved
      };
    };
  }[];
}
