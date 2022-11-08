
import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react'
import styles from './Wheel.module.scss'
import Image from 'next/future/image'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import Flame from '../public/svg/flame.svg'
import MixBowl from '../public/svg/mixingbowl.svg'
import Clock from '../public/svg/clock3.svg'

const images = [
    {
        src: "/recipeimg/soychashuramen.png",
        alt: "soychashuramen",
        height: 650,
        width: 650,
        title: "Soy Ramen",
        romantitle: "Shōyu Rāmen",
        scripttitle: "醤油ラーメン",
        tags: ['Lunch', 'Soup', 'Japanese'],
        index: 0,
    },
    {
        src: "/recipeimg/koreancorncheese.png",
        alt: "koreancorncheese",
        height: 650,
        width: 650,
        title: "Korean Corn Cheese",
        romantitle: "Kon-Cheijeu",
        scripttitle: "콘치즈",
        tags: ['Lunch', 'Dinner', 'Side', 'Korean'],
        index: 1,
    },
    {
        src: "/recipeimg/oyakodon.png",
        alt: "oyakodon",
        height: 650,
        width: 650,
        title: "Chicken Egg Rice Bowl",
        romantitle: "Oyakodon",
        scripttitle: "親子丼",
        tags: ['Lunch', 'Main', 'Japanese'],
        index: 2,
    },
    {
        src: "/recipeimg/tacos.png",
        alt: "tacos",
        height: 650,
        width: 650,
        title: "Minced Beef Tacos",
        romantitle: "Tacos",
        tags: ['Lunch', 'Dinner', 'Main', 'Mexican'],
        index: 3,
    },
    {
        src: "/recipeimg/spagbolg.png",
        alt: "spagbolg",
        height: 650,
        width: 650,
        title: "Spaghetti Bolognese",
        romantitle: "Ragù alla Bolognese",
        tags: ['Dinner', 'Main', 'Italian'],
        index: 4,
    },
];
const middleIndex = Math.abs(((images.length + 1) / 2) - 1);
const homeTabs = ['Overview', 'Ingredients', 'Nutrition'];

const Wheel = ({ data }) => {
    const [previousIndex, setPreviousIndex] = useState()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [greaterThan, setGreaterThan] = useState(Array.from({ length: middleIndex }, (e, i) => ((currentIndex + 1) + i) % images.length))
    const [lessThan, setLessThan] = useState(Array.from({ length: middleIndex }, (e, i) => (((currentIndex - 1) - i) + images.length) % images.length))
    const [translateX, setTranslateX] = useState('null')
    const [difference, setDifference] = useState()
    const [activeTab, setActiveTab] = useState(0)

    const mapWheel = images.map((img, i) => (
        <div key={img.alt} index={img.index} className={`${img.index === currentIndex && previousIndex === undefined ? styles.item__activecw
            : (img.index === currentIndex) && ((previousIndex === lessThan[0]) || (previousIndex === lessThan[1])) ? styles.item__activecw
                : (img.index === currentIndex) && ((previousIndex === greaterThan[0]) || (previousIndex === greaterThan[1])) ? styles.item__activeacw
                    : (img.index === previousIndex) && (img.index === greaterThan[0] || img.index === greaterThan[1]) ? styles.item__idleacw
                        : (img.index === previousIndex) && (img.index === lessThan[0] || img.index === lessThan[1]) ? styles.item__idlecw
                            : currentIndex === previousIndex ? null
                                : styles.item__default}`} style={{ "--i": i }}>
            <Image loading={`${img.index === 0 ? `eager` : `lazy`}`} src={img.src} alt={img.alt} height={img.height} width={img.width} className='drop-shadow-md' />
        </div>
    ))

    function handleOnNext() {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setPreviousIndex(currentIndex);
        setCurrentIndex(newIndex);
        greaterSmaller(newIndex);
    }
    function handleOnPrev() {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setPreviousIndex(currentIndex);
        setCurrentIndex(newIndex);
        greaterSmaller(newIndex);
    }
    const handleClickedSlide = (e, i) => {
        setPreviousIndex(currentIndex);
        setCurrentIndex(i);
        greaterSmaller(i);
    }
    const greaterSmaller = (index) => {
        const moreRange = Array.from({ length: middleIndex }, (e, i) => ((index + 1) + i) % images.length);
        const lessRange = Array.from({ length: middleIndex }, (e, i) => (((index - 1) - i) + images.length) % images.length);
        const dif = moreRange.includes(currentIndex) ? ((moreRange.indexOf(currentIndex)) + 1) * -1 : ((lessRange.indexOf(currentIndex)) + 1)
        setGreaterThan(moreRange);
        setLessThan(lessRange);
        setDifference(dif);
        handleTranslate();
    }
    const handleTranslate = () => {
        const translate = styles.translateX;
        setTranslateX(translate);
        setTimeout(() => {
            setTranslateX('null');
        }, 1500);
        clearTimeout(setTimeout);
    }

    const mapSlides = images.map((img, i) => (
        <div key={img.alt + 'slide'} className={`p-1 m-auto duration-300 ease-in-out cursor-pointer min-h-[94px] ${styles.slides}
        ${i === lessThan[1] ? 'order-1 '
                : i === lessThan[0] ? 'order-2 '
                    : i === currentIndex ? 'order-3 '
                        : i === greaterThan[0] ? 'order-4 '
                            : i === greaterThan[1] ? 'order-5 ' : ''}
        ${i != currentIndex ? 'hover:transition hover:scale-110' : ''}`}>
            <button disabled={translateX !== 'null'} className={`flex-col m-auto drop-shadow-lg object-scale-down min-w-[72px]`} onClick={(e) => { (i != currentIndex) ? handleClickedSlide(e, i) : false }}>
                <Image className={``} src={img.src} alt={img.alt} height={img.height} width={img.width} />
                <div className='text-[2.5vmin] min-h-[20px] text-onyx align-bottom text-center font-redhat text-regular basis-full sm:text-[1vmax]'>{img.title}</div>
            </button>
        </div>
    ))
    const mapPagenation = images.map((e, i) => (
        <button disabled={translateX !== 'null'} key={i + 'page'} className={'text-onyx'} onClick={(e) => { (i != currentIndex) ? handleClickedSlide(e, i) : false }}>{i === currentIndex ? '•' : '◦'}</button>
    ))
    const currtags = images.map((recipes, index) => recipes.tags.map((tag, i) => (
        index === currentIndex ?
            <div key={tag + 'currtag'} className={`${styles.fadein} order-1 opacity-0 bg-bblue rounded-xl px-2 text-white font-redhat text-center font-light text-[3.3vmin] m-1 subpixel-antialiased`}>
                {tag}
            </div>
            : ''
    )))
    const prevtags = images.map((recipes, index) => recipes.tags.map((tag, i) => (
        index === previousIndex ?
            <div key={tag + 'prevtag'} className={`${styles.fadeout} -order-1 bg-bblue rounded-xl px-2 text-white font-redhat text-center font-light text-[3.3vmin] m-1 subpixel-antialiased`}>
                {tag}
            </div>
            : ''
    )))
    const titles = images.map((img, i) => (
        i === currentIndex ?
            <div key={img.title + 'cur'} className={`${styles.show} order-1`}>
                <div className={`flex flex-col min-w-[312px] items-start`}>
                    <div className='font-semibold uppercase text-[12vmin] text-onyx leading-none mb-0.5'>{img.title}</div>
                    <div className='text-[7vmin] uppercase text-onyx'>{img.romantitle}</div>
                    <div className='text-[4vmin] font-light text-dbgrey'>{img.scripttitle}</div>
                </div>
            </div>
            : i === previousIndex ?
                <div key={img.title + 'prev'} className={`${styles.hide} -order-1`}>
                    <div className={`flex flex-col min-w-[312px] items-start`}>
                        <div className='font-semibold uppercase text-[12vmin] text-onyx leading-none mb-0.5'>{img.title}</div>
                        <div className='text-[7vmin] uppercase text-onyx'>{img.romantitle}</div>
                        <div className='text-[4vmin] font-light text-dbgrey'>{img.scripttitle}</div>
                    </div>
                </div>
                : ''
    ))

    //key, element
    const tabs = homeTabs.map((e, i) => (
        <div key={i} className={`px-1.5 m-2 rounded-xl basis-1/3 z-10 relative order-1`}>{e}</div>
    ))

    return (
        <div className='grid grid-cols-[1fr_32px] grid-rows-[60px_300px_130px_20px_minmax(min-content,_max-content)_minmax(min-content,_max-content)] gap-x-2 gap-y-1 w-screen overflow-hidden ml-1 lg:grid-cols-[1fr_1fr_44px] lg:grid-rows-[60px_minmax(min-content,_max-content)_minmax(min-content,_max-content)_minmax(min-content,_max-content)_minmax(min-content,_max-content)]'>
            <div className='h-full min-w-0 row-start-1 col-span-full'></div>
            <div className='w-full h-full col-start-2 row-start-2 row-span-full lg:col-start-3'></div>
            <div className="w-full col-start-1 row-start-2 lg:row-span-2">
                <div className={`mt-[-67vmin] ml-[-68vmin] ${styles.wheel}`} style={{ "--total": 2 }}>
                    {mapWheel}
                </div>
            </div>
            <div className='min-w-0 col-start-1 row-start-3 lg:row-start-5'>
                <div className='relative flex flex-row align-middle justify-evenly min-w-[300px] min-h-[94px] max-w-[650px] overflow-hidden gap-3'>
                <button disabled={translateX !== 'null'} className='relative' onClick={handleOnPrev}><BsChevronLeft fill='#32383b' /></button>
                <div className='min-w-[250px] max-w-[460px] overflow-hidden relative'>
                    <div className='flex flex-row justify-center gap-3 overflow-visible'>
                        <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translateX}`} style={{ "--difference": difference }}>{mapSlides.at(greaterThan[greaterThan.length - 2])}</div>
                        <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translateX}`} style={{ "--difference": difference }}>{mapSlides.at(greaterThan[greaterThan.length - 1])}</div>
                        <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translateX}`} style={{ "--difference": difference }}>{mapSlides}</div>
                        <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translateX}`} style={{ "--difference": difference }}>{mapSlides.at(lessThan[lessThan.length - 1])}</div>
                        <div className={`z-10 flex gap-3 overflow-visible flex-nowrap basis-1/3 ${translateX}`} style={{ "--difference": difference }}>{mapSlides.at(lessThan[lessThan.length - 2])}</div>
                        <div className='rounded-md bg-lblue/50 min-h-[107px] min-w-[76px] max-w-[93px] absolute basis-1/3 z-0'></div>
                    </div>
                    <div className='flex flex-row justify-center gap-0.5'>{mapPagenation}</div>
                </div>
                <button disabled={translateX !== 'null'} className='relative' onClick={handleOnNext}><BsChevronRight fill='#32383b' /></button>
    </div>
            </div>
            <div className='w-full min-w-0 col-start-1 row-start-4 lg:col-start-2 lg:row-start-2'>
                <div className='min-w-[300px] mx-2 mt-1 relative flex flex-row items-start'>
                    <div className='flex flex-row'>
                        {currtags}
                    </div>
                </div>
                <div className='absolute top-0'>
                    <div className='flex flex-row'>
                        {prevtags}
                    </div>
                </div>
            </div>
            <div className='w-full min-w-0 col-start-1 row-start-5 lg:col-start-2 lg:row-start-3'>
                <div className='min-w-[300px] mx-2 mt-1 relative flex flex-row items-start'>
                    {titles}
</div>
            </div>
            <div className='max-w-full min-w-0 col-start-1 row-start-6 lg:col-start-2 lg:row-start-4 lg:row-span-2'>
                <div className='p-1.5 rounded-lg bg-lblue/50 flex flex-col'>
                    <div className='flex flex-row text-onyx font-redhat text-[3.8vw] justify-between items-center gap-2 relative cursor-pointer'>
                        {tabs}
                        <div className='-order-1 relative z-0 w-full rounded-lg basis-1/3 bg-lbgrey/80 px-1.5'>.</div>
                    </div>
                    <div className='relative flex flex-row gap-3 mx-2 my-1 text-center'>
                        <div key={'flame'} className='flex flex-col justify-center gap-0.5 px-2 py-2.5 rounded-lg group bg-bblue/80 basis-1/3'>
                            <Flame className='text-[15vw] place-self-center' fill='#d7eefa' />
                            <span className='text-[3.5vw] text-lblue font-redhat absolute self-center mt-[3.8vw] group-hover:hidden'>500</span>
                            <span className='text-[3.5vw] text-lblue font-redhat absolute self-center mt-[3.8vw] mr-[0.6vw] hidden group-hover:inline'>2092</span>
                            <div className='text-[3.2vw] text-lblue leading-tight font-redhat pt-[0.3]'>
                                <span className='group-hover:hidden'>calories</span>
                                <span className='hidden group-hover:inline'>kilojoules</span>
                            </div>
                        </div>
                        <div key={'whisk'} className='flex flex-col justify-center gap-0.5 px-2 py-2.5 rounded-lg bg-bblue/80 basis-1/3'>
                            <MixBowl className='text-[15vw] place-self-center' fill='#d7eefa' />
                            <span className='text-[3.2vw] text-lblue font-redhat absolute self-center mt-[2.2vw] mr-[0.6vw] leading-none'>
                                <p>0hr</p>
                                <p>30min</p></span>
                            <div className='text-[3.2vw] text-lblue leading-tight font-redhat'>
                                <span className=''>prep time</span>
                            </div>
                        </div>
                        <div key={'clock'} className='flex flex-col justify-center gap-0.5 px-2 py-2.5 rounded-lg group bg-bblue/80 basis-1/3'>
                            <Clock className='text-[15vw] place-self-center mt-[1vw]' fill='#d7eefa' />
                            <span className='text-[3.2vw] text-lblue font-redhat absolute self-center mb-[2.6vw] leading-none group-hover:hidden'>
                                <p>0hr</p>
                                <p>45min</p>
                            </span>
                            <span className='text-[3.2vw] text-lblue font-redhat absolute self-center mb-[2.6vw] leading-none hidden group-hover:inline'>
                                <p>1hr</p>
                                <p>15min</p>
                            </span>
                            <div className='text-[3.2vw] text-lblue leading-tight font-redhat'>
                                <span className='group-hover:hidden'>cook time</span>
                                <span className='hidden group-hover:inline'>total time</span>
                            </div>
                        </div>
                    </div>
                    <div className='m-2 text-onyx'>
                        Some sorta description idk bloop.
                        Some sorta description idk bloop.
                        Some sorta description idk bloop.
                        Some sorta description idk bloop.
                        Some sorta description idk bloop.
                        Some sorta description idk bloop.
                        Some sorta description idk bloop.
                    </div>
                    <button className='px-2 font-light text-center text-white bg-bblue/80 rounded-xl font-redhat text-[3.2vw] place-self-center mb-1.5'>View Recipe</button>
                </div>
            </div>
        </div>
    )
}

export default Wheel
