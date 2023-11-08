import {
    Alert,
    Box,
    Button,
    CardActions,
    Grid,
    LinearProgress,
    TextField
} from "@mui/material";
import {Formik, Field, Form, ErrorMessage, useFormik} from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import {useEffect, useState} from "react";
import {Navigate, NavigateFunction, redirect, useNavigate} from "react-router-dom";

type Props = {
    setIsRegisterOn: (value: boolean) => void;
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
})

const SignIn = ({setIsRegisterOn}: Props) => {
    let navigate: NavigateFunction = useNavigate();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    const handleLogin = (formValues: { email: string, password: string }) => {
        const {email, password} = formValues;
        setLoading(true)

        AuthService.login(email, password).then(
            () => {
                navigate("/dashboard")
            },
            error => {
                console.log(error);
                const resMessage = error.response.data.message;

                setLoading(false);
                setMessage(resMessage);
            }
        );
    }

    const formik = useFormik({
        initialValues: {email: email, password: password},
        validationSchema: validationSchema,
        onSubmit: (values) => handleLogin(values)
    })

    return (
        <>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={1} >
                    {message && (
                        <Grid item xs={12}>
                            <Alert severity="error">{message}</Alert>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CardActions>
                            <Button variant="contained" type="submit" disabled={loading}>
                                <span>Sign In</span>
                            </Button>
                            <Button variant="text" onClick={() => setIsRegisterOn(true)}>Sign Up</Button>
                        </CardActions>
                        {loading && <LinearProgress />}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SignIn;