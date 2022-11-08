import React, { useState } from "react"
import Head from "next/head"
import axios from "../lib/axios"

import Wheel from '../components/Wheel'
import Slider from "../components/Slider"
import Slides from "../components/Slides"
import DotPagenation from "../components/DotPagenation"
import styles from '../components/Slider.module.scss'
import Tags from '../components/Tags'
import Titles from '../components/Titles'
import SegmentedControl from '../components/SegmentedControl'

function Home({ recipes }) {
  const middleIndex = Math.abs(((recipes.length + 1) / 2) - 1);
  const [previousIndex, setPreviousIndex] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [moreThan, setMoreThan] = useState(Array.from({ length: middleIndex }, (e, i) => ((currentIndex + 1) + i) % recipes.length))
  const [lessThan, setLessThan] = useState(Array.from({ length: middleIndex }, (e, i) => (((currentIndex - 1) - i) + recipes.length) % recipes.length))
  const [translateX, setTranslateX] = useState('null')
  const [difference, setDifference] = useState()

  //TO ONLY GRAB X AMOUNT OF RECIPES FOR INDEX USE SLICE

  const slides = Object.keys(recipes).map((r, i) =>
    <Slides
      key={recipes[r].id + '_slides'}
      index={i}
      src={recipes[r].recipe.src}
      less={lessThan}
      more={moreThan}
      current={currentIndex}
      translate={translateX}
      title={recipes[r].recipe.title}
      onClick={(e) => { (i != currentIndex) ? handleClickedSlide(e, i) : false }} />)

  const handleOnNext = () => {
    const isLastImage = currentIndex === recipes.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
    greaterSmaller(newIndex);
  }

  const handleOnPrev = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? recipes.length - 1 : currentIndex - 1;
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
    const moreRange = Array.from({ length: middleIndex }, (e, i) => ((index + 1) + i) % recipes.length);
    const lessRange = Array.from({ length: middleIndex }, (e, i) => (((index - 1) - i) + recipes.length) % recipes.length);
    const dif = moreRange.includes(currentIndex) ? ((moreRange.indexOf(currentIndex)) + 1) * -1 : ((lessRange.indexOf(currentIndex)) + 1)
    setMoreThan(moreRange);
    setLessThan(lessRange);
    setDifference(dif);
    handleTranslate();
  }

  //could possibly go into the component itself?
  const handleTranslate = () => {
    const translate = styles.translateX;
    setTranslateX(translate);
    setTimeout(() => {
      setTranslateX('null');
    }, 1500);
    clearTimeout(setTimeout);
  }

  return (
    <div className="relative w-full lg:h-full">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Cookbook</title>
      </Head>
      <React.StrictMode>
        <div className="relative w-full overflow-x-hidden lg:overflow-hidden lg:h-full">
          <div className="box-border flex flex-col flex-wrap items-center justify-between w-full pr-12 ml-1 py-9 overscroll-y-auto lg:h-full lg:content-around lg:justify-evenly">
            <div className="relative">
              <Wheel
                data={recipes}
                current={currentIndex}
                previous={previousIndex}
                less={lessThan}
                more={moreThan} />
            </div>
            <div className="min-w-[300px] relative w-full lg:w-[465px]">
              <Slider
                translate={translateX}
                difference={difference}
                less={lessThan}
                more={moreThan}
                slides={slides}
                onClickLeft={handleOnPrev}
                onClickRight={handleOnNext}
                pagenation={<DotPagenation
                  data={recipes}
                  translate={translateX}
                  handler={handleClickedSlide}
                  current={currentIndex} />} />
            </div>
            <div className="min-w-[312px] relative w-full mt-2 lg:w-[44vw]">
              <Tags
                data={recipes}
                current={currentIndex}
                previous={previousIndex} />
              <Titles
                data={recipes}
                current={currentIndex}
                previous={previousIndex} />
            </div>
            <div className="relative w-full mt-2 lg:w-[44vw] lg:h-[240px]">
              <SegmentedControl 
              name={'segementedconrol'}
              data={recipes}
              current={currentIndex} />
            </div>
          </div>
        </div>
      </React.StrictMode>
    </div>
  )
}

export async function getStaticProps() {
  const response = await axios.get('/recipes');

  return {
    props: {
      recipes: response.data.data
    },
  }
}

export default Home
