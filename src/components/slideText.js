import React from 'react';
import '../scss/slideText.scss';

const SlideText = ({ textToShow }) => {
    return (
        <div className="slide-left">
            <p>{textToShow}</p>
        </div>
    );
}

export default SlideText;