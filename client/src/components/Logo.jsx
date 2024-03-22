import logo from "../assets/logo.png";
import PropTypes from "prop-types";
const Logo = ({ style }) => {
  return <img src={logo} className={style} alt="Library" />;
};
Logo.propTypes = {
  style: PropTypes.string,
};
export default Logo;
