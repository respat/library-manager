import PropTypes from "prop-types";
const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <div className="flex flex-col ">
      <label className="font-semibold" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        className="border rounded-lg pl-1 h-7"
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};
FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
};
export default FormRow;
