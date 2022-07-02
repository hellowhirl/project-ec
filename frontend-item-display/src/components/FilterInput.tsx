import React from "react";

interface FilterFieldProps {
  debouncedOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterInput({ debouncedOnChange }: FilterFieldProps) {
  return (
    <div className="search-box">
      <input onChange={debouncedOnChange} placeholder="検索"></input>
    </div>
  );
}
