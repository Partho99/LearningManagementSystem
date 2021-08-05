import React from 'react';
import CourseDetails from "../../components/CourseDetails";
import {useRouter} from "next/router";

const CoursesPage = () => {

    const router = useRouter();
    const {course_details} = router.query;
    return <CourseDetails id={course_details}/>

};

export default CoursesPage;
