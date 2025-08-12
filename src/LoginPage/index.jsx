import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("jwt_token", data.jwt_token);
        Cookies.set("user_id", data.user_id);

        navigate("/home");
      } else {
        setShowSubmitError(true);
        setErrorMsg(data.error_msg);
      }
    } catch (error) {
      setShowSubmitError(true);
      setErrorMsg("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="loginPage">
      <img
        className="loginPage-img"
        src="https://res.cloudinary.com/dkyhsl0m0/image/upload/v1751688795/Illustration_p2ihwi.png"
        alt="login illustration"
      />

      <div>
        <div>
          <img
            className="logo"
            src="https://res.cloudinary.com/dkyhsl0m0/image/upload/v1751688954/logo_a0pdsa.png"
            alt="logo"
          />
          <h1>Insta Share</h1>
        </div>

        <div>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChangeUsername}
            placeholder="Enter the Username"
          />
        </div>

        <div>
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="********"
          />
        </div>

        <button type="button" onClick={handleLogin}>
          Login
        </button>
        {showSubmitError && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
