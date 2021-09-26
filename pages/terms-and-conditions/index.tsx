import * as React from "react";
import ReactMarkdown from "react-markdown";
import { terms } from "../../src/md/LegalContent";
import { Navigation } from "../../src/components/layouts/Navigation/Navigation";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";

function Page() {
    return (
        <Navigation hideBanner={true} hideHeader={false}>
            <div className={styles.container}>
                <ReactMarkdown>{terms}</ReactMarkdown>
            </div>
        </Navigation>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    res,
}) => {
    res.setHeader("Cache-Control", "s-maxage=100, stale-while-revalidate");
    return {
        props: {
            ...(await serverSideTranslations(locale || "en-NZ", ["common"])),
        },
    };
};

export default Page;
