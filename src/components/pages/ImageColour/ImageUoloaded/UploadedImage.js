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
          <p>
            Look at the palette made up of the most common colours, light and
            dark colours
          </p>
          <p>You can choose the number of the most common colours</p>
          <p>
            Number of colours between {5} and {20}
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
