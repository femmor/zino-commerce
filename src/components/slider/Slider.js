import { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { sliderData } from '../../slider-data';
import './Slider.scss';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="slider">
      <FaArrowCircleLeft className="arrow prev" size={20} />
      <FaArrowCircleRight className="arrow next" size={20} />

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
