import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className='carousel'>
            <span className='carousel__arrow carousel__arrow--left' onClick={prevSlide}>&lsaquo;</span>
            <span className='carousel__arrow carousel__arrow--right' onClick={nextSlide}>&rsaquo;</span>
            {slides.map((slide, index) => (
                <div className={index === current ? 'carousel__slide carousel__slide--active' : 'carousel__slide'} key={index}>
                    {index === current && (
                        <>
                            <img src={slide.image} alt={slide.caption} className='carousel__image' />
                            <button className="carousel__slide-name">{slide.name}</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Carousel;
