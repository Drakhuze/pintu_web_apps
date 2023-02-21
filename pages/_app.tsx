import '@/styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  // const queryClient = React.useRef(new QueryClient());

  // return (
  //   <QueryClientProvider client={queryClient.current}>
  //     <Component {...pageProps} />      
  //   </QueryClientProvider>
  // );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />      
    </QueryClientProvider>
  );
}
