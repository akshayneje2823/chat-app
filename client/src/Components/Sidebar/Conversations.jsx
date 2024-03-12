import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";

function Conversations() {
  const { loading, conversations } = useGetConversation();
  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((user, idx) => (
        <Conversation
          key={user._id}
          user={user}
          emoji={getRandomEmoji()}
          lastIndex={user.length - 1}
        />
      ))}

      {loading && <span className="loading loading-spinner"></span>}
    </div>
  );
}

export default Conversations;
