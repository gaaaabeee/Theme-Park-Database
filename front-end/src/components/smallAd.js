import React from 'react';
import {Link} from 'react-router-dom';
import '../css/home.css';

function LeftSmallAd(props) {
    return (
        <div className="smallad-container small-left">
            <div className="smallad-content">
                <div className="smallad-text">
                    <h2>{props.value.title} {props.value.icon}</h2>
                    <p>{props.value.description}</p>
                </div>
                <br />
                <Link className="largead-button" to={props.value.link}>{props.value.buttonText}</Link>
            </div>
        </div>
    );
}

function RightSmallAd(props) {
    return (
        <div className="smallad-container small-right">
            <div className="smallad-content">
                <div className="smallad-text">
                    <h2>{props.value.title} {props.value.icon}</h2>
                    <p>{props.value.description}</p>
                </div>
                <br />
                <Link className="largead-button" to={props.value.link}>{props.value.buttonText}</Link>
            </div>
        </div>
    );
}

export {LeftSmallAd, RightSmallAd};