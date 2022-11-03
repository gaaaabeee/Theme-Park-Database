import React from 'react';
import '../css/home.css';
import img1 from '../images/aboutImg1.jpg';
import img2 from '../images/aboutImg2.jpg';
import img3 from '../images/aboutImg3.jpg';
import img4 from '../images/aboutImg4.jpg';
import img5 from '../images/aboutImg5.jpg';

function About() {
    return (
        <div className="about-box">
            <div className="about-item">
                <div className="about-text">
                    <h1>A Memorable Experience for the Whole Family!</h1>
                    <h4>Join us at Amusement Park for the time of your life!
                     We have many amazing rides and activities for all ages, so kids and adults alike will never get bored!
                     more info...</h4>
                </div>
            </div>
            <div className="about-item">
                <div className="about-image" style={{backgroundImage: imageToUrl(img1)}}>
                </div>
            </div>
            <div className="about-item">
                <div className="about-image" style={{backgroundImage: imageToUrl(img2)}}>
                </div>
            </div>
            <div className="about-item">
                <div className="about-image" style={{backgroundImage: imageToUrl(img3)}}>
                </div>
            </div>
            <div className="about-item">
                <div className="about-image" style={{backgroundImage: imageToUrl(img4)}}>
                </div>
            </div>
            <div className="about-item">
                <div className="about-image" style={{backgroundImage: imageToUrl(img5)}}>
                </div>
            </div>
        </div>
    );
}

function imageToUrl(img) {
    return "url('"+img+"')";
}

export default About;