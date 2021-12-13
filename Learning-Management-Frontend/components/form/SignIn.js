import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from "next/link";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from "formik";
import AuthService from "../../auth/auth.service";
import dynamic from "next/dynamic";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {AuthContext} from "../../context/auth.context";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

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
        margin: theme.spacing(3, 0, 2),
    },
}));


const initialValues = {
    email: '',
    password: ''
}

const validate = values => {
    let errors = {}

    if (!values.email) {
        errors.email = 'Email is required'
    }

    if (!values.password) {
        errors.password = 'Password is required'
    }

    if (!values.email) {
        errors.email = 'Email address is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Enter a valid email address"
    }

    return errors;
}

const SignIn = () => {

    const gCid = '154270847541-vqipt4jg0v9umma7qj1ivaoj0nvi1cdt.apps.googleusercontent.com'

    const {authDispatch} = useContext(AuthContext)
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            setLoading(true)
            AuthService.login(values.email, values.password).then(
                (response) => {
                    authDispatch({
                        type: 'SIGN_IN_SUCCESS', currentUser: response
                    })
                    setLoading(false)
                }).catch((error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            )
        },
        validate: validate
    });

    const responseGoogle = (r) => {
        setLoading(true)
        AuthService.registerGoogle(r?.tokenId).then(
            (response) => {
                authDispatch({
                    type: 'SIGN_IN_SUCCESS', currentUser: response.data.user
                })
                setLoading(false)
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
                setLoading(false)
            }
        );
    }

    const componentClicked = (e) => {
        // console.log(e);
    }
    const responseFacebook = (e) => {
        const password = e?.accessToken?.slice(0, 10);
        setLoading(true)
        AuthService.registerFacebook(e?.name, e?.email, password, e?.picture?.data?.url, e?.accessToken).then(
            (response) => {
                authDispatch({
                    type: 'SIGN_IN_SUCCESS', currentUser: response.data.user
                })
                setLoading(false)
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
                setLoading(false)
            }
        );
    };
    return (
        <>
            <Container component="main" maxWidth="xs" className='mb-4'>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {message && (
                        <div className="form-group">
                            <div className="text-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div className='ml-4'>
                        <FacebookLogin
                            buttonStyle={{
                                width: '90%',
                                marginTop: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                                marginLeft: 6,
                                fontWeight: 100,
                                outline: 'none'
                            }}
                            appId="430352225065391"
                            // autoLoad={true}
                            fields="name,email,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                            icon="fa-facebook"
                        />

                        <GoogleLogin
                            className='google-login'
                            clientId={gCid}
                            buttonText="LOGIN WITH GOOGLE"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            autoLoad={false}
                        />

                    </div>

                    <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>

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
                            onBlur={formik.handleBlur}
                            autoComplete="email"
                            // autoFocus
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div className="text-danger">{formik.errors.email}</div> : null}

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div className="text-danger">{formik.errors.password}</div> : null}

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {loading ?
                                <span className="spinner-border spinner-border-sm text-center mb-1 mt-1"/>
                                :
                                <span>Sign In</span>
                            }
                        </Button>
                        <Grid container className='mb-5'>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default SignIn;
