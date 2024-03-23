import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const CtaButton = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="w-32 text-white font-bold z-0 bg-emerald-400 rounded-full py-3 px-5"
    >
      {text}
    </Link>
  );
};
CtaButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CtaButton;
