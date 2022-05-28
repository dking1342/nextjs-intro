import Link from "next/link";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Meta from "../../components/Meta";
import { server } from "../../config";
import styles from "../../styles/Layout.module.css";
import { FetchProps } from "../../types/fetch";
import { fetchHook } from "../../utils/fetchHook";


export const getServerSideProps = async ({ params } : any) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
  // const url = `${server}/api/posts/${params.id}`;

  let { loading, error, payload } = await fetchHook(url);

  return {
    props: {
      loading,
      error,
      post:payload
    }
  }  

}

const post = ({ loading, error, post:payload }: FetchProps) => {

  if(loading){
    return (
      <Loading />
    )
  }

  if(!loading && error){
    <Error error={error} />
  }
  
  if(!loading && payload){
    const title = `Post: ${payload.title}`;
    return (
      <main className={styles.container}>
        <Meta title={title}/>
        <section className={styles.grid}>
          <h3>{ payload.title }</h3>
          <p>{ payload.body }</p>
          <Link href="/">Go Back</Link>
        </section>
      </main>
    )
  }
}

export default post;