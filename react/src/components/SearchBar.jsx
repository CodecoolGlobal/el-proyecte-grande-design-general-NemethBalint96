import React, { useState, useEffect } from "react";

function SearchBar({ setIngredient }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    setIngredient(suggestion);
    setSuggestions([]);
    setInput("");
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
