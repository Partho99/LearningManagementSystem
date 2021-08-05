import React, {useEffect, useState} from 'react';
import Link from 'next/link';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const courseData = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/blog/api/show-all-blogs`)
                .then(response => response.json())
                .then(data => setBlogs(data))
            setLoading(false)
        }

        courseData().then(r => r);

    }, [])

    return (
        <section className="blog-one blog-page">
            <div className="container">
                <div className="row">
                    {
                        blogs && blogs?.map(b =>(
                            <div className="col-lg-4" key={b.id}>
                                <div className="blog-one__single">
                                    <div className="blog-one__image">
                                        <img src="/assets/images/blog-1-1.jpg" alt="" />
                                        <Link href={"/blogs/[blog_details]"} as={`/blogs/${b.id}`}><a className="blog-one__plus"><i
                                            className="kipso-icon-plus-symbol"></i>
                                        </a></Link>
                                    </div>
                                    <div className="blog-one__content text-center">
                                        <div className="blog-one__meta">
                                            <a data-toggle="tooltip" data-placement="top" title="" href="#"
                                               data-original-title="Posted On Jan 19"><i className="fa fa-calendar-alt"></i></a>
                                            <a data-toggle="tooltip" data-placement="top" title="" href="#"
                                               data-original-title="No Comments"><i className="fa fa-comments"></i></a>
                                            <a data-toggle="tooltip" data-placement="top" title="" href="#"
                                               data-original-title="Posted By Admin"><i className="fa fa-user"></i></a>
                                        </div>
                                        <h2 className="blog-one__title">
                                            <Link href={"/blogs/[blog_details]"} as={`/blogs/${b.id}`}><a>{b.title?.substring(0,12) + ' . . .'}</a></Link>
                                        </h2>
                                        <p className="blog-one__text">{b.details?.substring(0,88) + ' . . .'}</p>
                                        <Link href={"/blogs/[blog_details]"} as={`/blogs/${b.id}`}><a className="blog-one__link">Read More</a></Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                </div>
                <div className="post-pagination">
                    <a href="#"><i className="fa fa-angle-double-left"></i></a>
                    <a className="active" href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#"><i className="fa fa-angle-double-right"></i></a>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
