import axios from "axios";
import  User  from "@/app/types/User";

export const GetAllUsers = async (): Promise<User[]> => {
  const response = await axios.get("https://randomuser.me/api/?results=10");
  return response.data.results.map((user: User) => ({
    id: user.login.uuid || "unknown-id", 
    name: {
      title: user.name?.title || "Unknown",
      first: user.name?.first || "Unknown",
      last: user.name?.last || "Unknown",
    },
    email: user.email || "unknown@example.com",
    picture: {
      medium: user.picture?.medium || "https://via.placeholder.com/150", 
    },
    location: {
      country: user.location?.country || "Unknown Country",
      city: user.location?.city || "Unknown City",
      street: {
        name: user.location?.street?.name || "Unknown Street",
        number: user.location?.street?.number || 0,
      },
    },
  }));
};
