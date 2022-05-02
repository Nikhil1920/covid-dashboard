import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <link rel="icon" href="favicon.ico" />
                <link rel="manifest" href="manifest.json" />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href="icons/icon-192x192.png"
                />

                <meta name="theme-color" content="#1976d2" />
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            {/* Uncomment the below script tag and add your id to use adsense */}
            {/* <Script
                strategy="lazyOnload"
                async
                crossOrigin="anonymous"
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=`}
            /> */}
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <Component {...pageProps} />
        </>
    );
};

export default App;
