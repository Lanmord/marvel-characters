import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import axios from 'axios';
import md5 from 'md5';
import { QueryClient, QueryClientProvider } from 'react-query';
import Section from '../components/section';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../assets/loader.svg';
import Link from 'next/link';

axios.defaults.baseURL = 'https://gateway.marvel.com/v1/public';
axios.defaults.params = {
  apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  hash: md5('1' + process.env.NEXT_PUBLIC_PRIVATE_KEY + process.env.NEXT_PUBLIC_PUBLIC_KEY),
  ts: '1',
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true);
    };

    const handleRouteDone = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, [router.events]);
  return (
    <QueryClientProvider client={queryClient}>
      <Section>
        <Link href="/">
          <a>
            <h2 style={{ textTransform: 'uppercase' }}>marvel-characters</h2>
          </a>
        </Link>
      </Section>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </QueryClientProvider>
  );
}

export default MyApp;
