import { toast } from "react-toastify";
import { BooksContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import AddBook from "./AddBook";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("books");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllBooksContext = createContext();

const AllBooks = () => {
  const { data } = useLoaderData();
  return (
    <AllBooksContext.Provider value={{ data }}>
      <div className="">
        <SearchContainer />
        <div>
          <BooksContainer />
        </div>
      </div>
    </AllBooksContext.Provider>
  );
};

export const useAllBooksContext = () => useContext(AllBooksContext);

export default AllBooks;
