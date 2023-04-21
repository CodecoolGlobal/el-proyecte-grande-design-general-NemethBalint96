import PieChart from "../components/PieChart.jsx";
import ProgressBar from "./ProgressBar.jsx";
import React, { useEffect, useState, useStateContext} from 'react';
import MealPlan from "./MealPlan.jsx";
import AddModal from "./AddModal.jsx";
import axios from "axios";
import axiosClient from "../axios-client.js";

export default function Macros() {
  const [calorie, setCalorie] = useState(2000);

  const maleCalculation = (goal, weight, height, age) => {
    if (goal === "keep"){
      var calorie = Math.round(1.375 * (66 + (13.7 * weight) + (5 * height) - (6.8 * age)));
    }
    else if (goal === "lose"){
      calorie = Math.round(1.375 * (66 + (13.7 * weight) + (5 * height) - (6.8 * age))) - 450;
    }
    else{
      calorie = Math.round(1.375 * (66 + (13.7 * weight) + (5 * height) - (6.8 * age))) + 500;
    }
    return calorie;
  }

  const femaleCalculation = (goal, weight, height, age) => {
    if (goal === "keep"){
      var calorie = Math.round(1.375 * (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)));
    }
    else if (goal === "lose"){
      calorie = Math.round(1.375 * (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))) - 450;
    }
    else{
      calorie = Math.round(1.375 * (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))) + 500;
    }
    return calorie;
  }

  useState( () => {
    axiosClient.get('/user')
      .then(({data}) => {
        const height = data.height;
        const weight = data.weight;
        const age = data.age;
        const sex = data.sex;
        const goal = data.gain_or_lose;
        if (sex === "male"){
          var calorie = maleCalculation(goal, weight, height, age);
        }
        else if (sex === "female"){
          calorie = femaleCalculation(goal, weight, height, age);
        }
        else if (sex === "other"){
          calorie = maleCalculation(goal, weight, height, age);
        }

        setCalorie(calorie);
      })
  })

  const proteinGoal = 50;
  const fatGoal = 65;
  const carbsGoal = 275;
  const [selectedOption, setSelectedOption] = useState('Actual');
  const [actual, setActual] = useState({
    "protein": 0,
    "fat": 0,
    "netCarbs": 0,
    "cals": 0,
    "totalCarbs": 0,
    "fiber": 0,
  });
  const [open, setOpen] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleModal = () => {
    setOpen(!open);
  }

  

  return (
    <>
      <div className="bg-gray-50 py-2 mb-2 flex items-center justify-between">
        <button onClick={toggleModal}
          className="btn-add"
        >Add Ingredients</button>
        <div>
          <select
            id="simple-select"
            value={selectedOption}
            onChange={handleOptionChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Actual</option>
            <option>Planned</option>
            <option>Goal</option>
          </select>
        </div>
      </div>
      <AddModal open={open} toggleModal={toggleModal} actual={actual} setActual={setActual} goal={goal} />
      <h1>My Macros</h1>
      <Charts actual={actual} goal={goal} />
      <div className="w-1/2 pb-5 pt-5">
        <h1>Generate Meal Plan</h1>
      </div>
      <div>
        <MealPlan />
      </div>
    </>
  )
}
