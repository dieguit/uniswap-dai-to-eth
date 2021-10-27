import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { providers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/utils/apolloClient';
import ThemeProvider from 'src/theme/themeProvider';
import createEmotionCache from 'src/theme/emotionCache';
import MainLayout from 'src/layouts/MainLayout';

const getLibrary = (provider: providers.ExternalProvider) => {
  return new providers.Web3Provider(provider);
};

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>prePO Swap</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ThemeProvider>
          </QueryClientProvider>
        </Web3ReactProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
export default MyApp;
