import { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../app/hooks";
import { CheckOutPayloadT } from "../../../store/apiSlice";
import { selectCurrentToken } from "../../../store/authSlice";
import { selectIsCartOpen } from "../../../store/optionsSlice";
import CartCheckOut from "./CartCheckOut";
import CartView from "./CartView";

const Title = styled.h1`
    margin: 0;
    border-bottom: 2px solid white;
    width: 80%;
    margin-top: 4%;
    text-shadow: none;
`

type isOpenT = {isOpen:boolean, defaultWidth: string};
const CartWrapper = styled.div<isOpenT>`
    width: ${props => props.isOpen?props.defaultWidth:"0"};
    transition: width 0.2s ease;
    color: white;
    background-color: #444;
    display: flex;
    grid-row-gap: 1vh;
    flex-flow: column nowrap;
    align-items: center;
    grid-template-columns: 100%;
    overflow: hidden;
`

const Cart = (props: {defaultWidth: string}) => {
    const isOpen = useAppSelector(selectIsCartOpen);
    const [phase, setPhase] = useState(0);

    const token = useAppSelector(selectCurrentToken);

    const HandleCheckOut = (data: CheckOutPayloadT) => {
        console.log(data);
    }

    return (
        <CartWrapper isOpen={isOpen} defaultWidth={props.defaultWidth}>
            <Title>Cart</Title>
            {token == null?
                <></>
                :    
                (phase === 0)?
                    <CartView onCheckOut={() => setPhase(1)} />
                    :
                    <CartCheckOut cancelTransaction={() => setPhase(0)} completeTransaction={HandleCheckOut} />
            }
        </CartWrapper>
    );
}

export default Cart;