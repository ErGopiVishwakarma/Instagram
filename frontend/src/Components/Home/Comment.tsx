import React from 'react'

const Comment = () => {
  return (
    <div className='flex flex-col gap-1 text-sm' style={{fontFamily:'Poppins, sans-serif'}}>
        <p>gopi@aldka;dsf.tech follow us for more</p>
        <p>view all 10 comments</p>
        <p><span className='font-bold'>shri_ram_bhakt 0000</span>somethin has commented</p>
        <p>akdskaflk_ddkkk 00000</p>
        <input className='w-[100%] h-10 align-middle flex focus:outline-none border-solid border-b-[1px] border-gray-600' placeholder='add your comments' />
    </div>
  )
}

export default Comment