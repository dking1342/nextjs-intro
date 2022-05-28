import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Meta from "./Meta";

const Loading = () => {
  return (
    <main className={styles.container}>
      <Meta title="Loading" />
      <section className={styles.main}>
        Loading...
      </section>
    </main>    
  );
}

export default Loading;