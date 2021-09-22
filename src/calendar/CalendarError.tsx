import styled from "styled-components";

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

const MainContainer = styled.div`
  position: absolute;
  max-width: 1438px;
  width: calc(100% - 2px);
  z-index: 2 !important;
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(211, 211, 211);
  background-color: rgb(255, 255, 255);
  max-height: 800px;
  height: 100%;
  margin-top: -122px;

  @media screen and (min-width: 400px) {
    margin-top: -74px;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column-reverse;

  @media screen and (min-width: 1024px) {
    flex-direction: row !important;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 0;

  @media screen and (min-width: 1024px) {
    margin-right: 2rem;
  }
`;

const Button = styled.a`
  color: #ffffff;
  display: flex;
  margin: 10px auto;
  padding: 1rem 5.5rem 1rem 5.5rem;
  background-color: #000000;
`;

const Subheader = styled.p`
  font-size: 1.4rem;
  margin-top: 1.4rem;
`;

const Section = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    margin-left: auto !important;
    margin-right: auto !important;
    margin-top: 1.5rem;
  }
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;

  @media screen and (min-width: 1024px) {
    text-align: right;
    font-size: 2.5rem;
  }
`;

const Map = styled.img`
  width: 151px;
  margin: auto;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    width: 227px;
  }

  @media screen and (min-width: 1024px) {
    width: auto;
    margin-bottom: 0;
  }
`;

export function CalendarError(props: { errorMessage: string }) {
  return (
    <MainContainer>
      <CenterContainer>
        <TextContainer>
          {splitErrorMessage(props.errorMessage, 5).map((line) => (
            <Title>{line}</Title>
          ))}
          <Section>
            <Subheader>Did we make a mistake?</Subheader>
            <Button
              href="https://github.com/CovidEngine/vaxxnz/issues"
              target="_blank"
            >
              Report error
            </Button>
          </Section>
        </TextContainer>
        <Map src="map.svg" alt="" />
      </CenterContainer>
    </MainContainer>
  );
}
