"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import User from "@/app/types/User";
import Cards from "./Cards";
import Modal from "./Modal";
import NavBar from "./NavBar";

const fetchUsers = async (total: number) => {
  const response = await axios.get(
    `https://randomuser.me/api/?results=${total}`
  );
  return response.data.results;
};

export default function Users() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [usersPerPage] = useState(10);
  const startIndex = (page - 1) * usersPerPage;

  useEffect(() => {
    const localData = localStorage.getItem("users");
    if (localData) {
      setAllUsers(JSON.parse(localData));
    } else {
      const fetchData = async () => {
        try {
          const users = await fetchUsers(100); 
          setAllUsers(users);
          localStorage.setItem("users", JSON.stringify(users));
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchData();
    }
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const location = `${user.location.country} ${user.location.city} ${user.location.street.name}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.login.uuid.includes(searchTerm) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  const handleDelete = (user: User) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      const updatedUsers = allUsers.filter(
        (u) => u.login.uuid !== user.login.uuid
      );
      setAllUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Deleted Successfull ! ");
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      const updatedUsers = allUsers.map((user) =>
        user.login.uuid === selectedUser.login.uuid ? selectedUser : user
      );
      setAllUsers(updatedUsers);
      setIsEditModalOpen(false);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  if (allUsers.length === 0)
    return <div className="text-center text-xl">Loading...</div>;

  return (
    <div>
      <NavBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="max-w-7xl mx-auto p-4 z-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedUsers.map((user) => (
            <div key={user.login.uuid}>
              <Cards
                user={user}
                handleEditClick={(user) => {
                  setSelectedUser(user);
                  setIsEditModalOpen(true);
                }}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="font-semibold">Page {page}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onClick={() =>
              setPage((prev) =>
                prev < Math.ceil(filteredUsers.length / usersPerPage)
                  ? prev + 1
                  : prev
              )
            }
          >
            Next
          </button>
        </div>

        {isEditModalOpen && selectedUser && (
          <Modal
            selectedUser={selectedUser}
            handleSave={handleSave}
            handleCancel={() => setIsEditModalOpen(false)}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
    </div>
  );
}
