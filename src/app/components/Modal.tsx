import React from "react";
import { z } from "zod";
import { ModalProps } from "@/app/types/ModalProps";

const userSchema = z.object({
  name: z.object({
    first: z
      .string()
      .min(3, { message: "First name must be at least 3 characters" }),
    last: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters" }),
  }),
  email: z.string().email({ message: "Invalid email address" }),
  location: z.object({
    city: z.string().min(3, { message: "City must be at least 3 characters" }),
    country: z
      .string()
      .min(3, { message: "Country must be at least 3 characters" }),
  }),
});

const Modal: React.FC<ModalProps> = ({
  selectedUser,
  handleSave,
  handleCancel,
  setSelectedUser,
}) => {
  const [messageError, setMessageError] = React.useState<string | null>(null);

  const handleSaveWithValidation = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      userSchema.parse(selectedUser);
      handleSave();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setMessageError(err.message);
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
        <form className="space-y-4" onSubmit={handleSaveWithValidation}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={selectedUser.name.first}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  name: { ...selectedUser.name, first: e.target.value },
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={selectedUser.name.last}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  name: { ...selectedUser.name, last: e.target.value },
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={selectedUser.location.city}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  location: { ...selectedUser.location, city: e.target.value },
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={selectedUser.location.country}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  location: {
                    ...selectedUser.location,
                    country: e.target.value,
                  },
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <p>{messageError}</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
