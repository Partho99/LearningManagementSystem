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

        window.removeEventListener('scroll', handleScroll);
    },[])


    useEffect( () => {

         fetch('http://localhost:8080/category/api/find-all')
            .then(response => response.json())
            .then(data => setNavElement(data))


    }, [])
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
                            <li className="current" ><Link href="/courses"><a>Courses</a></Link></li>
                            {navElement?.map((category, id) => (
                                <li className="current" key={id}>
                                    <Link href="/"><a>{category.name}</a></Link>
                                    <ul className="sub-menu">
                                        {category.subjects?.map((subject, id) => (
                                            <li key={id}><Link href="/"><a>{subject.name}</a></Link>
                                                <ul className="sub-menu">

                                                    {subject.topics?.map((topic, id) => (
                                                        <li key={id}><Link href="/"><a>{topic.name}</a></Link></li>
                                                    ))}

                                                </ul>
                                            </li>
                                        ))}

                                        <li ><Link href="/courses"><a>Courses</a></Link></li>

                                    </ul>
                                </li>

                            ))}

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
