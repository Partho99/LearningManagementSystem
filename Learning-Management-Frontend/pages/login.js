import React from 'react';
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";

const SignIn = dynamic(() => import('../components/form/SignIn').then(), {
    ssr: false, loading: () =>
        <div className='spinner_area'>
            <div className='container text-center'>
                <CircularProgress size={100}/>
            </div>
        </div>
});
const Login = () => {
    return <SignIn/>;
};

export default Login;
