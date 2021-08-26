import React from 'react';
import PageHeader from "../components/header/PageHeader";
import Pricing from "../components/config/Pricing";
import CallToActionOne from "../components/config/CallToActionOne";

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
