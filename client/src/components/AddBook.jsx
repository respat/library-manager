import { FormRow, FormRowSelect } from "../components";
import { BOOK_CATEGORIES } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const AddBook = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(Object.values(BOOK_CATEGORIES));
    try {
      await customFetch.post("books", data);
      toast.success("Added book successfully");
      navigate("/dashboard/all-books");
    } catch (error) {
      toast.error(error?.response?.data || "Failed to add book");
      console.log(data);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 m-4 border shadow-sm rounded-md bg-white">
      <h4 className="text-lg font-bold mb-2">Add Book</h4>
      <form onSubmit={handleSubmit} className="md:flex gap-5">
        <FormRow label="Title" name="title" labelText={"Title"} type="text" />
        <FormRow
          label="Author"
          name="author"
          labelText={"Author"}
          type="text"
        />
        <FormRow
          label="Publisher"
          name="publisher"
          labelText={"Publisher"}
          type="text"
        />
        <FormRow label="Year" name="year" labelText={"Year"} type="number" />
        <FormRow
          label="Quantity"
          name="quantity"
          labelText={"Quantity"}
          type="number"
        />
        <FormRow label="ISBN" name="ISBN" type="number" />
        <FormRowSelect
          name="category"
          labelText="Category"
          list={Object.values(BOOK_CATEGORIES) || []}
        />
        <button
          type="submit"
          className="mt-4 px-5 py-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
