import React from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'

const Slider = ({
    translate,
    difference,
    slides,
    less,
    more,
    onClickLeft,
    onClickRight,
    pagenation
}) => {

    return (
        <div className='relative flex flex-row justify-center min-w-[300px]'>
            <button disabled={translate !== 'null'} className='relative' onClick={onClickLeft}><BsChevronLeft fill='#32383b' /></button>
            <div className='min-w-[250px] max-w-[465px] overflow-hidden relative '>
                <div className='relative flex flex-row justify-center gap-3 overflow-visible'>
                    <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translate}`} style={{ "--difference": difference }}>{slides.at(more[more.length - 2])}</div>
                    <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translate}`} style={{ "--difference": difference }}>{slides.at(more[more.length - 1])}</div>
                    <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translate}`} style={{ "--difference": difference }}>{slides}</div>
                    <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translate}`} style={{ "--difference": difference }}>{slides.at(less[less.length - 1])}</div>
                    <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translate}`} style={{ "--difference": difference }}>{slides.at(less[less.length - 2])}</div>
                    <div className='rounded-md bg-lblue/50 min-h-[107px] min-w-[76px] max-w-[93px] absolute basis-1/3 z-0 h-full'></div>
                </div>
                <div className='flex flex-row justify-center gap-0.5'>{pagenation}</div>
            </div>
            <button disabled={translate !== 'null'} className='relative' onClick={onClickRight}><BsChevronRight fill='#32383b' /></button>
        </div>
    )
}

export default Slider