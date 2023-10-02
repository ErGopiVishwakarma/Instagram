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
    </>
  );
}
