import Document, { Html, Head, Main, NextScript } from "next/document";
import { DocumentContext } from "next/dist/shared/lib/utils";
import * as React from "react";
import Script from "next/script";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return await Document.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-T3HLR3L');
                    `,
                        }}
                    />
                    <meta charSet="utf-8" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/safari-pinned-tab.svg"
                        color="#df1742"
                    />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />

                    {/*<meta*/}
                    {/*    name="viewport"*/}
                    {/*    content="width=device-width, initial-scale=1"*/}
                    {/*/>*/}
                    <meta name="theme-color" content="#000000" />
                    <meta
                        name="description"
                        content="Find a COVID-19 vaccine. See ways to get vaccinated near you. This is not an official Government website. To get vaccinated visit bookmyvaccine.nz"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin={"true"}
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="manifest" href="/site.webmanifest" />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://vaxx.nz" />
                    <meta
                        property="og:title"
                        content="Vaxx.nz - Find a COVID-19 vaccine"
                    />
                    <meta
                        property="og:description"
                        content="Find a COVID-19 vaccine. See ways to get vaccinated near you. This is not an official Government website. To get vaccinated visit bookmyvaccine.nz"
                    />
                    <meta
                        property="og:image"
                        content="https://vaxx.nz/vaxx_og.png"
                    />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="627" />

                    <meta
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta property="twitter:url" content="https://vaxx.nz" />
                    <meta
                        property="twitter:title"
                        content="Vaxx.nz - Find a COVID-19 vaccine"
                    />
                    <meta
                        property="twitter:description"
                        content="Find a COVID-19 vaccine. See ways to get vaccinated near you. This is not an official Government website. To get vaccinated visit bookmyvaccine.nz"
                    />
                    <meta
                        property="twitter:image"
                        content="https://vaxx.nz/vaxx_og.png"
                    />

                    {/*<title>Vaxx.nz - Find a COVID-19 vaccine</title>*/}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
