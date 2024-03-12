import  { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  // form zustand
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(false);

    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message}),
      })

      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setMessages([...messages,data.messages])
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;
