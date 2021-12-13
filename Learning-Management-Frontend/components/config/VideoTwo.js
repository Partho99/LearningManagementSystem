import React, {Component, useEffect, useState} from 'react';
import dynamic from 'next/dynamic'

const ModalVideo = dynamic(() => import('react-modal-video').then(), {ssr: false});


const VideoTwo = () => {

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(!isOpen);
    }
    return (
        <section className="video-two">
            <div className="container">
                <img src="/assets/images/lms-front1.jpg" className="video-two__scratch" alt="" />
                <div className="row">
                    <div className="col-lg-7">
                        <div className="video-two__content">
                            <h2 className="video-two__title text-dark">Our one & only <br />
                                mission is to extend <br />
                                your knowledge base</h2>
                            <a href="#" className="thm-btn">Learn More</a>
                        </div>
                    </div>
                        <div className="col-lg-5 d-flex justify-content-lg-end justify-content-sm-start">
                        <div className="my-auto">
                            <ModalVideo channel='youtube' isOpen={isOpen} videoId='aitb---aDYM' onClose={() => setIsOpen(!isOpen)} />
                            <div onClick={openModal} className="video-two__popup"><i className="fa fa-play"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoTwo;
