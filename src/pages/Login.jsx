import axios from "axios";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading } from "../components/loading/Loading";
import { Link, Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentColor, setIsLoggedIn } = useStateContext();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://backend-production-fb5e.up.railway.app/user/login", {
        email,
        password,
      });
      console.log("Login successfully:", response.data);

      // todo add here the right route instead of most-actives
      navigate("/most-actives");
      const accessToken = response.data.accessToken;
      localStorage.setItem("token", accessToken);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.error("login error:", error.response.data);
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  return (
    <form
      className="max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto mt-16 md:mt-4"
      onSubmit={handleSubmit}
    >
      <InputField
        id="email"
        label="Email"
        type="text"
        value={email}
        setValue={setEmail}
        placeholder="Email"
        error={errors.email}
        setError={(error) => setErrors({ ...errors, email: error })}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="******************"
        error={errors.password}
        setError={(error) => setErrors({ ...errors, password: error })}
      />

      {error && <p className="text-red-500 text-center p-2 ">Error : {error}</p>}
      {successMessage && (
        <p className="text-center font-semibold mt-4 border-t-2 p-2" style={{ color: currentColor }}>
          Successfully, You have an account so go to login page
        </p>
      )}

      <button
        className="flex items-center justify-center gap-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        style={{ background: currentColor }}
        type="submit"
      >
        Login
        {loading && <Loading height={15} width={15}></Loading>}
      </button>

      <div className="flex items-center justify-center w-full gap-2 py-2 px-4">
        <p>you don't have an account! Go to </p>
        <Link to="/sign-up" className="font-bold" style={{ color: currentColor }}>
          Sign UP
        </Link>
      </div>
    </form>
  );
};

export default Login;
