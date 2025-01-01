import User from "./User";

export interface CardActionsProps {
    user: User;
    handleEditClick: (user: User) => void;
    handleDelete: (user: User) => void;
  }
  