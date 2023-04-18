import SearchBar from "./SearchBar.jsx";
import React, {useEffect, useState} from "react";
import PieChart from "./PieChart.jsx";

export default function AddModal({ open, toggleModal, actual, setActual }) {
  if (!open) return null;
  const [first, setFirst] = useState(true);
  const [amountReference, setAmountReference] = useState();
  const [ingredient, setIngredient] = useState();
  const [title, setTitle] = useState('Search for an ingredient');
  const [amount, setAmount] = useState(100);

  useEffect(() => {
    if (!ingredient) return;
    if (first) {
      setFirst(false);
      setAmountReference({...ingredient});
    }
    let title = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
    setTitle(title);
  }, [ingredient]);

  const addIngredient = () => {
    let nutrients = ingredient.nutrition.nutrients;
    let p = nutrients.find(nutrient => nutrient.name === "Protein").amount;
    let f = nutrients.find(nutrient => nutrient.name === "Fat").amount;
    let nc = nutrients.find(nutrient => nutrient.name === "Net Carbohydrates").amount;
    let k = nutrients.find(nutrient => nutrient.name === "Calories").amount;
    let tc = nutrients.find(nutrient => nutrient.name === "Carbohydrates").amount;
    let fi = nutrients.find(nutrient => nutrient.name === "Fiber").amount;
    let data = {
      "protein": actual.protein + changeAmount(p),
      "fat": actual.fat + changeAmount(f),
      "netCarbs": actual.netCarbs + changeAmount(nc),
      "cals": actual.cals + changeAmount(k),
      "totalCarbs": actual.totalCarbs + changeAmount(tc),
      "fiber": actual.fiber + changeAmount(fi),
    };
    setActual(data);
    setIngredient(null);
    toggleModal();
  }

  const changeAmount = (value) => {
    let change = amountReference.amount / amount;
    return value / change;
  }

  const changeIngredientAmount = (e) => {
    let value = e.target.value < 1 ? 1 : e.target.value;
    setAmount(value);
  }

  return (
    <div className={"fixed inset-0 z-10 overflow-y-auto"}>
      <div className={"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"}>
        <div className={"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"}>
          <div className={"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"}>
            <div className={"sm:flex sm:items-start"}>
              <div className={"mx-auto flex h-12 w-12  items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"}>
                {ingredient ? <img src={"https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image} alt={ingredient.name}></img> : null}
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className={"text-base font-semibold leading-6 text-gray-900"}>
                  {title}
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    {ingredient ?
                      <>
                        <input className={"w-auto mr-2"} type="number" value={amount} min={1} onChange={(e) => changeIngredientAmount(e)}></input>g
                        <PieChart protein={ingredient.nutrition.caloricBreakdown.percentProtein} fat={ingredient.nutrition.caloricBreakdown.percentFat} carbs={ingredient.nutrition.caloricBreakdown.percentCarbs} />
                      </>
                      :
                      <SearchBar setIngredient={setIngredient}/>
                    }
                  </div>
                </div>
              </div>
            </div>
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
