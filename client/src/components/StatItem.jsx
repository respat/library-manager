import PropTypes from "prop-types";
const StatItem = ({ title }) => {
  return (
    <div className="border shadow-sm rounded-md flex flex-col h-80">
      <div className="p-2 font-semibold">{title}</div>
      <hr className=" w-full self-center" />
    </div>
  );
};
StatItem.propTypes = {
  title: PropTypes.string,
};
export default StatItem;
