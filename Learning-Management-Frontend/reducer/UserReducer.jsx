import React from 'react';

export const UserReducer = (state, action) => {

    console.log('action', action.user)
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                currentUser: action.currentUser
            }
        default:
            return state;
    }
};
