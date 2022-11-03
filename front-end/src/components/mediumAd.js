import React from 'react';
import {Link} from 'react-router-dom';
import '../css/home.css';

function LeftMedAd(props) {
    return (
        <div className="mediumad-container medium-left">
            <div className="mediumad-content">
                <div className="mediumad-text">
                    <h2>{props.value.title}</h2>
                    <p>{props.value.description}</p>
                </div>
                <br />
                <Link className="largead-button" to={props.value.link}>{props.value.buttonText}</Link>
            </div>
        </div>
    );
}

function RightMedAd(props) {
    return (
        <div className="mediumad-container medium-right">
            <div className="mediumad-content">
                <div className="mediumad-text">
                    <h2>{props.value.title}</h2>
                    <p>{props.value.description}</p>
                </div>
                <br />
                <Link className="largead-button" to={props.value.link}>{props.value.buttonText}</Link>
            </div>
        </div>
    );
}


export {LeftMedAd, RightMedAd};