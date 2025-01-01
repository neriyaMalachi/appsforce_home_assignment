import React from 'react'

interface SearchProps {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
  return (
    <div className="mb-4">
    <input
      type="text"
      placeholder="Search by name, email, ID, or location..."
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  )
}

export default Search