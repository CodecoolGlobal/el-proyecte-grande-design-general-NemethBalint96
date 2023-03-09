import React from 'react'
import { useState, useEffect } from 'react'
const Meal = ({ meal }) => {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=16addf5f22ac44288c1e95e242aa584d&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((data) => {
            setImageUrl(data.image);
        })
        .catch(() => {
            console.log("error")
        });
    }, [meal.id])

  return (
    <article className=''>
      <h1 className='text-justify'>{meal.title}</h1>
      <img className='w-1/5' src={imageUrl} alt="recipe"/>
      <ul>
        <li>Preparation time: {meal.readyInMinutes} min</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>
      <a href={meal.sourceUrl}>Go to recipe</a>
    </article>
  )
}

export default Meal
