import React from 'react'
import Image from 'next/future/image'
import styles from './Slides.module.scss'

const Slides = ({
    index,
    less,
    more,
    current,
    translate,
    onClick,
    src,
    title
}) => {

    return (
        <div
            className={`p-1 m-auto duration-300 ease-in-out cursor-pointer min-h-[94px] ${styles.slides}
        ${index === less[1] ? 'order-1 '
                    : index === less[0] ? 'order-2 '
                        : index === current ? 'order-3 '
                            : index === more[0] ? 'order-4 '
                                : index === more[1] ? 'order-5 ' : ''}
        ${index != current ? 'hover:transition hover:scale-110' : ''}`}>
            <button disabled={translate !== 'null'} className={`flex-col m-auto drop-shadow-lg object-scale-down min-w-[72px]`} onClick={onClick}>
                <Image src={src} alt={index + 'slides'} height={650} width={650} />
                <div className={`${styles.text} min-h-[20px] text-onyx align-bottom text-center font-redhat text-regular basis-full sm:text-[1vmax]`}>{title}</div>
            </button>
        </div>
    )
}

export default Slides