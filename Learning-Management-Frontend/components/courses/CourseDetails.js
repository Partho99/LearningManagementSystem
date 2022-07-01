import React, {useContext, useEffect, useState} from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import authHeader from "../../auth/auth-header"
import Link from "next/link";
import ModalVideo from "react-modal-video";
import ReviewService from "../../auth/review.service";
import CourseService from "../../auth/course.service";
import CourseReviews from "../reviews/CourseReviews";
import {AuthContext} from "../../context/auth.context";


export async function getServerSideProps(id) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-one/${id}`)
  const data = await res.json()
  return {
    props: {data}, // will be passed to the page component as props
  }
}

export async function getStaticProps(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-one/${id}`)
  const data = await res.json()
  return {
    props: {data}, // will be passed to the page component as props
  }
}

const CourseDetails = ({id, name}) => {


  const {authState, authDispatch} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState('');
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(0);
  const [message, setMessage] = useState('');
  const [newCourseSuggestion, setNewCourseSuggestion] = useState([]);
  const [isPurchased, setIsPurchased] = useState(authState?.check_purchase);

  const realName = name?.replace(/-/g, " ");

  useEffect(() => {

    console.log("hello")
    window.scrollTo(0, 0);
    let controller = new AbortController();
    setLoading(true)

    getStaticProps(id).then(r => setCourse(r.props.data))

    const courseDetails = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-one/${id}`)
            .then(response => response.json())
            .then(data => setCourse(data))
        setLoading(false);
    }
    const courseDetails2 = async () => {
        await fetch('http://172.168.10.74:8080/api/hrm/pageableDepartments')
            .then(response => response.json())
            .then(r => console.log("sdkvhsdvjklsdvjklsdvjk" +r))
        setLoading(false);
    }

    const checkPurchaseStatus = async () => {
      setLoading(true)
      await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/check-course-purchase-status/${id}`,
        {
          method: 'GET',
          headers: authHeader()
        })
        .then(response => response.json())
        .then(data => setIsPurchased(data))
      setLoading(false);
    }

    const showNewCourseSuggestion = async () => {

      await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/course/api/show-new-courses/${realName}`)
        .then(response => response.json())
        .then(data => setNewCourseSuggestion(data))
      setLoading(false);

    }
    courseDetails().then(r => r);
    courseDetails2().then(r => r);
    checkPurchaseStatus().then(r => r)
    showNewCourseSuggestion().then(r => r)
    return () => {
      controller?.abort();
    }

  }, [id, name])
  console.log('PURCHASED STAT', isPurchased)
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
    ReviewService.addCourseReview(comment, review, id).then(
      () => {
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
    // } else {
    //     setLoading(false);
    // }
  };

  function purchaseCourse(id) {
    CourseService.purchaseCourse(id).then(response => {
      authDispatch({
        type: 'PURCHASED_COURSE', checkStatus: response
      })
      setIsPurchased(authState?.check_purchase)
      setLoading(false);
    }).catch(error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      setMessage(resMessage);
    });
  }

  // console.log('CHECK COURSE PURCHASE DETAILS : ', isPurchased)
  return (
    <section className="course-details">
      {loading ?
        <div className='spinner_area'>
          <div className={"text-center"}>
            <PropagateLoader size={15} disableShrink color={'#034c7a'}/>
          </div>
        </div>
        :
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="course-details__content">
                <div className="course-details__top">
                  <div className="course-details__top-left">
                    <h2 className="course-details__title">{course.courseName?.replace(/-/g, " ")}</h2>
                    <p className="course-details__author">
                      <img
                        src={course?.user?.imageUrl ? course?.user?.imageUrl : "/assets/images/team-1-1.jpg"}
                        alt=""/>
                      by <a href="#">{course.user?.fullName}</a>
                    </p>
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
                  <i className="far fa-heart"/>
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
                    {course?.sections?.map((item, id) => (
                      <>
                        <h3 key={id}
                            className="course-details__tab-title">{item.sectionName}</h3>
                        <br/>
                        <p className="course-details__tab-text">{item.sectionOverview}</p>
                        <br/>
                        <ul className="course-details__curriculum-list list-unstyled">
                          {item?.videoContents?.map((vid, id) => (
                            <li key={id}>
                              <div className="course-details__curriculum-list-left">
                                <div className="course-details__meta-icon video-icon">
                                  <i className="fas fa-play"/>
                                </div>
                                {isPurchased?.purchase_status ?
                                  <a type="button" onClick={() => {
                                    openModal() , setVideoId('_I94-tJlovg')
                                  }}>
                                    {vid.videoName}
                                  </a> :
                                  <a>{vid.videoName}</a>

                                }

                                <span>Play</span>
                              </div>
                              <div className="course-details__curriculum-list-right">16
                                minutes
                              </div>
                            </li>
                          ))}

                          <li>
                            <div className="course-details__curriculum-list-left">
                              <div className="course-details__meta-icon quiz-icon">
                                <i className="fas fa-comment"/>
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
                  {/*here reviews are added */}
                  <CourseReviews id={id}/>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="course-details__price">
                {loading ? <PropagateLoader size={20} disableShrink color={'#34eb95'}/> :
                  <>
                    {isPurchased?.purchase_status ?
                      <>
                        <p className="course-details__price-text">Course price </p>
                        <p className="course-details__price-amount">Paid</p>
                        {loading ?
                          <span
                            className="spinner-border spinner-border-sm text-center mb-1 mt-1"/>
                          :
                          <p className="thm-btn course-details__price-btn bg-success">Enrolled</p>
                        }
                      </>
                      :
                      <>
                        <p className="course-details__price-text">Course price </p>
                        <p className="course-details__price-amount">$18.00</p>
                        {loading ?
                          <span
                            className="spinner-border spinner-border-sm text-center mb-1 mt-1"/>
                          :
                          <a className="thm-btn course-details__price-btn"
                             onClick={() => purchaseCourse(id)}>Enroll Now</a>
                        }
                      </>
                    }
                  </>
                }

              </div>

              <div className="course-details__meta">
                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-clock"/>
                                </span>
                  Durations: <span>10 hours</span>
                </a>
                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-folder-open"/>
                                </span>
                  Lectures: <span>6</span>
                </a>
                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-user-circle"/>
                                </span>
                  Students: <span>Max 4</span>
                </a>
                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="fas fa-play"/>
                                </span>
                  Video: <span>8 hours</span>
                </a>
                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-flag"/>
                                </span>
                  Skill Level: <span>Advanced</span>
                </a>
                <a href="#" className="course-details__meta-link">
                                <span className="course-details__meta-icon">
                                    <i className="far fa-bell"/>
                                </span>
                  Language: <span>English</span>
                </a>
              </div>
              <div className="course-details__list">
                <h2 className="course-details__list-title">New
                  Courses</h2>
                {newCourseSuggestion?.map(item => (
                  <div className="course-details__list-item" key={item.id}>
                    <div className="course-details__list-img">
                      <img src={item?.imageUrl ? item?.imageUrl : "/assets/images/course-1-1.jpg"}
                           height='70' alt=""/>
                    </div>
                    <div className="course-details__list-content">
                      <a className="course-details__list-author"
                         href="#">by <span>{item?.user?.fullName}</span></a>
                      <h6>
                        <Link href={"/courses/[name]/[id]/[course_details]"}
                              as={`/courses/${item.topic?.name.replace(/ /g, "-")
                                .toLowerCase()}/${item?.id}/${item.courseName?.replace(/ /g, "-")
                                .toLowerCase()}`}>
                          <a className='text-dark'>{item.courseName?.length > 20 ? item.courseName?.substring(0, 20) +
                            ' ...' : item?.courseName}</a>
                        </Link>
                      </h6>
                      <div className="course-details__list-stars">
                        {Array.from({
                          length: Math.floor((item?.rating_details?.rating_sum /
                            item?.rating_details?.total_user))
                        })
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
                        <span
                          className="course-one__count">{(item?.rating_details?.rating_sum /
                          item?.rating_details?.total_user).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}

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
