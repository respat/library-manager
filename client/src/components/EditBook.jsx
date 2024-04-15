import customFetch from "../utils/customFetch";
import { BOOK_CATEGORIES } from "../../../utils/constants";
import { Form, useNavigation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../components";

const EditBook = ({
  id,
  title,
  author,
  year,
  ISBN,
  publisher,
  category,
  quantity,
}) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      await customFetch.patch(`books/${id}`, data);
      toast.success("Book updated successfully");
      return navigate("/dashboard/all-books");
    } catch (error) {
      toast.error(error?.response.data);
      console.log(formData, data);
    }
  };
  return (
    <div className="flex gap-5 w-full bg-white m-4 ">
      <form onSubmit={submit} className="flex flex-col w-full">
        <h1 className=" font-semibold text-xl mb-2">Edit Book</h1>
        <div className="flex flex-col gap-2">
          <FormRow
            type="text"
            name="title"
            labelText="Title"
            defaultValue={title}
          />
          <FormRow
            type="text"
            name="author"
            labelText="Author"
            defaultValue={author}
          />
          <FormRow
            type="text"
            name="publisher"
            labelText="Publisher"
            defaultValue={publisher}
          />
          <FormRow
            type="number"
            name="year"
            labelText="Year"
            defaultValue={year}
          />
          <FormRow
            type="number"
            name="quantity"
            labelText="Quantity"
            defaultValue={quantity}
          />
          <FormRow type="number" name="ISBN" defaultValue={ISBN} />
          <FormRowSelect
            name="category"
            labelText="Category"
            list={Object.values(BOOK_CATEGORIES) || []}
            defaultValue={category}
          />
          <button
            type="submit"
            className="w-40 mt-10 text-white font-bold bg-emerald-400 rounded-full py-3 px-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating book" : "Update book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
