import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";

const SubjectCourses = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const {slug} = router.query;
    const realSlug = slug?.replace(/-/g," ");

    useEffect(() => {
        const subjectData = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-by-subject/${realSlug}`)
                .then(response => response.json())
                .then(data => setCourses(data))
            setLoading(false);
        }
        subjectData().then(r => r);

    }, [slug])

    return (
        <section className="course-one course-page">
            {loading ? <div className={"text-center"}>
                    <CircularProgress size={100} disableShrink/>
                </div> :
                <div className="container">
                    <div className="row">
                        {courses?.map(item => (
                            <div className="col-lg-4" key={item.id}>
                                <div className="course-one__single">
                                    <div className="course-one__image">
                                        <img src="/assets/images/course-1-1.jpg" alt=""/>
                                        <i className="far fa-heart"></i>
                                    </div>
                                    <div className="course-one__content">
                                        <a href="#" className="course-one__category">{item.topic.name}</a>
                                        <div className="course-one__admin">
                                            <img src="/assets/images/team-1-1.jpg" alt=""/>
                                            by <Link href="/teacher-details"><a>{item.user.username}</a></Link>
                                        </div>
                                        <h2 className="course-one__title"><Link
                                            href="/course-details"><a>{item.name}</a></Link>
                                        </h2>
                                        <div className="course-one__stars">
                                    <span className="course-one__stars-wrap">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </span>
                                            <span className="course-one__count">4.8</span>
                                            <span className="course-one__stars-count">250</span>
                                        </div>
                                        <div className="course-one__meta">
                                            <a href="/course-details"><i className="far fa-clock"></i> 10 Hours</a>
                                            <a href="/course-details"><i
                                                className="far fa-folder-open"></i> {item.sections.length} Lectures</a>
                                            <a href="/course-details">$18</a>
                                        </div>
                                        <Link href={"/courses/[course_details]"} as={`/courses/${item.id}`}><a href="#"
                                                                                                               className="course-one__link">See
                                            Preview</a></Link>

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
            }
        </section>
    );
};

export default SubjectCourses;
