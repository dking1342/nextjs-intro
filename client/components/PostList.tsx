import { NextPage } from "next";
import articleStyles from "../styles/Post.module.css";
import { Post } from "../types/posts";
import PostItem from "./PostItem";

interface Props {
  payload: Post[]
}

const ArticleList:NextPage<Props> = ({ payload }) => {
  return (
    <div className={articleStyles.grid}>
      {
        payload.map(post => 
          <PostItem key={post.id} post={post} />
        )
      }
    </div>
  );
}

export default ArticleList;