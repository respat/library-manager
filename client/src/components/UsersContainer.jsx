import User from "./User";

import { useAllUsersContext } from "../pages/AllUsers";
const UsersContainer = () => {
  const { data } = useAllUsersContext();
  const { users } = data;
  if (users.length === 0) {
    return <div>No users</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {users.map((user) => {
        return <User key={user._id} {...user} />;
      })}
    </div>
  );
};

export default UsersContainer;
