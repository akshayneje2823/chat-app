import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ user, emoji, lastIndex }) {

  const {selectedConversation,setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === user._id

  const {onlineUsers} = useSocketContext();

  const isOnline = onlineUsers.includes(user._id)

  console.log(onlineUsers)
  
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? 'bg-sky-500':""}`}
      onClick={() => setSelectedConversation(user)}>
        <div className={`avatar ${isOnline ? "online":""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} alt="profile" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{user.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
