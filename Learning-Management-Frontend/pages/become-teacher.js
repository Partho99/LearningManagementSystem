import React from 'react';
import PageHeader from "../components/PageHeader";
import BecomeTeacher from "../components/BecomeTeacher";
import TeamOne from "../components/TeamOne";


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
