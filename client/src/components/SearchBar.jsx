import { BsSearch } from "react-icons/bs";
const SearchBar = () => {
  return (
    <div className="w-1/4 ml-4 flex">
      <input
        type="text"
        placeholder="Search"
        className="rounded-full px-3 py-1 w-full h-8 mr-2 bg-slate-100"
      />
      <button className="bg-emerald-400 h-8 w-12 rounded-full text-emerald-900 flex items-center justify-center">
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
