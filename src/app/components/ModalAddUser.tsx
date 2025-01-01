import React, { useState } from "react";
import { ModalAddUserProps } from "@/app/types/ModalAddUserProps";
import { z } from "zod";

const ModalAddUser: React.FC<ModalAddUserProps> = ({
  handleSave,
  handleCancel,
}) => {

  const [newUser, setNewUser] = useState({
    name: { first: "", last: "" },
    email: "",
    location: { country: "", city: "" },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const userSchema = z.object({
    name: z.object({
      first: z.string().min(3, "First name must be at least 3 characters."),
      last: z.string().min(3, "Last name must be at least 3 characters."),
    }),
    email: z.string().email("Please enter a valid email address."),
    location: z.object({
      country: z.string().min(2, "Country must be at least 2 characters."),
      city: z.string().min(2, "City must be at least 2 characters."),
    }),
  });

  const handleInputChange = (
    field: keyof typeof newUser,
    subField: string | null,
    value: string
  ) => {
    if (subField) {
      setNewUser((prev) => ({
        ...prev,
        [field]: {
          ...(typeof prev[field] === "object" ? prev[field] : {}),
          [subField]: value,
        },
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const validateFields = () => {
    try {
      userSchema.parse(newUser); 
      setErrorMessage("");
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrorMessage(e.errors[0].message); 
        return false;
      }
      return false;
    }
  };

  const handleSaveClick = () => {
    if (validateFields()) {
      handleSave(newUser);
    }
  };

  return (
    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              value={newUser.name.first}
              onChange={(e) =>
                handleInputChange("name", "first", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              value={newUser.name.last}
              onChange={(e) =>
                handleInputChange("name", "last", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => handleInputChange("email", null, e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              value={newUser.location.country}
              onChange={(e) =>
                handleInputChange("location", "country", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              value={newUser.location.city}
              onChange={(e) =>
                handleInputChange("location", "city", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddUser;
