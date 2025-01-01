// Cards.tsx
import React from "react";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import CardActions from "./CardActions";
import User from "@/app/types/User";
import { useQueryClient } from "@tanstack/react-query";
import CardsComponent from "@/app/types/CardsComponent";

const Cards: React.FC<CardsComponent> = ({ user, handleEditClick, page }) => {
  const queryClient = useQueryClient();

  const getUsersFromLocalStorage = () => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    return [];
  };

  const handleDelete = async (user: User) => {
    const isConfirmed = window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?");
    if (isConfirmed) {
      try {
        const usersFromLocalStorage = getUsersFromLocalStorage();
        const updatedUsers = usersFromLocalStorage.filter(
          (u: User) => u.login.uuid !== user.login.uuid
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        queryClient.setQueryData(["users", page], updatedUsers);
        alert("המשתמש נמחק בהצלחה!");
      } catch (error) {
        alert("הייתה בעיה במחיקת המשתמש." + error);
      }
    }
  };

  return (
    <div
      key={user.login.uuid}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 max-w-xs mx-auto"
    >
      <CardImage
        imageSrc={user.picture.medium}
        altText={`${user.name.first}'s picture`}
      />
      <CardDetails
        name={`${user.name.first} ${user.name.last}`}
        email={user.email}
        location={`${user.location.city}, ${user.location.country}`}
        street={`${user.location.street.name} ${user.location.street.number}`}
        uuid={user.login.uuid}
      />
      <CardActions
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        user={user}
      />
    </div>
  );
};

export default Cards;
