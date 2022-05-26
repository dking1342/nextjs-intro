import { useRouter } from "next/router";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Link from "next/link";
import styles from '../../styles/Details.module.css'



const Details = () => {
  const { query: { id }} = useRouter();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const getPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
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
    if(id){
      getPokemon();
    }
  },[id])

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