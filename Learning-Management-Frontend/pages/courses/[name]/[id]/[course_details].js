import React from 'react';
import CourseDetails from "../../../../components/courses/CourseDetails";
import {useRouter} from "next/router";

const CoursesPage = () => {

    const router = useRouter();
    const {name,id,course_details} = router.query;
    return <CourseDetails id={id} name={name}/>

};

export default CoursesPage;
