import { useParams } from "react-router-dom"
import styled from "styled-components";
import { DetailedProductT, ReviewT, useAddToCartMutation, useGetProductQuery, useGetReviewsQuery } from "../../store/apiSlice";
import { ReactComponent as PlusSVG } from  '../../res/svg/plus.svg';
import { ReactComponent as MinusSVG } from '../../res/svg/minus.svg';
import { toast } from 'react-toastify';
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentToken } from "../../store/authSlice";
import { selectIsCartOpen, selectIsUserOpen, toggleCart, toggleUser } from "../../store/optionsSlice";
import { useDispatch } from "react-redux";

const ProductWrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 40% 30%;
    grid-template-rows: 100%;
    height: calc(100vh - 50px);
    color: ${props => props.theme.fontColor};
`

const BlockWrapper = styled.div`
    border-right: 2px solid black;
    box-sizing: border-box;
    width: 100%;
`
const Title = styled.h1`
    margin-top: 2vh;
    text-shadow: none;
    height: fit-content;
`
const SubTitle = styled.h3`
    text-align: center;
    margin: 0;
    height: 1.5rem;
    & > span {
        color: ${props => props.theme.buttonColor};
    }
`
const Description = styled.p`
    padding: 10px;
    box-sizing: border-box;
    font-size: larger;
`

const ImagesWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: auto;
    & img {
        width: 100%;
        aspect-ratio: 1/1;
    }
`

const ReviewsWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    /* height: calc(100vh - 50px - 4rem); */
    /* width: 30vw;  */
    width: 100%; height: 100%;
    overflow-x: hidden;
`
const ReviewWrapper = styled.div`
    background-color: ${props => props.theme.darkerBackgroundColor};
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    padding: 1vh;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 80% 20%;
    grid-template-rows: 2rem 1rem 1fr;
    width: 100%;
    max-height: 200px;
    margin-bottom: 1vh;
`

const ReviewH2 = styled.h2`
    margin: 0;
    text-decoration: underline;
`
const ReviewDate = styled.h5`
    margin: 0;
    grid-column: 1/2;
`
const ReviewContent = styled.p`
    grid-row: 3/4;
    grid-column: 1/3;
    margin: 0;
    height: 100%;
    word-wrap: break-word;
    overflow-y: auto; overflow-x: hidden;
`
const ReviewRating = styled.span`
    grid-column: 2/3;
    grid-row: 1/3;
    text-align: end;
    font-size: 2rem;
    padding-right: 2vw;
`

const AddReviewWrapper = styled(ReviewWrapper)`
    max-height: 60vh;
    grid-template-rows: 2rem 1fr auto;
`

const ReviewInput = styled.textarea`
    font-family: inherit;
    width: 100%;
    grid-column: 1/3; grid-row: 2/3;
    height: 10vh;
    resize: vertical;
    max-height: 40vh;
    box-sizing: border-box;
`

const AddReviewButton = styled.button`
    grid-column: 2/3; grid-row: 3/4;
    width: 100%; height: 100%; padding: 10px;
    box-sizing: border-box;
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

const RatingInputWrapper = styled.div`
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

const Reviews = (props: {ProductID: string}) => {
    const { isLoading, error, data} = useGetReviewsQuery(props.ProductID);
    if (isLoading) return <Spinner />
    if (error) return <div>An error has occurred: { + (error as any).message}</div>;
    
    return (
        <ReviewsWrapper>
            <Title>Reviews</Title>
            <SubTitle>Average Rating: ({data?.average_rating})</SubTitle>
            <AddReview />
            {data?.reviews.map(review => <Review key={review.display_name} data={review} />)}
        </ReviewsWrapper>
    );
}

const Review = (props: {data: ReviewT}) => {
    return (
        <ReviewWrapper>
            <ReviewH2>User '{props.data.display_name}'</ReviewH2>
            <ReviewRating>{props.data.rating}</ReviewRating>
            <ReviewDate>Date: {props.data.date}</ReviewDate>
            <ReviewContent>{props.data.content}</ReviewContent>
        </ReviewWrapper>
    );
}

const RatingInput = (props: {rating: number, setRating: any}) => {
    const IncreaseRating = () => {if (props.rating < 5) props.setRating(props.rating + 1);}
    const DecreaseRating = () => {if (props.rating > 1) props.setRating(props.rating - 1);}
    return (
        <RatingInputWrapper>
            <SVGWrapper onClick={DecreaseRating}><MinusSVG /></SVGWrapper>
            <QuantityValue>{props.rating}</QuantityValue>
            <SVGWrapper onClick={IncreaseRating}><PlusSVG /></SVGWrapper>
        </RatingInputWrapper>
    );
}

const AddReview = (props: {}) => {
    const [rating, setRating] = useState<number>(5);

    return (
        <AddReviewWrapper>
            <ReviewH2>Add Review</ReviewH2>
            <RatingInput rating={rating} setRating={setRating} />
            <ReviewInput />
            <AddReviewButton>Submit</AddReviewButton>
        </AddReviewWrapper>
    );
}

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [addToCart] = useAddToCartMutation();
    const isLoggedIn = useAppSelector(selectCurrentToken) != null;
    const isCartOpen = useAppSelector(selectIsCartOpen);
    const isUserOpen = useAppSelector(selectIsUserOpen);
    const { isLoading, error, data} = useGetProductQuery(id??"");

    if (isLoading) return <Spinner />
    if (error) return <div>An error has occurred: { + (error as any).message}</div>;

    const HandleAddToCart = async (id:string, name:string) => {
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


    const { name, price, images, description, brand, type } = data as DetailedProductT;

    return (
        <ProductWrapper>
            <BlockWrapper>
                <ImagesWrapper>
                    {(images as string[]).map((i) => <img key={i} src={i} />)}
                </ImagesWrapper>
            </BlockWrapper>
            <BlockWrapper>
                <Title>{name}</Title>
                <SubTitle>{type}<span> made by </span>{brand}</SubTitle>
                <PriceAddWrapper>
                    <Price>Price: ${price/100}</Price>
                    <AddToCartBtn onClick={() => HandleAddToCart(id??'1', name)}>Add to Cart</AddToCartBtn>
                </PriceAddWrapper>
                <Description>{description}</Description>
            </BlockWrapper>
            <BlockWrapper>
                <Reviews ProductID={id??""} />
            </BlockWrapper>
        </ProductWrapper>
    );
}

const PriceAddWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;    
    background-color: ${props => props.theme.darkerBackgroundColor};
    border-top: 2px solid ${props => props.theme.fontColor};
    border-bottom: 2px solid ${props => props.theme.fontColor};
`

const Price = styled.div`
    width: 40%;
    height: 5vh;
    color: ${props => props.theme.fontColor};
    font-size: 1.5rem;
    font-weight: 900;
    display: flex;
    place-content: center;
    place-items: center;
`

const AddToCartBtn = styled.button`
    width: 40%;
    height: 5vh;
    display: block;
    border: none;
    background-color: ${props => props.theme.buttonColor};
    color: white;
    font-size: 1.5rem;
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

export default Product;