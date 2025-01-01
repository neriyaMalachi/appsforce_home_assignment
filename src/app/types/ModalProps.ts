import { Dispatch, SetStateAction } from "react";
import User from "./User";

export interface ModalProps {
  selectedUser: User;
  handleSave: () => void;
  handleCancel: () => void;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
}