import React from 'react';
import dynamic from "next/dynamic";
import CircularProgress from "@material-ui/core/CircularProgress";


const Registration = dynamic(() => import('../components/form/registration').then(), {
    ssr: false,
    loading: () =>
        <div className='spinner_area'>
            <div className='container text-center'>
                <CircularProgress size={100}/>
            </div>
        </div>
});
const SignUp = () => {
    return <Registration/>
};

export default SignUp;
