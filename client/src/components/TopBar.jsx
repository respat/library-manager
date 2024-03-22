import { MdOutlineArrowDropDown } from "react-icons/md";
const TopBar = () => {
  return (
    <div className="w-full flex bg-slate-50 h-16">
      <div className="flex w-full justify-between items-center mx-6 ">
        <div className="">search</div>
        <div className=" flex items-center py-1 px-2 border rounded-lg">
          <img
            src="https://ui-avatars.com/api/?background=0D8ABC&color=fff"
            className="rounded-full w-8 h-8 mr-2"
            alt=""
          />
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <h4 className="font-semibold ">John Doe</h4>
              <MdOutlineArrowDropDown size={20} className="opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
