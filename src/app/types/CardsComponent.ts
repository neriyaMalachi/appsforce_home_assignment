import User from "./User";
export default interface CardsProps {
  user: User;
  page: number;
  handleEditClick: (user: User) => void;
}
