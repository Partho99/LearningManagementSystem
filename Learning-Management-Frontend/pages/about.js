import React from 'react';
import PageHeader from "../components/header/PageHeader";
import AboutOne from "../components/config/AboutOne";
import TeamOne from "../components/config/TeamOne";
import VideoOne from "../components/config/VideoOne";
import BrandsTwo from "../components/config/BrandsTwo";
import TestimonialOne from "../components/config/TestimonialOne";
import CallToActionOne from "../components/config/CallToActionOne";

const AboutPage = () => {
    return (
        <>
            <PageHeader title="About"/>
            <AboutOne/>
            <TeamOne/>
            <VideoOne/>
            <BrandsTwo/>
            <TestimonialOne/>
            <CallToActionOne/>
        </>
    );
};

export default AboutPage;
