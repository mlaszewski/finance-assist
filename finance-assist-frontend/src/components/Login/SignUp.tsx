import {
    Alert,
    Box,
    Button,
    CardActions,
    Grid,
    LinearProgress,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import {useState} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

type Props = {
    setIsRegisterOn: (value: boolean) => void;
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    name: Yup.string()
        .required()
        .matches(/[a-zA-Z]/, 'Name can only contain Latin letters.')
        .min(2, 'Your name is too short.'),
    password: Yup.string()
        .required('Password is required'),
    confirmPassword: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
})

const SignUp = ({setIsRegisterOn}: Props) => {
    let navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");
    const [successful, setSuccessful] = useState<boolean>(false);

    const handleRegister = (formValues: { email: string, name: string, password: string }) => {
        const {email, name, password} = formValues;

        setMessage("")
        setLoading(true)

        AuthService.register(email, name, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setLoading(false);
                //window.location.reload();
            },
            error => {

                const resMessage = error.response.data.message

                setLoading(false)
                setMessage(resMessage)
                setSuccessful(false);
            }
        );
    }

    const formik = useFormik({
        initialValues: {email: "", name: "", password: "", confirmPassword: ""},
        validationSchema: validationSchema,
        onSubmit: (values) => handleRegister(values)
    })

    return (
        <>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
            >
                {successful && (
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Alert severity="success">You have been registered successfully!</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={() => setIsRegisterOn(false)}>Sign In</Button>
                        </Grid>
                    </Grid>
                )}
                {!successful && (
                    <Grid container spacing={1}>
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
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Password Confirmation"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CardActions>
                                <Button variant="contained" type="submit" disabled={loading}>
                                    <span>Sign Up</span>
                                </Button>
                                <Button variant="text" onClick={() => setIsRegisterOn(false)}>Already
                                    registered?</Button>
                            </CardActions>
                            {loading && <LinearProgress/>}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </>
    )
}

export default SignUp;