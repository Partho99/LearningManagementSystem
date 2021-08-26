import React from 'react';
import Footer from "../components/footer/Footer";
import NavThree from "../components/header/NavThree";
import SliderOne from "../components/sliders/SliderOne";
import CourseCatThree from "../components/courses/CourseCatThree";
import CallToActionOne from "../components/config/CallToActionOne";
import TeamTab from "../components/config/TeamTab";
import CourseThree from "../components/courses/CourseThree";
import CallToActionSix from "../components/config/CallToActionSix";
import TestimonialOne from "../components/config/TestimonialOne";
import VideoThree from "../components/config/VideoThree";
import BrandsTwo from "../components/config/BrandsTwo";
import CallToActionFive from "../components/config/CallToActionFive";


const HomePageThree = () => {
    return (

        <>
            <NavThree/>
            <SliderOne/>
            <CourseCatThree/>
            <CallToActionOne/>
            <TeamTab/>
            <CourseThree/>
            <CallToActionSix/>
            <TestimonialOne/>
            <VideoThree/>
            <BrandsTwo/>
            <CallToActionFive/>
            <Footer/>
        </>
    );
};

export default HomePageThree;
