import React from 'react'
 //need to calculate nutrition values

 //energy, cal and kj

 /* kj = add all energy of ingredients
 cal = kj * 0.239006

 map through all ingredients, times by amount and add/reduce values together

 kj =
 ingredients...nutrition.energy * ingredients.amount

In kj & calories
Energy
Protein	
Total Fat	
Saturated Fat	
Carbohydrates	
Sugars	
Dietry Fibre Total	
Sodium
 */

const NutritionCalucator = ({
    nutrition,
    amounts
}) => {
    //const energy = nutrition.map(n => n.energy);
    const amountsCalc = amounts.map((a) => +a / 100); //divide amounts to percentages
    const nutritionAmounts = nutrition.map((n, i) => Math.abs(+n * +amountsCalc[i])); //map and multiply both arrays by
    const finalCalc = nutritionAmounts.reduce((w, i) => w + i)
  return (
    finalCalc
  )
}

export default NutritionCalucator