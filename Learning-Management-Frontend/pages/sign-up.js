import React, {useContext, useEffect} from 'react';
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";
import {AuthContext} from "../context/auth.context";
import {useRouter} from "next/router";

const isBrowser = typeof window !== 'undefined';

const Registration = dynamic(() => import('../components/form/registration').then(), {
    ssr: false,
    loading: () =>
        <div className='spinner_area'>
            <div className='container text-center'>
                <CircularProgress size={60}/>
            </div>
        </div>
});
const SignUp = () => {
    const {authState} = useContext(AuthContext);
    const router = useRouter();
    const prevUrl = isBrowser ? window.history.length : undefined;
    useEffect(() => {
        authState.isAuthenticated ? (prevUrl <= 2 ? router.push('/')
                : router.back())
            : router.push('/sign-up')
    }, [authState])
    return <Registration/>
};

export default SignUp;
