import PropTypes from "prop-types";

const FormRowSelectUser = ({
  name,
  labelText,
  list,
  onChange,
  defaultValue = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold" htmlFor="category">
        {labelText || name}
      </label>
      <select
        className="h-8 border rounded-lg"
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
      >
        {list.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              <p>
                {user.lastName + " " + user.name}{" "}
                <span className="opacity-70">{user.omId}</span>
              </p>
            </option>
          );
        })}
      </select>
    </div>
  );
};
FormRowSelectUser.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.string,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default FormRowSelectUser;
