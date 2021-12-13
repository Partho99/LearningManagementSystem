import React from 'react';
import dynamic from "next/dynamic";
import HashLoader from "react-spinners/HashLoader";


const CreateCourseContent = dynamic(() => import("../components/editor/CreateCourseContent").then(), {
    ssr: false, loading: () =>
        <div className='spinner_area'>
            <div className='container text-center'>
                <HashLoader color={'#9934eb'} size={60}/>
            </div>
        </div>
});
const CreateCourse = () => {
    return (
        <div>
            <CreateCourseContent/>
        </div>
    );
};

export default CreateCourse;
