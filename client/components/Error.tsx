import { NextPage } from "next";
import styles from "../styles/Layout.module.css";
import Meta from "./Meta";

interface Props {
  error: string
}

const Error:NextPage<Props> = ({ error }) => {
  return (
    <main className={styles.container}>
      <Meta title="Error" />
      <section className={styles.main}>
        <h1>Error</h1>
        <p>{ error }</p>
      </section>
    </main>    
  );
}

export default Error;