import classes from './HueField.module.css';
import { useEffect, useRef } from 'react';
const HueField = ({ borderThumb, paddingThumb, onSetHue }) => {
  const slider = useRef(null);
  const thumb = useRef(null);
  const onMouseMove = (event) => {
    event.preventDefault();
    let { left } = slider.current.getBoundingClientRect();
    const sliderWidth = slider.current.getBoundingClientRect().width;
    const { width } = thumb.current.getBoundingClientRect();
    //event.pageX is changing between left and right -
    // thumbCenter is a center of a thumb
    const thumbCenter = (width - borderThumb) / 2;
    const thumbPosition = event.pageX - left - thumbCenter + width;
    let position = thumbPosition;
    // if we face left border
    if (thumbPosition < paddingThumb) position = paddingThumb;
    if (thumbPosition > sliderWidth) position = sliderWidth + borderThumb * 2;
    // if we face right border
    thumb.current.style.left = position + 'px';
    // take the border from the percentage
    if (thumbPosition > sliderWidth) position -= borderThumb * 2;
    //calculate degree(0-360)
    const percentage = Number(
      (position - paddingThumb) / (sliderWidth - paddingThumb)
    );
    onSetHue(360 - Math.floor(360 * percentage));
  };
  useEffect(() => {
    slider.current.addEventListener('click', onMouseMove);
    thumb.current.addEventListener('mousedown', () =>
      document.addEventListener('mousemove', onMouseMove)
    );
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', onMouseMove)
    );
  }, []);
  return (
    <div className={classes.Colours}>
      <div className={classes.bgr} ref={slider}>
        <div
          className={classes.linePicker}
          ref={thumb}
          style={{ border: `${borderThumb}px solid white` }}
        ></div>
      </div>
    </div>
  );
};
export default HueField;
