import React from 'react';
import PageHeader from "../components/PageHeader";
import Pricing from "../components/Pricing";
import CallToActionOne from "../components/CallToActionOne";

const PricingPage = () => {
    return (
        <>
            <PageHeader title="Pricing"/>
            <Pricing/>
            <CallToActionOne/>
        </>
    );
};

export default PricingPage;
