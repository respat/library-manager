import { Link } from "react-router-dom";
import { Logo, Navbar } from "../components";
import { FormRow } from "../components";

const Register = () => {
  return (
    <>
      <Navbar />
      <form action="" className="">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="Name" defaultValue="John" />
        <FormRow
          type="text"
          name="name"
          labelText="Last Name"
          defaultValue="John"
        />
        <FormRow type="text" name="name" labelText="Name" defaultValue="John" />
        <FormRow type="text" name="name" labelText="Name" defaultValue="John" />
        <button type="submit">Register</button>
        <p>Already a member?</p>
        <Link to="/login">Login Page</Link>
      </form>
    </>
  );
};

export default Register;
