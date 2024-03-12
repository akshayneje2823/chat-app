import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);

  //   context
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    setLoading(true);

    const success = handleInputErrors({ username, password });
    if (!success) return;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);
      // set local storage 
      localStorage.setItem("chat-app", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
}

export default useLogin;

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    return false;
  }
  return true;
};
