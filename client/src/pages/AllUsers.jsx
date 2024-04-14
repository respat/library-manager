import { toast } from "react-toastify";
import { Book, BooksContainer, UsersContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("users");
    console.log(data);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllUsersContext = createContext();

const AllUsers = () => {
  const { data } = useLoaderData();
  return (
    <div>
      <AllUsersContext.Provider value={{ data }}>
        <UsersContainer />
        <BooksContainer />
      </AllUsersContext.Provider>
    </div>
  );
};
export const useAllUsersContext = () => useContext(AllUsersContext);
export default AllUsers;
