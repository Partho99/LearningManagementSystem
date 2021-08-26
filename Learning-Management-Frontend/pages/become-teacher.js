import React from 'react';
import PageHeader from "../components/header/PageHeader";
import BecomeTeacher from "../components/config/BecomeTeacher";
import TeamOne from "../components/config/TeamOne";


const GalleryPage = () => {
    return (
        <>
            <PageHeader title="Become Teacher"/>
            <BecomeTeacher/>
            <TeamOne/>
        </>
    );
};

export default GalleryPage;
