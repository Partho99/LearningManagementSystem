import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

const NavOne = () => {

    const router = useRouter();
    const [sticky, setSticky] = useState(false);
    const [navElement, setNavElement] = useState([]);
    const [loading, setLoading] = useState(false);

    const {slug} = router.query;

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        //Mobile Menu
        mobileMenu();

        //Search Toggle
        searchButton();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [])


    useEffect(() => {

        const navData = async () => {
            setLoading(true)
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/find-all`)
                .then(response => response.json())
                .then(data => setNavElement(data))
            setLoading(false)
        }

        navData().then(r => r);

    }, [])
    const handleScroll = () => {

        if (window.scrollY > 70) {
            setSticky(true);
        } else if (window.scrollY < 70) {
            setSticky(false);
        }

    }

    const mobileMenu = () => {
        //Mobile Menu Toggle
        let mainNavToggler = document.querySelector(".menu-toggler");
        let mainNav = document.querySelector(".main-navigation");

        mainNavToggler.addEventListener("click", function () {
            mainNav.style.display = ((mainNav.style.display != "block" ? "block" : "none"));
        });
    }
    const removeBlock = () => {
        let mainNav = document.querySelector(".main-navigation");
        mainNav.style.display = ((mainNav.style.display != "block" ? "block" : "none"));
    }
    const searchButton = () => {
        let searchToggle = document.querySelector(".search-toggle");
        let searchPopup = document.querySelector(".search-popup");
        let searchClose = document.querySelector(".cancel");
        let searchOverlay = document.querySelector(".search-overlay");

        searchToggle.addEventListener("click", function () {
            searchPopup.classList.add('active');
        });

        searchClose.addEventListener("click", function () {
            searchPopup.classList.remove('active');
        });

        searchOverlay.addEventListener("click", function () {
            searchPopup.classList.remove('active');
        });
    }


    return (
        <header className="site-header site-header__header-one ">
            <nav
                className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${sticky ? 'stricked-menu stricky-fixed' : ''}`}>
                <div className="container clearfix">
                    <div className="logo-box clearfix">
                        <Link href="/">
                            <a className="navbar-brand">
                                <img src="/assets/images/lms.png" className="main-logo" width="100"
                                     alt="Awesome Image"/>
                            </a>
                        </Link>
                        <button className="menu-toggler">
                            <span className="kipso-icon-menu"/>
                        </button>
                    </div>
                    <div className="main-navigation">
                        <ul className=" navigation-box">
                            {navElement?.map((category, id) => (
                                <li className={slug?.toLowerCase() === `${category.name?.replace(/ /g, "-").toLowerCase()}` ? `current` : null}
                                    key={id}>
                                    <Link href="/courses/category/[slug]"
                                          as={`/courses/category/${category.name?.replace(/ /g, "-").toLowerCase()}`}>
                                        <a onClick={removeBlock}
                                           className='text-info font-weight-bold'>{category.name}</a>
                                    </Link>
                                    <ul className="sub-menu">
                                        {category.subjects?.map((subject, id) => (
                                            <li key={id}>
                                                <Link href="/courses/subjects/[slug]"
                                                      as={`/courses/subjects/${subject.name?.replace(/ /g, "-").toLowerCase()}`}>
                                                    <a onClick={removeBlock}
                                                       className='font-weight-bold'>{`${subject.name}`}</a>
                                                </Link>
                                                <ul className="sub-menu">
                                                    {subject.topics?.map((topic, id) => (
                                                        <li key={id}>
                                                            <Link href="/courses/topics/[slug]"
                                                                  as={`/courses/topics/${topic.name?.replace(/ /g, "-").toLowerCase()}`}>
                                                                <a onClick={removeBlock}
                                                                   className='font-weight-bold'>{topic.name}</a>
                                                            </Link>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}

                            <li className="">
                                <Link href="/"><a onClick={removeBlock} className='text-info font-weight-bold'>More</a></Link>
                                <ul className="sub-menu ">
                                    <li>
                                        <Link href="/teachers">
                                            <a onClick={removeBlock} className='font-weight-bold'>Instructor</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pricing">
                                            <a onClick={removeBlock} className='font-weight-bold'>Pricing</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blogs">
                                            <a onClick={removeBlock} className='font-weight-bold'>Blogs</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/gallery">
                                            <a onClick={removeBlock} className='font-weight-bold'>Gallery</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq">
                                            <a onClick={removeBlock} className='font-weight-bold'>FAQ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/courses">
                                            <a onClick={removeBlock} className='font-weight-bold'>Courses</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog/create-new-article">
                                            <a onClick={removeBlock} className='font-weight-bold'>Create Article</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="right-side-box">
                        <a className="header__search-btn search-popup__toggler search-toggle" href="#">
                            <i className="kipso-icon-magnifying-glass"/>
                        </a>
                    </div>
                </div>
            </nav>
            <div className="site-header__decor">
                <div className="site-header__decor-row">
                    <div className="site-header__decor-single">
                        <div className="site-header__decor-inner-1"/>
                    </div>
                    <div className="site-header__decor-single">
                        <div className="site-header__decor-inner-2"/>
                    </div>
                    <div className="site-header__decor-single">
                        <div className="site-header__decor-inner-3"/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavOne;
