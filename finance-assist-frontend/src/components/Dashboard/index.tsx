import {
    Box, Button,
    Container
} from "@mui/material";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {Navigate, NavigateFunction, redirect, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";

export const Dashboard = () => {
    let navigate: NavigateFunction = useNavigate();

    const [isUser, setIsUser] = useState<boolean>(false);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser)

        if (currentUser) {
            setIsUser(true)
        }
        else {
            navigate("/login");
        }
    }, [])

    return (
        <Container maxWidth={"xl"} sx={{
            bgcolor: 'white',
            height: '100vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <span>Dashboard, hello</span>
        </Container>
    )
}