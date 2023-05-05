import { useRef, useEffect, useState } from 'react';
import classes from './ColourField.module.css';
const ColourField = ({
  borderThumb,
  paddingThumb,
  huePos,
  onSetLightPos,
  onSetSatPos,
  sat,
  light,
}) => {
  const areaThumb = useRef(null);
  const area = useRef(null);
  const field = useRef(null);
  const [fieldWidth, setFieldWidth] = useState(null);
  const [fieldHeight, setFieldHeight] = useState(null);

  const onMouseMoveArea = (event) => {
    //prevent from text selection
    event.preventDefault();
    const { left, top, width, height } = area.current.getBoundingClientRect();
    const thumbWidth = areaThumb.current.getBoundingClientRect().width;
    const thumbCenter = (thumbWidth - borderThumb) / 2;
    const posX = event.pageX - left + thumbCenter;
    const posY = event.pageY - top - thumbCenter;
    let positionX = posX;
    let positionY = posY;
    if (posX < paddingThumb) positionX = paddingThumb;
    if (posX > width) positionX = width + borderThumb * 2;
    if (event.pageY - paddingThumb - borderThumb * 2 < top)
      positionY = paddingThumb;
    if (event.pageY + thumbWidth / 2 > top + height)
      positionY = height + thumbWidth / 2 - borderThumb - borderThumb / 2;
    areaThumb.current.style.left = positionX + 'px';
    areaThumb.current.style.top = positionY + 'px';
    let saturationValue = positionX,
      lightnessValue = positionY;
    if (positionX === 20) saturationValue = 0;
    if (positionX >= width) saturationValue = width;
    if (positionY === 20) lightnessValue = 0;
    if (positionY >= height) lightnessValue = height;
    saturationValue = Math.floor(100 * (saturationValue / width));
    lightnessValue = Math.floor((100 * (height - lightnessValue)) / height);
    onSetLightPos(lightnessValue);
    onSetSatPos(saturationValue);
  };
  useEffect(() => {
    area.current.addEventListener('click', onMouseMoveArea);
    areaThumb.current.addEventListener('mousedown', () =>
      document.addEventListener('mousemove', onMouseMoveArea)
    );
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', onMouseMoveArea)
    );
    setFieldWidth(field.current.offsetWidth - 2 * paddingThumb + borderThumb);
    setFieldHeight(field.current.offsetHeight - paddingThumb + borderThumb);
  }, []);
  return (
    <div style={{ position: 'relative', padding: '20px 20px 0' }} ref={field}>
      <div
        className={classes.ColourArea}
        ref={area}
        style={{
          border: `${borderThumb}px solid white`,
          background: `${`hsl(${huePos}deg ${100}% ${50}%)`}`,
        }}
      >
        <div className={classes.bgr1}></div>
        <div className={classes.bgr2}></div>
        <div
          className={classes.colourAreaPicker}
          ref={areaThumb}
          style={{
            border: `${borderThumb}px solid white`,
            // fix this
            top: `${fieldHeight * ((100 - light) / 100)}px`,
            left: `${fieldWidth * (sat / 100)}px`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default ColourField;
