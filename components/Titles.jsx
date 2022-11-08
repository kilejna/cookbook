import React, {useState} from 'react'
import styles from './Titles.module.scss'

const Titles = ({
    data,
    current,
    previous,
}) => {

    return (
        <div className='min-w-[300px] relative flex flex-row items-start'>
            {Object.keys(data).map((d, i) =>
                i === current ?
                    <div key={data[d].recipe.title} className={`${styles.show}`}>
                        <div className={`flex flex-col min-w-[88.88vw] max-w-[88.88vw] shrink-0 items-start md:min-w-[46vmin] md:max-w-[46vmin] lg:min-w-[45vw] lg:max-w-[45vw]`}>
                            <div className={`text-[13vmin] md:text-[7vmin] lg:text-[6vw] font-semibold uppercase text-onyx leading-none mb-0.5 `}>{data[d].recipe.title}</div>
                            <div className={`text-[5vmin] md:text-[2.8vw] uppercase text-onyx`}>{data[d].recipe.roman}</div>
                            <div className={`text-[3vmin] md:text-[1.8vw] font-light text-dbgrey`}>{data[d].recipe.script}</div>
                        </div>
                    </div> : i === previous ?
                        <div key={data[d].recipe.title} className={`${styles.hide}`}>
                        <div className={`flex flex-col min-w-[88.88vw] max-w-[88.88vw] shrink-0 items-start md:min-w-[46vmin] md:max-w-[46vmin] lg:min-w-[45vw] lg:max-w-[45vw]`}>
                            <div className={`text-[13vmin] md:text-[7vmin] lg:text-[6vw] font-semibold uppercase text-onyx leading-none mb-0.5 `}>{data[d].recipe.title}</div>
                            <div className={`text-[5vmin] md:text-[2.8vw] uppercase text-onyx`}>{data[d].recipe.roman}</div>
                            <div className={`text-[3vmin] md:text-[1.8vw] font-light text-dbgrey`}>{data[d].recipe.script}</div>
                        </div>
                        </div>
                        : ''
            )}
        </div>
    )
}

export default Titles