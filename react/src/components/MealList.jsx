import React from 'react'
import Meal from './Meal'


const MealList = ({ mealData }) => {

    const nutrients = mealData.nutrients;


  return (
    <div>
      <section className='pb-5'>
        <h1 className='pt-5 pb-1'>Macros</h1>
        <div className='flex gap-2'>
            <div className='p-2 bg-amber-600 rounded justify-center font-semibold'>Calories: {nutrients.calories.toFixed(0)}</div>
            <div className='p-2 bg-red-400 rounded justify-center font-semibold'>Carbs: {nutrients.carbohydrates.toFixed(0)}</div>
            <div className='p-2 bg-amber-200 rounded justify-center font-semibold'>Fat: {nutrients.fat.toFixed(0)}</div>
            <div className='p-2 bg-sky-600 rounded justify-center font-semibold'>Protein: {nutrients.protein.toFixed(0)}</div>
        </div>
      </section>
      <section>
        {mealData.meals.map((meal) => {
            return <Meal key={meal.id} meal={meal}/>;
        })}
      </section>
    </div>
  )
}

export default MealList
