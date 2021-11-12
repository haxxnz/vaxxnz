import { styled } from "styletron-react";
import { useTranslation } from "react-i18next";

/**
 *  @param { string } message Error Message to split
 *  @param { number } split_length Amount of words per line
 *  @returns { string[] } The error message split every {split_length} words
 */
const splitErrorMessage = (message: string, split_length: number): string[] => {
  const _message = message.split(/\s+/g); // split message every " " (each word)
  const lines: string[] = [];

  while (_message.length) {
    const line = _message.splice(0, split_length).join(" "); // remove {split_length} amount from start of array and join it together with " " inbetween words

    lines.push(line);
  }

  return lines;
};

const MainContainer = styled("div", {
  position: "absolute",
  maxWidth: "1438px",
  width: "calc(100% - 2px)",
  zIndex: 3,
  display: "flex",
  flexDirection: "row",
  border: "1px solid rgb(211, 211, 211)",
  backgroundColor: "rgb(255, 255, 255)",
  maxHeight: "800px",
  height: "100%",
  marginTop: "-122px",

  "@media screen and (min-width: 400px)": {
    marginTop: "-74px",
  },
});

const CenterContainer = styled("div", {
  display: "flex",
  margin: "auto",
  flexDirection: "column-reverse",

  "@media screen and (min-width: 1024px)": {
    flexDirection: "row",
  },
});

const TextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "auto 0 auto 0",

  "@media screen and (min-width: 1024px)": {
    marginRight: "2rem",
  },
});

const Button = styled("a", {
  color: "#ffffff",
  display: "flex",
  margin: "10px auto",
  padding: "1rem 5.5rem 1rem 5.5rem",
  backgroundColor: "#000000",
});

const Subheader = styled("p", {
  fontSize: "1.4rem",
  marginTop: "1.4rem",
});

const Section = styled("div", {
  display: "flex",
  marginLeft: "auto",
  flexDirection: "column",

  "@media screen and (max-width: 1024px)": {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1.5rem",
  },
});

const Title = styled("p", {
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",

  "@media screen and (min-width: 1024px)": {
    textAlign: "right",
    fontSize: "2.5rem",
  },
});

const Map = styled("img", {
  width: "151px",
  margin: "auto",
  marginBottom: "2rem",

  "@media screen and (min-width: 768px)": {
    width: "227px",
  },

  "@media screen and (min-width: 1024px)": {
    width: "auto",
    marginBottom: 0,
  },
});

export function CalendarError(props: { errorMessage: string }) {
  const { t } = useTranslation("common");
  return (
    <MainContainer>
      <CenterContainer>
        <TextContainer>
          {splitErrorMessage(props.errorMessage, 5).map((line) => (
            <Title>{line}</Title>
          ))}
          <Section>
            <Subheader>{t("core.mistake")}</Subheader>
            <Button
              href="https://github.com/vaxxnz/vaxxnz/issues"
              target="_blank"
            >
              Report Error
            </Button>
          </Section>
        </TextContainer>
        <Map src="map.svg" alt="" />
      </CenterContainer>
    </MainContainer>
  );
}
