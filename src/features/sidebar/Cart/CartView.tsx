import styled from "styled-components";
import { CartGetResultT, useAddToCartMutation, useDeleteFromCartMutation, useGetCartQuery } from "../../../store/apiSlice";
import { ReactComponent as PlusSVG } from '../../../res/svg/plus.svg';
import { ReactComponent as MinusSVG } from '../../../res/svg/minus.svg';
import Spinner from "../../spinner/Spinner";

const Title = styled.h1`
    margin: 0;
    border-bottom: 2px solid white;
    width: 80%;
    margin-top: 4%;
    text-shadow: none;
`

const CartViewWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    grid-row-gap: 1vh;
    grid-template-columns: 100%;
    width: 100%;
`

const BottomWrapper = styled.div`
    margin-top: auto;
    margin-bottom: 4vh;
    width: 100%;
    display: grid;
    align-content: flex-start;
    justify-items: center;
    grid-template-columns: 100%;
    grid-row-gap: 1vh;
`

const CheckoutBtn = styled.button`
    width: 80%;
    height: 60px;
    border: none;
    background-color: ${props => props.theme.buttonColor};
    color: white;
    font-size: 2rem;
    font-weight: 900;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    cursor: pointer;
    justify-self: center;
    transition: background-color 0.2s ease, color 0.2s ease;
    &:hover {
        background-color: ${props => props.theme.hoverButtonColor};
        color: #ddd;
    }
`

const CartItemWrapper = styled.div`
    position: relative;
    width: 16vw; height: 6vw;
    display: grid;
    grid-template-columns: 6vw 9vw;
    grid-template-rows: min-content auto auto;

    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    align-content: center;
    justify-items: start;
`

const CartItemsWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    grid-row-gap: 1vh;
    grid-template-columns: 100%;
    height: 70vh;
    overflow-y: auto; overflow-x: hidden;
`

const CartItemImage = styled.img`
    width: 6vw; height: 6vw;
    grid-row: 1/4;
    grid-column: 1/2;
`

const CartItemName = styled.h3`grid-row: 1/2; margin: 0; width: 100%; overflow: hidden;`
const CartItemPrice = styled.h4`grid-row: 2/3;margin:0; width: 100%; overflow: hidden; font-size: larger;`

const CartItem = (props: {id: string, name: string, thumbanil: string, price: number, quantity: number}) => {
    
    const [incrQuantity] = useAddToCartMutation();
    const [decrQuantity] = useDeleteFromCartMutation();

    const handleIncreaseQuantity = () => {incrQuantity(props.id);}
    const handleDecreaseQuantity = () => {decrQuantity(props.id);}
    const handleDelete = () => {for (let i = 0; i < props.quantity; i++) decrQuantity(props.id);}

    return (
        <CartItemWrapper>
            <CartItemImage src={props.thumbanil} />
            <CartItemName>{props.name}</CartItemName>
            <CartItemPrice>${props.price/100}</CartItemPrice>
            <QuantityDelete 
                quantity={props.quantity} 
                increaseQuantity={handleIncreaseQuantity}
                decreaseQuantity={handleDecreaseQuantity}
                delete={handleDelete} 
                />
        </CartItemWrapper>
    );
}

const QuantityDeleteItemWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 80% 20%;
    height: 2rem;
`
const CartItemQuantityWrapper = styled.div`
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    grid-auto-rows: 100%;
    border-radius: 0.25vw;
    overflow: hidden;
    justify-items: center; align-items: center;
    margin-left: 2%;
    margin-right: 5%;
    background-color: ${props => props.theme.backgroundColor};
`
const QuantityValue = styled.span`
    color: ${props => props.theme.fontColor};
    width: 100%;
    cursor: default;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 900;
`
const DeleteItemWrapper = styled.div`
    width: 100%; height: 100%;
    padding: 25%; box-sizing: border-box;
    display: flex;
    justify-content: center; align-items: center;
    border-radius: 0.25vw;
    margin-right: 5%;
    text-align: center;
    background-color: #ff3e3e;
    transition: background-color 0.1s ease;
    cursor: pointer;
    &:hover { background-color: #e92828;}
    svg { transform: rotate(45deg);}
`

const SVGWrapper = styled.div`
    width: 100%; height: 100%;
    padding: 30%; box-sizing: border-box;
    display: flex;
    justify-content: center; align-items: center;
    background-color: ${props => props.theme.buttonColor};
    fill: ${props => props.theme.fontColor};
    transition: background-color 0.1s ease;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.hoverButtonColor};
    }
`

const QuantityDelete = (props: {increaseQuantity: any, decreaseQuantity: any, delete: any, quantity: number}) => {
    return (
        <QuantityDeleteItemWrapper>
            <CartItemQuantityWrapper>
                <SVGWrapper onClick={props.decreaseQuantity}><MinusSVG /></SVGWrapper>
                <QuantityValue>{props.quantity}</QuantityValue>
                <SVGWrapper onClick={props.increaseQuantity}><PlusSVG /></SVGWrapper>
            </CartItemQuantityWrapper>
            <DeleteItemWrapper onClick={props.delete}>
                <PlusSVG/>
            </DeleteItemWrapper>
        </QuantityDeleteItemWrapper>
    )
}

const CartView = (props: {onCheckOut: any}) => {

    const { isLoading, error, data } = useGetCartQuery();
    if (isLoading) return <Spinner />
    if (error) return <div>An error has occurred: { + (error as any).message}</div>;

    return (
        <CartViewWrapper>
            <CartItemsWrapper>
                {/* {Object.values((data as unknown as CartGetResultT).items).map(prod => <CartItem key={prod.id} id={prod.id} name={prod.name} price={prod.price} thumbanil={prod.images[0]} quantity={prod.quantity} />)} */}
            </CartItemsWrapper>
            <BottomWrapper>
                <Title>Total: ${(data as unknown as CartGetResultT).price}</Title>
                <CheckoutBtn onClick={props.onCheckOut}>Checkout</CheckoutBtn>
            </BottomWrapper>
        </CartViewWrapper>
    );
}

export default CartView;