import React from 'react';
import PageHeader from "../components/PageHeader";
import AboutOne from "../components/AboutOne";
import TeamOne from "../components/TeamOne";
import VideoOne from "../components/VideoOne";
import BrandsTwo from "../components/BrandsTwo";
import TestimonialOne from "../components/TestimonialOne";
import CallToActionOne from "../components/CallToActionOne";

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
