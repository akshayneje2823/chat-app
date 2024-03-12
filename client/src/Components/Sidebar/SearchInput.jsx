import React from "react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");

  const { setSelectedConversation } = useConversation();

  const { conversations } = useGetConversation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    console.log(conversations)

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchInput("")
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <LuSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
