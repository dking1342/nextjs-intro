import { NextPage } from "next";
import Link from "next/link";
import postStyles from "../styles/Post.module.css";
import { Post } from "../types/posts";

interface Props {
  post: Post
}

const Post:NextPage<Props> = ({ post }) => {
  return (
    <Link href="/post/[id]" as={`/post/${post.id}`}>
      <a className={postStyles.card}>
        <h3>{ post.title } &rarr;</h3>
        <p>{post.body.substring(0,50)}...</p>
      </a>
    </Link>
  );
}

export default Post;