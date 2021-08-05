import React, {useCallback, useEffect, useState} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Link from "next/link";
import ReviewService from "../auth/review.service";
import {useRouter} from "next/router";
import AuthService from "../auth/auth.service";

const Reviews = ({id}) => {


    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [review, setReview] = useState(0);
    const [reviewItem, setReviewItem] = useState([]);
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        setCurrentUser(user)
    }, [])

    useEffect(async () => {
        let controller = new AbortController();
        const reviewData = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/api/reviews-details/${id}`)
                .then(response => response.json())
                .then(data => setReviewItem(data));
        }
        reviewData().then(r => r);

        return () => {
            controller?.abort();
        }
    }, [id, loading])

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

        ReviewService.addReview(comment, review, id).then(
            () => {
                setComment('');
                setLoading(false);
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
    };

    return (
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
                {reviewItem?.map((r, id) => (
                    <div className="course-details__comment-single" key={id}>
                        <div className="course-details__comment-top">
                            <div className="course-details__comment-img">
                                <img src="/assets/images/team-1-1.jpg" alt=""/>
                            </div>
                            <div className="course-details__comment-right">
                                <h2 className="course-details__comment-name">{r?.username}</h2>
                                <div className="course-details__comment-meta">
                                    <p className="course-details__comment-date">{r?.created_time}</p>
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
                        <p className="course-details__comment-text">{r.comment}</p>
                    </div>
                ))}
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
                            type="text"
                            className="form__input"
                            name="comment"
                            value={comment}
                            onChange={onChangeComment}
                            placeholder="comment"
                        />
                        {currentUser ?
                            <button type="submit"
                                    className="thm-btn course-details__comment-form-btn">Leave
                                a
                                Review
                            </button> : <Link href={'/login'}>You have to login first</Link>
                        }
                    </div>
                </div>
            </Form>

        </div>
    );
};

export default Reviews;