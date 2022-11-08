import React from 'react'
import Image from 'next/future/image'

const Card = ({src, width, height, title, index, state}) => {
  return (
    <div className={`flex justify-center min-w-[74px] min-h-[94px] items-center rounded-md flex-col ${index === state ? 'order-first' : 'order-last'}`}>
        <Image className='flex flex-row ' src={src} alt={title} width={width} height={height}/>
        <div className='flex flex-row text-center'>{title}</div>
    </div>
  )
}

export default Card