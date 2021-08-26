import React, {useEffect, useReducer} from 'react';
import {AuthContext} from './auth.context';

const isBrowser = typeof window !== 'undefined';

const INITIAL_STATE = {
    isAuthenticated: isBrowser && !!localStorage.getItem('user'),
    currentForm: 'signIn',
    user: {}
};

function reducer(state, action) {
    // console.log(state, 'auth');

    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.currentUser
            };
        case 'SIGN_OUT':
            return {
                ...state,
                user: localStorage.removeItem("user"),
                isAuthenticated: false,
            };
        case 'SIGNUP':
            return {
                ...state,
                currentForm: 'signUp',
            };
        case 'FORGOT_PASS':
            return {
                ...state,
                currentForm: 'forgotPass',
            };
        default:
            return state;
    }
}

export const AuthProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE,
        () => {
            const userData = isBrowser ? window.localStorage.getItem('user') : null;
            return userData ? JSON.parse(userData) : {};
        });

    useEffect(() => {
        isBrowser ? window.localStorage.setItem('user', JSON.stringify(authState)) : null;
    }, [authState])
    return (
        <AuthContext.Provider value={{authState, authDispatch}}>
            {children}
        </AuthContext.Provider>
    );
};
