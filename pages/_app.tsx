import { useUserData } from '../lib/hooks';
import { useEffect } from 'react';
import { UserContext } from '../lib/context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
