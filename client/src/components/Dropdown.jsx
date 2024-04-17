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
      className={`border flex absolute w-full left-0 z-10 transition-all opacity-90 rounded-md h-20 bottom-[-85px] bg-white shadow-sm ${style}`}
    >
      <div className="w-full m-3 gap-2 border-md flex flex-col justify-start">
        {/* <button
          className="hover:bg-slate-100 w-full"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button> */}
        <button className="hover:bg-slate-100 w-full" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
