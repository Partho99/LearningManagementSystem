import React from 'react';
import BlogDetails from "../../../components/blogs/BlogDetails";
import {useRouter} from "next/router";

const GalleryPage = () => {

    const router = useRouter();
    const {id,blog_details} = router.query;
    return <BlogDetails id={id}/>;
};

export default GalleryPage;
