import React, {useEffect, useState} from 'react';
import Swiper from 'react-id-swiper';
import Link from "next/link";

const CourseOne = () => {

    const params = {
        slidesPerView: 3,
        loop: true,
        speed: 1000,
        spaceBetween: 30,
        rebuildOnUpdate: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        // Responsive breakpoints
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
            640: {
                slidesPerView: 2

            },
            320: {
                slidesPerView: 1
            }
        }
    }

    const [categoryDevelopment, setCategoryDevelopment] = useState({});
    const [categoryBusiness, setCategoryBusiness] = useState({});
    const [categoryMusic, setCategoryMusic] = useState({});
    const [categoryFinanceAccounting, setCategoryFinanceAccounting] = useState({});
    const [categoryPhotographyVideo, setCategoryPhotographyVideo] = useState({});
    const [categoryMarketing, setCategoryMarketing] = useState({});
    const [categoryITSoftware, setCategoryITSoftware] = useState({});
    const [categoryLifestyle, setCategoryLifestyle] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(async () => {

        const popularDevelopmentCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Development`)
                .then(response => response.json())
                .then(data => setCategoryDevelopment(data))
            setLoading(false)
        }

        const popularBusinessCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Business`)
                .then(response => response.json())
                .then(data => setCategoryBusiness(data))
            setLoading(false)
        }

        const popularFinanceAccountingCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Finance & Accounting`)
                .then(response => response.json())
                .then(data => setCategoryFinanceAccounting(data))
            setLoading(false)
        }

        const popularMarketingCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Marketing`)
                .then(response => response.json())
                .then(data => setCategoryMarketing(data))
            setLoading(false)
        }

        const popularITSoftwareCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/IT & Software`)
                .then(response => response.json())
                .then(data => setCategoryITSoftware(data))
            setLoading(false)
        }

        const popularPhotographyVideoCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Photography & Video`)
                .then(response => response.json())
                .then(data => setCategoryPhotographyVideo(data))
            setLoading(false)
        }

        const popularMusicCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Music`)
                .then(response => response.json())
                .then(data => setCategoryMusic(data))
            setLoading(false)
        }
        const popularLifestyleCategory = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/popular/Lifestyle`)
                .then(response => response.json())
                .then(data => setCategoryLifestyle(data))
            setLoading(false)
        }


        popularDevelopmentCategory().then(r => r)
        popularBusinessCategory().then(r => r)
        popularFinanceAccountingCategory().then(r => r)
        popularMarketingCategory().then(r => r)
        popularITSoftwareCategory().then(r => r)
        popularPhotographyVideoCategory().catch(r => r)
        popularMusicCategory().then(r => r)
        popularLifestyleCategory().then(r => r)
    }, [])
    // src={item?.imageUrl ? item?.imageUrl : "/assets/images/course-1-1.jpg"}
    return (
        <div>
            <section className="course-one__top-title home-one">
                <div className="container">
                    <div className="block-title mb-0">
                        <h2 className="block-title__title">Explore our <br/>
                            popular courses</h2>
                    </div>
                </div>
                <div className="course-one__top-title__curve"></div>
            </section>

            <section className="course-one course-one__teacher-details home-one">
                <div className="container">
                    <div className="course-one__carousel">

                        <Swiper {...params} rebuildOnUpdate>
                            <div className="item">
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryDevelopment.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryDevelopment.id}/${categoryDevelopment.courseName?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-1">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryDevelopment?.imageUrl ? categoryDevelopment?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height="200"
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryDevelopment?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryDevelopment.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryDevelopment?.id}/${categoryDevelopment.courseName?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryDevelopment.courseName?.length > 26 ? categoryDevelopment.courseName?.substring(0, 26) +
                                                        ' ...' : categoryDevelopment?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a href="/teacher-details">{categoryDevelopment?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details"><i
                                                    className="far fa-folder-open"/>{categoryDevelopment.sections?.length} Lectures</a>
                                                <a href="/course-details">$18</a>
                                            </div>

                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryDevelopment?.rating_details?.rating_sum /
                                        categoryDevelopment?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryDevelopment?.rating_details?.rating_sum /
                                    categoryDevelopment?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryDevelopment?.rating_details?.rating_sum /
                                                    categoryDevelopment?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryDevelopment?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryFinanceAccounting.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryFinanceAccounting.id}/${categoryFinanceAccounting.courseName?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-2">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryFinanceAccounting?.imageUrl ? categoryFinanceAccounting?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height="200"
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryFinanceAccounting?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryFinanceAccounting.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryFinanceAccounting?.id}/${categoryFinanceAccounting.courseName?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryFinanceAccounting.courseName?.length > 26 ? categoryFinanceAccounting.courseName?.substring(0, 26) +
                                                        ' ...' : categoryFinanceAccounting?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a
                                                href="/teacher-details">{categoryFinanceAccounting?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details"><i
                                                    className="far fa-folder-open"/>{categoryFinanceAccounting.sections?.length} Lectures</a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryFinanceAccounting?.rating_details?.rating_sum /
                                        categoryFinanceAccounting?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryFinanceAccounting?.rating_details?.rating_sum /
                                    categoryFinanceAccounting?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryFinanceAccounting?.rating_details?.rating_sum /
                                                    categoryFinanceAccounting?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryFinanceAccounting?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">

                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryBusiness.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryBusiness.id}/${categoryBusiness.courseName?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-3">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryBusiness?.imageUrl ? categoryBusiness?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height='200'
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryBusiness?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryBusiness.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryBusiness?.id}/${categoryBusiness.courseName?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryBusiness.courseName?.length > 26 ? categoryBusiness.courseName?.substring(0, 26) +
                                                        ' ...' : categoryBusiness?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a href="/teacher-details">{categoryBusiness?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details"><i
                                                    className="far fa-folder-open"/>{categoryBusiness.sections?.length} Lectures</a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryBusiness?.rating_details?.rating_sum /
                                        categoryBusiness?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryBusiness?.rating_details?.rating_sum /
                                    categoryBusiness?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryBusiness?.rating_details?.rating_sum /
                                                    categoryBusiness?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryBusiness?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">

                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryMarketing.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryMarketing.id}/${categoryMarketing.courseName?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-4">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryMarketing?.imageUrl ? categoryMarketing?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height='200'
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryMarketing?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryMarketing.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryMarketing?.id}/${categoryMarketing.courseName?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryMarketing.courseName?.length > 26 ? categoryMarketing.courseName?.substring(0, 26) +
                                                        ' ...' : categoryMarketing?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a href="/teacher-details">{categoryMarketing?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details"><i
                                                    className="far fa-folder-open"/>{categoryMarketing.sections?.length} Lectures</a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryMarketing?.rating_details?.rating_sum /
                                        categoryMarketing?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryMarketing?.rating_details?.rating_sum /
                                    categoryMarketing?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryMarketing?.rating_details?.rating_sum /
                                                    categoryMarketing?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryMarketing?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryITSoftware.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryITSoftware.id}/${categoryITSoftware.courseName?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-5">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryITSoftware?.imageUrl ? categoryITSoftware?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height='200'
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryITSoftware?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryITSoftware.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryITSoftware?.id}/${categoryITSoftware.courseName?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryITSoftware.courseName?.length > 26 ? categoryITSoftware.courseName?.substring(0, 26) +
                                                        ' ...' : categoryITSoftware?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a href="/teacher-details">{categoryITSoftware?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details">
                                                    <i className="far fa-folder-open"/>{categoryITSoftware.sections?.length} Lectures
                                                </a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryITSoftware?.rating_details?.rating_sum /
                                        categoryITSoftware?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryITSoftware?.rating_details?.rating_sum /
                                    categoryITSoftware?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryITSoftware?.rating_details?.rating_sum /
                                                    categoryITSoftware?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryITSoftware?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryPhotographyVideo.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryPhotographyVideo.id}/${categoryPhotographyVideo.courseName
                                          ?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-5">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryPhotographyVideo?.imageUrl ? categoryPhotographyVideo
                                                    ?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height='200'
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryPhotographyVideo?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryPhotographyVideo.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryPhotographyVideo?.id}/${categoryPhotographyVideo.courseName
                                                          ?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryPhotographyVideo.courseName?.length > 26 ? categoryPhotographyVideo.courseName?.substring(0, 26) +
                                                        ' ...' : categoryPhotographyVideo?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a
                                                href="/teacher-details">{categoryPhotographyVideo?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details">
                                                    <i className="far fa-folder-open"/>{categoryPhotographyVideo.sections?.length} Lectures
                                                </a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryPhotographyVideo?.rating_details?.rating_sum /
                                        categoryPhotographyVideo?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryPhotographyVideo?.rating_details?.rating_sum /
                                    categoryPhotographyVideo?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryPhotographyVideo?.rating_details?.rating_sum /
                                                    categoryPhotographyVideo?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryPhotographyVideo?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryMusic.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryMusic.id}/${categoryMusic.courseName
                                          ?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-5">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryMusic?.imageUrl ? categoryMusic
                                                    ?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height='200'
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryMusic?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryMusic.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryMusic?.id}/${categoryMusic.courseName
                                                          ?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryMusic.courseName?.length > 26 ? categoryMusic.courseName?.substring(0, 26) +
                                                        ' ...' : categoryMusic?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a
                                                href="/teacher-details">{categoryMusic?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details">
                                                    <i className="far fa-folder-open"/>{categoryMusic.sections?.length} Lectures
                                                </a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryMusic?.rating_details?.rating_sum /
                                        categoryMusic?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryMusic?.rating_details?.rating_sum /
                                    categoryMusic?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryMusic?.rating_details?.rating_sum /
                                                    categoryMusic?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryMusic?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item">
                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                      as={`/courses/${categoryLifestyle.topic?.name?.replace(/ /g, "-")
                                          .toLowerCase()}/${categoryLifestyle.id}/${categoryLifestyle.courseName
                                          ?.replace(/ /g, "-")
                                          .toLowerCase()}`}>
                                    <div className="course-one__single color-5">
                                        <div className="course-one__image">
                                            <img
                                                src={categoryLifestyle?.imageUrl ? categoryLifestyle
                                                    ?.imageUrl : "/assets/images/course-1-1.jpg"}
                                                height='200'
                                                alt='D'/>
                                            <i className="far fa-heart"/>
                                        </div>
                                        <div className="course-one__content">
                                            <a href="#"
                                               className="course-one__category">{categoryLifestyle?.topic?.name}</a>
                                            <h2 className="course-one__title">
                                                <Link href={"/courses/[name]/[id]/[course_details]"}
                                                      as={`/courses/${categoryLifestyle.topic?.name.replace(/ /g, "-")
                                                          .toLowerCase()}/${categoryLifestyle?.id}/${categoryLifestyle.courseName
                                                          ?.replace(/ /g, "-")
                                                          .toLowerCase()}`}>
                                                    <a>{categoryLifestyle.courseName?.length > 26 ? categoryLifestyle.courseName?.substring(0, 26) +
                                                        ' ...' : categoryLifestyle?.courseName}</a>
                                                </Link>
                                            </h2>
                                            <div className="course-one__admin">
                                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                by <a
                                                href="/teacher-details">{categoryLifestyle?.user?.fullName}</a>
                                            </div>
                                            <div className="course-one__meta">
                                                <a href="/course-details"><i className="far fa-clock"/> 10 Hours</a>
                                                <a href="/course-details">
                                                    <i className="far fa-folder-open"/>{categoryLifestyle.sections?.length} Lectures
                                                </a>
                                                <a href="/course-details">$18</a>
                                            </div>
                                            <div className="course-one__stars">
                            <span className="course-one__stars-wrap">
                                {Array.from({
                                    length: Math.floor((categoryLifestyle?.rating_details?.rating_sum /
                                        categoryLifestyle?.rating_details?.total_user))
                                })
                                    .fill()
                                    .map((_, i) => (
                                        <>
                                            <i className="fa fa-star"/>
                                        </>
                                    ))
                                }
                                {(categoryLifestyle?.rating_details?.rating_sum /
                                    categoryLifestyle?.rating_details?.total_user).toFixed(1) % 1 ? <i
                                    className="fa fa-star-half"/> : null}
                            </span>
                                                <span
                                                    className="course-one__count">{(categoryLifestyle?.rating_details?.rating_sum /
                                                    categoryLifestyle?.rating_details?.total_user).toFixed(1)}</span>
                                                <span
                                                    className="course-one__stars-count">{categoryLifestyle?.rating_details?.total_user}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default CourseOne;
