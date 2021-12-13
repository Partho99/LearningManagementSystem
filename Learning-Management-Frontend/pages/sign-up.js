import React, {useContext, useEffect} from 'react';
import dynamic from "next/dynamic";
import HashLoader from "react-spinners/HashLoader";
import {AuthContext} from "../context/auth.context";
import {useRouter} from "next/router";

const isBrowser = typeof window !== 'undefined';

const Registration = dynamic(() => import('../components/form/registration').then(), {
    ssr: false,
    loading: () =>
        <div className='spinner_area'>
            <div className='container text-center'>
                <HashLoader color={'#9934eb'} size={60}/>
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
