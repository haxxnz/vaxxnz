import { useCoords } from "./utils/useCoords";
import { Button, KIND } from "baseui/button";
import Cookies from "js-cookie";
import { useState } from "react";
import { styled } from "styletron-react";

const CookieBottomBar = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  bottom: 0,
  background: "#000000",
  width: "100%",
  paddingTop: "10px",
  paddingBottom: "10px",
  zIndex: 100,

});

const ButtonDiv = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  paddingRight: "10px",
  gap: "1rem",
})

const InfoText = styled("span", {
  paddingLeft: "1rem",
  color: "white"
});

const COOKIE_KEY = "accepted_cookies_vaxxnz";
const COOKIE_ACCEPTED_VALUE = "true";

const CookieConsent = (
  props: {
    onDecline: () => void,
    buttonText: string,
    declineButtonText: string,
    expires: number
    children: React.ReactNode;
  }
) => {

  let [shouldShow, setShouldShow] = useState(Cookies.get(COOKIE_KEY) !== COOKIE_ACCEPTED_VALUE);

  let acceptCookie = () => {
    Cookies.set(COOKIE_KEY, COOKIE_ACCEPTED_VALUE, { expires: props.expires });
    setShouldShow(false);
  };

  if (shouldShow) {
    return (
      <CookieBottomBar>
        <InfoText>{props.children}</InfoText>
        <ButtonDiv>
          <Button
            onClick={() => {
              setShouldShow(false);
              props.onDecline();
            }}
          >{props.declineButtonText}</Button>
          <Button
            onClick={acceptCookie}
            kind={KIND.secondary}
          >{props.buttonText}</Button>
        </ButtonDiv>
      </CookieBottomBar>
    )
  } else {
    return null;
  }
};

const CookiesBar = () => {
  const coords = useCoords();
  const EUbbox = [-12.0792755076, 35.9674116355, 40.6576894187, 58.9861052075];
  if (
    coords.lat > EUbbox[1] &&
    coords.lat < EUbbox[3] &&
    coords.lng > EUbbox[0] &&
    coords.lng < EUbbox[2]
  ) {
    return (
      <CookieConsent
        buttonText="I Understand"
        declineButtonText="Decline Cookies"
        expires={150}
        onDecline={() => {
          (window as { [key: string]: any })["ga-disable-G-PXHVR76F27"] = true;
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    );
  } else {
    return null;
  }
};

export default CookiesBar;
