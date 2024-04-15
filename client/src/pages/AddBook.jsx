import { FormRow, FormRowSelect } from "../components";
import { BOOK_CATEGORIES } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("books", data);
    toast.success("Added book successfully");
    return redirect("/dashboard/all-books");
  } catch (error) {
    toast.error(error?.response.data);
    console.log(formData, data);
  }
};

const AddBook = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex gap-5 m-4 p-4 border shadow-sm rounded-md">
      <Form method="post">
        <h4>Add Book</h4>
        <div className="">
          <FormRow type="text" name="title" />
          <FormRow type="text" name="author" />
          <FormRow type="text" name="publisher" />
          <FormRow type="number" name="year" />
          <FormRow type="number" name="quantity" />
          <FormRow type="number" name="ISBN" />
          <FormRowSelect
            name="category"
            list={Object.values(BOOK_CATEGORIES)}
          />
          <button
            type="submit"
            className="w-32 mt-10 text-white font-bold z-0 bg-emerald-400 rounded-full py-3 px-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding book" : "Add book"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddBook;
