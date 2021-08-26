import React from 'react';
import BlogDetails from "../../components/blogs/BlogDetails";
import {useRouter} from "next/router";

const GalleryPage = () => {

    const router = useRouter();
    const {blog_details} = router.query;
    return <BlogDetails id={blog_details}/>;
};

export default GalleryPage;
