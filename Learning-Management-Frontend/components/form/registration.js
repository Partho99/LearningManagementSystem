import React, {useContext, useEffect, useRef, useState} from 'react';
import AuthService from "../../auth/auth.service"
import {useFormik} from "formik";
import {useRouter} from "next/router";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";
import {makeStyles} from "@material-ui/core/styles";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Grid from "@material-ui/core/Grid";
import {AuthContext} from "../../context/auth.context";


const Avatar = dynamic(() => import('@material-ui/core/Avatar').then(), {ssr: false});


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#1888c9',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 10),
    },
}));

const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirm_password: ''
}

const validate = values => {
    let errors = {}

    if (!values.fullName) {
        errors.fullName = 'Full Name is required'
    }

    if (!values.password) {
        errors.password = 'Password is required'
    }

    if (values.password != values.confirm_password) {
        errors.confirm_password = 'Password not match'
    }

    if (!values.email) {
        errors.email = 'Email address is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Enter a valid email address"
    }
    return errors;
}

const Registration = () => {

    const classes = useStyles();
    const router = useRouter();
    const {authState} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);
    const [successful, setSuccessful] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            setLoading(true)
            AuthService.register(values.fullName, values.email, values.password).then(
                (response) => {
                    setMessage("your account is successfully created");
                    setTimeout(function () {
                        setLoading(false)
                        setSuccessful(true);
                        router.push("/login").then(r => r)
                    }, 2000);
                },

                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (resMessage === 'Request failed with status code 400') {
                        setMessage("User Already Exist!");
                    }
                    setSuccessful(false);
                    setLoading(false)
                }
            );
        },
        validate: validate
    });

    useEffect(() => {
        authState?.isAuthenticated ? router.back() : router.push('/sign-up')
    }, [authState])



    return (
        <>
            {authState?.isAuthenticated ? window.location.href = "/" :
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PermIdentityIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        {message && (
                            <div className="form-group">
                                <div className="text-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="fullName"
                                label="Full Name *"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                autoComplete="fullName"
                                autoFocus
                            />
                            {formik.errors.fullName ?
                                <div className="text-danger">{formik.errors.fullName}</div> : null}

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                autoComplete="email"
                            />
                            {formik.errors.email ?
                                <div className="text-danger">{formik.errors.email}</div> : null}

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    {formik.errors.password ?
                                        <div className="text-danger">{formik.errors.password}</div> : null}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        value={formik.values.confirm_password}
                                        onChange={formik.handleChange}
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm_password"
                                        autoComplete="current-password"
                                    />
                                    {formik.errors.confirm_password ?
                                        <div className="text-danger">{formik.errors.confirm_password}</div> : null}
                                </Grid>

                            </Grid>


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {loading ?
                                    <span className="spinner-border spinner-border-sm text-center"/>
                                    :
                                    <span>Sign Up</span>
                                }
                            </Button>
                        </form>
                    </div>
                </Container>
            }
        </>
    );
};

export default Registration;
