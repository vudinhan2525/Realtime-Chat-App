"use client";
import { faPaperPlane, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { sessionToken } from "@/lib/http";
interface MessageObj {
  friend: {
    username: string;
    user_id: number;
  };
  data: {
    createdAt: string;
    message: string;
    user_id: number;
  }[];
}
export default function ChatBox({ convId }: { convId: string }) {
  const [inputChat, setInputChat] = useState("");
  const [chatData, setChatData] = useState<MessageObj>();
  useEffect(() => {
    if (convId === "") return;
    const socket = io("http://localhost:8002/");
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      socket.emit("getChat", { convId, jwtToken: sessionToken.value });
    });
    socket.on("returnChat", (data) => {
      setChatData(data);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, [convId]);
  const handleSendMessage = () => {
    // if (!socket) return;
    // socket.emit("chatMessage", inputChat);
    // setInputChat("");
  };
  return (
    <div className="relative border-l-[1px]">
      <header className="flex sticky top-0  bg-white/80 py-3 px-6">
        <div className="flex items-center gap-2">
          <div className="min-w-[50px] relative">
            <Image
              src="https://images.pexels.com/photos/20450982/pexels-photo-20450982/free-photo-of-th-i-trang-dan-ong-nh-ng-ng-i-dan-ba.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-[50px] border-[1px] p-1 w-[50px] rounded-full object-contain"
              height={50}
              width={50}
              quality={100}
              alt="Picture of the author"
            />
            <div className="bg-green-500 w-[13px] h-[13px] border-[2px] border-white absolute bottom-[1px] right-[1px] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Phương Anh Đào</p>
            <p className="text-gray-400 text-sm font-medium">Active now</p>
          </div>
        </div>
      </header>
      <div className="h-[80vh] overflow-auto py-4">
        <div className="flex justify-center text-sm text-gray-400">6:42 PM</div>
        <div className="mx-3 my-3 rounded-[25px] overflow-hidden flex flex-col gap-1">
          {chatData?.data?.map((el, idx) => {
            return (
              <div
                key={idx}
                className={`px-4 ${
                  el.user_id === chatData.friend.user_id
                    ? "bg-white text-gray-700 rounded-br-[25px] rounded-tr-[25px]"
                    : "bg-blue-600 text-white ml-auto rounded-bl-[25px] rounded-tl-[25px]"
                }   py-2  text-[15px] font-medium   max-w-fit`}
              >
                {el.message}
              </div>
            );
          })}
        </div>
      </div>
      <div className="sticky bottom-0 flex items-center justify-center bg-white py-2">
        <div className="basis-[10%]"></div>
        <div className="flex basis-[80%] items-center relative">
          <input
            value={inputChat}
            placeholder="Type a message..."
            onChange={(e) => setInputChat(e.target.value)}
            className="bg-gray-100 outline-none text-[15px] w-[100%]  font-medium px-4 py-3 rounded-2xl"
          ></input>
          <div
            onClick={handleSendMessage}
            className="absolute right-[15px] cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="w-[25px] h-[25px] text-blue-600 hover:text-blue-700 transition-all"
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className="basis-[10%] flex justify-center">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="w-[30px] h-[30px] text-blue-600 hover:text-blue-700 transition-all cursor-pointer"
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}
