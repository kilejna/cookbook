import React from 'react'
import styles from './Tags.module.scss'

const Tags = ({
    data,
    current,
    previous,
}) => {

  return (
    <div className='min-w-[300px] w-fit relative flex flex-row items-start ml-1'>
      <div key={current} className={`${styles.fadein} items-start flex flex-row relative`}>
        {Object.keys(data).map((d, index) => data[d].recipe.tags.map((tag, i) => 
        index === current ?
        <div key={'curr_' + tag} className={`text-[3vmin] bg-bblue rounded-xl px-2 text-white font-redhat text-center font-light m-1 subpixel-antialiased md:text-[1.9vmin]`}>{tag}</div> 
        : ''))}
        </div>
      <div key={previous} className={`${styles.fadeout} items-start flex flex-row relative`}>
        {Object.keys(data).map((d, index) => data[d].recipe.tags.map((tag, i) => 
        index === previous ?
        <div key={'prev_' + tag} className={`text-[3vmin] bg-bblue rounded-xl px-2 text-white font-redhat text-center font-light m-1 subpixel-antialiased md:text-[1.9vmin]`}>{tag}</div> 
        : ''))}
    </div>
    </div>
    
  )
}

export default Tags