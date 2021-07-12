import React, {useEffect, useState} from 'react';
import Link from 'next/link';

const NavOne = () => {

    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        //Mobile Menu
        mobileMenu();

        //Search Toggle
        serachButton();

        window.removeEventListener('scroll', handleScroll);
    })

    const handleScroll = () => {

        if (window.scrollY > 70) {
            this.setState({
                sticky: true
            });
        } else if (window.scrollY < 70) {
            this.setState({
                sticky: false
            });
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

    const serachButton = () => {
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
                        <button className="menu-toggler">
                            <span className="kipso-icon-menu"></span>
                        </button>
                    </div>
                    <div className="main-navigation">
                        <ul className=" navigation-box">
                            <li className="current">
                                <Link href="/"><a>Development</a></Link>
                                <ul className="sub-menu">
                                    <li><Link href="/"><a>Web Development</a></Link>
                                        <ul className="sub-menu">
                                            <li><Link href="/"><a>Java</a></Link></li>
                                            <li><Link href="/index-2"><a>PHP</a></Link></li>
                                            <li><Link href="/index-3"><a>Javascript</a></Link></li>
                                            <li><Link href="/index-3"><a>Angular</a></Link></li>
                                            <li><Link href="/index-3"><a>React</a></Link></li>
                                            <li><Link href="/index-3"><a>Spring Framework</a></Link></li>
                                        </ul>
                                    </li>

                                    <li><Link href="/index-2"><a>Programming Languages</a></Link>
                                        <ul className="sub-menu">
                                            <li><Link href="/"><a>Java</a></Link></li>
                                            <li><Link href="/index-2"><a>Python</a></Link></li>
                                            <li><Link href="/index-3"><a>Javascript</a></Link></li>
                                            <li><Link href="/index-3"><a>c#</a></Link></li>
                                            <li><Link href="/index-3"><a>React</a></Link></li>
                                            <li><Link href="/index-3"><a>Spring Framework</a></Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/index-3"><a>Mobile Development</a></Link>
                                        <ul className="sub-menu">
                                            <li><Link href="/"><a>Java</a></Link></li>
                                            <li><Link href="/index-2"><a>Python</a></Link></li>
                                            <li><Link href="/index-3"><a>Javascript</a></Link></li>
                                            <li><Link href="/index-3"><a>c#</a></Link></li>
                                            <li><Link href="/index-3"><a>React</a></Link></li>
                                            <li><Link href="/index-3"><a>Spring Framework</a></Link></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Mobile Development</a>
                                        <ul className="sub-menu">
                                            <li><Link href="/"><a>Android</a></Link></li>
                                            <li><Link href="/index-2"><a>Google Flutter</a></Link></li>
                                            <li><Link href="/index-3"><a>React Native</a></Link></li>
                                            <li><Link href="/index-3"><a>IOS</a></Link></li>
                                            <li><Link href="/index-3"><a>Swift</a></Link></li>
                                            <li><Link href="/index-3"><a>Dart</a></Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Business</a>
                                <ul className="sub-menu">
                                    <li><Link href="/about"><a>About Page</a></Link></li>
                                    <li><Link href="/gallery"><a>Gallery</a></Link></li>
                                    <li><Link href="/pricing"><a>Pricing Plans</a></Link></li>
                                    <li><Link href="/faq"><a>FAQ'S</a></Link></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Design</a>
                                <ul className="sub-menu">
                                    <li><Link href="/about"><a>About Page</a></Link></li>
                                    <li><Link href="/gallery"><a>Gallery</a></Link></li>
                                    <li><Link href="/pricing"><a>Pricing Plans</a></Link></li>
                                    <li><Link href="/faq"><a>FAQ'S</a></Link></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Pages</a>
                                <ul className="sub-menu">
                                    <li><Link href="/about"><a>About Page</a></Link></li>
                                    <li><Link href="/gallery"><a>Gallery</a></Link></li>
                                    <li><Link href="/pricing"><a>Pricing Plans</a></Link></li>
                                    <li><Link href="/faq"><a>FAQ'S</a></Link></li>
                                </ul>
                            </li>

                            <li>
                                <a href="#">Pages</a>
                                <ul className="sub-menu">
                                    <li><Link href="/about"><a>About Page</a></Link></li>
                                    <li><Link href="/gallery"><a>Gallery</a></Link></li>
                                    <li><Link href="/pricing"><a>Pricing Plans</a></Link></li>
                                    <li><Link href="/faq"><a>FAQ'S</a></Link></li>
                                </ul>
                            </li>
                            <li>
                                <a href="/courses">Courses</a>
                                <ul className="sub-menu">
                                    <li><Link href="/courses"><a>Courses</a></Link></li>
                                    <li><Link href="/course-details"><a>Courses Details</a></Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/teachers"><a>Teachers</a></Link>
                                <ul className="sub-menu">
                                    <li><Link href="/teachers"><a>Teachers</a></Link></li>
                                    <li><Link href="/teacher-details"><a>Teachers Details</a></Link></li>
                                    <li><Link href="/become-teacher"><a>Become Teacher</a></Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/news"><a>News</a></Link>
                                <ul className="sub-menu">
                                    <li><Link href="/news"><a>News Page</a></Link></li>
                                    <li><Link href="/news-details"><a>News Details</a></Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link href="/contact"><a>Contact</a></Link>
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
