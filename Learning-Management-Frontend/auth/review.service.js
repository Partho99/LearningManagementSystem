import axios from "axios";
import authHeader from "./auth-header";

const addReview = (comment, review = 0, id) => {
    return axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/api/submit-review/${id}`, {
        comment,
        review,
    }, {headers: authHeader()});
};

export default {addReview};
