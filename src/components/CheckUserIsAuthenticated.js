import axios from "axios";

const CheckUserIsAuthenticated = (setUser, setLoading, setError) => {
  axios
    .get(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/auth`
    )
    .then((response) => {
      const data = response.data;
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
      } else {
        setUser("");
      }
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
};

export default CheckUserIsAuthenticated;
