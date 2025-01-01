import User from "./User";
export default interface CardsProps {
  user: User;
  handleDelete:(user: User) => void;
  handleEditClick: (user: User) => void;
}
