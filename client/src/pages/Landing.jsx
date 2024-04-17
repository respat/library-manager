import image from "../assets/image.png";
import { CtaButton } from "../components";

import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div className="flex flex-col justify-center">
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
            <CtaButton to="/register" text="Get Started" />
          </div>
          <img
            src={image}
            alt="Library"
            className="absolute md:relative w-full opacity-60 z-[-2] md:opacity-100 md:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
