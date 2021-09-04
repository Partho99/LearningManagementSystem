import React, {useContext, useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import {useRouter} from "next/router";
import {AuthContext} from "../../../context/auth.context";

const isBrowser = typeof window !== 'undefined';

const UserDetails = () => {

    const {authState} = useContext(AuthContext)
    const router = useRouter();

    useEffect(() => {
        authState?.isAuthenticated ?
            router.push(`/user/${123456}/${authState?.user?.fullName.replace(/ /g, "-").toLowerCase()}`)
            :
            router.push('/login')
    }, [authState])


    return (
        <>
            <div className="container">
                <div className="row gutters mt-5 mb-5">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src={authState?.user?.image_url}
                                                 alt="Maxwell Admin"/>
                                        </div>
                                        <h5 className="user-name">{authState?.user?.fullName}</h5>
                                        <h6 className="user-email">{authState?.user?.email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>About</h5>
                                        <p>I'm {authState?.user?.fullName}. Full Stack Designer I enjoy creating
                                            user-centric, delightful
                                            and
                                            human experiences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">{authState.user?.fullName.substr(0, authState?.user?.fullName.indexOf(' '))}'s
                                            details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" className="form-control" id="fullName"
                                                   placeholder={authState?.user?.fullName}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail"
                                                   placeholder={authState?.user?.email}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" className="form-control" id="phone"
                                                   placeholder="Enter phone number"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">Website URL</label>
                                            <input type="url" className="form-control" id="website"
                                                   placeholder="Website url"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">change password</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="Street">Old Password</label>
                                            <input type="password" className="form-control" id="Street"
                                                   placeholder="Enter old password"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">New Password</label>
                                            <input type="password" className="form-control" id="ciTy"
                                                   placeholder="Enter new password"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">Confirm Password</label>
                                            <input type="password" className="form-control" id="ciTy"
                                                   placeholder="Enter confirm password"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <Button variant="contained" color="primary" href="#contained-buttons"
                                                    className='text-white'>Cancel</Button>
                                            &nbsp;
                                            &nbsp;
                                            <Button variant="contained" color="primary" href="#contained-buttons"
                                                    className='text-white'>Update</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserDetails;
