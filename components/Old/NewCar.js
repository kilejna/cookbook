/*import React, { useRef } from 'react'
import Image from 'next/future/image'
import { useState, useref, useEffect } from 'react';
import styles from './NewCar.module.scss'

const images = [
    "/recipeimg/chashuramen.png",
    "/recipeimg/koreancorncheese.png",
    "/recipeimg/oyakodon.png",
    "/recipeimg/tacos.png"
];

let count = 0;
let rotation = 0;
const imageLength = images.length;
const defRotation = -360 - imageLength;

/*const decOfTotal = i / imageLength;
const defOffset = -360 - imageLength;
const rotAmount = 360;
const totalRot = (360 / decOfTotal) + 0;
const rotAnim = */

//--d: calc(var(--i) / var(--total));
// Offset to get better starting placement on the circle 0 deg
//--r-offset: 0deg;
// Full circle 360 deg
//--r-amount: 1turn;
// Rotation based on the decimal and r modifiers (360 * (index/total)) + 0deg
//--r: calc((var(--r-amount) * var(--d)) + var(--r-offset));
// Rotate, transform out, then negative rotation so the content appears upright
//--transform: rotate(var(--r)) translate(var(--radius))
  //rotate(calc(1 * var(--r)));

/*function NewCar() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [curRotation, setCurRotation] = useState(0);
    
    const rotateRef = useRef();

    function handleOnNext() {
        count = (count + 1) % images.length;
        setCurrentIndex(count);
        rotation = (currentIndex * 90);
        setCurRotation(rotation);
        rotateRef.current.classList.add('spin')
    }

    function handleOnPrev() {
        const imageLength = images.length;
        count = (currentIndex + imageLength - 1) % imageLength;
        setCurrentIndex(count);
    }

    const mapimgs = images.map((img, i) => (
        <div ref={rotateRef} className={styles.stat} style={{"--i": i}}>
            <Image src={images[i]} alt='' width={400} height={400} />
        </div>
    ))
    
  return (
    <div ref={rotateRef} className={styles.circle} style={{"--total": imageLength}}>
        <></>
        {mapimgs}
        <></>
        <div className='absolute z-10 flex items-center '>
            <button onClick={handleOnPrev}>PrevButton</button>
            <button onClick={handleOnNext}>NextButton</button>
        </div>
    </div>
  )
}

export default NewCar*/