import ImagePrev from '../ImagePrev';
import classes from './UnUploadedImage.module.css';
const UnUploadedImage = ({
  title,
  drag,
  dragStartHandler,
  dragLeaveHandler,
  dragHandler,
  fileSelectedHandler,
}) => {
  return (
    <div className={classes.paramWrapper}>
      <div className={classes.Info}>
        <div className={classes.title}>{title}</div>
        <div className={classes.textInfo}>
          Define colours in any photo. Just drag an image or upload it.
        </div>
      </div>
      <div className={classes.UploadWrapper}>
        <div
          className={classes[drag ? 'containerHover' : 'container']}
          onDragStart={dragStartHandler}
          onDragOver={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={(event) => dragHandler(event)}
        >
          <div className={classes.imageHolder}>
            <ImagePrev />
          </div>
          <div className={classes.uploadInfo}>
            {!drag
              ? `Drag and drop an image here or choose upload image`
              : `Drop it here`}
          </div>
          <div className={classes.uploadImageBtn}>
            <label>
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => fileSelectedHandler(event)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnUploadedImage;
