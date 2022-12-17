import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsUserOpen } from "../../store/optionsSlice";
import { BaseUserT, useLogInMutation, useLogOutMutation, useRegisterMutation, UserT } from "../../store/apiSlice";
import UserLogIn from "./UserLogIn";
import UserProfile from "./UserProfile";
import UserRegister from "./UserRegister";
import { logOut, selectCurrentToken, setCredentials, setIsAdmin } from "../../store/authSlice";
import { toast } from 'react-toastify';

type isOpenT = {isOpen:boolean, defaultWidth: string};
const UserWrapper = styled.div<isOpenT>`
    width: ${props => props.isOpen?props.defaultWidth:"0"};
    height: calc(100vh - 50px);
    transition: width 0.2s ease;
    color: white;
    background-color: #444;
    display: grid;
    grid-template-columns: 100%;
    align-content: flex-start;
    justify-items: center;
`

const LogInWrapper = styled.div`
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
`

const LogInForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto auto auto 6vh;
`


const FormButton = styled.button`
    width: 100%; 
    height: 100%;
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

const Title = styled.h1`
    margin: 0;
    border-bottom: 2px solid white;
    width: 80%;
    margin-top: 4%;
    text-shadow: none;
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

const SubTitle = styled.h2`
    margin: 0;
    margin-bottom: 2vh;
    margin-top: 2vh;
    grid-column: 1/2;
    text-align: center;
`

type RespT = {
    id: number,
    message: string
}

const User = (props: {defaultWidth: string}) => {
    const [registerUser] = useRegisterMutation();
    const [logInUser] = useLogInMutation();
    const [logOutUser] = useLogOutMutation();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectCurrentToken) != null;

    const HandleLogin = async (user: BaseUserT) => { 
        // console.log("Logging in user");
        // console.log(user);

        try {
            const result = await logInUser(user).unwrap();
            // console.log('Log in Success');
            // console.log(result);
            dispatch(setCredentials('def-token'));
            if (user.username === 'sa') dispatch(setIsAdmin(true)); else dispatch(setIsAdmin(false));
            toast.success(`Logged In!`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 2000,
            });
            setPhase(1);
        } catch(e) {
            console.log(e);
            toast.error(`Log In failed!`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 2000,
            });
        }
    }

    const HandleRegister = async (user: UserT) => {
        try {
            const result = await registerUser(user).unwrap();
            toast.success(`Regestered!`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 2000,
            });
        } catch(e) {console.log(e);}

        setPhase(0);
    }

    const HandleLogout = async () => {
        try {
            dispatch(logOut());
            const result = await logOutUser().unwrap();
            setPhase(0);
            toast.success(`Logged Out!`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 2000,
            });
        } catch(e) {console.log(e);}
    }

    const isOpen = useAppSelector(selectIsUserOpen);
    const [phase, setPhase] = useState(isLoggedIn?1:0);

    return (
        <UserWrapper isOpen={isOpen} defaultWidth={props.defaultWidth}>
            <Title>User</Title>
            {(phase === 0)?
            <UserLogIn onLogIn={HandleLogin} onRegisterRequest={()=> setPhase(2)} />
            :
            (phase === 1)?
            <UserProfile logOut={HandleLogout}/>
            :
            <UserRegister goBack={() => setPhase(0)} register={HandleRegister} email="" />
            }
        </UserWrapper>
    );
}

export default User;