import axios from "axios";
import { useState } from "react";

const GetUserInfo = () => {
  const [user, setUser] = useState(String);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);

  const getUserInfo = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/user-info`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.err) {
          setError(response.data.err);
        } else {
          setError("");
          setUser(response.data.user);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  return (
    <>
      <button onClick={getUserInfo}>Get User info</button>
      <br />
      {loading ? (
        <i className="fa fa-spinner fa-spin" />
      ) : error ? (
        error && (
          <span style={{ padding: "10px 15px", backgroundColor: "#ff6e6e" }}>
            {error}
          </span>
        )
      ) : (
        user && (
          <div>
            <br />
            <br />
            <i>Get user info with authentication (JWT)</i>
            <h1>Username: {user.u_name}</h1>
            <h3>Email: {user.u_email}</h3>
          </div>
        )
      )}
    </>
  );
};

export default GetUserInfo;
