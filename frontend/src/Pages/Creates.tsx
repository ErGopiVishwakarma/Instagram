import React, { ReactNode, useState, useContext, useRef } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { GrClose } from 'react-icons/gr';
import popupImage from '../Images/postPopupImage.png';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { MdOutlineRectangle, MdPermMedia } from 'react-icons/md';
import { BiCrop, BiImageAlt } from 'react-icons/bi';
import { BsArrowLeftCircle, BsSquare } from 'react-icons/bs';

interface Children {
  children: ReactNode;
}

export default function Create({ children }: Children) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  const cropperRef: any = useRef(null);
  const [image, setImage] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<any>();
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [uploadReadyUrl, setUploadReadyUrl] = useState<any>();
  const [originalImage, setOriginalImage] = useState<any>();
  const [goNext, setGoNext] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [toggleShare, setToggleShare] = useState<boolean>(false);
  const [selectHighlight, setSelectHighlight] = useState<number>(1);
  const [toggleInitialPage, setToggleInitialPage] = useState<boolean>(true);

  // handle change functionality
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setGoNext(true);
        setToggleInitialPage(false);
        setImage(reader.result);
        setOriginalImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

   // image crop functionality
   const handleCrop = (aspectRatio: any) => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.setAspectRatio(aspectRatio);
      const croppedCanvas = cropper.getCroppedCanvas();
      setUploadReadyUrl(croppedCanvas);
      if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL();
        setCroppedImage(croppedImageUrl);
      }
    }
  };

  // after croping the image to move forward function
  const handleNext = () => {
    if (uploadReadyUrl) {
      // Convert the cropped image to a Blob
      uploadReadyUrl.toBlob((blob: any) => {
        const formData = new FormData();
        formData.append('croppedImage', blob, 'image.jpg');

        fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setUploadedImage(data);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    // You can use croppedImage URL for further processing or display
    console.log('Cropped Image URL:', croppedImage);
  };

  const moveNextFun = () => {
    setToggleShare(true);
    setToggleInitialPage(false);
    setGoNext(false);
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      {/* crop image container  */}
      <div style={{ display: 'none' }}>
        <Cropper
          ref={cropperRef}
          src={image}
          style={{ width: '100%', height: '385px' }}
          aspectRatio={1}
          zoomable={false}
          zoomOnWheel={false}
          cropend={() => handleCrop(1)} // Crop 1:1
          autoCrop={true}
          autoCropArea={1}
          movable={true}
          cropBoxMovable={true}
          minContainerHeight={90}
          minContainerWidth={100}
          guides={false}
          center={false}
          cropBoxResizable={true}
          dragMode={'crop'}
          responsive={true}
          highlight={false}
          background={false}
          draggable={true}
        />
    </>
  );
}
