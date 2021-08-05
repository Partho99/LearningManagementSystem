import React, {useEffect, useRef, useState} from 'react';
import Input from "react-validation/build/input";
import {useRouter} from "next/router";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../auth/auth.service"

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    const form = useRef();
    const checkBtn = useRef();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        setCurrentUser(user)
    }, [])


    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        // form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
        AuthService.login(username, password).then(
            () => {

                // window.location.href =  router.back();
                 router.reload();
                // router.push(router.pathname).then(r => r)
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
        // } else {
        //     setLoading(false);
        // }
    };
    return (
        <>
            {currentUser ? window.location.href = "/" :
                <div className="container-fluid">
                    <div className="row main-content bg-success text-center">
                        <div className="col-md-4 company__info">
                            <img src="/assets/images/Learning-Management-System-LMS-Software.png" alt="LMS"/>
                        </div>
                        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                            <div className="container-fluid">
                                {message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <h2></h2>
                                <div className="row">
                                    <Form onSubmit={handleLogin} ref={form} control="" className="form-group">
                                        <div className="row">
                                            <Input
                                                type="text"
                                                className="form__input"
                                                name="username"
                                                value={username}
                                                onChange={onChangeUsername}
                                                placeholder="Username"
                                                validations={[required]}
                                            />
                                        </div>
                                        <div className="row">
                                            <Input
                                                type="password"
                                                className="form__input"
                                                name="password"
                                                value={password}
                                                onChange={onChangePassword}
                                                placeholder="Password"
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group text-center">
                                            <button className="btn btn-primary btn-block" disabled={loading}>
                                                {loading ?
                                                    <span
                                                        className="spinner-border spinner-border-sm text-center"></span>
                                                    :
                                                    <span>Sign In</span>
                                                }
                                            </button>
                                        </div>


                                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                                    </Form>
                                </div>
                                <div className="row">
                                    <p>Don't have an account? <a href="#">Register Here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Login;