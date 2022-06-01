import type { NextPage } from 'next'
import Head from 'next/head'
import { dehydrate, useQuery } from 'react-query'
import PostList from '../components/PostList'
import { getPosts, queryClient } from '../src/api'
import styles from '../styles/Home.module.css'

export const getServerSideProps = async () => {
  await queryClient.prefetchQuery("posts", ()=> getPosts());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

const Home: NextPage = () => {
  const { data } = useQuery(["posts"], () => getPosts());

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
      </Head>

      <main className={styles.main}>
        <PostList posts={data} />
      </main>

    </div>
  )
}

export default Home

 
