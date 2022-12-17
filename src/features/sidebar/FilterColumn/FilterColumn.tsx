import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { filterT, selectAllFilters, selectStringFilter, setStringFilter, stringFilterT } from "../../../store/filtersSlice";
import { FilterReturnT, useGetBrandsQuery, useGetTypesQuery } from "../../../store/apiSlice";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

const FilterColumnWrapper = styled.div`
    height: fit-content;
    width: 14vw;
    margin: 0 1vw;
    margin-top: 8%;
    background-color: inherit;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    justify-content: center;
    grid-row-gap: 2vh;
    box-sizing: border-box;
    user-select: none;
`

const HeadFolderWrapper = styled.div`
    width: 100%;
    height: 40px;
    background-color: inherit;
    box-sizing: border-box;
    color: ${props => props.theme.fontColor};
    font-weight: 700;
    
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    cursor: pointer;
    transition: background-color 0.1s ease;
    &:hover {
        text-decoration: underline;
    }
`

const Title = styled.h1`
    text-shadow: none;
    width: 100%;
    border-bottom: 2px solid ${props => props.theme.fontColor};
`

const Item = styled.div`
    width: 100%;
    height: 40px;
    border-bottom: 2px solid black;
    box-sizing: border-box;
    color: white;
    font-size: larger;
    font-weight: 600;
    
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    cursor: pointer;
    background-color: #222;
    transition: background-color 0.1s ease;
    &:hover {
        background-color: #333;
    }
`;

const Items = (props: {items: FilterReturnT|undefined, handleClick: (value:string,id:string)=>void}) => {
    return (
        <>
            <Item key={-1} onClick={() => props.handleClick("All",'-1')}>All</Item>
            {props.items?.map((i) => <Item key={i.id} onClick={() => props.handleClick(i.value,i.id)}>{i.value}</Item>)}
        </>
    );
}

const HeadFolder = (props: {name: stringFilterT, value: string, onClick: any}) => {

    const selectedValue = useAppSelector((state) => selectStringFilter(state, props.name));

    return (
        <HeadFolderWrapper onClick={props.onClick}>
            <h2>{(selectedValue === "")?  `All ${props.name}s`: `${props.name}: "${selectedValue}"`}</h2>
        </HeadFolderWrapper>
    );
}

type PanelValuesT = {[tab in filterT]: ReactNode }
let PanelValues:PanelValuesT&{"":ReactNode} = {
    "Type": <></>,
    "Brand": <></>,
    "Price": <></>,
    "Rating": <></>,
    "": <></>
}


const TypesPanel = (props: {openPanel:any, setPanel:any}) => {
    const { isLoading:l1, error:e1, data:typesData } = useGetTypesQuery();
    const dispatch = useAppDispatch();
    return (
        <Items 
            items={typesData}
            handleClick={(value:string,id:string) => {
                dispatch(setStringFilter({filter: "Type", "value":value,"id":id}));
                props.openPanel(""); props.setPanel(<></>);
            }
        }/>
    );
}

const BrandsPanel = (props: {openPanel:any, setPanel:any}) => {
    const { isLoading:l2, error:e2, data:brandsData } = useGetBrandsQuery();
    const dispatch = useAppDispatch();
    return (
        <Items 
            items={brandsData}
            handleClick={(value:string,id:string) => {
                dispatch(setStringFilter({filter: "Brand", "value":value, "id":id}));
                props.openPanel(""); props.setPanel(<></>);
            }
        }/>
    );
}

const FilterColumn = (props: {openPanel:any, isOpenOn:filterT|"", setPanel:any}) => {

    // Populate Categories and Brands based on backend
    useEffect(() => {
        PanelValues = {
            ...PanelValues,
            "Type": <TypesPanel openPanel={props.openPanel} setPanel={props.setPanel}/>,
            "Brand": <BrandsPanel openPanel={props.openPanel} setPanel={props.setPanel}/>
        };
    }, []);


    const HandleClick = (openTo:filterT|"") => {
        if (openTo===props.isOpenOn) {props.openPanel(""); props.setPanel(<></>);}
        else if(openTo!=="") {props.openPanel(openTo); props.setPanel(PanelValues[openTo])};
    }

    return (
        <>
            <FilterColumnWrapper>
                <Title>Filters</Title>
                <HeadFolder name="Type" value="" onClick={() => HandleClick("Type")}/>
                <HeadFolder name="Brand" value="" onClick={() => HandleClick("Brand")} />
                {/* <PriceFilter />
                <RatingFilter /> */}
            </FilterColumnWrapper>
        </>
    );
}

export default FilterColumn;