import { Trans, useTranslation } from "react-i18next";

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
        <img className="header-img" src="./doc.svg" alt=" a doctor"></img>
      </div>
    </section>
  );
}
