import PropTypes from "prop-types";

const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="category">{labelText || name}</label>
      <select
        className="h-8 border rounded-lg"
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
      >
        {list.map((value) => {
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
  list: PropTypes.object,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default FormRowSelect;
