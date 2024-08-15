import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const uselogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    console.log("username:", username, "password", password);
    try {
      const res = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("You have been logged in");

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      console.log(data);
    } catch (error) {
      console.log(error, "error");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default uselogin;
