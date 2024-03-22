import PropTypes from "prop-types";
const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        className="ml-10 bg-slate-300"
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
