import Logout from "./Logout";
import GetUserInfo from "./GetUserInfo";

const SignedInComponents = ({ user, redirect }) => {
  return (
    <div>
      <div
        style={{
          padding: "10px",
          border: "1px solid #fff",
          borderRadius: "10px",
        }}
      >
        Logged in as <h1>{user.u_name}</h1>
      </div>
      <GetUserInfo />
      <br />
      <Logout redirect={redirect} />
    </div>
  );
};

export default SignedInComponents;
