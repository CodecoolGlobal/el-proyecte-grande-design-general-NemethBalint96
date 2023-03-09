import React from 'react'
import { useState, useEffect } from 'react'
const Meal = ({ meal }) => {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=f63d05dd7cc444c387f1c3591f9bd37f&includeNutrition=false`
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
    <div>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe"/>
      <ul>
        <li>Preparation time: {meal.readyInMinutes} min</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>
      <a href={meal.sourceUrl}>Go to recipe</a>
    </div>
  )
}

export default Meal
