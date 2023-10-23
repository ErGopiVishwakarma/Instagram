import React, { ReactNode, useState } from 'react';
import { Avatar, Dialog, DialogBody } from '@material-tailwind/react';
import { emitKeypressEvents } from 'readline';
import { LikeType } from '../../Types/otherType';
import imageurl from '../../Images/userimage.png';
import { GrClose } from 'react-icons/gr';

interface HandleFun {
  fun: React.Dispatch<React.SetStateAction<boolean>>;
  id: any;
}

export default function LikeDetailPopup({ el }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenFun = () => setOpen(!open);

  const divClass =
    'flex items-center justify-center p-3 border-b-[1px] border-solid border-gray-300 hover:bg-gray-300 rounded-lg text-[15px]';

  return (
    <>
      <span
        className={`cursor-pointer text-[#000000] font-bold`}
        onClick={() => {
          handleOpenFun();
        }}>
        others
      </span>
      <Dialog open={open} handler={handleOpenFun} size='xs' style={{border:'none',outline:'none'}}>
        <div
          className={`flex items-center justify-end px-5 py-5 relative `}>
          <div className='text-base text-center absolute left-0 right-0 font-bold'>
            <h2>Likes</h2>
          </div>
          <div onClick={handleOpenFun} className=' cursor-pointer absolute'>
            <GrClose />
          </div>
        </div>
        <DialogBody
          divider
          className='flex flex-col gap-2 rounded-lg h-96 overflow-y-auto '
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}>
          {el.likes.length > 0 ? (
            el.likes?.map((ele: LikeType, ind: number) => {
              return (
                <div className='flex justify-between items-center' key={ind}>
                  <div className='flex items-center gap-3'>
                    <Avatar
                      src={ele.profile ? `${process.env.REACT_APP_URL}/${ele?.profile}` : imageurl}
                      className='h-12 w-12 '
                    />
                    <div>
                      <p className='text-sm'>{ele?.name}</p>
                      <p className='text-xs text-[rgb(115, 115, 115)]'>
                        {ele?.username}
                      </p>
                    </div>
                  </div>
                  <button className='px-5 py-1 bg-[rgb(33,163,247)] text-white rounded-full'>
                    Follow
                  </button>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
