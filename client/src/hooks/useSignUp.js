import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignUp() {
  const {  setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async ({  fullName,  username,  password,  confirmPassword,  gender,}) => {
    const success = handleInputsError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    console.log(success);
    if (!success) return console.log("error");

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await response.json();
      console.log("API response: " + data);
      if (data.error) {
        throw new Error(data.error);
      }

      // localStorage
      localStorage.setItem('chat-app', JSON.stringify(data));
      // context
      setAuthUser(data);

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

// handling input errors
function handleInputsError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all required fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password.length !== 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
};
