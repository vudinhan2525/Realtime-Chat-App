import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default function HomePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("jwt");

  return <div>HomePage</div>;
}
