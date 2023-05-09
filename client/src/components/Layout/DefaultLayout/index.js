import React from 'react';
import Sidebar from './Sidebar';

function DefaultLayout({children}) {
    return (
        <div>
            <div className="container">
                <Sidebar children={children}/>
            </div>
        </div>
    );
}

export default DefaultLayout;
