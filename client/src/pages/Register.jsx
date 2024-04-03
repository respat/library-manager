import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { Logo } from "../components";
import customFetch from "../utils/customFetch";
import { FormRow } from "../components";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful!");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" w-8/12">
        <Form method="post" className=" flex flex-col gap-2">
          <Logo />
          {/* <div className="flex justify-center">
            <h4 className="">Regisztráció</h4>
          </div> */}

          <FormRow
            type="number"
            name="omId"
            labelText="Oktatási azonosító"
            defaultValue="1232143212"
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Vezetéknév"
            defaultValue="Resperger"
          />
          <FormRow
            type="text"
            name="name"
            labelText="Keresztnév"
            defaultValue="Patrik"
          />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            defaultValue="respergerpatrik@gmail.com"
          />
          <FormRow
            type="password"
            name="password"
            labelText="Jelszó"
            defaultValue="admin123"
          />
          <FormRow
            type="password"
            name="password2"
            labelText="Jelszó ismét"
            defaultValue="admin123"
          />
          <button
            type="submit"
            className="bg-emerald-400 p-3 justify-center rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
          <p>Already a member?</p>
          <Link to="/login">Login Page</Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
