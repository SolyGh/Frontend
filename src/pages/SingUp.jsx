import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading } from "../components/loading/Loading";

const SignUp = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors(false);
      const response = await axios.post("https://backend-production-fb5e.up.railway.app/user", {
        username,
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });
      console.log("User created successfully:", response.data);
      setSuccessMessage(true);
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("signUp error:", error.response.data);
        setError(error.response.data.error);
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
        id="username"
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
        placeholder="Username"
        error={errors.username}
        setError={(error) => setErrors({ ...errors, username: error })}
      />
      <InputField
        id="firstName"
        label="First Name"
        type="text"
        value={firstName}
        setValue={setFirstName}
        placeholder="First Name"
        error={errors.firstName}
        setError={(error) => setErrors({ ...errors, firstName: error })}
      />
      <InputField
        id="lastName"
        label="Last Name"
        type="text"
        value={lastName}
        setValue={setLastName}
        placeholder="Last Name"
        error={errors.lastName}
        setError={(error) => setErrors({ ...errors, lastName: error })}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
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
        <p className="text-center font-semibold mt-4  p-2" style={{ color: currentColor }}>
          Successfully, You have an account so go to login page
        </p>
      )}

      <button
        className="flex items-center justify-center gap-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        style={{ background: currentColor }}
        type="submit"
      >
        Sign Up
        {loading && <Loading height={15} width={15}></Loading>}
      </button>
      <div className="flex items-center justify-center w-full gap-2 py-2 px-4">
        <p>you have an account! Go to </p>
        <Link to="/login" className="font-bold" style={{ color: currentColor }} type="submit">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
