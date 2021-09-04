import axios from "axios";
import authHeader from "./auth-header";

const purchaseCourse = (id) => {
    return axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/purchase-course/${id}`, {}, {headers: authHeader()})
        .then(r => {
            return r.data;
        })
        .catch(err => {
            // console.log(err.response.status)
            if (err.response.status === 500) {
                throw new Error('Already enrolled!')
            }
        })
}

export default {purchaseCourse};
