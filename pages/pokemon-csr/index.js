/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const getPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
        const data = await response.json();
        if(data){
          setPokemon(data);
        } else {
          setError("Error when fetching")
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getPokemon();
  },[])

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
