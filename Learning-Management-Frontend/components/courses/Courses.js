import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";
import CircularProgress from '@material-ui/core/CircularProgress';


const Courses = () => {
        const router = useRouter();
        const {slug} = router.query;
        const [courses, setCourses] = useState([]);
        const [loading, setLoading] = useState(true);
        const [page, setPage] = useState(0);


        useEffect(() => {
            const courseData = async () => {
                setLoading(true)
                await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-by-page/${page}`)
                    .then(response => response.json())
                    .then(data => setCourses(data))
                setLoading(false)
            }

            courseData().then(r => r);

        }, [page])


        const handleClick = (page) => {
            setPage(page)
        }

        return (
            <section className="course-one course-page">
                {loading ?
                    <div className='spinner_area'>
                        <div className={"text-center"}>
                            <CircularProgress size={100} disableShrink/>
                        </div>
                    </div>
                    :
                    <div className="container">

                        <div className="row">

                            {courses.content?.map(item => (
                                <div className="col-lg-4" key={item.id}>
                                    <div className="course-one__single">
                                        <div className="course-one__image">
                                            <img src="/assets/images/course-1-1.jpg" alt=""/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#" className="course-one__category">{item.topic.name}</a>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <Link
                                                href="/teacher-details"><a>{item.user?.fullName}</a></Link>
                                            </div>
                                            <h2 className="course-one__title"><Link
                                                href={"/courses/[course_details]"}
                                                as={`/courses/${item.id}`}><a>{item.name?.substring(0, 24) + ' . . .'}</a></Link>
                                            </h2>
                                            <div className="course-one__stars">
                                    <span className="course-one__stars-wrap">
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                        <i className="fa fa-star"/>
                                    </span>
                                                <span className="course-one__count">4.8</span>
                                                <span className="course-one__stars-count">250</span>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10
                                                    Hours</a>
                                                <a href="/course-details"><i
                                                    className="far fa-folder-open"/> {item.sections.length} Lectures</a>
                                                <a href="/course-details">$180</a>
                                            </div>
                                            <Link href={"/courses/[course_details]"} as={`/courses/${item.id}`}><a
                                                href="#"
                                                className="course-one__link">See
                                                Preview</a></Link>

                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="post-pagination">
                            {/*{*/}
                            {/*    Array.from({ length: courses.totalPages }, (_, k) => (*/}
                            {/*        <a className="active" href="#" onClick={() => handleClick(k)}>{k+1}</a>*/}
                            {/*    ))*/}
                            {/*}*/}

                            {page <= 0 ?
                                <div></div>
                                :
                                <a className={'bg-warning'} href="#" onClick={() => handleClick(page - 1)}>
                                    <i className="fa fa-angle-double-left text-primary"/></a>
                            }

                            {page + 1 >= courses.totalPages ?
                                <div></div>
                                :
                                <a className={'bg-warning'} href="#" onClick={() => handleClick(page + 1)}>
                                    <i className="fa fa-angle-double-right text-primary"/></a>
                            }

                        </div>

                    </div>
                }
            </section>
        );
    }
;

export default Courses;
