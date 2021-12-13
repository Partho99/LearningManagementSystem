import React, {Component, useState} from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const AboutTwo = () => {

    const [startCounter, setStartCounter] = useState(false);

    const onVisibilityChange = isVisible => {
        if (isVisible) {
            setStartCounter(true);
        }
    }

    return (
        <section className="about-two">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-two__content">
                            <div className="block-title text-left">
                                <h2 className="block-title__title">Online learning is rapidly becoming
                                    one of the most cost-effective ways to educate the
                                    world’s rapidly expanding workforce</h2>
                            </div>
                            <p className="about-two__text">“The students of the future will demand the learning support
                                that
                                is appropriate for their situation or context. Nothing more, nothing less. And they want
                                it at the moment the need arises. Not sooner, not later. Mobile devices will be a
                                key technology for providing that learning support.” - Dr. Marcus Specht</p>
                            <div className="about-two__single-wrap">
                                <div className="about-two__single mb-5">
                                    <div className="about-two__single-icon">
                                        <i className="kipso-icon-professor"></i>
                                    </div>
                                    <div className="about-two__single-content">
                                        <p className="about-two__single-text">Start learning from
                                            our experts</p>
                                    </div>
                                </div>
                                <div className="about-two__single mb-5">
                                    <div className="about-two__single-icon">
                                        <i className="kipso-icon-knowledge"></i>
                                    </div>
                                    <div className="about-two__single-content">
                                        <p className="about-two__single-text">Enhance your skills
                                            with us now</p>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="thm-btn">Learn More</a>
                        </div>
                    </div>
                    <div className="col-xl-6 d-flex justify-content-xl-end justify-content-sm-center">
                        <div className="about-two__image">
                            <span className="about-two__image-dots"></span>
                            <img src="/assets/images/main-page4.jpg" height='529' width='529' alt=""/>
                            <div className="about-two__count">
                                <div className="about-two__count-text">Trusted by
                                    <span className="counter">
                                                <VisibilitySensor onChange={onVisibilityChange} offset={{top: 10}}
                                                                  delayedCall><CountUp
                                                    end={startCounter ? 4890 : 0}/></VisibilitySensor>
                                            </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTwo;

