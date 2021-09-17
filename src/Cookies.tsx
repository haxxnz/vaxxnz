import CookieConsent from "react-cookie-consent";
import { Coords } from "./location-picker/LocationPicker";

const CookiesBar = (coords: Coords) => {
    const EUbbox = [-12.0792755076, 35.9674116355, 40.6576894187, 58.9861052075];
    if (
      coords.lat > EUbbox[1] &&
      coords.lat < EUbbox[3] &&
      coords.lng > EUbbox[0] &&
      coords.lng < EUbbox[2]
    ) {
      return <CookieConsent
        location="bottom"
        buttonText="I Understand"
        declineButtonText="Decline Cookies"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#000000" }}
        buttonStyle={{
          color: "#4e503b",
          fontSize: "13px",
          fontWeight: "Bold",
        }}
        declineButtonStyle={{
          background: "#000000",
          textDecoration: "underline",
        }}
        expires={150}
        onAccept={(byScroll) => {
  
        }}
        enableDeclineButton
        onDecline={() => {
          (window as { [key: string]: any })['ga-disable-G-PXHVR76F27'] = true
        }}
      >
        <p style={{ fontFamily: "sans-serif" }}>
          This website uses cookies to enhance the user experience.
        </p>
      </CookieConsent>;
    } else {
      return null;
    }
  };

  export default CookiesBar;