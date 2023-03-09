import { useState } from "react"
import MealList from "./MealList";
import axiosClient from "../axios-client.js";

const MealPlan = () => {

    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);

    const handleChange = (e) => {
        setCalories(e.target.value);
    }

    const getMealData = () => {
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=f63d05dd7cc444c387f1c3591f9bd37f&timeFrame=day&targetCalories=${calories}`
        )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
            console.log(data);
        })
        .catch(() => {
            console.log("error");
        });
    }

  return (
    <div>
        <section>
            <input className="w-1/6" type="number" placeholder="Calories Goal" onChange={handleChange}/>
        </section>
        <button className="btn-add" onClick={getMealData}>Get Daily Meal Plan</button>
        {mealData && <MealList mealData={mealData}/>}
    </div>
    
  )
}

export default MealPlan
