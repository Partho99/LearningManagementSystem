import axios from "axios";

const API_URL = "http://localhost:9001/oauth/token";
const API_URL2 = "http://localhost:9001/api/user/register";
const API_URL3 = "http://localhost:9001/api/user/register-google-user";
const API_URL4 = "http://localhost:9001/api/user/register-facebook-user";

const register = (fullName, email, password, enabled = true) => {
    return axios.post(API_URL2, {
        fullName,
        email,
        password,
        enabled
    });
};

const registerGoogle = (fullName, email, password,imageUrl, enabled = true) => {
    return axios.post(API_URL3, {
        fullName,
        email,
        password,
        imageUrl,
        enabled
    });
};

const registerFacebook = (fullName, email, password,imageUrl, enabled = true) => {
    return axios.post(API_URL4, {
        fullName,
        email,
        password,
        imageUrl,
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
    registerGoogle,
    registerFacebook,
    login,
    logout,
    getCurrentUser,
};
