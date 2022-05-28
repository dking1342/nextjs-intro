import { Post } from "./posts";

export interface FetchProps {
  loading: boolean;
  error: string;
  posts?: Post[];
  post?: Post
}