// Cards.tsx
import React from "react";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import CardActions from "./CardActions";
import CardsComponent from "@/app/types/CardsComponent";

const Cards: React.FC<CardsComponent> = ({
  user,
  handleEditClick,
  handleDelete,
}) => {
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
