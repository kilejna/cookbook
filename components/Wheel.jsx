
import React from 'react'
import styles from './Wheel.module.scss'
import Image from 'next/future/image'

const Wheel = ({
    data,
    current,
    previous,
    more,
    less
}) => {
    return (
        <div className={`${styles.wheel} md:max-w-[279px] md:max-h-[279px] lg:max-w-[350px] lg:max-h-[350px] mx-0`} style={{ "--total": 2 }}>
            {Object.keys(data).map((d, i) =>
                <div key={'wheel_' + data[d].recipe.title} className={`
                    ${i === current && previous === undefined ? styles.item__activecw
                        : (i === current) && ((previous === less[0]) || (previous === less[1])) ? styles.item__activecw
                            : (i === current) && ((previous === more[0]) || (previous === more[1])) ? styles.item__activeacw
                                : (i === previous) && (i === more[0] || i === more[1]) ? styles.item__idleacw
                                    : (i === previous) && (i === less[0] || i === less[1]) ? styles.item__idlecw
                                        : current === previous ? null
                                            : styles.item__default} md:max-w-[279px] lg:max-w-[350px] lg:max-h-[350px] md:max-h-[279px]`} style={{ "--i": i }}>
                    <Image loading={`${i === 0 ? `eager` : `lazy`}`} src={data[d].recipe.src} alt={data[d].recipe.title} height={650} width={650} className='drop-shadow-md' />
                </div>)}
        </div>
    )
}

export default Wheel
