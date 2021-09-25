import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import doc from "../public/doc.svg";

export function Banner() {
    const { t } = useTranslation("common");
    return (
        <section className="App-header">
            <div className="header-content">
                <h1>{t("core.tagline")}</h1>
                <h2 style={{ fontWeight: "normal" }}>{t("core.subtitle")}</h2>
                <br />
                <p>
                    <Trans
                        i18nKey="core.disclaimerNotAGovWebsite"
                        t={t}
                        components={[
                            <a
                                href="https://bookmyvaccine.nz"
                                target="_blank"
                                rel="noreferrer"
                            >
                                https://bookmyvaccine.nz
                            </a>,
                        ]}
                    />
                    <br />
                </p>
            </div>
            <div className="header-img-container">
                <Image
                    className={"header-img"}
                    height={300}
                    width={340}
                    src={doc}
                    alt={"Friendly covid 19 nurse"}
                />
            </div>
        </section>
    );
}
