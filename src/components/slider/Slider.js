import { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { sliderData } from '../../slider-data';
import './Slider.scss';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === sliderData.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(sliderData.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="slider">
      <FaArrowCircleLeft
        className="arrow prev"
        size={20}
        onClick={handlePrev}
      />
      <FaArrowCircleRight
        className="arrow next"
        size={20}
        onClick={handleNext}
      />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;

        return (
          <div
            className={index === currentSlide ? 'slide current' : 'slide'}
            key={index}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt={heading} />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <Link className="--btn --btn-primary" to="#products">
                    Shop Now
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Slider;
