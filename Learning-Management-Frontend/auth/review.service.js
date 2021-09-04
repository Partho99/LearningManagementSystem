import axios from "axios";
import authHeader from "./auth-header";

const addCourseReview = (comment, rating = 0, id) => {
    return axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/submit-course-review/${id}`, {
        comment,
        rating,
    }, {headers: authHeader()});
};

const addBlogReview = (comment, rating = 0, id) => {
    return axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/blog/api/submit-blog-review/${id}`, {
        comment,
        rating,
    }, {headers: authHeader()});
};


export default {addCourseReview, addBlogReview};
