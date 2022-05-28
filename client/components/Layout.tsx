import { NextPage } from "next";
import React from "react";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Nav from "./Nav";

interface Props {
  children: any
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Nav />  
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />  
          { children }
        </main>
      </div>
    </>
  );
}

export default Layout;