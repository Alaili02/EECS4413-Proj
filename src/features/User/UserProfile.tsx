import styled from "styled-components";

const UserProfileWrapper = styled.div`
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    overflow: hidden;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: auto;
`

const Title = styled.span`
    border-bottom: 2px solid white;
    font-weight: bold;
    font-size: larger;
    width: 100%;
    margin-bottom: 0.5vh;
    grid-column: 1/3;
    text-align:center;
`
const LeftHalfTitle = styled(Title)`grid-column: 1/2;`
const RightHalfTitle = styled(Title)`grid-column: 2/3;`

const Value = styled(Title)`border-bottom: none;`
const LeftHalfValue = styled(Value)`grid-column: 1/2;`
const RightHalfValue = styled(Value)`grid-column: 2/3;`

const LogOutBtn = styled.button`
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

const UserProfile = (props: {logOut: any}) => {
    return (
        <UserProfileWrapper>
            <LeftHalfTitle>First Name</LeftHalfTitle>
            <RightHalfTitle>Last Name</RightHalfTitle>
            <LeftHalfValue>First Name</LeftHalfValue>
            <RightHalfValue>Last name</RightHalfValue>

            <Title>Email</Title>
            <Value>FirstLast@gmail.com</Value>

            <Title>Street</Title>
            <Value />

            <LeftHalfTitle>City</LeftHalfTitle>
            <RightHalfTitle>Province</RightHalfTitle>
            <LeftHalfValue />
            <RightHalfValue />

            <LogOutBtn onClick={props.logOut}>Log Out</LogOutBtn>
        </UserProfileWrapper>
    );
}

export default UserProfile;