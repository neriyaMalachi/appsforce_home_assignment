// CardActions.tsx
import { CardActionsProps } from "@/app/types/CardActionsProps";


const CardActions: React.FC<CardActionsProps> = ({
  handleEditClick,
  handleDelete,
  user,
}) => (
  <div className="flex justify-around mt-6">
    <button
      className="px-4 py-2 bg-blue-600/70 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      onClick={() => handleEditClick(user)}
    >
      Edit
    </button>
    <button
      onClick={() => handleDelete(user)}
      className="px-4 py-2 bg-red-600/70 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
    >
      Delete
    </button>
   
  </div>
);

export default CardActions;
