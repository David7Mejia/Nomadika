import React from 'react';
import {Link} from 'react-router-dom';
import './NotFound.css'

function NotFound(){
    return (
        <div className='notfound-container'>
            <div className='notfound'>404</div>
            <div className='notfound-message'>
                The link you followed may be broken, or the page may have been removed.
                <div>

                <Link to='/'>Take me back to Nomadika</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
