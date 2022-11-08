import React from 'react'
import Image from 'next/future/image'

const SegmentedIngredients = ({
    ingredients
}) => {

    //fats, carbs, sugar, nutrition per ingredient, not per recipe
    console.log(ingredients)
  return (
    <div className='flex flex-row flex-wrap justify-between gap-1'>
            {Object.keys(ingredients).map((d, i) => 
            <div key={ingredients[d]} className='basis-[48%] text-[3.6vw] bg-lblue rounded-md flex flex-row flex-nowrap items-center px-1 gap-2'>
              <div className=' w-[48px] h-[48px] shrink-0'><Image alt={'sugar'} src={"/ingredientimg/castersugar.png"} height={150} width={150} /></div>
              <div className='basis-auto text-[10px] text-center grow font-redhat font-semibold text-onyx'>{ingredients[d]}</div>
            </div>)}
    </div>
  )
}

export default SegmentedIngredients