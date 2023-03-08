import PieChart from "../components/PieChart.jsx";
import ProgressBar from "./ProgressBar.jsx";
import React, { useState } from 'react';



export default function Macros() {
  const [selectedOption, setSelectedOption] = useState('Actual');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-96 bg-cover bg-center">
          <h1>My Macros</h1>
          <PieChart />
        </div>
        <div className="w-1/2 flex flex-col space-y-16">

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

          <ProgressBar name='Protein' color='blue' progress={76} left={35} data={108} sum={143} />
          <ProgressBar name='Fat' color='yellow' progress={14} left={153} data={24} sum={178} />
          <ProgressBar name='Cals' color='slate' progress={96} left={81} data={2202} sum={2283} />
        </div>
        
      </div>
      <div className="mt-8">
        <ProgressBar name='Net Carbs' color='red' progress={1082} left={286} over={true} data={314} sum={29} />
        <div className="flex items-center justify-between mb-2 mt-12">
          <p className="text-sm font-medium text-gray-500">Fiber</p>
          <p className="text-sm font-medium text-gray-700">147g</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-500">Total Carbs</p>
          <p className="text-sm font-medium text-gray-700">476g</p>
        </div>
    </div>
  </>
  )
}
