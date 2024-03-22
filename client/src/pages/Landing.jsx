import image from "../assets/image.png";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="fixed top-0 w-full h-screen">
        <div className="absolute top-0 right-96 h-screen">
          <div className="w-20 h-3/5 bg-emerald-400"></div>
        </div>
      </div>
      <Navbar />
      <div className="flex w-full justify-center flex-col items-center">
        <div className="flex h-screen w-4/5 justify-center items-center">
          <div className="flex flex-col gap-8">
            <h1 className=" font-bold text-8xl drop-shadow-md">
              Library <span className=" text-emerald-400">Manager</span>
            </h1>
            <p className="w-3/4 text-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              nobis. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Link className=" z-0" to="/register">
              Register Page
            </Link>
          </div>
          <img src={image} alt="Library" className="relative w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
