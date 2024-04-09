import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ style }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await customFetch.get("auth/logout");
      toast.success("Logout successful");
      return navigate("/");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <div
      className={`border absolute w-full left-0  transition-all opacity-80 rounded-md h-20 bottom-[-85px] bg-white shadow-sm ${style}`}
    >
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dropdown;
