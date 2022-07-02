import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import {
  ItemResponse,
  fetchItems,
  fetchCategories,
  CategoryResponse,
} from "./services/itemsService";
import ItemCard from "./components/ItemCard";
import FilterInput from "./components/FilterInput";
import { debounce } from "./utils/debounce";

function App() {
  const [datum, setDatum] = useState<ItemResponse | null>(null);
  const [categories, setCategories] = useState<CategoryResponse | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const debouncedOnChange = debounce(onChange, 250);

  const doFetch = async () => {
    const response = await fetchItems();
    setDatum(response);
  };

  const doFetchCategories = async () => {
    const response = await fetchCategories();
    setCategories(response);
  };

  const filteredDatum = useMemo(() => {
    if (!datum) return [];

    return datum.data.filter(
      (item) =>
        (selectedCategory
          ? selectedCategory === item.category_id.toString()
          : true) &&
        (item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, datum, selectedCategory]);

  useEffect(() => {
    doFetch();
    doFetchCategories();
  }, []);

  useEffect(() => {}, [selectedCategory]);

  if (!datum) {
    return <div className="loading-screen">Loading ...</div>;
  }

  return (
    <main className="App">
      <FilterInput debouncedOnChange={debouncedOnChange} />
      <div className="categories">
        {categories
          ? categories.data.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                }}
                className="category"
              >
                {category.name}
              </div>
            ))
          : null}
      </div>
      <div className="results">
        {filteredDatum.map((item) => (
          <div key={item.id} className="item-container">
            <Link to={`/${item.id}`}>
              <ItemCard item={item} />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
