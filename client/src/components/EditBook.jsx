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
    <div className="flex gap-5 bg-white m-4 p-4 border shadow-sm rounded-md">
      <form onSubmit={submit} className="flex flex-col w-full">
        <h4>Edit Book</h4>
        <div className="">
          <FormRow type="text" name="title" defaultValue={title} />
          <FormRow type="text" name="author" defaultValue={author} />
          <FormRow type="text" name="publisher" defaultValue={publisher} />
          <FormRow type="number" name="year" defaultValue={year} />
          <FormRow type="number" name="quantity" defaultValue={quantity} />
          <FormRow type="number" name="ISBN" defaultValue={ISBN} />
          <FormRowSelect
            name="category"
            list={Object.values(BOOK_CATEGORIES)}
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
