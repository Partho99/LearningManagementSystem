import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import CircularProgress from "@material-ui/core/CircularProgress";

const Teachers = () => {

    const [instructor, setInstructor] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const instructorData = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/api/show-all-instructor`)
                .then(response => response.json())
                .then(data => setInstructor(data))
            setLoading(false);
        }
        instructorData().then(r => r);
    }, [])
    return (
        <section className="team-one team-page">
            {loading ? <div className={"text-center"}>
                    <CircularProgress size={100} disableShrink/>
                </div> :
                <div className="container">
                    <div className="row">
                        {instructor?.map(i => (
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                                <div className="team-one__single">
                                    <div className="team-one__image">
                                        <img src="/assets/images/team-1-1.jpg" alt=""/>
                                    </div>
                                    <div className="team-one__content">
                                        <h2 className="team-one__name"><Link href="/teacher-details"><a>{i.username}</a></Link>
                                        </h2>
                                        <p className="team-one__designation">{i.scope.replace(/[\[\]']+/g, '').replace(/role_/g, '')}</p>
                                        <p className="team-one__text">There are many varia of passages of lorem.</p>
                                    </div>
                                    <div className="team-one__social">
                                        <a href="#"><i className="fab fa-twitter"></i></a>
                                        <a href="#"><i className="fab fa-facebook-square"></i></a>
                                        <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                        <a href="#"><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            }
        </section>
    );
};

export default Teachers;
