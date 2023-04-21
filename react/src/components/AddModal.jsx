import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar.jsx";
import Charts from "./Charts.jsx";

export default function AddModal({ open, toggleModal, actual, setActual, goal }) {
  if (!open) return null;
  const [ingredient, setIngredient] = useState();
  const [amount, setAmount] = useState(100);
  const [preView, setPreView] = useState({...actual});

  useEffect(() => {
    if (!ingredient) return;
    setPreView(getMetaData());
  }, [ingredient]);

  const addIngredient = () => {
    setActual(preView);
    setPreView(null);
    setIngredient(null);
    toggleModal();
  }

  const changeAmount = (value, amount) => {
    let change = ingredient.amount / amount;
    return value / change;
  }

  const getMetaData = () => {
    const nutrients = ingredient.nutrition.nutrients;
    const protein = nutrients.find(nutrient => nutrient.name === "Protein");
    const fat = nutrients.find(nutrient => nutrient.name === "Fat");
    const netCarbs = nutrients.find(nutrient => nutrient.name === "Net Carbohydrates");
    const cals = nutrients.find(nutrient => nutrient.name === "Calories");
    const totalCarbs = nutrients.find(nutrient => nutrient.name === "Carbohydrates");
    const fiber = nutrients.find(nutrient => nutrient.name === "Fiber");

    return {
      "protein": protein ? protein.amount : 0,
      "fat": fat ? fat.amount : 0,
      "netCarbs": netCarbs ? netCarbs.amount : 0,
      "cals": cals ? cals.amount : 0,
      "totalCarbs": totalCarbs ? totalCarbs.amount : 0,
      "fiber": fiber ? fiber.amount : 0,
    };
  }

  const changeIngredientAmount = (e) => {
    let value = e.target.value < 1 ? 1 : e.target.value;
    const m = getMetaData();
    let combined = {};
    for (let prop in m) {
        combined[prop] = actual[prop] + changeAmount(m[prop], value);
    }

    setPreView(combined)
    setAmount(value);
  }

  return (
    <div className={"fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75"}>
      <div className={"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"}>
        <div className={"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"}>
          <div className={"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"}>
            <div className={"sm:flex sm:items-start"}>
              {ingredient ?
                <div className={"mx-auto flex h-12 w-12  items-center justify-center rounded-full sm:mx-7 sm:my-3 sm:h-10 sm:w-10"}>
                  <img src={"https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image} alt={ingredient.name}></img>
                </div>
                :
                null
              }
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className={"text-base font-semibold leading-6 text-gray-900"}>
                  {ingredient ? ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1) : "Search for an ingredient"}
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    {ingredient ?
                      <>
                        <input className={"w-auto mr-2"} type="number" value={amount} min={1} onChange={(e) => changeIngredientAmount(e)}></input>g
                      </>
                      :
                      <SearchBar setIngredient={setIngredient}/>
                    }
                  </div>
                </div>
              </div>
            </div>
            {ingredient ? <Charts actual={preView} goal={goal}/> : null}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              disabled={!ingredient}
              className={`inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${ingredient ? 'green' : 'red'}-500 sm:ml-3 sm:w-auto`}
              onClick={() => addIngredient()}
            >
              Add
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
            </div>
          </div>
      </div>
    </div>
  );
}
