import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>Login page</h1>
        <Link to="/register">Register Page</Link>
      </div>
    </>
  );
};

export default Login;
