import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading } from "../components/loading/Loading";

const SignUp = () => {
  const navigate = useNavigate();
  const { currentColor, setIsLoggedIn, token, setAllTokens } = useStateContext();

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(async () => {
    try {
      const response = await axios.get("https://backend-production-fb5e.up.railway.app/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User created successfully:", response.data);
      setUsername(response.data.username);
      setFirstName(response.data.firstname);
      setLastName(response.data.lastname);
    } catch (error) {
      if (error.response) {
        console.error("get User info error:", error.response.data);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors(false);
      const response = await axios.patch(
        "https://backend-production-fb5e.up.railway.app/user",
        {
          username,
          firstname: firstName,
          lastname: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User created successfully:", response.data);
      setSuccessMessage(true);
      setUsername(response.data.username);
      setFirstName(response.data.firstname);
      setLastName(response.data.lastname);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error("update error:", error.response.data);
      }
    }
    setLoading(false);
  };

  const deleteAccount = async () => {
    try {
      await axios.delete("https://backend-production-fb5e.up.railway.app/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoggedIn(false);
      setAllTokens("");
      navigate("/sign-up");
    } catch (error) {
      if (error.response) {
        console.error("delete function error:", error.response.data);
      }
    }
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

      {successMessage && (
        <p className="text-center font-semibold mt-4  p-2" style={{ color: currentColor }}>
          Successfully, You updated your information
        </p>
      )}

      <button
        className="flex items-center justify-center gap-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        style={{ background: currentColor }}
        type="submit"
      >
        Update your information
        {loading && <Loading height={15} width={15}></Loading>}
      </button>

      <button
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={deleteAccount}
      >
        Delete your Account
      </button>
    </form>
  );
};

export default SignUp;
