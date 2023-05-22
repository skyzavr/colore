import { useEffect, useState } from 'react';
import classes from './ImageColour.module.css';
import UploadedImage from './ImageUploaded/UploadedImage';
import UnUploadedImage from './UnUploadedImage/UnUploadedImage';
import ImagePalette from './imagePalette/ImagePalette';

const ImageColour = ({ title }) => {
  const [drag, setDrag] = useState(false);
  const [imageColours, setImageColours] = useState([]);
  const [rgbList, setRgbList] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [imgWidth, setImgWidth] = useState();
  const [imgHeight, setImgHeight] = useState();
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
    const img = new Image();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      img.onload = () => {
        //create canvas by based on image size
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        setImgHeight(img.height);
        setImgWidth(img.width);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        //draw image that we got
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setImageColours(data);
      };
      img.src = fileReader.result;
      setUploadedImg(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const gettingArrayOfCOlours = () => {
    if (imageColours.length === 0) return;
    const arr = [];
    for (let i = 0; i < imageColours.length; i = i + 4) {
      arr.push({
        r: imageColours[i],
        g: imageColours[i + 1],
        b: imageColours[i + 2],
      });
    }
    setRgbList(arr);
  };

  const dragStartHandler = (event) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    setDrag(false);
  };
  useEffect(() => {
    gettingArrayOfCOlours();
  }, [imageColours]);
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

      <ImagePalette rgbList={rgbList} />
    </div>
  );
};
export default ImageColour;
