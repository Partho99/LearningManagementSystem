import axios from "axios";

const API_URL = "http://localhost:9001/oauth/token";
const API_URL2 = "http://localhost:9001/api/user/register";

const register = (username, email, password, enabled = true) => {
    return axios.post(API_URL2, {
        username,
        email,
        password,
        enabled
    });
};

/*
const login = (username, password) => {
    axios.get(API_URL + "login", {
        method: 'GET',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            console.log(response)
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}
*/

const login = async (username, password) => {
    const formData = new FormData();
    const oauthData = {
        grant_type: "password",
        username: username,
        password: password
    }

    for (const name in oauthData) {
        formData.append(name, oauthData[name]);
    }

    const myHeaders = new Headers({
        'Authorization': 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk',
    });

    await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: myHeaders
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Username or Password is wrong try again.");
            }
        })
        .then(result => {
            if (result.access_token) {
                localStorage.setItem("user", JSON.stringify(result));
            }
        })
}


/*
const login = async (username, password) => {

    const formData = new FormData();
    const oauthData = {
        grant_type: "password",
        username: username,
        password: password
    }

    for (const name in oauthData) {
        formData.append(name, oauthData[name]);
    }

    const myHeaders = new Headers({
        'Authorization': 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk',
    });

    return await axios
        .post(API_URL, {
            body: formData,
            headers: myHeaders

        })
        .then((response) => {
            console.log(response)
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        })
};
*/

const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
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
