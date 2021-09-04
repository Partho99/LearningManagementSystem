import React from "react";
import '../node_modules/react-modal-video/scss/modal-video.scss';
import Layout from "../layouts/Layout";
import "../components/styles/register.css"
import 'swiper/swiper.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AuthenticationProvider} from "../context/auth.provider";
import AuthorizationProvider from "../context/AuthorizationProvider";
import SwiperCore, {Autoplay} from "swiper";

export default function MyApp({Component, pageProps}) {

    SwiperCore.use([Autoplay]);

    return (

        <AuthenticationProvider>
            <Layout pageTitle={" Online Education Learning & LMS"}>
                <CssBaseline/>
                <AuthorizationProvider>
                    <Component {...pageProps} />
                </AuthorizationProvider>
            </Layout>
        </AuthenticationProvider>
    )


    // && cp -r ../Learning-Management-Frontend/.next/* ../Learning-Management-System/src/main/resources/public
    // git token ==> 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
}
