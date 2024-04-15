"use client";
import React from "react";
import Image from "next/image";
import formatDate from "@/lib/formatDate";
import MessageObj from "@/interfaces/IChatData";

export default function ChatBar({
  selectedItem,
  setSelectedItem,
  chatData,
}: {
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  chatData: MessageObj[];
}) {
  return (
    <div>
      <ul className="mt-4">
        {chatData?.map((el, idx) => {
          return (
            <li
              onClick={() => setSelectedItem(idx)}
              key={idx}
              className={`flex px-4 gap-2 cursor-pointer hover:bg-gray-100 py-1 transition-all ${
                selectedItem === idx && "bg-gray-100"
              }`}
            >
              <div className="min-w-[60px] relative">
                <Image
                  src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                  className="h-[60px] border-[1px] w-[60px] rounded-full object-contain"
                  height={60}
                  width={60}
                  quality={100}
                  priority
                  alt="Picture of the author"
                />
                <div
                  className={`${
                    el.friend!.isActive ? "block" : "hidden"
                  } bg-green-500 w-[15px] h-[15px] border-[2px] border-white absolute bottom-[3px] right-[3px] rounded-full`}
                ></div>
              </div>
              <div className="flex w-full flex-col py-2">
                <p className="font-bold">{el.friend.username}</p>
                <div className="flex items-center w-full gap-2">
                  <p className="text-sm basis-[70%] text-gray-400 font-medium line-clamp-1">
                    {el.friend && el.data[el.data.length - 1]?.message}
                  </p>
                  <div className="text-sm basis-[30%] text-gray-400 font-medium line-clamp-1">
                    {formatDate(el.data[el.data.length - 1]?.createdAt)}
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
