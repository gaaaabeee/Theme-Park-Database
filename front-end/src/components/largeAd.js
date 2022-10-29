import React from 'react';
import {Link} from 'react-router-dom';
import '../css/home.css';

function LargeAd(props) {
    return (
        <div className="largead-container" style={{backgroundImage: props.value.image}}>
            <div className="largead-content">
                <div className="largead-text">
                    <h2>{props.value.title}</h2>
                    <p>{props.value.description}</p>
                </div>
                <br />
                <Link className="largead-button" to={props.value.link}>{props.value.buttonText}</Link>
            </div>
        </div>
    );
}

export default LargeAd;