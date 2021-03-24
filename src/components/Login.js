import { useState } from "react";
import axios from "axios";

const Login = ({ redirect }) => {
  const [lName, setlName] = useState(String);
  const [lPassword, setlPassword] = useState(String);
  const [lLoading, setlLoading] = useState(false);
  const [lError, setlError] = useState(String);

  const login = (event) => {
    event.preventDefault();
    setlLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/login`,
        {
          u_name: lName,
          u_password: lPassword,
        }
      )
      .then((response) => {
        if (response.data.err) {
          setlError(response.data.err);
        } else {
          setlError("");
          redirect(true);
        }
        setlLoading(false);
      })
      .catch((err) => {
        setlError(err.message);
        setlLoading(false);
      });
  };

  return (
    <form onSubmit={(event) => login(event)}>
      <h2>Login</h2>
      <label htmlFor="l_name">Username: </label>
      <input
        type="text"
        id="l_name"
        value={lName}
        onChange={(event) => setlName(event.target.value)}
        required
      />
      <br />
      <label htmlFor="l_password">Password: </label>
      <input
        type="password"
        id="l_password"
        value={lPassword}
        onChange={(event) => setlPassword(event.target.value)}
        required
      />
      <br />
      <br />
      <input type="submit" value="Login" />
      <br />
      <br />
      {lLoading ? (
        <i className="fa fa-spinner fa-spin" />
      ) : lError ? (
        lError && (
          <span style={{ padding: "10px 15px", backgroundColor: "#ff6e6e" }}>
            {lError}
          </span>
        )
      ) : null}
    </form>
  );
};

export default Login;
