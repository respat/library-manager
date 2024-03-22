import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const CtaButton = ({ to, text }) => {
  return (
    <Link to={to} className="w-20 bg-emerald-400">
      {text}
    </Link>
  );
};
CtaButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CtaButton;
