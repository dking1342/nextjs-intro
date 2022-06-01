import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { dehydrate, useQuery } from "react-query";
import PostItem from "../../components/PostItem";
import { getPost, queryClient } from "../../src/api";
import styles from '../../styles/Home.module.css';

interface Props {
  id: string
}

export const getServerSideProps:GetServerSideProps  = async ({ params }) => {
  const id = params!.id as string;
  await queryClient.prefetchQuery(["post"], ()=> getPost({ id }));
  
  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    }
  }

}

const SinglePost:NextPage<Props> = ( { id }) => {
  const { data } = useQuery(["post"], () => getPost({ id }));

  return (
    <div className={styles.container}>
      <Head>
        <title>{ `Post: ${data?.getPost?.title}` || "Post" }</title>
      </Head>
      <h1>Post</h1>
      <PostItem post={data?.getPost} />
      <Link href={"/"}>Go back</Link>
    </div>
  );
}

export default SinglePost;

