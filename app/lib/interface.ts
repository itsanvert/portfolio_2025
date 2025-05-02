export interface ProjectsCard {
  title: string;
  _id: string;
  imageUrl: string;
  tags: string[];
  description: string;
  link: string;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  thumbnail: string;
}
