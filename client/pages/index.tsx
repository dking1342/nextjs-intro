import Error from '../components/Error';
import Loading from '../components/Loading';
import Meta from '../components/Meta';
import PostList from '../components/PostList';
import { server } from '../config';
import styles from '../styles/Layout.module.css';
import { FetchProps } from '../types/fetch';
import { fetchHook } from '../utils/fetchHook';


export const getServerSideProps = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts?_limit=6";
  // const url = `${server}/api/posts`;

  let { loading, error, payload } = await fetchHook(url);

  return {
    props: {
      loading,
      error,
      posts:payload
    }
  }
}

const Home = ({ loading, error, posts:payload}: FetchProps) => {


  if(loading){
    <Loading />
  }

  if(!loading && error){
    <Error error={error} />
  }
  
  if(!loading && payload){
    return (
      <main className={styles.container}>
        <Meta />
        <section className={styles.main}>
          <PostList 
            payload={payload}
          />
        </section>
      </main>
    )
  }
}

export default Home
