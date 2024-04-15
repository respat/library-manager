import PropTypes from "prop-types";

const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor={name}>
        {labelText || name}
      </label>
      <select
        className="h-8 border rounded-lg"
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
      >
        {Array.isArray(list) &&
          list.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
      </select>
    </div>
  );
};

FormRowSelect.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired, // Make sure to mark this as required if it should always be provided
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default FormRowSelect;
