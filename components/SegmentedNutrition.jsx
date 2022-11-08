import React from 'react'
import styles from './SegmentedNutrition.module.scss'

/*Energy
Protein	
Total Fat	
Saturated Fat	
Carbohydrates	
Sugars	
Dietry Fibre Total	
Sodium*/

const SegmentedNutrition = ({
    nutrition,
    amounts
}) => {
    //calculate nutrition values per amount
    const calculateValues = (nutrient) => {
        const nutrients = nutrition.map(n => n[nutrient]);
        const divAmounts = amounts.map((a) => +a / 100); //divide amounts by 100
        const nutritionAmounts = nutrients.map((n, i) => Math.abs(+n * +divAmounts[i])); //map and multiply both arrays by index
        return nutritionAmounts.reduce((w, i) => w + i).toFixed(2) //return, reduce and round all elements to 2 decimal places
    }

    //nutrition value data
    const recipeNutrition = {
        kjs: {
            name: 'kilojoules',
            value: Math.round(calculateValues('energy')).toString(), //kj
            percentage: 100,
            colour: '#8051fc',
        },
        kcal: {
            name: 'calories',
            value: Math.round((calculateValues('energy')) / 4.184).toString(), //kcal
            percentage: 100,
            colour: '#8051fc',
        },
        protein: {
            name: 'protein',
            value: calculateValues('protein'), //protein in g
            percentage: (((calculateValues('protein') * 16.7) / calculateValues('energy')) * 100).toFixed(2), //% of protein in recipe
            colour: '#fc5176',
        },
        tfat: {
            name: 'total fat',
            value: calculateValues('tfat'), //total fat in g
            percentage: (((calculateValues('tfat') * 37.7) / calculateValues('energy')) * 100).toFixed(2), //% of total fat in recipe
            colour: '#fc8151',
        },
        sfat: {
            name: '-saturated',
            value: calculateValues('sfat'), //saturated fat in g
            percentage: (((calculateValues('sfat') * 37.7) / calculateValues('energy')) * 100).toFixed(2), //% of saturated fat in recipe
            colour: '#fcd651',
        },
        carbs: {
            name: 'carbs',
            value: calculateValues('carbs'), //carbs in g
            percentage: (((calculateValues('carbs') * 16.7) / calculateValues('energy')) * 100).toFixed(2), //% of carbs in recipe
            colour: '#cdfc51',
        },
        sugar: {
            name: '-sugars',
            value: calculateValues('sugar'), //carbs in g
            percentage: (((calculateValues('sugar') * 16.7) / calculateValues('energy')) * 100).toFixed(2), //% of sugar in recipe
            colour: '#51fcd7',
        },
        fibre: {
            name: 'fibre',
            value: calculateValues('fibre'),
            percentage: ((calculateValues('fibre') / 25) * 100).toFixed(2), //g based on the Nutrient Reference Values (NRV) for Australia and New Zealand
            colour: '#51ccfc',
        },
        sodium: {
            name: 'sodium',
            value: calculateValues('sodium'),
            percentage: ((calculateValues('sodium') / 2000) * 100).toFixed(2), //mg based on Australian suggested dietary target
            colour: '#5177fc',
        },
    };

    console.log(Math.round((recipeNutrition.fibre.value % 1) * 100))

    /*
    pie = protein, total fat, carbs in percentage + circle in middle with kj or kcal (maybe button to toggle kj or kcal?)
    bar = for the bar, hover to display percentage or grams and animated counting percentage/grams as it moves

    energy: the food energy
    protein: (g * 16.7kJ) / total energy
    tfat: (g * 37.7kJ) / total energy
    sfat: (g * 37.7kJ) / total energy
    carbs: (g * 16.7kJ) / total energy
    sugar: (g * 16.7kJ) / total energy
    fibre: 25g
    sodium: ?

    calculate the percentage based on the total food energy:
    protein g -> protein calories / calories = percentage

    disclaimer: RDI (recommended daily intake) is based on the World Health Orginisation...published in 2004.
    An individual's dietary intake is contingent on a variety of factors.
    It is recommended that you consult a dietitian to determine your specific nutritional requirements.
     */





    const r = 5;
    const circ = 2 * Math.PI * r;

    const wedgeWidth = (nutrient) => {
        const total = Math.abs(+recipeNutrition.protein.percentage + +recipeNutrition.tfat.percentage + +recipeNutrition.carbs.percentage);
        const width = Math.abs(+nutrient / total) * 100;
        return width;
    }

    return (
        <div className='flex flex-col content-between flex-nowrap justify-evenly'>
             <svg viewBox={"0 0 63.6619772368 63.6619772368"} className={`h-[250px] w-[250px] lg:w-[150px] lg:h-[150px]`}>
                <circle r={15.9154943092} cx={31.8309886184} cy={31.8309886184} fill={'transparent'}
                stroke={recipeNutrition.protein.colour} strokeWidth={31.8309886184} strokeDashoffset={25} className={styles.slice} style={{'--da': `${wedgeWidth(recipeNutrition.protein.percentage)}, ${100 - (wedgeWidth(recipeNutrition.protein.percentage))}, 0, 0`}}>
                </circle>
                <circle r={15.9154943092} cx={31.8309886184} cy={31.8309886184} fill={'transparent'}
                stroke={recipeNutrition.tfat.colour} strokeWidth={31.8309886184} strokeDashoffset={25} className={styles.slice} style={{'--da': `0, ${wedgeWidth(recipeNutrition.protein.percentage)}, ${(wedgeWidth(recipeNutrition.tfat.percentage))}, ${(wedgeWidth(recipeNutrition.tfat.percentage))}`}}>
                </circle>
                <circle r={15.9154943092} cx={31.8309886184} cy={31.8309886184} fill={'transparent'}
                stroke={recipeNutrition.carbs.colour} strokeWidth={31.8309886184} strokeDashoffset={25} className={styles.slice} style={{'--da': `0, ${(wedgeWidth(recipeNutrition.tfat.percentage)) + (wedgeWidth(recipeNutrition.protein.percentage))}, ${(wedgeWidth(recipeNutrition.carbs.percentage))}, 0`}}>
                </circle>
                <circle r={7.9577471546} cx={31.8309886184} cy={31.8309886184} fill={recipeNutrition.kcal.colour}>
                </circle>
                </svg>
            
            {Object.keys(recipeNutrition).map((k, i) =>
                <div key={i} className='flex flex-row items-center justify-between antialiased font-semibold font-redhat text-onyx'>
                    <span className={`basis-2/12 pr-1 ${recipeNutrition[k].name === '-saturated' || recipeNutrition[k].name === '-sugars' ? 'text-[9px]' : 'text-[10px]'}`}>{recipeNutrition[k].name}</span>
                    <div className='h-2 bg-white rounded-full basis-8/12'>
                        <div className={`${styles.nutritionBar} flex items-center justify-end h-full rounded-full`} style={{ '--c': recipeNutrition[k].colour, '--w': recipeNutrition[k].percentage + '%', '--d': (i * 100) + 'ms' }}>
                            <span className={`${styles.text} text-[7px] w-fit px-1 align-text-bottom text-black font-regular`} style={{ '--n': Math.round(recipeNutrition[k].value), '--decimal': Math.round((recipeNutrition[k].value % 1) * 100) }}>
                                {recipeNutrition[k].name === 'sodium' ? 'mg'
                                    : recipeNutrition[k].name === 'kilojoules' ? 'kj'
                                        : recipeNutrition[k].name === 'calories' ? 'kcal'
                                            : 'g'}
                            </span>
                        </div>
                    </div>
                    <span className='text-[9px] basis-[14%] text-right pr-1'>
                        {recipeNutrition[k].name === 'kilojoules' ? recipeNutrition[k].value + 'kj'
                            : recipeNutrition[k].name === 'calories' ? recipeNutrition[k].value + 'kcal'
                                : recipeNutrition[k].percentage === undefined ? 'n/a'
                                    : recipeNutrition[k].percentage + '%'}</span>
                </div>)}
        </div>
    )
}

export default SegmentedNutrition