import styled from "styled-components";

export const HeaderMain = styled.header`
position: sticky;
display: flex;
flex-direction: row;
justify-content: space-between;
box-sizing: border-box;
top: -2px;
padding: 1.5rem;
background-color: white;

  z-index: 2;

border-top: 1px solid lightgray;
border-bottom: 1px solid lightgray;
div {
  display:flex;
  flex-direction: row;
  gap:1rem;
  max-height: 48px;
  width: auto;
}
h1 {
  text-align: left;
  margin: 0;
  align-self: center;
  font-size: 1.75rem;
}
section {
  flex-direction: column;
}
p {
  font-size: 0.95rem;
  color: #555;
}

@media screen and (max-width:1024px) {
  position: relative;
  top: initial;
flex-direction: column;
div {
  margin-top: 0.5rem;
  max-height: initial;
  flex-direction: column;
}
}
@media screen and (max-width:768px) {
flex-direction: column;
div {
  flex-direction: column;

}
@media screen and (max-width:500px) {
  flex-direction: column;
div {
  flex-direction: column;

}

`;

export const CalendarContainer = styled.section`
    margin: 0;
`;

export const CalendarSectionContainer = styled.section`
    h2 {
        display: block;
        padding: 1.5rem;
        font-size: 1.5rem;
        border-bottom: 1px solid lightgray;
        position: sticky;
        top: 96px;

        background-color: #fff;
        z-index: 1;
    }

    @media screen and (max-width: 1024px) {
        h2 {
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
    button {
        box-sizing: border-box;
        font-family: inherit;
        min-height: 144px;
        text-align: left;
        background-color: white;
        border: none;
        padding: 1.5rem;
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
            font-size: 1.3rem;
            font-weight: 600;
        }
        aside {
            display: inline;
            float: right;
            color: #777;
            font-weight: 400;
        }
        p {
            font-size: 1.25rem;
            font-weight: 400;
        }
        :hover {
            background-color: #e4eeff;
            cursor: pointer;
            h3,
            p {
                color: #005eca;
            }
        }
        img {
            width: 1.5rem;
            height: 1.5rem;
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
    }
`;

export const ModalGrid = styled.section`
    display: grid;
    gap: 4rem;
    grid-template-columns: 480px 1fr;
    overflow: hidden;
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

    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        p {
            border-radius: 4px;
            border: 2px solid #e8e8e8;
            color: black;
            font-weight: 600;
            padding: 0.5rem;
            min-width: 80px;
            text-align: center;
        }
    }
`;
