import styled from "styled-components";

export const HeaderMain = styled.header`

display: flex;
flex-direction: row;
justify-content: space-between;
box-sizing: border-box;
top: -2px;
padding: 1.5rem 1rem;
background-color: white;
gap: 2rem;

  z-index: 2;

border: 1px solid lightgray;
>div {
  display:flex;
  flex-direction: row;
  gap:1rem;
  max-height: 48px;
  width: auto;
  align-self: center;
}
h1 {
  text-align: left;
  margin: 0;
  align-self: center;
  font-size: 2rem;
  font-weight: 600;
}
>section {
  flex-direction: column;
}
>p {
  font-size: 0.95rem;
  color: #555;
}
strong {
    font-weight:400;
}

@media screen and (max-width:1024px) {
  position: relative;
  top: initial;
flex-direction: row;
>div {
  max-height: auto;
  flex-direction: row;
}
}
@media screen and (max-width:768px) {
flex-direction: column;
h1 {
 
  font-size: 1.5rem;
}
>div {
  flex-direction: column;
  width: 100%;
  max-height: initial;
  z-index: initial;

}
@media screen and (max-width:500px) {
    gap: 1rem;
  flex-direction: column;
>div {
  flex-direction: column;

}
section p {
    padding: 0.5rem 0 1rem 0;
}
}


`;

export const CalendarContainer = styled.section`
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  margin: 0;
`;

export const CalendarSectionContainer = styled.section`
  .MonthSection {
    display: block;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid lightgray;
    position: sticky;
    top: 0px;

    background-color: #fff;
    z-index: 2 !important;
  }
  h2 {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 1024px) {
    .MonthSection {
      top: 0;
    }
  }
`;

export const MonthContainer = styled.section`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(7, 1fr);
  background-color: lightgray;
  border-bottom: 1px solid lightgray;
  gap: 1px;
  transition: all 0.3s;

  z-index: 1;
  button {
    box-sizing: border-box;
    font-family: inherit;
    min-height: 144px;
    height: 100%;

    text-align: left;
    background-color: white;
    border: none;
    margin: 0;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 400;
    }
    aside {
      color: #666;
      font-weight: 500;
      font-size: 0.9rem;
    }

    p {
      font-size: 1.1rem;
      font-weight: 400;
      color: #555;
    }
    @media (hover: hover) {
      :hover {
        background-color: #e4eeff;
        cursor: pointer;
        h3,
        p {
          color: #005eca;
        }
      }
    }

    img {
      width: 1rem;
      height: 1rem;
      bottom: 0;
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    button img {
      align-self: center;
      height: 2rem;
      width: 2rem;
    }
  }
`;

export const ModalGrid = styled.section`
  display: grid;
  gap: 4rem;
  grid-template-columns: 400px 1fr;
  height: 100%;
  overflow-y: initial;
  h1 {
    font-size: 3.5rem;
    font-weight: 300;
  }
  h2 {
    font-weight: 400;
  }
  hr {
    border: none;
    border-top: 1px solid lightgray;
    margin-top: 1rem;
    padding-top: 1rem;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
  @media screen and (max-width: 768px) {
    gap: 0;
    h1 {
      font-size: 2rem;
    }
  }
`;

export const WalkGrid = styled.section`
  display: grid;
  gap: 4rem;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  overflow-y: scroll;
  h1 {
    font-size: 3.5rem;
    font-weight: 300;
  }
  h2 {
    font-weight: 400;
  }
  hr {
    border: none;
    border-top: 1px solid lightgray;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
  @media screen and (max-width: 768px) {
    gap: 0;
    h1 {
      font-size: 2rem;
    }
  }
`;

export const VaccineCentre = styled.section`
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid lightgray;
  h3 {
    font-size: 2rem;
    max-width: 80%;
  }

  @media screen and (min-width: 1024px) {
    .ButtonConstraint {
      max-width: 400px;
    }
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }
  }

  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    p {
      border-radius: 4px;
      border: 1px solid #e8e8e8;
      color: black;
      font-weight: 600;
      padding: 0.5rem;
      min-width: 80px;
      text-align: center;
    }

    @media screen and (max-width: 500px) {
           p { flex: 1;
        }
}
    }
  }
`;
export const WalkContainer = styled.div`
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  margin: 0;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: lightgray;
  border-bottom: 1px solid lightgray;
  gap: 1px;
  transition: all 0.3s;

  z-index: 1;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WalkBox = styled.button`
  box-sizing: border-box;
  font-family: inherit;
  min-height: 144px;
  height: 100%;
  flex: 1;
  min-width: 320px;

  text-align: left;
  background-color: white;
  border: none;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (hover: hover) {
    :hover {
      background-color: #e4eeff;
      cursor: pointer;
      h3,
      p {
        color: #005eca;
      }
    }
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    color: #333;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .Chevron {
    width: 1.25rem;
    height: 1.25rem;
    align-self: center;
  }
`;
