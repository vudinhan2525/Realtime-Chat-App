"use client";
import { cookies } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ChatBox from "./ChatBox/ChatBox";
import ChatBar from "./ChatBar/ChatBar";
import { io } from "socket.io-client";
import { sessionToken } from "@/lib/http";
import { useState, useEffect } from "react";
import MessageObj from "@/interfaces/IChatData";
export default function HomePage() {
  //const cookieStore = cookies();
  //const sessionToken = cookieStore.get("jwt");
  const [socket, setSocket] = useState<any>(null);
  const [chatData, setChatData] = useState<MessageObj[]>([]);
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    const socket = io("http://localhost:8002/");
    setSocket(socket);
    socket.emit("getChatData", { jwtToken: sessionToken.value });
    socket.on("returnAllChat", (res) => {
      setChatData(res);
    });
    socket.on("send-message-from-server", (message: any) => {
      setChatData((prevChatData) => {
        const updatedChatData = prevChatData.map((conversation) => {
          if (conversation.conv_id === message.conv_id) {
            return {
              ...conversation,
              data: [...conversation.data, message],
            };
          }
          return conversation;
        });
        return updatedChatData;
      });
    });
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    return () => {
      socket.disconnect();
    };
  }, []);
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
        <ChatBar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          chatData={chatData}
        ></ChatBar>
      </div>
      <div className="basis-[75%] bg-gray-100 ">
        <ChatBox
          chatData={chatData[selectedItem]}
          setChatData={setChatData}
          socket={socket}
        ></ChatBox>
      </div>
    </div>
  );
}
