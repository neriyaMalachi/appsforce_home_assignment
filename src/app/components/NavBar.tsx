'use client'
import { NavBarProps } from "../types/NavBarProps";
import Search from "./Search";
import { useState } from "react";
import ModalAddUser from "./ModalAddUser";

const NavBar: React.FC<NavBarProps> = ({ setSearchTerm, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (newUser: {
    name: { first: string; last: string };
    email: string;
    location: { country: string; city: string };
  }) => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsModalOpen(false);
    alert("User added successfully!");
  };

  return (
    <nav className="p-4 flex justify-around items-center">
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <button
        id="add-user"
        onClick={() => setIsModalOpen(true)}
        className="p-2 font-bold text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add User
      </button>

      {isModalOpen && (
        <ModalAddUser
          handleSave={handleAddUser}
          handleCancel={() => setIsModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
