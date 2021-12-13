import React, {
    createContext,
    useContext,
    useMemo,
    useEffect,
} from "react";
import {useRouter} from "next/router";
import {AuthContext} from "./auth.context";
import Unauthorized from "../pages/unauthorized";


const isBrowser = typeof window !== 'undefined';
const AuthStateContext = createContext();

export function useAuth() {
    return useContext(AuthStateContext);
}

const AuthorizationProvider = ({children}) => {

    const {authState} = useContext(AuthContext);
    // console.log(authState?.user?.scope)

    const router = useRouter();
    let role = authState?.user?.scope;
    let allowed = true;
    const prevUrl = isBrowser ? window.history.length : undefined;

    if (router.pathname.startsWith("/teacher") && role !== "role_instructor") {
        allowed = false;
    }

    /*    if (router.pathname.startsWith("/user/[id]/[username]") && !authState?.isAuthenticated) {

        }*/
    // if (router.pathname.startsWith("/blog/create-new-article") && role !== "role_admin role_user") {
    //     allowed = false;
    // }

    useEffect(() => {
        /**role = authState?.user?.scope;
         console.log(`LL: AuthProvider -> role`, role);
         if (!isLoading) {
            if (router.pathname.startsWith("/user") && role !== "user") {
                if (role) {
                    console.log(router.pathname.replace("user", role));
                    router.push(router.pathname.replace("user", role)).then(r=>r);
                } else {
                    // router.push("/");
                }
            }
            if (router.pathname.startsWith("/teacher") && role !== "teacher") {
                if (role) {
                    console.log(router.pathname.replace("teacher", role));
                    router.push(router.pathname.replace("teacher", role)).then(r=>r);
                } else {
                    router.push("/").then(r=>r);
                }
            }
            if (router.pathname.startsWith("/applicant") && role !== "applicant") {
                if (role) {
                    console.log(router.pathname.replace("applicant", role));
                    router.push(router.pathname.replace("applicant", role)).then(r=>r);
                } else {
                    router.push("/").then(r=>r);
                }
            }
            if (router.pathname.startsWith("/admin") && role !== "admin") {
                if (role) {
                    console.log(router.pathname.replace("admin", role));
                    router.push(router.pathname.replace("admin", role)).then(r=>r);
                } else {
                    router.push("/").then(r=>r);
                }
            }
        }*/

    }, [authState, router]);


    const contextValue = useMemo(() => [allowed, role], [allowed, role]);
    const ComponentToRender = allowed ? children : <Unauthorized/>;
    return (
        <AuthStateContext.Provider value={contextValue}>
            {ComponentToRender}
        </AuthStateContext.Provider>
    );
};

export default AuthorizationProvider;
