import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as BackSVG } from '../../res/svg/back.svg';

const RegisterWrapper = styled.div`
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
`

const Header = styled.div`
    margin-bottom: 2vh;
    margin-top: 2vh;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`

const BackBtn = styled.button`
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

const ButtonWrapper = styled.div`
    cursor: pointer;
    height: 1.75vw;
    width: 1.75vw;
    transition: all 0.2s ease;
    fill: ${props => props.theme.buttonColor};
    &>*{width:100%;}
    &:hover{
        filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.75));
        fill: ${props => props.theme.hoverButtonColor};
    }
`

const SubTitle = styled.h2`
    margin: 0;
    width: 70%;
    text-align: center;
`

const RegisterForm = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: auto;
`

const InputTitle = styled.span`
    border-bottom: 2px solid white;
    font-weight: bold;
    font-size: larger;
    width: 100%;
    margin-bottom: 0.5vh;
    grid-column: 1/3;
`

const LeftHalfInputTitle = styled(InputTitle)`grid-column: 1/2; text-align:center;`
const RightHalfInputTitle = styled(InputTitle)`grid-column: 2/3; text-align:center;`

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

const LeftHalfInput = styled(Input)`grid-column: 1/2;`
const RightHalfInput = styled(Input)`grid-column: 2/3;`

const FormButton = styled.button`
    width: 100%; 
    height: 6vh;
    grid-column: 1/3;
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

const UserRegister = (props: {goBack: any, register: any, email: string}) => {

    const HandleRegister = () => {
        // TODO: validate values
        const user = {
            "username": userNameValue,
            "email": emailValue,
            "password": passwordValue,
            "firstName": firstNameValue,
            "lastName": lastNameValue
        }

        props.register(user);
    }

    const [userNameValue, setUserNameValue] = useState("");
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    // const [streetValue, setStreetValue] = useState("");
    // const [cityValue, setCityValue] = useState("");
    // const [provinceValue, setProvinceValue] = useState("");
    
    return (
        <RegisterWrapper>
            <Header>
                <ButtonWrapper onClick={() => props.goBack()}>
                    <BackSVG />
                </ButtonWrapper>
                <SubTitle>Register</SubTitle>
            </Header>
            <RegisterForm onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                <InputTitle>Username</InputTitle>
                <Input type="text" value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)} />

                <LeftHalfInputTitle>First Name</LeftHalfInputTitle>
                <RightHalfInputTitle>Last Name</RightHalfInputTitle>
                <LeftHalfInput type="text" value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)} />
                <RightHalfInput type="text" value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)} />

                <InputTitle>Email</InputTitle>
                <Input type="text" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />

                <InputTitle>Password</InputTitle>
                <Input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}/>

                {/* <InputTitle>Street</InputTitle>
                <Input type="text" value={streetValue} onChange={(e) => setStreetValue(e.target.value)}/>

                <LeftHalfInputTitle>City</LeftHalfInputTitle>
                <RightHalfInputTitle>Province</RightHalfInputTitle>
                <LeftHalfInput type="text" value={cityValue} onChange={(e) => setCityValue(e.target.value)}/>
                <RightHalfInput type="text" value={provinceValue} onChange={(e) => setProvinceValue(e.target.value)}/> */}

                <FormButton onClick={HandleRegister}>Submit</FormButton>
            </RegisterForm>
        </RegisterWrapper>
    );
}

export default UserRegister;