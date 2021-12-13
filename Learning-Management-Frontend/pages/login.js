import React, {useContext, useEffect} from 'react';
import dynamic from "next/dynamic";
import HashLoader from "react-spinners/HashLoader";
import {useRouter} from "next/router";
import {AuthContext} from "../context/auth.context";

const isBrowser = typeof window !== 'undefined';
const SignIn = dynamic(() => import('../components/form/SignIn').then(), {
    ssr: false, loading: () =>
        <div className='spinner_area'>
            <div className='container text-center'>
                <HashLoader color={'#9934eb'} size={60}/>
            </div>
        </div>
});
const Login = () => {
    let sourceString = 'IT & Software'
    let outString = sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'"' ',.<>\{\}\[\]\\\/]/gi, '');

    // console.log(outString)
    const {authState} = useContext(AuthContext);
    const router = useRouter();
    const prevUrl = isBrowser ? window.history.length : undefined;
    useEffect(() => {
        authState?.isAuthenticated ? (prevUrl <= 2 ? router.push('/')
                : router.back())
            : router.push('/login')
    }, [authState])
    return <SignIn/>;
};

export default Login;
