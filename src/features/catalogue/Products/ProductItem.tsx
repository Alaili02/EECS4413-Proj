import {useCallback} from 'react';
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ReactComponent as PlusSVG } from '../../../res/svg/plus.svg';
import {useNavigate} from 'react-router-dom';
import { useAddToCartMutation } from '../../../store/apiSlice';
import { toast } from 'react-toastify';
import { selectCurrentToken } from '../../../store/authSlice';
import { selectIsCartOpen, selectIsUserOpen, toggleCart, toggleUser } from '../../../store/optionsSlice';
import { useDispatch } from 'react-redux';

const ProductWrapper = styled.div`
    position: relative;
    border: 1px solid gray;
    display: grid;
    grid-template-rows: 200px 1fr 1fr;
    background-color: #fff;
    cursor: pointer;
    transition: box-shadow 0.1s ease;
    &:hover {
        box-shadow: 0px 0px 6px rgba(0,0,0,0.75);
    }
    &:hover > button {
        opacity: 1;
    }
`

const ProductName = styled.h3`
    margin: 0;
    font-weight: 500;
    text-align: center;
    max-height: 4vh;
    overflow: hidden;
`
const ProductPrice = styled.h3`
    margin: 0;
    font-weight: 500;
    text-align: center;
`

const ProductImage = styled.img`
    width: 100%; height: 100%;
`

const CartBtn = styled.button`
    position: absolute;
    top: 4%; right: 4%;
    width: 30px; height: 30px;
    box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.5);
    cursor: pointer;
    border: none;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.1s ease;
    transition: background-color 0.1s ease;
    background-color: ${props => props.theme.buttonColor};
    &:hover {
        background-color: ${props => props.theme.hoverButtonColor};
    }
`

// const ProductItem = (props: {brand: String, name: String, price: number, rating: number, thumbnail: string, id: string}) => {
const ProductItem = (props: {name: string, price: number, thumbnail: string, id: string}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addToCart] = useAddToCartMutation();
    const isLoggedIn = useAppSelector(selectCurrentToken) != null;
    const isCartOpen = useAppSelector(selectIsCartOpen);
    const isUserOpen = useAppSelector(selectIsUserOpen);

    const HandleAddToCart = async (event:any, id:string, name: string) => {
        event.stopPropagation();
        if (isLoggedIn) {
            try {
                const result = await addToCart(id).unwrap();
                if (!isCartOpen) dispatch(toggleCart());
                toast.success(`${name} added to cart`, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 2000,
                });
            } catch(e) {
                console.log(e);
                console.log('Add to Cart Failed');
            }
        } else {
            if (!isUserOpen) dispatch(toggleUser());
            toast.warn(`Log in to add items to cart`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 2000,
            });
        }
    }
    const GoToProduct = useCallback(() => navigate('/product/'+props.id, {replace: true}), [navigate]);

    return (
        <ProductWrapper onClick={GoToProduct}>
            <CartBtn onClick={(event) => HandleAddToCart(event, props.id, props.name)}>
                <PlusSVG />
            </CartBtn>
            <ProductImage src={props.thumbnail}/>
            <ProductName>{props.name}</ProductName>
            <ProductPrice>${props.price/100}</ProductPrice>
        </ProductWrapper>
    );
}

export default ProductItem;