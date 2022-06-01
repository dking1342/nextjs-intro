import Link from "next/link";
import { GetPostsQuery } from "../src/generated/graphql";
import PostItem from "./PostItem";

interface Props{
  posts:GetPostsQuery | undefined
}

const PostList = ({ posts }:Props) => {

  return (
    <div>
      <h1>Posts</h1>
      { 
        posts?.getPosts?.map(post => 
          <div key={post?.id}>
            <PostItem post={post} />
            <Link href={`/posts/${post?.id}`}>See Post</Link>
          </div>  
        )
      }
    </div>
  );
}

export default PostList;