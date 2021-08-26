import axios from "axios";
import {useRouter} from "next/router";

const API_URL = "http://localhost:9001/oauth/token";
const API_URL2 = "http://localhost:9001/api/user/register";

const register = (fullName, email, password, enabled = true) => {
    return axios.post(API_URL2, {
        fullName,
        email,
        password,
        enabled
    });
};

const login = async (email, password) => {
    const formData = new FormData();
    const oauthData = {
        grant_type: "password",
        username: email,
        password: password
    }

    for (const name in oauthData) {
        formData.append(name, oauthData[name]);
    }

    const myHeaders = new Headers({
        'Authorization': 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk',
    });

    return await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: myHeaders
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                if (response.status === 401 || 403) {
                    throw new Error("Email or Password is wrong try again.");
                } else {
                    throw new Error("Server Problem");
                }
            }
        })
        .then(result => {
            if (result.access_token) {
                return result;
            }
        })
}
const logout = () => {
    localStorage.removeItem("user");
    window.location.href('/')
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
