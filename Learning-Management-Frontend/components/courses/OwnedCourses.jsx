import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import HashLoader from "react-spinners/HashLoader";
import Link from "next/link";
import authHeader from "../../auth/auth-header";
import swal from 'sweetalert';

const OwnedCourses = ({email, fullName}) => {

    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [isDelete, setIsDelete] = useState(false)

    const router = useRouter();
    const {slug} = router.query;
    const realSlug = slug?.replace(/-/g, " ");

    useEffect(() => {
        window.scrollTo(0, 0);
        const ownedCourses = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-created-by-instructor/${email}/${page}`)
                .then(response => response.json())
                .then(data => setCourses(data))
            setLoading(false)
        }

        ownedCourses().then(r => r);
    }, [email, page, isDelete])

    const deleteOwnedCourse = async (id) => {
        const deleteCourse = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/delete/${id}`, {
                method: 'DELETE',
                headers: authHeader()
            })
            setIsDelete(true);
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this course!",
            icon: "warning",
            buttons: ["No!", "Yes!"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteCourse()
                    swal("Your course has been deleted!", {
                        icon: "success",
                    });
                }/* else {
                    swal("Your course is safe!");
                }*/
            });
    }

    const updateOwnedCourse = (id) => {
        router.push(`/user/${id}/create-course`).then(r => r);
    }
    const handleClick = (page) => {
        setPage(page)
    }

    return (
        <section className="course-one course-page">
            {loading ?
                <div className='spinner_area'>
                    <div className={"text-center"}>
                        <HashLoader color={'#034c7a'} loading={loading} size={80}/>
                    </div>
                </div>
                :
                <div className="container">
                    {courses ? <h4 className='mb-3'>
                        {fullName} your created courses are
                    </h4> : null}

                    <div className="row">
                        {courses.content?.map(item => (
                            <div className="col-lg-4" key={item.id}>
                                <div className="course-one__single">
                                    <Link href={"/courses/[name]/[id]/[course_details]"}
                                          as={`/courses/${item.topic?.name?.replace(/ /g, "-")
                                              .toLowerCase()}/${item.id}/${item.courseName
                                              ?.replace(/ /g, "-").toLowerCase()}`}>
                                        <div className="course-one__image">
                                            <img
                                                src={item?.imageUrl ? item?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height="200" width='200' alt=""/>
                                            <i className="far fa-heart "/>
                                        </div>
                                    </Link>
                                    <div className="course-one__content">
                                        <Link href="/courses/topics/[slug]"
                                              as={`/courses/topics/${item?.topic?.name}`}>
                                            <a href="#" className="course-one__category">{item.topic.name}</a>
                                        </Link>
                                        <h2 className="course-one__title">
                                            <Link href={"/courses/[name]/[id]/[course_details]"}
                                                  as={`/courses/${item.topic?.name?.replace(/ /g, "-")
                                                      .toLowerCase()}/${item.id}/${item.courseName
                                                      ?.replace(/ /g, "-")
                                                      .toLowerCase()}`}>
                                                <a>{item.courseName?.length > 23 ? item.courseName
                                                    ?.substring(0, 23) + ' ...' : item.courseName}</a>
                                            </Link>
                                        </h2>
                                        <div className="course-one__admin">
                                            <img
                                                src={item?.user?.imageUrl ? item?.user?.imageUrl : "/assets/images/team-1-1.jpg"}
                                                alt=""/>
                                            by <Link
                                            href="/teacher-details"><a>{item.user?.fullName.charAt(0)
                                            .toUpperCase() + item.user?.fullName.slice(1)}</a></Link>
                                        </div>

                                        <div className="course-one__meta">
                                            <a href="/course-details"><i
                                                className="far fa-clock"/>{Math.floor(item.sections.length * 1.5)} Hours</a>
                                            <a href="/course-details"><i
                                                className="far fa-folder-open"/> {item.sections.length} Lectures</a>
                                            <a href="/course-details" className='text-info'>Free</a>
                                        </div>
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
                                                className="course-one__count">
                                                    {(item?.rating_details?.rating_sum / item?.rating_details?.total_user)
                                                        .toFixed(1)}</span>
                                            <span
                                                className="course-one__stars-count">{item?.rating_details?.total_user}</span>
                                        </div>
                                        <span className='ml-5'></span>
                                        <div className='ml-5 float-right mt-2 use__owned__course'>
                                            <a className={'ml-5 text-danger'}
                                               onClick={() => deleteOwnedCourse(item.id)}>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="post-pagination">

                        {/**another way of doing pagination*/}
                        {/*{*/}
                        {/*    Array.from({ length: courses.totalPages }, (_, k) => (*/}
                        {/*        <a className="active" href="#" onClick={() => handleClick(k)}>{k+1}</a>*/}
                        {/*    ))*/}
                        {/*}*/}

                        {page <= 0 ? null :
                            <>
                                <p className={''} onClick={() => handleClick(page - 1)}>
                                    <i className="fa fa-angle-double-left"/></p>
                            </>
                        }
                        <h6 className={'font-weight-bold mb-3'}>{` #${page + 1}`}</h6>
                        &nbsp;
                        {page + 1 >= courses.totalPages ? null :
                            <p className={''} onClick={() => handleClick(page + 1)}>
                                <i className="fa fa-angle-double-right"/></p>
                        }

                    </div>
                </div>
            }
        </section>
    );
};

export default OwnedCourses;
