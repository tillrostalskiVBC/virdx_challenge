export interface Applicant {
  id: number;
  accuracy: number;
  full_name: string;
  github_name: string;
  comment: string;
  feedback: string;
  repo_link: string;
  rating?: number;
  rank?: number;
  created_at: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
}

export interface UserSession {
  id: number;
  fullName: string;
}
