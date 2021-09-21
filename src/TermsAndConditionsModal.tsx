import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  termsAndConditionsIsOpen: boolean;
  setTermsAndConditionsIsOpen: (isOpen: boolean) => void;
};

const TermsAndConditionsModal = (props: Props) => {
  const { setTermsAndConditionsIsOpen } = props;

  const { t } = useTranslation("common");

  const close = useCallback(() => {
    setTermsAndConditionsIsOpen(false);
  }, [setTermsAndConditionsIsOpen]);

  return (
    <Modal
      onClose={close}
      isOpen={!!props.termsAndConditionsIsOpen}
      unstable_ModalBackdropScroll={true}
      overrides={{
        Root: { style: { zIndex: 1500 } },
        Dialog: {
          style: {
            height: "auto",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          },
        },
      }}
    >
      <h2>Terms and Conditions</h2>
      <p
        style={{
          marginTop: "1rem",
          marginBottom: "0.5rem",
          marginRight: "1rem",
        }}
      >
        Welcome to vaxx.nz These terms and conditions outline the rules and
        regulations for the use of vaxx.nz. By accessing this website we assume
        you accept these terms and conditions. Do not continue to use if you do
        not agree to all of the terms and conditions stated on this page. The
        following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: “You” refers to you,
        the person using this website and compliant to this site's terms and
        conditions. “vaxx.nz”, refers to this site. "bookmyvaccine.nz", refers
        to the website provided by the Ministry of Health of New Zealand where
        "you" will be taken, once clicked on the booking links, to book your
        vaccine.
      </p>
      <br />
      <h3>Cookies</h3>
      <p>
        We use cookies to enhance. By accessing vaxx.nz, you agreed to use
        cookies in agreement with vaxx.nz's Privacy Policy. We use cookies to
        enhance the user's experience. Cookies are used by our website to enable
        the functionality and personalisation of key features which aid in the
        usability of our website.
      </p>
      <br />
      <h3>Privacy Policy</h3>
      <p>
        We do not collect any information, neither we collect any information
        when making a booking for the vaccine through the Ministry of Health NZ.
        We shall not be held responsible for any breach to the bookmyvaccine.nz
        website. bookmyvaccine.nz privacy statement can be found at this link:{" "}
        <br />
        <br />
        <a
          href="https://bookmyvaccine.covid19.health.nz/privacy"
          target="_blank"
          rel="noreferrer"
        >
          bookmyvaxxine.nz privacy
        </a>
        <br />
        <br />
      </p>
      <h3>Disclaimer</h3>
      <p>
        We are committed to serving the most up-to-date vaccine booking
        availabilities but cannot guarantee the correctness of all booking
        slots. We are a team of individuals working to facilitate the vaccine
        booking process across New Zealand by enabling users to browse vaxx.nz
        intuitively, locate the desired vaccine availability, and directing the
        user to the official bookmyvaccine.nz website where they complete their
        booking. As long as the website, its information and services are
        provided free of charge, we will not be liable for any loss or damages
        of any nature.
      </p>
      <br />
      <h3>Content Liability</h3>
      <p>
        With the rapidly changing environment, we cannot guarantee up-to-date
        information on this website. We do not warrant its completeness or
        accuracy; nor do we promise to ensure that the website remains available
        or that the material on the website is kept up to date.
      </p>
    </Modal>
  );
};

export default TermsAndConditionsModal;
