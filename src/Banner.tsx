import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";

const Subtitle = styled.h2`
  font-weight: normal;
`;

export function Banner() {
  const { t } = useTranslation("common");
  return (
    <section className="App-header">
      <div className="header-content">
        <h1>{t("core.tagline")}</h1>
        <Subtitle>{t("core.subtitle")}</Subtitle>
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
