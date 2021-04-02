import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Impostor Live</h1>

        <div className={styles.grid}>
          <Link href="">
            <a className={styles.card}>
              <h3>Create game &rarr;</h3>
              <p>Create a server where you can invite your friends.</p>
            </a>
          </Link>

          <Link href="">
            <a className={styles.card}>
              <h3>Join game &rarr;</h3>
              <p>Join a party with a custom PIN</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
