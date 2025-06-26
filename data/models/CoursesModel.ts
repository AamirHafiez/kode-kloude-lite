export type Tutor = {
  id: string;
  name: string;
  bio: string;
  description: string;
  avatar_url: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  thumbnail_url: string;
  thumbnail_video_url: string | null;
  tutors: Tutor[];
  popularity: number;
  difficulty_level: 'beginner' | 'associate'
  categories: Category[];
  plan: 'Free' | 'Standard'
};

export type Metadata = {
  limit: number;
  page: number;
  total_count: number;
  next_page: number | null;
};

type CoursesModel = {
  courses: Course[];
  metadata: Metadata;
};

export default CoursesModel