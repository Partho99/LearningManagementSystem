import React, {useContext} from "react";
import '../node_modules/react-modal-video/scss/modal-video.scss';
import Layout from "../layouts/Layout";
import "../components/styles/register.css"
import 'swiper/swiper.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AuthProvider} from "../context/auth.provider";
import {AuthContext} from "../context/auth.context";
import {useRouter} from "next/router";


export default function MyApp({Component, pageProps}) {

    return (

        <AuthProvider>
            <Layout pageTitle={" Online Education Learning & LMS"}>
                <CssBaseline/>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    )


    // && cp -r ../Learning-Management-Frontend/.next/* ../Learning-Management-System/src/main/resources/public
}
