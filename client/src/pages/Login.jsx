import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data);
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className=" w-8/12">
          <Form method="post" className=" flex flex-col gap-2">
            <Logo />
            {/* <div className="flex justify-center">
            <h4 className="">Regisztráció</h4>
          </div> */}
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
    </>
  );
};

export default Login;
