import { toast } from "react-toastify";
import { BooksContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("books");
    console.log(data);
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
    <div>
      <div className="flex">
        <AllBooksContext.Provider value={{ data }}>
          <div className="w-full">
            <SearchContainer />
            <div>
              <BooksContainer />
            </div>
          </div>
        </AllBooksContext.Provider>
      </div>
    </div>
  );
};

export const useAllBooksContext = () => useContext(AllBooksContext);

export default AllBooks;
