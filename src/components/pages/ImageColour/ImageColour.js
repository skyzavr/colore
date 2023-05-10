import { useState } from 'react';
import classes from './ImageColour.module.css';
import UploadedImage from './ImageUoloaded/UploadedImage';
import UnUploadedImage from './UnUploadedImage/UnUploadedImage';

const ImageColour = ({ title }) => {
  const [drag, setDrag] = useState(false);
  const [imageColours, setImageColours] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(null);

  const dragHandler = (event) => {
    event.preventDefault();
    setDrag(false);
    canvasImage(event.dataTransfer.files[0]);
  };
  const fileSelectedHandler = (event) => {
    event.preventDefault();
    canvasImage(event.target.files[0]);
  };
  const canvasImage = (file) => {
    let img = new Image();
    let fileReader = new FileReader();
    const canvas = document.createElement('canvas');
    fileReader.onload = () => {
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log(data);
        setImageColours(data);
      };
      img.src = fileReader.result;
      setUploadedImg(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };
  const dragStartHandler = (event) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    setDrag(false);
  };
  return (
    <div className={classes.wrapper}>
      {uploadedImg ? (
        <UploadedImage
          uploadedImg={uploadedImg}
          dragStartHandler={dragStartHandler}
          dragLeaveHandler={dragLeaveHandler}
          dragHandler={dragHandler}
          fileSelectedHandler={fileSelectedHandler}
        />
      ) : (
        <UnUploadedImage
          title={title}
          drag={drag}
          dragStartHandler={dragStartHandler}
          dragLeaveHandler={dragLeaveHandler}
          dragHandler={dragHandler}
          fileSelectedHandler={fileSelectedHandler}
        />
      )}

      <div className={classes.colourWrapper}></div>
    </div>
  );
};
export default ImageColour;
