import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import CircularProgress from '@material-ui/core/CircularProgress';

const TopicCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const router = useRouter();
    const {slug} = router.query;
    const realSlug = slug?.replace(/-/g, " ");

    useEffect(() => {
        const topicData = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-by-topic/${realSlug}/${page}`)
                .then(response => response.json())
                .then(data => setCourses(data))
            setLoading(false)
        }

        topicData().then(r => r);

    }, [slug, page])

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
                                        <Link href="/courses/topics/[slug]"
                                              as={`/courses/topics/${item?.topic?.name}`}>
                                            <a href="#" className="course-one__category">{item.topic.name}</a>
                                        </Link>

                                        <div className="course-one__admin">
                                            <img src="/assets/images/team-1-1.jpg" alt=""/>
                                            by <Link href="/teacher-details"><a>{item.user?.fullName}</a></Link>
                                        </div>
                                        <h2 className="course-one__title">
                                            <Link
                                                href={"/courses/[name]/[id]/[course_details]"}
                                                as={`/courses/${item.topic?.name?.replace(/ /g, "-").toLowerCase()}/${item.id}/${item.name?.replace(/ /g, "-").toLowerCase()}`}>
                                                <a>{item.name.length > 26 ? item.name?.substring(0, 26) + ' ...' : item.name}</a>
                                            </Link>
                                        </h2>
                                        <div className="course-one__stars">
                                    <span className="course-one__stars-wrap">
                                        {Array(Math.floor((item?.rating_details?.rating_sum / item?.rating_details?.total_user)))
                                            .fill()
                                            .map((_, i) => (
                                                <>
                                                    <i className="fa fa-star"/>
                                                </>
                                            ))
                                        }
                                        {(item?.rating_details?.rating_sum /
                                            item?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                            className="fa fa-star-half"/> : null}
                                    </span>
                                            <span
                                                className="course-one__count">{(item?.rating_details?.rating_sum / item?.rating_details?.total_user).toFixed(1)}</span>
                                            <span
                                                className="course-one__stars-count">{item?.rating_details?.total_user}</span>
                                        </div>
                                        <div className="course-one__meta">
                                            <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                            <a href="/course-details"><i
                                                className="far fa-folder-open"/> {item.sections.length} Lectures</a>
                                            <a href="/course-details">$18</a>
                                        </div>
                                        <Link href={"/courses/[name]/[id]/[course_details]"}
                                              as={`/courses/${item.topic?.name?.replace(/ /g, "-").toLowerCase()}/${item.id}/${item.name?.replace(/ /g, "-").toLowerCase()}`}>
                                            <a href="#" className="course-one__link">See Preview</a>
                                        </Link>

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
};

export default TopicCourses;
