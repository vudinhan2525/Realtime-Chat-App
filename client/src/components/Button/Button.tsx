"use client";
import { useRouter } from "next/navigation";

export default function Button({
  message,
  bgColor,
  textColor,
  href,
}: {
  message: string;
  bgColor: string;
  textColor: string;
  href: string;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      className={`text-center hover:opacity-85 transition-all px-12 py-3 ${bgColor} ${textColor} rounded-xl font-medium cursor-pointer`}
    >
      {message}
    </div>
  );
}
