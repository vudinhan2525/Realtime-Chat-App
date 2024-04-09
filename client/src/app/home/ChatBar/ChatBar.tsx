"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import http from "@/lib/http";

export default function ChatBar() {
  const [chatList, setChatList] = useState<
    {
      title: string;
      lastMessage: string;
      date: Date;
    }[]
  >();
  useEffect(() => {
    getChatList();
  }, []);
  const getChatList = async () => {
    try {
      const response = await http.get<any>("/users/chatlist", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {}
  };
  return (
    <div>
      <ul className="mt-4">
        <li className="flex px-4 gap-2 cursor-pointer hover:bg-gray-100 py-1 transition-all">
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
          <div className="flex flex-col py-2">
            <p className="font-bold">Phương Anh Đào</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400 font-medium line-clamp-1">
                Ối giời fan cậu muôn nơi à mệt mỏi quá đấy
              </p>
              <div className="min-w-[35px] text-sm text-gray-400 font-medium line-clamp-1">
                - Thu
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
