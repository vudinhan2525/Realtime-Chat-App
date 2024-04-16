"use client";
import {
  faFaceSmile,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { sessionToken } from "@/lib/http";
import formatDate from "@/lib/formatDate";
import parseIcons, { emojis } from "@/lib/parseIcon";
import MessageObj from "../../../interfaces/IChatData";
import { calculateTimeAgo } from "@/lib/formatDate";
export default function ChatBox({
  socket,
  chatData,
}: {
  socket: any;
  chatData: MessageObj;
}) {
  const [inputChat, setInputChat] = useState("");
  const [showEmojiBoard, setShowEmojiBoard] = useState(false);
  const emojiBoardRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!socket || !chatData || inputChat.trim() === "") return;
    socket.emit("send-message-from-client", {
      message: inputChat,
      jwtToken: sessionToken.value,
      convId: chatData.conv_id,
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
  const handleEmojiClick = (emoji: string) => {
    setInputChat((prevInputChat) => prevInputChat + emoji);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!emojiBoardRef.current?.contains(event.target as Node)) {
        setShowEmojiBoard(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatData]);

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
            <div
              className={`${
                chatData?.friend.isActive ? "block" : "hidden"
              } bg-green-500 w-[13px] h-[13px] border-[2px] border-white absolute bottom-[1px] right-[1px] rounded-full`}
            ></div>
            {chatData?.friend.isActive === false &&
              calculateTimeAgo(chatData?.friend.lastActive) && (
                <div className="bg-green-200 w-[23px] h-[13px] justify-center text-[11px] px-3 py-2 font-bold flex items-center border-[2px] text-green-600 border-white absolute bottom-[3px] right-[-6px] rounded-full">
                  {`${calculateTimeAgo(chatData?.friend.lastActive)}m`}
                </div>
              )}
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{chatData?.friend.username}</p>
            <p className="text-gray-400 text-sm font-medium">
              {chatData?.friend.isActive === true
                ? "Active now"
                : calculateTimeAgo(chatData?.friend.lastActive)
                ? `Active ${calculateTimeAgo(
                    chatData?.friend.lastActive
                  )} minutes ago`
                : ""}
            </p>
          </div>
        </div>
      </header>
      <div ref={chatHistoryRef} className="h-[80vh] overflow-auto py-4">
        {getChatHistory(chatData)}
      </div>
      <div className="sticky bottom-0 flex items-center justify-center bg-white py-2">
        <div className="basis-[10%]"></div>
        <div className="flex basis-[80%] items-center relative">
          <input
            value={inputChat}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            onChange={(e) => setInputChat(parseIcons(e.target.value))}
            className="bg-gray-100 outline-none text-[15px] w-[100%]  font-medium px-4 py-3 rounded-2xl"
          ></input>
          <div className="absolute right-[15px] flex gap-4">
            <div ref={emojiBoardRef} className="relative">
              <FontAwesomeIcon
                onClick={() => setShowEmojiBoard((prev) => !prev)}
                icon={faFaceSmile}
                className="w-[25px] cursor-pointer h-[25px] text-blue-600 hover:text-blue-700 transition-all"
              ></FontAwesomeIcon>
              <div
                className={`absolute w-[300px] ${
                  showEmojiBoard ? "block" : "hidden"
                } h-[200px] p-4 bg-white border-[1px] rounded-2xl shadow-lg right-[50%] translate-x-[50%] bottom-[40px]`}
              >
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    className="text-xl select-none"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
            <div onClick={handleSendMessage} className="">
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="w-[25px] cursor-pointer h-[25px] text-blue-600 hover:text-blue-700 transition-all"
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className="basis-[10%] flex justify-center">
          <FontAwesomeIcon
            icon={faThumbsUp}
            onClick={() => {
              if (!socket || !chatData) return;
              socket.emit("send-message-from-client", {
                message: "👍",
                jwtToken: sessionToken.value,
                convId: chatData.conv_id,
              });
            }}
            className="w-[30px]  h-[30px] text-blue-600 hover:text-blue-700 transition-all cursor-pointer"
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}
