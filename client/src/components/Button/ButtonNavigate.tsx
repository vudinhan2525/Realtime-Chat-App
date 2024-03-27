"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
export default function ButtonNavigate({
  href,
  type,
  clsx,
  buttonClsx,
}: {
  href: string;
  type: string;
  clsx: string;
  buttonClsx: string;
}) {
  const router = useRouter();
  let icon = faChevronRight;
  if (type === "left") {
    icon = faChevronLeft;
  }
  return (
    <div
      className={buttonClsx}
      onClick={() => {
        router.push(href);
      }}
    >
      <FontAwesomeIcon icon={icon} className={clsx} />
    </div>
  );
}
