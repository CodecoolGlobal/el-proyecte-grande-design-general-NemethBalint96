import React, { useState } from 'react';
import MealPlan from "./MealPlan.jsx";
import AddModal from "./AddModal.jsx";
import Charts from "./Charts.jsx";

export default function Macros() {
  const goal = {
    "protein": 50,
    "fat": 65,
    "carbs": 275,
    "cals": 2000,
  }
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
