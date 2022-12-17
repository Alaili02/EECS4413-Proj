import { useState } from "react";
import styled from "styled-components";
import { BaseUserT } from "../../store/apiSlice";

const LogInWrapper = styled.div`
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    overflow: hidden;
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

const UserLogIn = (props: {onLogIn: any, onRegisterRequest: any}) => {

    const [userNameValue, setUserNameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const HandleLogin = () => { 
        console.log("Logging in"); 
        const user: BaseUserT = {
            username: userNameValue,
            password: passwordValue
        }
        props.onLogIn(user);
    }

    const HandleRegister = () => {
        props.onRegisterRequest();
    }

    return (
        <LogInWrapper>
            <SubTitle>Create an Account<p style={{margin: 0, fontSize: "large"}}>or</p>Log In</SubTitle>
            <LogInForm onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                <InputTitle>Username</InputTitle>
                <Input type="text" value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)} />
                
                <InputTitle>Password</InputTitle>
                <Input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}/>
                
                <FormButton onClick={HandleRegister}>Register</FormButton>
                <FormButton onClick={HandleLogin}>Log In</FormButton>
            </LogInForm>
        </LogInWrapper>
    );
}

export default UserLogIn;