import React, {useEffect, useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "next/link";
import ModalVideo from "react-modal-video";
import ReviewService from "../auth/review.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const CourseDetails = ({id}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [videoId, setVideoId] = useState('');
    const [comment, setComment] = useState("");
    const [review, setReview] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const courseDetails = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-one/${id}`)
                .then(response => response.json())
                .then(data => setCourse(data))
            setLoading(false);
        }
        courseDetails().then(r => r);

    }, [id])

    const openModal = () => {
        setIsOpen(!isOpen);
    }

    const onChangeComment = (e) => {
        const comment = e.target.value;
        setComment(comment);
    };

    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        // form.current.validateAll();

        // if (checkBtn.current.context._errors.length === 0) {
        ReviewService.addReview(comment, review).then(
            () => {

            }).catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        )
        // } else {
        //     setLoading(false);
        // }
    };

    return (
        <section className="course-details">
            {loading ? <div className={"text-center"}>
                    <CircularProgress size={100} disableShrink/>
                </div> :
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="course-details__content">
                                <p className="course-details__author">
                                    <img src="/assets/images/team-1-1.jpg" alt=""/>
                                    by <a href="#">{course.user?.username}</a>
                                </p>

                                <div className="course-details__top">
                                    <div className="course-details__top-left">
                                        <h2 className="course-details__title">{course.name?.replace(/-/g," ")}</h2>
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
                                    </div>
                                    <div className="course-details__top-right">
                                        <Link href="/courses/topics/[slug]"
                                              as={`/courses/topics/${course?.topic?.name}`}>
                                            <a href="#" className="course-one__category">{course?.topic?.name}</a>
                                        </Link>

                                    </div>
                                </div>
                                <div className="course-one__image">
                                    <img src="" alt=""/>
                                    <i className="far fa-heart"></i>
                                </div>

                                <ul className="course-details__tab-navs list-unstyled nav nav-tabs" role="tablist">
                                    <li>
                                        <a className="active" role="tab" data-toggle="tab" href="#overview">Overview</a>
                                    </li>
                                    <li>
                                        <a className="" role="tab" data-toggle="tab" href="#curriculum">Curriculum</a>
                                    </li>
                                    <li>
                                        <a className="" role="tab" data-toggle="tab" href="#review">Reviews</a>
                                    </li>
                                </ul>
                                <div className="tab-content course-details__tab-content ">
                                    <div className="tab-pane show active  animated fadeInUp" role="tabpanel"
                                         id="overview">
                                        <h3>What you will learn from this course?</h3>
                                        <p className="course-details__tab-text">{course.overview?.learningFromThisCourse}</p>
                                        <br/>
                                        <h3>Who this course is for:</h3>
                                        <p className="course-details__tab-text">{course.overview?.eligibleForThisCourse}</p>
                                        <br/>
                                        <ul className="list-unstyled course-details__overview-list">
                                            <li>It has survived not only five centuries</li>
                                            <li>Lorem Ipsum is simply dummy text of the new design</li>
                                            <li>Printng and type setting ipsum</li>
                                            <li>Take a look at our round up of the best shows</li>
                                        </ul>
                                    </div>

                                    <div className="tab-pane  animated fadeInUp" role="tabpanel" id="curriculum">
                                        {course?.sections?.map(item => (
                                            <>
                                                <h3 key={item.id} className="course-details__tab-title">{item.name}</h3>
                                                <br/>
                                                <p className="course-details__tab-text">{item.overview}</p>
                                                <br/>
                                                <ul className="course-details__curriculum-list list-unstyled">
                                                    {item?.videoContents?.map(vid => (
                                                        <li key={vid.id}>
                                                            <div className="course-details__curriculum-list-left">
                                                                <div className="course-details__meta-icon video-icon">
                                                                    <i className="fas fa-play"></i>
                                                                </div>
                                                                <a onClick={() => {
                                                                    openModal() , setVideoId('_I94-tJlovg')
                                                                }}>{vid.name}</a>
                                                                <span>Preview</span>
                                                            </div>
                                                            <div className="course-details__curriculum-list-right">16
                                                                minutes
                                                            </div>
                                                        </li>
                                                    ))}

                                                    <li>
                                                        <div className="course-details__curriculum-list-left">
                                                            <div className="course-details__meta-icon quiz-icon">
                                                                <i className="fas fa-comment"></i>
                                                            </div>
                                                            <a href="#">Quiz</a>
                                                        </div>
                                                        <div className="course-details__curriculum-list-right">6
                                                            questions
                                                        </div>
                                                    </li>
                                                </ul>
                                                <br/><br/>
                                            </>
                                        ))}

                                    </div>
                                    <div className="tab-pane  animated fadeInUp" role="tabpanel" id="review">
                                        <div className="row">
                                            <div className="col-xl-7 d-flex">
                                                <div className="course-details__progress my-auto">
                                                    <div className="course-details__progress-item">
                                                        <p className="course-details__progress-text">Excellent</p>
                                                        <div className="course-details__progress-bar">
                                                            <span style={{width: `95%`}}></span>
                                                        </div>
                                                        <p className="course-details__progress-count">5</p>
                                                    </div>
                                                    <div className="course-details__progress-item">
                                                        <p className="course-details__progress-text">Very Good</p>
                                                        <div className="course-details__progress-bar">
                                                            <span style={{width: `65%`}}></span>
                                                        </div>
                                                        <p className="course-details__progress-count">2</p>
                                                    </div>
                                                    <div className="course-details__progress-item">
                                                        <p className="course-details__progress-text">Average</p>
                                                        <div className="course-details__progress-bar">
                                                            <span style={{width: `33%`}}></span>
                                                        </div>
                                                        <p className="course-details__progress-count">1</p>
                                                    </div>
                                                    <div className="course-details__progress-item">
                                                        <p className="course-details__progress-text">Poor</p>
                                                        <div className="course-details__progress-bar">
                                                            <span style={{width: `0%`}} className="no-bubble"></span>
                                                        </div>
                                                        <p className="course-details__progress-count">0</p>
                                                    </div>
                                                    <div className="course-details__progress-item">
                                                        <p className="course-details__progress-text">Terrible</p>
                                                        <div className="course-details__progress-bar">
                                                            <span style={{width: `0%`}} className="no-bubble"></span>
                                                        </div>
                                                        <p className="course-details__progress-count">0</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="col-xl-5 justify-content-xl-end justify-content-sm-center d-flex">
                                                <div className="course-details__review-box">
                                                    <p className="course-details__review-count">4.6</p>
                                                    <div className="course-details__review-stars">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half"></i>
                                                    </div>
                                                    <p className="course-details__review-text">30 reviews</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="course-details__comment">
                                            <div className="course-details__comment-single">
                                                <div className="course-details__comment-top">
                                                    <div className="course-details__comment-img">
                                                        <img src="/assets/images/team-1-1.jpg" alt=""/>
                                                    </div>
                                                    <div className="course-details__comment-right">
                                                        <h2 className="course-details__comment-name">Steven Meyer</h2>
                                                        <div className="course-details__comment-meta">
                                                            <p className="course-details__comment-date">26 July,
                                                                2019</p>
                                                            <div className="course-details__comment-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star star-disabled"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="course-details__comment-text">Lorem ipsum is simply free
                                                    text
                                                    used by
                                                    copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed
                                                    inventore
                                                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                            </div>
                                            <div className="course-details__comment-single">
                                                <div className="course-details__comment-top">
                                                    <div className="course-details__comment-img">
                                                        <img src="/assets/images/team-1-2.jpg" alt=""/>
                                                    </div>
                                                    <div className="course-details__comment-right">
                                                        <h2 className="course-details__comment-name">Lina Kelley</h2>
                                                        <div className="course-details__comment-meta">
                                                            <p className="course-details__comment-date">26 July,
                                                                2019</p>
                                                            <div className="course-details__comment-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star star-disabled"></i>
                                                                <i className="fa fa-star star-disabled"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="course-details__comment-text">Lorem ipsum is simply free
                                                    text
                                                    used by
                                                    copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed
                                                    inventore
                                                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                            </div>
                                        </div>
                                        <Form onSubmit={handleLogin} className="course-details__comment-form">
                                            <h2 className="course-details__title">Add a
                                                review</h2>
                                            <p className="course-details__comment-form-text">Rate this Course?
                                                <a href="#" className="fas fa-star"></a>
                                                <a href="#" className="fas fa-star"></a>
                                                <a href="#" className="fas fa-star"></a>
                                                <a href="#" className="fas fa-star"></a>
                                                <a href="#" className="fas fa-star"></a>
                                            </p>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                     <Input
                                                        type="password"
                                                        className="form__input"
                                                        name="comment"
                                                        value={comment}
                                                        onChange={onChangeComment}
                                                        placeholder="comment"
                                                    />
                                                    <button type="submit"
                                                            className="thm-btn course-details__comment-form-btn">Leave a
                                                        Review
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="course-details__price">
                                <p className="course-details__price-text">Course
                                    price </p>
                                <p className="course-details__price-amount">$18.00</p>
                                <a href="#" className="thm-btn course-details__price-btn">Buy This Course</a>
                            </div>

                            <div className="course-details__meta">
                                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-clock"></i>
                                </span>
                                    Durations: <span>10 hours</span>
                                </a>
                                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-folder-open"></i>
                                </span>
                                    Lectures: <span>6</span>
                                </a>
                                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-user-circle"></i>
                                </span>
                                    Students: <span>Max 4</span>
                                </a>
                                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="fas fa-play"></i>
                                </span>
                                    Video: <span>8 hours</span>
                                </a>
                                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-flag"></i>
                                </span>
                                    Skill Level: <span>Advanced</span>
                                </a>
                                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-bell"></i>
                                </span>
                                    Language: <span>English</span>
                                </a>
                            </div>
                            <div className="course-details__list">
                                <h2 className="course-details__list-title">New
                                    Courses</h2>
                                <div className="course-details__list-item">
                                    <div className="course-details__list-img">
                                        <img src="/assets/images/lc-1-1.jpg" alt=""/>
                                    </div>
                                    <div className="course-details__list-content">
                                        <a className="course-details__list-author"
                                           href="#">by <span>Lydia Byrd</span></a>
                                        <h3><a href="#">Marketing strategies</a></h3>
                                        <div className="course-details__list-stars">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <span>4.8</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-details__list-item">
                                    <div className="course-details__list-img">
                                        <img src="/assets/images/lc-1-2.jpg" alt=""/>
                                    </div>
                                    <div className="course-details__list-content">
                                        <a className="course-details__list-author"
                                           href="#">by <span>Lydia Byrd</span></a>
                                        <h3><a href="#">Marketing strategies</a></h3>
                                        <div className="course-details__list-stars">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <span>4.8</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-details__list-item">
                                    <div className="course-details__list-img">
                                        <img src="/assets/images/lc-1-3.jpg" alt=""/>
                                    </div>
                                    <div className="course-details__list-content">
                                        <a className="course-details__list-author"
                                           href="#">by <span>Lydia Byrd</span></a>
                                        <h3><a href="#">Marketing strategies</a></h3>
                                        <div className="course-details__list-stars">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <span>4.8</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 d-flex justify-content-lg-end justify-content-sm-start">
                            <div className="my-auto">
                                <ModalVideo channel='youtube' isOpen={isOpen} videoId={videoId}
                                            onClose={() => setIsOpen(!isOpen)}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};

export default CourseDetails;
