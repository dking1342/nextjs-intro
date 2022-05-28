import Meta from '../components/Meta';
import styles from '../styles/Layout.module.css';


const About = () => {
  return (
    <main className={styles.container}>
      <Meta title="About" />
      <section className={styles.main}>
        About
      </section>
    </main>
  );
}

export default About;