import React, { useState, useEffect } from "react";

function SearchBar({ actual, setActual }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    if (input.trim() !== "") {
      fetchSuggestions();
    } else {
      setSuggestions([])
    }
  }, [input]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/suggestions?q=${input}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = (suggestion) => {
    let nutrients = suggestion.nutrition.nutrients;
    let p = nutrients.find(nutrient => nutrient.name === "Protein").amount;
    let f = nutrients.find(nutrient => nutrient.name === "Fat").amount;
    let nc = nutrients.find(nutrient => nutrient.name === "Net Carbohydrates").amount;
    let k = nutrients.find(nutrient => nutrient.name === "Calories").amount;
    let tc = nutrients.find(nutrient => nutrient.name === "Carbohydrates").amount;
    let fi = nutrients.find(nutrient => nutrient.name === "Fiber").amount;
    let data = {
      "protein": actual.protein + p,
      "fat": actual.fat + f,
      "netCarbs": actual.netCarbs + nc,
      "cals": actual.cals + k,
      "totalCarbs": actual.totalCarbs + tc,
      "fiber": actual.fiber + fi,
    };
    setActual(data);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={handleInputChange}
      />
      {suggestions.map((suggestion) => (
        <div className="flex" key={suggestion.id} onClick={() => handleClick(suggestion)}>
          <img src={"https://spoonacular.com/cdn/ingredients_100x100/" + suggestion.image} alt={suggestion.name}></img>
          <p>{suggestion.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
