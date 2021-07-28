import axios from "axios";

const API_URL = "http://localhost:9001/oauth/token";
const API_URL2 = "http://localhost:9001/api/user/register";

 const addReview = (comment, review= 0) => {
    return axios.post(API_URL2, {
        comment,
        review,
    });
};

export default {addReview};
