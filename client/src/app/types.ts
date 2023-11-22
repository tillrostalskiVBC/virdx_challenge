export enum RatingType {
  General = "General",
  CodeQuality = "Code Quality",
  Approach = "Approach",
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
  accuracy: number;
  full_name: string;
  github_name: string;
  comment: string;
  feedback: string;
  repo_link: string;
  created_at: string;
  ratings: Rating[];
  discussion: DiscussionComment[];
  rank?: number;
}

export interface Rating {
  id: number;
  type: string;
  score: number;
  user_id: number;
  applicant_id: number;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
  is_superuser: boolean;
}

export interface UserSession {
  id: number;
  fullName: string;
}
