import React, {useContext, useEffect, useState} from 'react';
import Link from "next/link";
import AuthService from "../../auth/auth.service";
import {Button} from "@material-ui/core";
import {AuthContext} from "../../context/auth.context";

const TopBar = () => {

    const [open, setOpen] = React.useState(false);
    const {authState, authDispatch} = useContext(AuthContext);
    useEffect(() => {
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="topbar-one">
            <div className="container">
                <div className="topbar-one__left">
                    <a href="#">learning@gmail.com</a>
                    <a href="#">444 888 0000</a>
                </div>
                <div className="topbar-one__right">

                    {authState?.isAuthenticated ? <div className="dropdown text-white">

                            <div className='same_line'>
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    className=" bg-light rounded-circle" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    style={{width: '35px', height: '35px'}}
                                />
                                &nbsp;
                                &nbsp;
                                <p className='text-white font-weight-bold pt-2'>
                                    Hello,&nbsp; {capitalizeFirstLetter(authState?.user?.fullName).substr(0, authState?.user?.fullName.indexOf(' '))}
                                </p>
                                
                                <div className="dropdown-menu custom_dropdown font-weight-bold"
                                     aria-labelledby="dropdownMenuButton">
                                    <Link href={"/user/[id]/[username]"}
                                          as={`/user/${123456}/${authState?.user?.fullName.replace(/ /g, "-").toLowerCase()}`}><a
                                        className="dropdown-item">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                            className=" bg-light rounded-circle" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            style={{width: '45px', height: '45px'}}
                                        /> &nbsp;Profile
                                    </a>
                                    </Link>
                                    <Link href="/teachers"><a className="dropdown-item">Instructor</a></Link>
                                    <Link href="/blog/create-new-article"><a className="dropdown-item">Create
                                        Article</a></Link>
                                    <Link href="/teachers"><a className="dropdown-item">Create Course</a></Link>
                                    <Link href="/teachers"><a className="dropdown-item">Stories</a></Link>
                                    <Link href="/teachers"><a className="dropdown-item">Become a member</a></Link>
                                    <Link href="/teachers"><a className="dropdown-item">Settings</a></Link>
                                    <a onClick={() => authDispatch({type: 'SIGN_OUT', currentUser: undefined})}
                                       className="dropdown-item" type="button">Logout</a>
                                </div>
                            </div>
                        </div>

                        :
                        <div className='login_button'>
                            <Link href="/login">
                                <Button variant="outlined" size='small' href="#contained-buttons"
                                        className='sign_in_color'>Log In
                                </Button>
                            </Link>
                            &nbsp;&nbsp;
                            <Link href="/sign-up">
                                <Button className='sign_in_color' variant="contained" size='small'
                                        href="#contained-buttons">Sign Up
                                </Button>
                            </Link>
                        </div>

                    }
                </div>
            </div>
        </div>
    );
};

export default TopBar;
