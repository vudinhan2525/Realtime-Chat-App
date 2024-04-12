"use client";
import { faPaperPlane, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { sessionToken } from "@/lib/http";
import formatDate from "@/lib/formatDate";
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
  const socketRef = useRef<any>(null);
  useEffect(() => {
    if (convId === "") return;
    const socket = io("http://localhost:8002/");
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      socket.emit("getChat", { convId, jwtToken: sessionToken.value });
    });
    socket.on("returnChat", (data) => {
      setChatData(data);
    });
    socket.on("send-message-from-server", (message) => {
      setChatData((prevChatData) => {
        console.log(1);
        if (prevChatData) {
          const newData = [...prevChatData.data, message];
          return { ...prevChatData, data: newData };
        } else {
          return prevChatData;
        }
      });
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, [convId]);
  const handleSendMessage = () => {
    const socket = socketRef.current;
    if (!socket || !convId) return;

    socket.emit("send-message-from-client", {
      message: inputChat,
      jwtToken: sessionToken.value,
      convId: convId,
    });
    setInputChat("");
  };
  const differenceInMinutes = (a: string, b: string) => {
    const date1 = new Date(a);
    const date2 = new Date(b);
    const differenceInMilliseconds = Math.abs(
      date2.getTime() - date1.getTime()
    );
    return Math.floor(differenceInMilliseconds / (1000 * 60));
  };
  const getChatHistory = (chatData: MessageObj | undefined) => {
    if (chatData === undefined) return <div></div>;
    let jsxArr = [];
    for (let i = 0; i < chatData?.data.length; i++) {
      let j = i + 1;
      while (
        j < chatData.data.length &&
        differenceInMinutes(
          chatData.data[j].createdAt,
          chatData.data[i].createdAt
        ) < 5
      ) {
        j++;
      }
      const firstIdx = i;
      i = j - 1;
      jsxArr.push(
        <div
          key={`date-${firstIdx}`}
          className="flex justify-center text-sm text-gray-400"
        >
          {formatDate(chatData.data[firstIdx].createdAt)}
        </div>
      );
      let tmpJsx = [];
      for (let q = firstIdx; q <= i; q++) {
        tmpJsx.push(
          <div
            key={`message-${q}`}
            className={`px-4 ${
              chatData.data[q].user_id == chatData.friend.user_id
                ? "bg-white text-gray-700 rounded-br-[25px] rounded-tr-[25px]"
                : "bg-blue-600 text-white ml-auto rounded-bl-[25px] rounded-tl-[25px]"
            }   py-2  text-[15px] font-medium   max-w-fit`}
          >
            {chatData.data[q].message}
          </div>
        );
      }
      jsxArr.push(
        <div
          key={`messages-${firstIdx}`}
          className="mx-3 my-3 rounded-[25px] overflow-hidden flex flex-col gap-1"
        >
          {tmpJsx}
        </div>
      );
    }
    return <div>{jsxArr}</div>;
  };
  return (
    <div className="relative border-l-[1px]">
      <header className="flex sticky top-0  bg-white/80 py-3 px-6">
        <div className="flex items-center gap-2">
          <div className="min-w-[50px] relative">
            <Image
              src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
              className="h-[50px] border-[1px] w-[50px] rounded-full object-contain"
              height={50}
              width={50}
              priority
              quality={100}
              alt="Picture of the author"
            />
            <div className="bg-green-500 w-[13px] h-[13px] border-[2px] border-white absolute bottom-[1px] right-[1px] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{chatData?.friend.username}</p>
            <p className="text-gray-400 text-sm font-medium">Active now</p>
          </div>
        </div>
      </header>
      <div className="h-[80vh] overflow-auto py-4">
        {getChatHistory(chatData)}
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
