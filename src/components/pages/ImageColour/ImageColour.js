import { useEffect, useState, useContext } from 'react';
import classes from './ImageColour.module.css';
import UploadedImage from './ImageUploaded/UploadedImage';
import UnUploadedImage from './UnUploadedImage/UnUploadedImage';
import ImagePalette from './imagePalette/ImagePalette';
import { ColourContext } from '../../../App';
import Notification from '../../ui/notification/Notification';
const ImageColour = () => {
  const { colour } = useContext(ColourContext);
  const [drag, setDrag] = useState(false);
  const [imageColours, setImageColours] = useState([]);
  const [rgbList, setRgbList] = useState([]);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const img = new Image();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      img.onload = () => {
        //create canvas by based on image size
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
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
    setIsLoading(false);
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
          drag={drag}
          dragStartHandler={dragStartHandler}
          dragLeaveHandler={dragLeaveHandler}
          dragHandler={dragHandler}
          fileSelectedHandler={fileSelectedHandler}
        />
      )}
      {isLoading ? (
        <div
          className={classes.loading}
        >{`We are processing, please, wait :)`}</div>
      ) : (
        <ImagePalette rgbList={rgbList} />
      )}
      {Object.entries(colour).length !== 0 && <Notification param={colour} />}
    </div>
  );
};
export default ImageColour;
