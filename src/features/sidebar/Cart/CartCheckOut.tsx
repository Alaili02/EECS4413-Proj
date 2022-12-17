import { useState } from "react";
import styled from "styled-components";
import { CheckOutPayloadT } from "../../../store/apiSlice";

const CartCheckOutWrapper = styled.span`
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: auto;
`

const InputTitle = styled.span`
    border-bottom: 2px solid white;
    font-weight: bold;
    font-size: larger;
    width: 100%;
    margin-bottom: 0.5vh;
    grid-column: 1/3;
`

const Input = styled.input`
    grid-column: 1/3;
    font-size: larger;
    width: 100%;
    border: 1px solid gray;
    justify-self: center;
    font-weight: 500;
    margin-bottom: 1vh;
    &:focus{
        border: 1px solid black;
    }
`
const LeftHalfInputTitle = styled(InputTitle)`grid-column: 1/2; text-align:center;`
const RightHalfInputTitle = styled(InputTitle)`grid-column: 2/3; text-align:center;`
const LeftHalfInput = styled(Input)`grid-column: 1/2;`
const RightHalfInput = styled(Input)`grid-column: 2/3;`

const Button = styled.button`
    grid-column: 1/3;
    margin-bottom: 1vh;
    width: 100%; 
    height: 6vh;
    border: none;
    background-color: ${props => props.theme.buttonColor};
    color: white;
    font-size: larger;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    cursor: pointer;
    justify-self: center;
    transition: background-color 0.2s ease, color 0.2s ease;
    &:hover {
        background-color: ${props => props.theme.hoverButtonColor};
        color: #ddd;
    }
`

const CartCheckOut = (props: {cancelTransaction: any, completeTransaction: (data:CheckOutPayloadT) => void}) => {

    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");

    return (
        <CartCheckOutWrapper>
            <InputTitle>Card Number</InputTitle>
            <Input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
    
            <LeftHalfInputTitle>CVV</LeftHalfInputTitle>
            <RightHalfInputTitle>Expiry Date</RightHalfInputTitle>
            <LeftHalfInput type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}/>
            <RightHalfInput type="text" value={cvv} onChange={(e) => setCVV(e.target.value)}/>

            <Button onClick={props.cancelTransaction}>Cancel</Button>
            <Button onClick={() => {}}>Complete Transaction</Button>
        </CartCheckOutWrapper>
    );
}

export default CartCheckOut;