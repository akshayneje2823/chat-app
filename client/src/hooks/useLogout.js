import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogout() {
  const [loading, setLoading] = useState(false);

  //   context
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      

      //   clear the storage and reset the context to null
      localStorage.removeItem("chat-app");
      setAuthUser(null);
      
    } catch (error) {
        console.log(error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
}

export default useLogout;
