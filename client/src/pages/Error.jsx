import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error.status);
  if (error.status === 404) {
    return (
      <div>
        <h1>404 Not Found</h1>
        <Link to="/">Back to home</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Something went wrong</h1>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default Error;
