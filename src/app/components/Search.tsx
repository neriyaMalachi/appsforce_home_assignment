import React from "react";
import { SearchProps } from "@/app/types/SearchProps";



const Search: React.FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search by name, email, ID, or location..."
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
