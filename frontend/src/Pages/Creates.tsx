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
    </>
  );
}
