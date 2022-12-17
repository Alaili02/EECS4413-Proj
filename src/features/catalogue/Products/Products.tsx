import styled from "styled-components";
import { useAppSelector } from "../../../app/hooks";
import { useGetAllProductsQuery, useGetProductsByBrandQuery, useGetProductsByPageQuery, useGetProductsByTypeQuery, useGetTypesQuery } from "../../../store/apiSlice";
import { filtersStateT, selectAllFilters } from "../../../store/filtersSlice";
import Spinner from "../../spinner/Spinner";
import ProductItem from "./ProductItem";

const ProductsWrapper = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: flex-start;
    height: ${props => "calc(100vh - "+props.theme.navHeight+")"};
    overflow-y: scroll;

    &>*{
        width: 200px;
        height: 250px;
        margin: 0 20px;
        margin-top: 20px;
    }
`

const Products = (props: {pageNumber: number}) => {
    // const { isLoading, error, data } = useGetProductsByPageQuery(props.pageNumber);
    const { isLoading: isL, error: err, data:d } =  useGetAllProductsQuery(props.pageNumber);
    
    // if (isLoading) return <ProductsWrapper><Spinner /></ProductsWrapper>
    // if (error) return <div>An error has occurred: { + (error as any).message}</div>;

    if (isL) return <ProductsWrapper><Spinner /></ProductsWrapper>
    if (err) return <div>An error has occurred: { + (err as any).message}</div>;

    return (
        <ProductsWrapper>
            {d?.map((prod) => <ProductItem key={prod.id} id={prod.id} name={prod.name} price={prod.price} thumbnail={prod.images[0]} />)}
        </ProductsWrapper>
    );
}

export const ProductsByBrand = (props: {pageNumber: number, brandName: string}) => {
    
    const { isLoading, error, data } = useGetProductsByBrandQuery({"brandName": props.brandName, "pageNumber": props.pageNumber});
    if (isLoading) return <ProductsWrapper><Spinner /></ProductsWrapper>
    if (error) return <div>An error has occurred: { + (error as any).message}</div>;



    return (
        <ProductsWrapper>
            {data?.map((prod) => <ProductItem key={prod.id} id={prod.id} name={prod.name} price={prod.price} thumbnail={prod.images[0]} />)}
        </ProductsWrapper>
    );
}

export const ProductsByType = (props: {pageNumber: number, typeName: string}) => {

    const { isLoading, error, data } = useGetProductsByTypeQuery({"typeName": props.typeName, "pageNumber": props.pageNumber});
    if (isLoading) return <ProductsWrapper><Spinner /></ProductsWrapper>
    if (error) return <div>An error has occurred: { + (error as any).message}</div>;

    return (
        <ProductsWrapper>
            {data?.map((prod) => <ProductItem key={prod.id} id={prod.id} name={prod.name} price={prod.price} thumbnail={prod.images[0]} />)}
        </ProductsWrapper>
    );
}

export default Products;