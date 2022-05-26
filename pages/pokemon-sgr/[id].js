/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from "next/link";
import styles from '../../styles/Details.module.css'

export const getStaticPaths = async () => {
  const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  const payload = await response.json();

  return {
    paths: payload.map((pokemon) => ({
      params:{ id: pokemon.id.toString() }
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  let loading = false
  let error = ""
  let payload = null;

  try {
    const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);
    const data = await response.json();
    if(data){
      payload = data;
    } else {
      error = "Error when fetching";
    }
  } catch (err) {
    error = err.message;
  } finally {
    loading = false;
  }

  return {
    props: {
      pokemon: payload,
      loading,
      error
    },
    revalidate: 30, // time duration to throttle for new data
  }
}

const Details = ({ pokemon, loading, error }) => {
  if(loading){
    return (
      <div className={styles.container}>
        <Head>
          <title>Loading</title>
        </Head>
        <h1>loading...</h1>
      </div>
    )
  }
  
  if(!loading && error){
    return (
      <div className={styles.container}>
        <Head>
          <title>Error</title>
        </Head>
        <h1>Error happened</h1>
        <p>{error}</p>
      </div>
    )
  }

  if(!loading && pokemon){
    return (
      <div className={styles.container}>
        <Head>
          <title>{pokemon.name}</title>
        </Head>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
        <div className={styles.layout}>
          <div>
            <img 
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              className={styles.picture}
              alt={pokemon.name.english}
            />
          </div>
          <div>
            <div className={styles.name}>{pokemon.name}</div>
            <div className={styles.type}>{pokemon.type.join(", ")}</div>
            <table>
              <thead className={styles.header}>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  pokemon.stats.map(({ name, value }) => 
                    <tr key={name}>
                      <td className={styles.attribute}>{ name }</td>
                      <td>{ value }</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}



export default Details;