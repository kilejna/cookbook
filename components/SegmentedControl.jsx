import React, { useState } from 'react'
import styles from './SegmentedControl.module.scss'
import SegmentedOverview from './SegmentedOverview'
import SegmentedIngredients from './SegmentedIngredients'
import SegmentedNutrition from './SegmentedNutrition'

const SegmentedControl = ({
    name,
    data,
    callback,
    defaultIndex = 0,
    controlRef,
    current,
}) => {
    const [controlIndex, setControlIndex] = useState(defaultIndex);

    const blah = Object.keys(data).
        filter((key) => key.includes(current)).
        reduce((cur, key) => {
            const amount = data[key].ingredients.map(i => i.amount)
            const iEnergy = data[key].ingredients.map(i => i.nutrition.energy)
            return Object.assign(cur,
                {
                    overview: data[key].recipe.description
                },
                {
                    ingredients: data[key].ingredients.map(i => i.ingredient)
                },
                {
                    nutrition: data[key].ingredients.map(i => i.nutrition)
                },
                {
                    preptime: data[key].recipe.preptime
                },
                {
                    cooktime: data[key].recipe.cooktime
                },
                {
                    amount: data[key].ingredients.map(i => i.amount)
                },
                {
                    energy: iEnergy
                }
            )
        }, {}); //filter data with id 0, the filtered data and assign 

        //blah.nutrition.reduce((a, b) => +a + +b)
        //export ingredients data to segmentednutrition and use nutrition calculator function with pie chart and bar chart

    const labels = Object.keys(blah).slice(0, 3)

    //one component for css of each label value, one component segmented controller that maps the values

    //need to change inputControl back to default if the currentIndex changes
    const onInputChange = (index) => {
        setControlIndex(index);
    };

    const namounts = blah.amount.map((e) => +e / 100)
    const weee = blah.energy.map((f, index) => Math.abs(+f * +namounts[index])) //multiply namounts by energy per index


    console.log(`amounts ${blah.nutrition.map(i => i.energy)}`)
    const energy = blah.nutrition.map(i => i.energy);

    //map each nutrition eg. <NutritionCalculator nutrition={*nutritionname*} amounts={*amounts*}

    return (
        <div className='relative flex flex-col w-full p-2.5 rounded-lg bg-lblue/50 gap-1 justify-between'>
            <div className='relative flex flex-row justify-between w-full gap-3'>
            <div className={` ${styles.active} absolute inline-flex w-[calc(33.333333%-8px)] h-full rounded-full bg-lbgrey/80`} style={{'--i': controlIndex}}></div>
                {Object.keys(labels).map((d, i) =>
                    <div key={d + '_' + current} className={`text-onyx font-redhat text-[4.1vw] relative inline-flex capitalize text-center z-2 basis-1/3 justify-center lg:text-[1.5vw]`}>
                        <input className='absolute inset-0 w-full h-full m-0 opacity-0 cursor-pointer'
                            type={'radio'}
                            value={blah[d]}
                            name={name}
                            onChange={() => onInputChange(i)}
                            checked={i === controlIndex} />

                        <label htmlFor={labels[d]}>{labels[d]}</label>
                    </div>)}
            </div>
            
            {/*<div>{controlIndex === 0 ? 'its 0' : controlIndex === 1 ? 'itsa1' : controlIndex === 2 ? 'twooo' : ''}</div>*/}
            {controlIndex === 0 ? 
            <SegmentedOverview
                nutrition={blah.nutrition}
                amounts={blah.amount}
                preptime={blah.preptime}
                cooktime={blah.cooktime}
                description={blah.overview} /> 
                : controlIndex === 1 ? 
            <SegmentedIngredients
                ingredients={blah.ingredients} /> 
                : controlIndex === 2 ?
            <SegmentedNutrition
                nutrition={blah.nutrition}
                amounts={blah.amount} /> : '' }

        </div>
    )
}

export default SegmentedControl