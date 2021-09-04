import React from 'react';
import Link from "next/link";

const Unauthorized = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>401 - UNAUTHORIZED</h2>
                <p>The page you are looking for is not authorized to you.</p>
                <Link href="/">
                    <a >Go To Homepage</a>
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
