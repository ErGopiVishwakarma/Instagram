import React, {
  ReactNode,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { Avatar, Dialog, DialogBody, Spinner } from '@material-tailwind/react';
import { GrClose } from 'react-icons/gr';
import popupImage from '../Images/postPopupImage.png';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { MdOutlineRectangle, MdPermMedia } from 'react-icons/md';
import { BiCrop, BiImageAlt } from 'react-icons/bi';
import { BsArrowLeftCircle, BsSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Initial } from '../Types/reducerType';
import { PostType } from '../Types/otherType';
import { AxiosResponse } from 'axios';
import { ADDPOST } from '../Redux/actionType';

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
  const [selectHighlight, setSelectHighlight] = useState<number>(0);
  const [toggleInitialPage, setToggleInitialPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [size, setSize] = useState<number>();
  const [successfulPage, setSuccessfulPage] = useState<boolean>(false);
  const [highlightText, setHighlightText] = useState<string>('');

  const data = useSelector((store: Initial) => store.localStorageData);
  const dispatch = useDispatch();

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
      setToggleShare(true);
      setToggleInitialPage(false);
      setGoNext(false);
      setSuccessfulPage(false);
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
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  // share post function
  const sharePost = async () => {
    
    if (!uploadedImage) {
      return;
    }
    const config = {
      postUrl: uploadedImage,
      size: selectHighlight,
      highlights: highlightText,
    };
    setToggleShare(false);
    setToggleInitialPage(false);
    setGoNext(false);
    setSuccessfulPage(true);
    setLoading(true)
    fetch(`http://localhost:8080/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(config),
    })
      .then((ress) => ress.json())
      .then((res: AxiosResponse<PostType>) => {
        const postData: any = res;
         setLoading(false)
        dispatch({ type: ADDPOST, payload: postData });
      })
      .catch((err: any) => {
      setLoading(false);
      console.log(err)
      });    
  };

  useEffect(() => {
    if (!open) {
      setToggleInitialPage(true);
      setToggleShare(false);
      setSuccessfulPage(false);
      setGoNext(false);
      setCroppedImage(null);
      setSelectHighlight(0);
      setHighlightText('')
      setToggleMenu(false)
    }
  }, [open]);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      {/* crop image container  */}
      <div style={{ display: 'none' }}>
        <Cropper
          ref={cropperRef}
          src={image}
          style={{ width: '100%' }}
          aspectRatio={1}
          zoomable={false}
          zoomOnWheel={false}
          cropend={() => handleCrop(1)} // Crop 1:1
          autoCrop={true}
          autoCropArea={1}
          movable={true}
          cropBoxMovable={true}
          minContainerHeight={100}
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
      </div>
      <Dialog open={open} handler={handleOpen} className='text-black' size='sm'>
        {/* =================================dialog header part from here to========================================  */}
        <div
          className={`flex items-center justify-between px-5 py-3 border-b-[1px] border-solid border-gray-600 `}>
          {toggleInitialPage ? (
            <h3 className='text-base text-center'>Create new post</h3>
          ) : goNext ? (
            <BsArrowLeftCircle className='h-6 w-6' />
          ) : toggleShare ? (
            <BsArrowLeftCircle className='h-6 w-6' />
          ) : loading ? (
            <p>sharing.......</p>
          ) : (
            <p className=' text-green-600'>shared</p>
          )}

          <div onClick={handleOpen} className=' cursor-pointer'>
            <GrClose />
          </div>
        </div>

        {/* =============================================till here=====================================================  */}

        {/* =========================dialog body part from here to till end==============================  */}
        <DialogBody className='p-0'>
          <div
            className={`py-28 ${
              toggleInitialPage ? 'flex' : 'hidden'
            } items-center justify-center`}>
            <div className='flex justify-center flex-col items-center gap-5'>
              <div>
                <img src={popupImage} />
              </div>
              <p className='text-lg'>Drag photos and videos here</p>
              <input
                type='file'
                id='image-media'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <button className=' bg-blue-500 rounded-lg text-white py-1'>
                <label htmlFor='image-media' className=' cursor-pointer px-5 '>
                  Select from computer
                </label>
              </button>
            </div>
          </div>

          {/* After uploading the image part here  */}
          <div
            className={`${
              goNext ? 'flex' : 'hidden'
            } items-center justify-center relative  h-[385px]`}>
            <img
              src={croppedImage ? croppedImage : originalImage}
              className='object-cover max-h-[385px]'
            />
            {/* menu part here  */}
            <div className=' absolute bottom-5 left-5 flex flex-col gap-3'>
              <div
                className={`${
                  toggleMenu ? 'flex' : 'hidden'
                } flex-col bg-[#000000CC] rounded-md`}>
                <div
                  className={`flex gap-4 py-2 px-3 items-center w-full border-b-[1px] border-solid border-white ${
                    selectHighlight === 0 ? 'text-white' : ''
                  }`}
                  onClick={() => {
                    setCroppedImage(null);
                    setSelectHighlight(0);
                  }}>
                  <p className='text-base'>original</p>
                  <BiImageAlt className='h-5 w-5' />
                </div>
                <div
                  className={`flex gap-4 py-2 px-3 items-center w-full border-b-[1px] border-solid border-white ${
                    selectHighlight === 1 ? 'text-white' : ''
                  }`}
                  onClick={() => {
                    setSelectHighlight(1);
                    handleCrop(1);
                  }}>
                  <p className='text-base'>1:1</p>
                  <BsSquare className='h-5 w-5' />
                </div>
                <div
                  className={`flex gap-4 py-2 px-3 items-center w-full border-b-[1px] border-solid border-white ${
                    selectHighlight === 2 ? 'text-white' : ''
                  }`}
                  onClick={() => {
                    setSelectHighlight(2);
                    handleCrop(4 / 5);
                  }}>
                  <p className='text-base'>4:5</p>
                  <p className=' text-2xl'>▯</p>
                </div>
                <div
                  className={`flex gap-4 py-2 px-3 items-center w-full ${
                    selectHighlight === 3 ? 'text-white' : ''
                  }`}
                  onClick={() => {
                    setSelectHighlight(3);
                    handleCrop(16 / 9);
                  }}>
                  <p className='text-base'>16:9</p>
                  <MdOutlineRectangle className='h-6 w-6' />
                </div>
              </div>
              <button
                onClick={() => setToggleMenu((prev) => !prev)}
                className=' p-1 rounded-xl hover:bg-blue-gray-200 bg-[#000000CC] h-7 w-7 flex justify-center items-center'>
                <BiCrop className=' h-6 w-6 text-white' />
              </button>
            </div>
            <button
              className=' bg-blue-500 rounded-lg text-white px-3 py-1 absolute right-5 bottom-5'
              onClick={handleNext}>
              next
            </button>
          </div>

          {/* here the final output where you can share the image  */}
          <div
            className={`${
              toggleShare ? 'flex' : 'hidden'
            } items-center justify-center relative  h-[400px] flex-col`}>
            <div className='h-[80px] flex items-start flex-col gap-1 w-full px-4 py-1'>
              <div className='flex gap-2 w-full items-center'>
                <Avatar
                  className='h-7 w-7'
                  src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
                />
                <p className='text-sm'>gopi_v777</p>
              </div>
              <div className='relative hidden md:block lg:block w-full'>
                <input
                  className='w-[100%] h-10 align-middle flex focus:outline-none border-solid border-b-[1px] border-gray-600 text-black'
                  placeholder='add your highlight (optional)'
                  onChange={(e) => setHighlightText(e.target.value)}
                  value={highlightText}
                />
                <button
                  className='absolute right-0 top-[5px]  bg-blue-500 rounded-lg text-white px-2 py-[1px]'
                  onClick={sharePost}>
                  share
                </button>
              </div>
            </div>
            <img
              src={croppedImage ? croppedImage : originalImage}
              className='object-cover max-h-[320px]'
            />
          </div>

          {/* loading part here after successfull make the post  */}
          <div
            className={`${
              successfulPage ? 'flex' : 'hidden'
            } items-center justify-center relative  h-[385px]`}>
            {loading ? (
              <div>
                <Spinner className=' h-32 w-32 text-pink-400' />
              </div>
            ) : (
              <div className='flex flex-col gap-2 justify-center items-center'>
                <img
                  src='https://i.pinimg.com/564x/1b/37/a3/1b37a31607ae30bf0fd3cf73f6009447.jpg'
                  className='h-32 w-32'
                />
                <p className='text-xl'>Your post has been shared.</p>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
