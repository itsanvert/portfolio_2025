export interface Course {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  description: string;
  shortDescription: string;
  duration: string;
  level: string;
  lessons: number;
  thumbnail: string;
  price: number;
  instructor: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  isEligible?: boolean;
  videos?: Video[];
  requirements?: string[];
  whatYouWillLearn?: string[];
}

export interface Video {
  title: string;
  url: string;
  duration?: string;
  description?: string;
}
