import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    Container, Grid,
    TextField
} from "@mui/material";
import styled from "@emotion/styled";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {useEffect, useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {NavigateFunction, useNavigate} from "react-router-dom"
import AuthService from "../../services/auth.service";

const CustomCardHeader = styled(CardHeader)`
  & span {
    font-size: 22px;
  }

  padding-bottom: 0;
`;

export const Login = () => {
    let navigate: NavigateFunction = useNavigate();
    const [isRegisterOn, setIsRegisterOn] = useState<boolean>(false);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            navigate("/dashboard")
        }
    }, [])

    return (
        <Container sx={{
            bgcolor: 'white',
            height: '100vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Card sx={{minWidth: 275, maxWidth: 500}} elevation={3}>
                <CustomCardHeader avatar={<LockPersonIcon/>} title={isRegisterOn ? "Register" : "Log in"}/>
                <CardContent>
                    {isRegisterOn ? <SignUp setIsRegisterOn={setIsRegisterOn}/> :
                        <SignIn setIsRegisterOn={setIsRegisterOn}/>}
                </CardContent>
            </Card>
        </Container>
    )
}