import React, {useEffect, useState} from 'react';
import Link from 'next/link';

const NavOne = () => {

    const [sticky, setSticky] = useState(false);
    const [navElement, setNavElement] = useState([]);

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
            await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category/api/find-all`)
                .then(response => response.json())
                .then(data => setNavElement(data))
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
                                <img src="/assets/images/logo-dark.png" className="main-logo" width="128"
                                     alt="Awesome Image"/>
                            </a>
                        </Link>
                        <button className="menu-toggler">
                            <span className="kipso-icon-menu"></span>
                        </button>
                    </div>
                    <div className="main-navigation">
                        <ul className=" navigation-box">
                            {navElement?.map((category, id) => (
                                <li className="current" key={id}>
                                    <Link href="/courses/category/[slug]"
                                          as={`/courses/category/${category.name?.replace(/ /g, "-")}`}><a>{category.name}</a></Link>
                                    <ul className="sub-menu">
                                        {category.subjects?.map((subject, id) => (
                                            <li key={id}><Link href="/courses/subjects/[slug]"
                                                               as={`/courses/subjects/${subject.name?.replace(/ /g, "-")}`}><a>{subject.name}</a></Link>
                                                <ul className="sub-menu">

                                                    {subject.topics?.map((topic, id) => (
                                                        <li key={id}><Link href="/courses/topics/[slug]"
                                                                           as={`/courses/topics/${topic.name?.replace(/ /g, "-")}`}><a>{topic.name}</a></Link>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </li>
                                        ))}

                                        <li><Link href="/courses"><a>Courses</a></Link></li>

                                    </ul>
                                </li>

                            ))}

                            <li className="current">
                                <Link href="/"><a>More</a></Link>
                                <ul className="sub-menu">
                                    <li><Link href="/teachers"><a>Instructor</a></Link></li>
                                    <li><Link href="/pricing"><a>Pricing</a></Link></li>
                                    <li><Link href="/blogs"><a>Blogs</a></Link></li>
                                    <li><Link href="/gallery"><a>Gallery</a></Link></li>
                                    <li><Link href="/faq"><a>FAQ</a></Link></li>
                                    <li><Link href="/courses"><a>Courses</a></Link></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                    <div className="right-side-box">
                        <a className="header__search-btn search-popup__toggler search-toggle" href="#"><i
                            className="kipso-icon-magnifying-glass"></i>
                        </a>
                    </div>
                </div>
            </nav>
            <div className="site-header__decor">
                <div className="site-header__decor-row">
                    <div className="site-header__decor-single">
                        <div className="site-header__decor-inner-1"></div>
                    </div>
                    <div className="site-header__decor-single">
                        <div className="site-header__decor-inner-2"></div>
                    </div>
                    <div className="site-header__decor-single">
                        <div className="site-header__decor-inner-3"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavOne;
