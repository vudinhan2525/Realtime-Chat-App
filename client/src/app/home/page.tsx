import { cookies } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ChatBox from "./ChatBox/ChatBox";
export default function HomePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("jwt");

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
      <div className="basis-[75%] bg-gray-100 ">
        <ChatBox></ChatBox>
      </div>
    </div>
  );
}
