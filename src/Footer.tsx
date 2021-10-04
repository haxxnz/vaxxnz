import { Trans, useTranslation } from "react-i18next";
import { ShareButtons } from "./ShareButtons";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import styled from "styled-components";

const FooterMessage = styled.p`
  margin-bottom: 0.5rem;
`;

export function Footer() {
  const { t } = useTranslation("common");

  return (
    <>
      <footer className="footer-header">
        <FooterMessage>{t("footer.message")}</FooterMessage>
        <div className={"social-container"}>
          <ShareButtons />
        </div>
        <br />
        <p>
          <Trans
            i18nKey="footer.addressFinderLinkCopy"
            t={t}
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            components={[<a href="https://addressfinder.nz"></a>]}
          />
        </p>
        <br />
        <p>
          <a
            href="https://airtable.com/shrxuw3vSp2yRPrG7"
            target="_blank"
            rel="noreferrer"
          >
            {t("footer.links.contactUs")}
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnz/projects/2"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Roadmap clicked")}
          >
            {t("footer.links.roadmap")}
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
          >
            {t("navigation.getInvolved")}
          </a>
          <br />{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnzlocations"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Raw data clicked")}
          >
            {t("footer.links.rawData")}
          </a>{" "}
          /{" "}
          <a
            href="https://github.com/CovidEngine/vaxxnz"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Source code clicked")}
          >
            {t("footer.links.sourceCode")}
          </a>{" "}
          /{" "}
          <a
            href="https://twitter.com/vaxxnz"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Twitter Clicked")}
          >
            Twitter
          </a>{" "}
          /{" "}
          <a
            href="https://docs.vaxx.nz"
            onClick={() => enqueueAnalyticsEvent("Vaxx.nz Widget Clicked")}
            title="Vaxx.nz Widget"
          >
            Vaxx.nz Widget
          </a>{" "}
        </p>
        <p>
          <a
            href="/terms-and-conditions"
            onClick={() => {
              enqueueAnalyticsEvent("Terms and Conditions clicked");
            }}
          >
            Terms and Conditions
          </a>{" "}
          /{" "}
          <a
            href="/privacy-policy"
            onClick={() => {
              enqueueAnalyticsEvent("Privacy policy clicked");
            }}
          >
            Privacy Policy
          </a>{" "}
          /{" "}
          <a
            href="/cookie-policy"
            onClick={() => {
              enqueueAnalyticsEvent("Cookies policy clicked");
            }}
          >
            Cookies Policy
          </a>
        </p>
      </footer>
    </>
  );
}
