import axios from "axios";
import { useState } from "react";

const Logout = ({ redirect }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);

  const logout = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/logout`,
        null,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.err) {
          setError(response.data.err);
          setLoading(false);
        } else {
          setError("");
          localStorage.removeItem("token");
          setLoading(false);
          redirect(true);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <button onClick={logout}>
        {loading ? <i className="fa fa-spinner fa-spin" /> : "Logout"}
      </button>
      <br />
      {error && (
        <span
          style={{
            padding: "10px 15px",
            backgroundColor: "#ff6e6e",
            display: "inline-block",
          }}
        >
          {error}
        </span>
      )}
    </>
  );
};

export default Logout;
