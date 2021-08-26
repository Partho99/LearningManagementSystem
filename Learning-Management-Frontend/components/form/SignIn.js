import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from "formik";
import AuthService from "../../auth/auth.service";
import dynamic from "next/dynamic";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {useRouter} from "next/router";
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

    const {authState, authDispatch} = useContext(AuthContext)
    const classes = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            setLoading(true)
            AuthService.login(values.email, values.password).then(
                (response) => {
                    authDispatch({
                        type: 'SIGN_IN_SUCCESS', currentUser: response
                    })
                    router.push('/').then(r => r)
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

    useEffect(() => {
        authState?.isAuthenticated ? router.back() : router.push('/login')
    }, [authState])

    return (
        <>
            <Container component="main" maxWidth="xs">
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
                            autoComplete="email"
                            autoFocus
                        />
                        {formik.errors.email ?
                            <div className="text-danger">{formik.errors.email}</div> : null}

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
                                <h1 className="spinner-border spinner-border-sm text-center"/>
                                :
                                <span>Sign In</span>
                            }
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="" variant="body2">
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="">
                                    <a>
                                    </a>
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
