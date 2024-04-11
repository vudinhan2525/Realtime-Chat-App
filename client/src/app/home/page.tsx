"use client";
import { cookies } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "./ChatBox/ChatBox";
import ChatBar from "./ChatBar/ChatBar";
import { useState } from "react";
export default function HomePage() {
  //const cookieStore = cookies();
  //const sessionToken = cookieStore.get("jwt");
  const [convId, setConvId] = useState("");
  return (
    <div className="flex">
      <div className="basis-[25%]">
        <div className="flex items-center justify-between px-4 py-4">
          <header className="text-3xl font-bold">Chats</header>
          <FontAwesomeIcon icon={faPenToSquare} className="w-[20px] h-[20px]" />
        </div>
        <div className="px-4">
          <input
            className="outline-none font-medium bg-gray-100 w-full px-5 py-2 rounded-2xl"
            placeholder="Search"
          ></input>
        </div>
        <ChatBar convId={convId} setConvId={setConvId}></ChatBar>
      </div>
      <div className="basis-[75%] bg-gray-100 ">
        <ChatBox convId={convId}></ChatBox>
      </div>
    </div>
  );
}
