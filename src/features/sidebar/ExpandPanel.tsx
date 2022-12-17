import { ReactNode } from "react";
import styled from "styled-components";
import { filterT } from "../../store/filtersSlice";

type isOpenT = {
    "isOpen": boolean,
    "defaultWidth": string
}

const ExpandPanelWrapper = styled.div<isOpenT>`
    background-color: #444;
    width: ${props => props.isOpen?props.defaultWidth:"0"};
    transition: width 0.2s ease;
    user-select: none;
    height: 100%;
    overflow-y: auto;
`

const ExpandPanel = (props: {isOpen: filterT|"", defaultWidth: string, children: ReactNode}) => {
    return (
        <ExpandPanelWrapper isOpen={props.isOpen!==""} defaultWidth={props.defaultWidth}>
            {props.children}
        </ExpandPanelWrapper>
    );
}

export default ExpandPanel;