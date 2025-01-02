import React from "react";

interface SearchProps {
  setSearchTerm: (term: string) => void;
  searchTerm: string;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  };

  return (
    <div className="flex items-center w-[70%] max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Search by name, email, ID, or location..."
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        value={searchTerm}
        onChange={handleChange}
      />
   
    </div>
  );
};

export default Search;
