import Register from "./Register.js";
import Login from "./Login.js";

const NotSignedInComponents = ({ redirect }) => {
  return (
    <div>
      <Register />
      <hr />
      <Login redirect={redirect} />
    </div>
  );
};

export default NotSignedInComponents;
