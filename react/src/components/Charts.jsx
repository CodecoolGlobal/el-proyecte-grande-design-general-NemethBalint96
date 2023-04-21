import React from "react";
import PieChart from "./PieChart.jsx";
import ProgressBar from "./ProgressBar.jsx";

export default function Charts({actual, goal}) {
  return (
    <div className="flex">
      <div className="w-1/2 h-96 bg-cover bg-center">
        <PieChart protein={actual.protein} fat={actual.fat} carbs={actual.netCarbs}/>
      </div>
      <div className="w-1/2 flex flex-col my-4">
        <div className="space-y-16">
          <ProgressBar name='Protein' color='blue' data={actual.protein} sum={goal.protein}/>
          <ProgressBar name='Fat' color='yellow' data={actual.fat} sum={goal.fat}/>
          <ProgressBar name='Net Carbs' color='red' data={actual.netCarbs} sum={goal.carbs}/>
          <ProgressBar name='Cals' color='slate' data={actual.cals} sum={goal.cals} unit={''}/>
        </div>
        <div className="flex items-center justify-between mt-12">
          <p className="text-sm font-medium text-gray-500">Fiber</p>
          <p className="text-sm font-medium text-gray-700">{actual.fiber.toFixed(0)}g</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm font-medium text-gray-500">Total Carbs</p>
          <p className="text-sm font-medium text-gray-700">{actual.totalCarbs.toFixed(0)}g</p>
        </div>
      </div>
    </div>
  );
}
