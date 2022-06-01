import { Post } from "../src/generated/graphql";

interface Props {
  post: Post | null | undefined
}

const PostItem = ({ post }: Props) => {
  return (
    <div>
      <h2>{ post?.title }</h2>
      <p>{ post?.body }</p>
      <p>User: { post?.userId }</p>
    </div>
  );
}

export default PostItem;