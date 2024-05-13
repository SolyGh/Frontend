import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading } from "../components/loading/Loading";

const SignUp = () => {
  const { currentColor } = useStateContext();

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await axios.post("https://backend-3w2u.onrender.com/user", {
        username,
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });
      console.log("User created successfully:", response.data);
      setSuccessMessage(true);
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
        Sign Up
        {loading && <Loading height={15} width={15}></Loading>}
      </button>
      <div className="flex items-center justify-center w-full gap-2 py-2 px-4">
        <p>you have an account! Go to </p>
        <Link to="/login" className="font-bold" style={{ color: currentColor }} type="submit">
          Login
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

export default SignUp;
