"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import http from "@/lib/http";
import formatDate from "@/lib/formatDate";
interface IChatList {
  friend: {
    user_id: number;
    username: string;
  };
  title: string;
  lastMessage: {
    user_id: number;
    message: string;
  };
  updatedAt: string;
  conv_id: string;
}
export default function ChatBar({
  convId,
  setConvId,
}: {
  convId: string;
  setConvId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [chatList, setChatList] = useState<IChatList[]>();
  useEffect(() => {
    getChatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getChatList = async () => {
    try {
      const response = await http.get<any>("/users/chatlist", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setChatList(response.data);
      if (response.data.length > 0) {
        setConvId(response.data[0].conv_id);
      }
    } catch (error) {}
  };
  return (
    <div>
      <ul className="mt-4">
        {chatList?.map((el, idx) => {
          return (
            <li
              onClick={() => setConvId(el.conv_id)}
              key={idx}
              className={`flex px-4 gap-2 cursor-pointer hover:bg-gray-100 py-1 transition-all ${
                el.conv_id === convId && "bg-gray-100"
              }`}
            >
              <div className="min-w-[60px] relative">
                <Image
                  src="https://images.pexels.com/photos/20450982/pexels-photo-20450982/free-photo-of-th-i-trang-dan-ong-nh-ng-ng-i-dan-ba.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="h-[60px] border-[1px] p-1 w-[60px] rounded-full object-contain"
                  height={60}
                  width={60}
                  quality={100}
                  alt="Picture of the author"
                />
                <div className="bg-green-500 w-[15px] h-[15px] border-[2px] border-white absolute bottom-[3px] right-[3px] rounded-full"></div>
              </div>
              <div className="flex w-full flex-col py-2">
                <p className="font-bold">{el.friend.username}</p>
                <div className="flex items-center w-full gap-2">
                  <p className="text-sm basis-[70%] text-gray-400 font-medium line-clamp-1">
                    {el.title === null && el.lastMessage?.message}
                  </p>
                  <div className="text-sm basis-[30%] text-gray-400 font-medium line-clamp-1">
                    {formatDate(el?.updatedAt)}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
