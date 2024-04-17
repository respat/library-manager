import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className=" w-full z-30">
      <div className="flex h-16 items-center justify-center shadow-sm backdrop-blur-3xl bg-white w-full">
        <div className="flex w-4/5 py-2 justify-between items-centers">
          <Logo style={` h-7 opacity-85`} />
          <ul className="flex items-center gap-3 ">
            <Link to="/">
              <li className="font-medium px-3 py-2 h-8 flex justify-center items-center cursor-pointer">
                Kezdőlap
              </li>
            </Link>
            <Link to="/login">
              <li className="font-medium rounded-full shadow-sm px-6 py-2 h-8 flex bg-emerald-400 text-white justify-center items-center cursor-pointer">
                Belépés
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
