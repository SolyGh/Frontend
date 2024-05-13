import axios from "axios";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading } from "../components/loading/Loading";
import { Link } from "react-router-dom";

const Login = () => {
  const { currentColor, setIsLoggedIn } = useStateContext();

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("https://backend-3w2u.onrender.com/user/login", {
        email,
        password,
      });
      console.log("Login successfully:", response.data);

      // todo add here router.push to the main page or what we need
      //   const accessToken = response.data.accessToken;
      //   localStorage.setItem("token", accessToken);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API error:", error.response.data);
        if (error.response.status === 400) {
          setErrors({ form: "Please fill in all required fields." });
        } else if (error.response.status === 500) {
          setErrors({ form: "Internal server error. Please try again later." });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Network error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
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

      {successMessage && (
        <p className="text-center font-semibold mt-4 border-t-2 p-2" style={{ color: currentColor }}>
          Successfully, You have an account so go to login page
        </p>
      )}
    </form>
  );
};

export default Login;
