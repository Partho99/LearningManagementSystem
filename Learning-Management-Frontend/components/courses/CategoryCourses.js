import React, {createRef, useEffect, useRef, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import HashLoader from "react-spinners/HashLoader";


export async function getServerSideProps(realSlug,page) {

  const res =  await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-by-category/${realSlug}/${page}`)
  const data = await res.json()
  return {
    props: {data}, // will be passed to the page component as props
  }
}

const CategoryCourses = ({categoryName}) => {

    // const myRef = useRef(null)
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const router = useRouter();
    const {slug} = router.query;
    const realSlug = slug?.replace(/-/g, " ");

    useEffect(async () => {
        // myRef.current.scrollIntoView()
        window.scrollTo(0, 0);
        const categoryData = async () => {
            setLoading(true)
            // await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-by-category/${realSlug}/${page}`)
            //     .then(response => response.json())
            //     .then(data => setCourses(data))
          getServerSideProps(realSlug,page).then(r => setCourses(r.props.data))
            setLoading(false);
        }

        categoryData().then(r => r);

    }, [page])

    useEffect(async () => {
        // myRef.current.scrollIntoView()
        window.scrollTo(0, 0);
        const categoryData = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-by-category/${realSlug}/${page}`)
                .then(response => response.json())
                .then(data => setCourses(data))
            setPage(0)
            setLoading(false);
        }
        categoryData().then(r => r);
    }, [slug])

    const handleClick = (page) => {
        setPage(page)
    }


    return (
        <section className="course-one course-page">
            {loading ?
                <div className='spinner_area'>
                    <div className={"text-center"}>
                        <HashLoader color={'#d90465'} loading={loading} size={80}/>
                    </div>
                </div>
                :
                <div className="container">
                    <div className="row">
                        {courses.content?.map(item => (
                            <div className="col-lg-4" key={item.id}>
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${item.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${item.id}/${item.courseName
                                          ?.replace(/ /g, "-").toLowerCase()}`}>
                                    <div className="course-one__single">
                                        <Link href={"/courses/[name]/[id]/[course_details]"}
                                              as={`/courses/${item.topic?.name?.replace(/ /g, "-")
                                                  .toLowerCase()}/${item.id}/${item.courseName
                                                  ?.replace(/ /g, "-").toLowerCase()}`}>
                                            <div className="course-one__image">
                                                <img
                                                    src={item?.imageUrl ? item?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                    height="200" width='150' alt=""/>
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
                                                    <a>{item.courseName?.length > 33 ? item.courseName
                                                        ?.substring(0, 33) + ' ...' : item.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img
                                                    src={item?.user?.imageUrl ? item?.user?.imageUrl : "/assets/images/team-1-1.jpg"}
                                                    alt="nothing"/>
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
                                                    className="course-one__stars-count">Comment - {item?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
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

export default CategoryCourses;
