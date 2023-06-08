import { useState, useEffect, useRef } from 'react';
import classes from './UploadedImage.module.css';
const UploadedImage = ({
  uploadedImg,
  dragStartHandler,
  dragLeaveHandler,
  dragHandler,
  fileSelectedHandler,
}) => {
  const imgRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(null);
  useEffect(() => {
    setImgWidth(imgRef.current.width);
  }, [uploadedImg]);
  return (
    <div className={classes.paramWrapper}>
      <div className={classes.Info}>
        <div className={classes.title}>That is your palette!</div>
        <div className={classes.textInfo}>
          <p>We split your image and got about 256 different colors.</p>
          <p>
            You can view some of the colours we have selected for you, or view
            colours by type: light, dark, or coloured.
          </p>
          <p>
            To copy a color in <strong>HEX</strong> format, click on the color.
            Or select the icon next to colour name to get more information about
            the colour
          </p>
        </div>
      </div>
      <div className={classes.UploadWrapper}>
        <label>
          <div
            className={classes.dragWrapper}
            onDragStart={dragStartHandler}
            onDragOver={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={(event) => dragHandler(event)}
          >
            <img src={uploadedImg} alt="uploaded img by user" ref={imgRef} />
            <div className={classes.imgPlaceHolder}>
              <div
                className={classes.uploadInfo}
                style={{ width: `${imgWidth - 40}px` }}
              >
                Drag and drop an image here or click to upload
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            name="file"
            onChange={(event) => fileSelectedHandler(event)}
          />
        </label>
      </div>
    </div>
  );
};
export default UploadedImage;
