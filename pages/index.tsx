import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { auth } from '../lib/firebase';

export default function Home() {
  useEffect(() => {
    auth.signInAnonymously();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Impostor Live</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Impostor Live</h1>

        <div className={styles.grid}>
          <Link href='/create-game'>
            <a className={styles.card}>
              <Button variant='contained' color='primary'>
                Create game
              </Button>
            </a>
          </Link>

          <Link href='/join-game'>
            <a className={styles.card}>
              <Button variant='contained' color='secondary'>
                Join game
              </Button>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
