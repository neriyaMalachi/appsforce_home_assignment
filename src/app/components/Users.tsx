"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import User from "@/app/types/User";
import Cards from "./Cards";
import Modal from "./Modal";
import NavBar from "./NavBar";

// פונקציה כדי למשוך את הנתונים
const fetchUsers = async (page: number) => {
  const response = await axios.get(
    `https://randomuser.me/api/?results=10&page=${page}`
  );
  return response.data.results;
};

export default function Users() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
  });

  useEffect(() => {
    if (data) {
      setAllUsers(data);
    }
  }, [data]);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (selectedUser) {
        const updatedUsers = allUsers.map((user: User) =>
          user.login.uuid === selectedUser.login.uuid ? selectedUser : user
        );
        setAllUsers(updatedUsers);
        setIsEditModalOpen(false);
        queryClient.setQueryData(["users", page], updatedUsers);
        console.log("User updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const filteredUsers = allUsers.filter((user: User) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const location =
      `${user.location.country} ${user.location.city} ${user.location.street.name}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.login.uuid.includes(searchTerm) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading && allUsers.length === 0)
    return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-xl text-red-500">
        Error loading users
      </div>
    );

  return (
    <div className="">
      <NavBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="max-w-7xl mx-auto p-4 z-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredUsers.map((user: User) => (
            <div className="" key={user.email}>
              <Cards
                user={user}
                handleEditClick={handleEditClick}
                page={page}
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
            onClick={() => setPage((prev) => prev + 1)}
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
