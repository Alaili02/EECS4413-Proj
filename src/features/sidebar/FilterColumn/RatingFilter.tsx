import { useState } from "react";
import styled from "styled-components";


const RatingFilterWrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 40% 30%;
    grid-template-rows: 4vh auto auto;
    color: ${props => props.theme.fontColor};
    text-align: center;
    align-items: center;
    &>h3{
        margin: 0;
    }

`

const HeadWrapper = styled.div`
    grid-column: 1/4;
    height: 4vh; width: 100%;
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-rows: auto;
    align-items: center;
    &>svg {
        margin: 0.25vh;
        height: 3.5vh; width: 3.5vh;
        cursor: pointer;
        opacity: 0.5;
        filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.75));
        transition: opacity 0.1s ease;
    }
    &>svg:hover {
        opacity: 0.75;
    }
    &>svg #bg {
        fill: ${props => props.theme.buttonColor};
    }
    &>svg #fore {
        fill: ${props => props.theme.fontColor};
    }
`

const Title = styled.h2`
    grid-column: 1/2;
    margin: 0;
`

const NumberInput = styled.input`
    background-color: inherit;
    border: none;
    color: ${props => props.theme.fontColor};
    font-family: inherit;
    font-size: larger;
    border-bottom: 2px solid ${props => props.theme.fontColor};
    text-align: center;
    appearance: textfield;
`

const RatingFilter = () => {

    const [minValue, setMinValue] = useState("0");
    const [maxValue, setMaxValue] = useState("");


    return (
        <RatingFilterWrapper>
            <HeadWrapper>
                <Title>Sort by</Title>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                    <rect id="bg" x="0.5" y="0.5" width="283.46" height="283.46" rx="27.74"/>
                    <polygon id="fore" 
                        width="45.72" height="31.75" 
                        points="0 11.11 27.49 11.11 16.38 0 29.84 0 45.72 15.88 29.84 31.75 16.38 31.75 27.49 20.64 0 20.64 0 11.11" 
                        transform="translate(206.91 49.1) rotate(90) scale(4.07)"
                        />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.46 284.46">
                    <rect id="bg" x="0.5" y="0.5" width="283.46" height="283.46" rx="27.74"/>
                    <polygon id="fore" 
                        width="45.72" height="31.75" 
                        points="0 11.11 27.49 11.11 16.38 0 29.84 0 45.72 15.88 29.84 31.75 16.38 31.75 27.49 20.64 0 20.64 0 11.11" 
                        transform="matrix(0, -4.07, 4.07, 0, 77.55, 235.37)" 
                        />
                </svg>
            </HeadWrapper>
            <NumberInput type="number" value={minValue} onChange={(e) => setMinValue(e.target.value)}/>
            <h3>{" < Rating < "}</h3>
            <NumberInput type="number" />
        </RatingFilterWrapper>
    );
}

export default RatingFilter;