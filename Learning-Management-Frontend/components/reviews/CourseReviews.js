import React, {useContext, useEffect, useState} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Link from "next/link";
import ReviewService from "../../auth/review.service";
import {AuthContext} from "../../context/auth.context";

const CourseReviews = ({id}) => {

    const {authState} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [reviewItem, setReviewItem] = useState([]);
    const [message, setMessage] = useState('');
    const [width, setWidth] = useState(0);
    const [courseReview, setCourseReview] = useState({})

    useEffect(() => {
    }, [])

    useEffect(async () => {
        let controller = new AbortController();
        const reviewData = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/api/course-reviews-details/${id}`)
                .then(response => response.json())
                .then(data => setReviewItem(data));
        }

        const reviewDetails = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-course-rating-details/${id}`)
                .then(response => response.json())
                .then(data => setCourseReview(data));
        }

        reviewData().then(r => r);
        reviewDetails().then(r => r);


        return () => {
            controller?.abort();
        }
    }, [id, loading])

    const onChangeComment = (e) => {
        const comment = e.target.value;
        setComment(comment);
    };

    const onChangeRating = (e, v) => {
        e.preventDefault();
        setRating(v);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (/^\s+$/.test(comment)) {
            setMessage('Please enter a valid comment!')
        } else if (rating === 0) {
            setMessage('Please rate this course!')
        } else {

            setMessage("");
            setLoading(true);

            ReviewService.addCourseReview(comment, rating, id).then(
                () => {
                    setComment('');
                    setLoading(false);
                    setRating(0);
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
        }
    };

    return (
        <div className="tab-pane  animated fadeInUp" role="tabpanel" id="review">
            <div className="row">
                <div className="col-xl-7 d-flex">
                    <div className="course-details__progress my-auto">
                        <div className="course-details__progress-item">
                            <p className="course-details__progress-text">Excellent</p>
                            <div className="course-details__progress-bar">
                                <span style={{width: `95%`}}/>
                            </div>
                            <p className="course-details__progress-count">5</p>
                        </div>
                        <div className="course-details__progress-item">
                            <p className="course-details__progress-text">Very Good</p>
                            <div className="course-details__progress-bar">
                                <span style={{width: `65%`}}/>
                            </div>
                            <p className="course-details__progress-count">2</p>
                        </div>
                        <div className="course-details__progress-item">
                            <p className="course-details__progress-text">Average</p>
                            <div className="course-details__progress-bar">
                                <span style={{width: `33%`}}/>
                            </div>
                            <p className="course-details__progress-count">1</p>
                        </div>
                        <div className="course-details__progress-item">
                            <p className="course-details__progress-text">Poor</p>
                            <div className="course-details__progress-bar">
                                <span style={{width: `0%`}} className="no-bubble"/>
                            </div>
                            <p className="course-details__progress-count">0</p>
                        </div>
                        <div className="course-details__progress-item">
                            <p className="course-details__progress-text">Terrible</p>
                            <div className="course-details__progress-bar">
                                <span style={{width: `0%`}} className="no-bubble"/>
                            </div>
                            <p className="course-details__progress-count">0</p>
                        </div>
                    </div>
                </div>
                <div
                    className="col-xl-5 justify-content-xl-end justify-content-sm-center d-flex">
                    <div className="course-details__review-box">
                        <p className="course-details__review-count">{(courseReview?.rating_sum / courseReview?.total_user).toFixed(1)}</p>
                        <div className="course-details__review-stars">
                            <i className="fas fa-star"/>
                            <i className="fas fa-star"/>
                            <i className="fas fa-star"/>
                            <i className="fas fa-star"/>
                            <i className="fas fa-star-half"/>
                        </div>
                        <p className="course-details__review-text">{courseReview?.total_user} Reviews</p>
                    </div>
                </div>
            </div>
            <div className="course-details__comment">
                {reviewItem && reviewItem?.map((r, id) => (
                    <div className="course-details__comment-single" key={id}>
                        <div className="course-details__comment-top">
                            <div className="course-details__comment-img ">
                                <img className='rounded-circle' src={r?.imageUrl} alt=""/>
                            </div>
                            <div className="course-details__comment-right">
                                <h2 className="course-details__comment-name">{r?.fullName}</h2>
                                <div className="course-details__comment-meta">
                                    <p className="course-details__comment-date">{r?.created_time}</p>
                                    <div className="course-details__comment-stars">
                                        {Array(Math.round(r?.rating))
                                            .fill()
                                            .map((_, i) => (
                                                <i className="fa fa-star"/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="course-details__comment-text">{r.comment}</p>
                    </div>
                ))}
            </div>

            <Form onSubmit={handleSubmit} className="course-details__comment-form">
                <h2 className="course-details__title">Add a
                    review</h2>
                <p className="course-details__comment-form-text">Rate this Course?
                    <a href='' onClick={(e) => onChangeRating(e, 1)} className="fas fa-star"/>
                    <a href='' onClick={(e) => onChangeRating(e, 2)} className="fas fa-star"/>
                    <a href='' onClick={(e) => onChangeRating(e, 3)} className="fas fa-star"/>
                    <a href='' onClick={(e) => onChangeRating(e, 4)} className="fas fa-star"/>
                    <a href='' onClick={(e) => onChangeRating(e, 5)} className="fas fa-star"/>
                </p>
                <div className="row">
                    <div className="col-lg-12">
                        <Input
                            type="text"
                            className="form__input"
                            name="comment"
                            value={comment}
                            onChange={onChangeComment}
                            placeholder="comment"
                            required
                        />
                        <p className='text-primary font-weight-bold'>{message}</p>
                        {authState.isAuthenticated ?
                            <button type="submit" className="thm-btn-course course-details__comment-form-btn">
                                {loading ?
                                    <span className="ml-5 mr-5 text-primary spinner-border text-center"/>
                                    :
                                    <span>Leave a Review</span>
                                }
                            </button>
                            :
                            <Link href={'/login'}>You have to login first</Link>
                        }
                    </div>
                </div>
            </Form>

        </div>
    );
};

export default CourseReviews;
