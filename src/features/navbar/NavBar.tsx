import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleCart, toggleUser } from '../../store/optionsSlice';
import { ReactComponent as CartSVG } from '../../res/svg/cart.svg';
import { ReactComponent as ProfileSVG } from '../../res/svg/profile.svg';
import { ReactComponent as ReportSVG } from '../../res/svg/report.svg';
import { selectCurrentToken, selectIsAdmin } from '../../store/authSlice';


const NavBarWrapper = styled.nav`
    height: 50px;
    width: 98vw;
    z-index: 10;
    grid-column: 1/5;

    background-color: ${props => props.theme.navColor};
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.4);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 1vw;
`

const Search = styled.input`
    margin: 0 auto;
    height: 35px;
    width: 60vw;
    font-size: 1.5rem;
    border: 1px solid gray;
    justify-self: center;
    font-weight: 500;
    &:focus{
        border: 1px solid black;
    }
`

const ButtonWrapper = styled.div`
    height: 40px; width: 40px;
    cursor: pointer;
    margin-left: 20px;
    transition: filter 0.2s ease;
    &>*{width:100%;}
    &:hover{filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.75));}
`

const SVG = styled.svg`
    cursor: pointer;
    height: 100%; width: 100%;
    fill: #fff;
`

const NavBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const GoHome = useCallback(() => navigate('/', {replace: true}), [navigate]);
    const GoAdmin = useCallback(() => navigate('/admin', {replace: true}), [navigate]);
    const isAdmin = useAppSelector(selectIsAdmin);
    const isLoggedIn = useAppSelector(selectCurrentToken) != null;

    return (
        <NavBarWrapper>
            <h2 style={{cursor: "pointer", marginRight: 'auto'}} onClick={GoHome}>EECS4413 Group N Project</h2>
            {/* <Search type="text" /> */}
            {isAdmin?
                <ButtonWrapper onClick={GoAdmin}>
                    <ReportSVG />
                </ButtonWrapper>:<></>
            }
            {isLoggedIn?
                <ButtonWrapper onClick={() => {dispatch(toggleCart())}}>
                    <CartSVG />
                </ButtonWrapper>:<></>
            }
            <ButtonWrapper onClick={() => {dispatch(toggleUser())}}>
                <ProfileSVG />
            </ButtonWrapper>
        </NavBarWrapper>
    );
}

export default NavBar;