import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/active-users");
        const data = await res.json();

        if (data.error === "Invalid User") {
          navigate("/login");
          throw new Error(data.error);
        }

        setConversations(data.data);
        localStorage.setItem("chat-users", JSON.stringify(data));
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
