import React from 'react';
import Link from "next/link";

const NotFound = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily
                    unavailable.</p>
                <Link href="/">
                    <a >Go To Homepage</a>
                </Link>
            </div>
        </div>

    );
};

export default NotFound;
