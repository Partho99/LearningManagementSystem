import '../node_modules/react-modal-video/scss/modal-video.scss';
import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import AuthService from "../auth/auth.service";
import {useRouter} from "next/router";
import Login from "./login";
import "../components/styles/register.css"
import 'swiper/swiper.scss';


export default function MyApp({Component, pageProps}) {

    const router = useRouter();
    let allowed = true;

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        setCurrentUser(user)
    }, [])

    const role = currentUser?.scope;

    // if( router.pathname.startsWith("/courses") && role !== "role_admin role_user") {
    //     allowed = false;
    // }

    const ComponentToRender = allowed ? Component : Login;
    return (
        <Layout pageTitle={" Online Education Learning & LMS"}>
            <ComponentToRender {...pageProps} />
        </Layout>
    )


    // && cp -r ../Learning-Management-Frontend/.next/* ../Learning-Management-System/src/main/resources/public
}
