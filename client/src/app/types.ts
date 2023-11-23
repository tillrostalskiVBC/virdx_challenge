export enum RatingType {
  general = "General",
  code_quality = "Code Quality",
  approach = "Approach",
}

export interface DiscussionComment {
  content: string;
  user_id: number;
  user: User;
  applicant_id: number;
  created_at: string;
  id: number;
}

export type DiscussionCommentCreate = Omit<
  DiscussionComment,
  "id" | "created_at" | "user"
>;

export interface Applicant {
  id: number;
  accuracy?: number;
  full_name: string;
  github_name: string;
  comment?: string;
  feedback?: string;
  repo_link: string;
  created_at: string;
  ratings?: Rating[];
  discussion?: DiscussionComment[];
  rank?: number;
}

export type ApplicantCreate = Omit<
  Applicant,
  "id" | "created_at" | "ratings" | "discussion"
>;

export interface Rating {
  id: number;
  type: string;
  score: number;
  user_id: number;
  user?: User;
  applicant_id: number;
}

export type RatingCreate = Omit<Rating, "id">;

export interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
  is_superuser: boolean;
  password?: string;
}

export type UserCreate = Omit<User, "id" | "created_at">;

export interface UserSession {
  id: number;
  fullName: string;
}
