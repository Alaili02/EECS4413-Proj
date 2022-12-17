import { ReactNode, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { filtersStateT, selectAllFilters } from "../../store/filtersSlice";
import Products, { ProductsByBrand, ProductsByType } from "./Products/Products";

import ExpandPanel from "../sidebar/ExpandPanel";
import FilterColumn from "../sidebar/FilterColumn/FilterColumn";
import { filterT } from "../../store/filtersSlice";

const CatalogueWrapper = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: auto auto auto 1fr;
`

const Seperator = styled.div`
    height: 100%;
    align-self: center;
    width: 1px;
    border-right: 2px solid ${props => props.theme.fontColor};
`

const Catalogue = () => {
	const [isOpenOn, openPanel] = useState<filterT|"">("");
    const [panel, setPanel] = useState<ReactNode>(<></>)

    const filterValue:filtersStateT = useAppSelector(selectAllFilters);
    const pageNumber = 2;

    return (
        <CatalogueWrapper>
            <FilterColumn 
                openPanel={openPanel}
                isOpenOn={isOpenOn}
                setPanel={setPanel} />
            <Seperator />
            <ExpandPanel isOpen={isOpenOn} defaultWidth="16vw" children={panel}/>
            {filterValue.Brand.id != "-1"?
                <ProductsByBrand pageNumber={pageNumber} brandName={filterValue.Brand.id} />
                :
                filterValue.Type.id != "-1"?
                    <ProductsByType pageNumber={pageNumber} typeName={filterValue.Type.id} />
                    :
                    <Products pageNumber={pageNumber}/>
            }
        </CatalogueWrapper>
    )
}

export default Catalogue; 