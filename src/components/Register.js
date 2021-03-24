import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [rName, setRName] = useState(String);
  const [rPassword, setRPassword] = useState(String);
  const [rEmail, setREmail] = useState(String);
  const [rLoading, setRLoading] = useState(false);
  const [rMessage, setRMessage] = useState(String);
  const [rError, setRError] = useState(String);

  const register = (event) => {
    event.preventDefault();
    setRLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/register`,
        {
          u_name: rName,
          u_password: rPassword,
          u_email: rEmail,
        }
      )
      .then((response) => {
        if (response.data.err) {
          setRMessage("");
          setRError(response.data.err);
        } else {
          setRError("");
          setRMessage(response.data.message);
        }
        setRLoading(false);
      })
      .catch((err) => {
        setRMessage(err.message);
        setRLoading(false);
      });
  };

  return (
    <form onSubmit={(event) => register(event)}>
      <h2>Register</h2>
      <label htmlFor="r_name">Username: </label>
      <input
        type="text"
        id="r_name"
        value={rName}
        onChange={(event) => setRName(event.target.value)}
        required
      />
      <br />
      <label htmlFor="r_password">Password: </label>
      <input
        type="password"
        id="r_password"
        value={rPassword}
        onChange={(event) => setRPassword(event.target.value)}
        required
      />
      <br />
      <label htmlFor="r_email">Email: </label>
      <input
        type="email"
        id="r_email"
        value={rEmail}
        onChange={(event) => setREmail(event.target.value)}
        required
      />
      <br />
      <br />
      <input type="submit" value="Register" />
      <br />
      <br />
      {rLoading ? (
        <i className="fa fa-spinner fa-spin" />
      ) : rError ? (
        rError && (
          <span style={{ padding: "10px 15px", backgroundColor: "#ff6e6e" }}>
            {rError}
          </span>
        )
      ) : (
        rMessage && (
          <span style={{ padding: "10px 15px", backgroundColor: "#bfbfbf" }}>
            {rMessage}
          </span>
        )
      )}
    </form>
  );
};

export default Register;
