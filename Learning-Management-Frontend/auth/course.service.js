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

const publishCourseImage = (imageFile) => {
    const formData = new FormData();
    formData.append("imageFile", imageFile)
    return axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/save-course-image`, formData,
        {
            headers: {
                'Authorization': authHeader().Authorization,
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryQ0pBuvRC1EzDAQWT',
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            // console.log(err.response.status)
            if (err.response.status === 500) {
                throw new Error('Exception!')
            }
        })
}


const publishCourse = async (courseDetails, id) => {
    const course = JSON.stringify(courseDetails)
    return await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/save/${id}`, {
        method: 'POST',
        body: course,
        headers: {
            'Authorization': authHeader().Authorization,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                if (response.status === 401 || 403) {
                    throw new Error("Something Went Wrong.");
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

export default {purchaseCourse, publishCourse, publishCourseImage};
