/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export const getStaticProps = async () => {
  let loading = false
  let error = ""
  let data = [];
  try {
    loading = true;
    const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
    const payload = await response.json();
    if(payload){
      data = payload
    } else {
      error = "Error when fetching";
    }
  } catch (err) {
    error = err.message
  } finally {
    loading = false;
  }

  return {
    props: {
      pokemon: data,
      loading,
      error
    }
  }
}

export default function Home({ pokemon, loading, error }) {
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

  if(!loading && pokemon.length){
    return (
      <div className={styles.container}>
        <Head>
          <title>Pokemon List</title>
        </Head>
        <h1>Pokemon List</h1>
        <div className={styles.grid}>
          { 
            pokemon.map((pokemon) => 
              <div className={styles.card} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>
                    <img 
                      src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} 
                      alt={pokemon.name}
                    />
                    <h3>{pokemon.name}</h3>
                  </a>
                </Link>
              </div>
            )}          
        </div>
      </div>
    )
  }

}
