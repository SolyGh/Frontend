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
  const [errors, setErrors] = useState({});

  //   todo here i need when mount the page with axios.get("https://backend-production-fb5e.up.railway.app/user/me -->
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

    // try {
    //   setErrors(false);
    //   const response = await axios.post("https://backend-production-fb5e.up.railway.app/user", {
    //     username,
    //     firstname: firstName,
    //     lastname: lastName,
    //     email,
    //     password,
    //   });
    //   console.log("User created successfully:", response.data);
    //   setSuccessMessage(true);
    //   setUsername("");
    //   setFirstName("");
    //   setLastName("");
    //   setLoading(false);
    // } catch (error) {
    //   if (error.response) {
    //     console.error("API error:", error.response.data);
    //   }
    // }
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
    </form>
  );
};

export default SignUp;
