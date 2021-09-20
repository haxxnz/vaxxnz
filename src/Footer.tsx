import { Trans, useTranslation } from "react-i18next";
import { ShareButtons } from "./ShareButtons";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { useState } from "react";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
import { Button } from "baseui/button";

export function Footer() {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TermsAndConditionsModal
        termsAndConditionsIsOpen={isOpen}
        setTermsAndConditionsIsOpen={setIsOpen}
      />
      <footer className="footer-header">
        <p style={{ marginBottom: "0.5rem" }}>{t("footer.message")}</p>
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
        </p>
        <p>
          <a
            href="https://twitter.com/vaxxnz"
            target="_blank"
            rel="noreferrer"
            onClick={() => enqueueAnalyticsEvent("Twitter Clicked")}
          >
            Twitter
          </a>{" "}
          <br />
          <Button
            onClick={() => {
              enqueueAnalyticsEvent("Terms and Conditions clicked");
              setIsOpen(true);
            }}
          >
            {t("footer.links.termsAndConditions")}
          </Button>{" "}
        </p>
      </footer>
    </>
  );
}
