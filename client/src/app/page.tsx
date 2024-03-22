import Button from "@/components/Button/Button";
export default function Home() {
  return (
    <main className="">
      <div className="bg-white min-h-[100vh] flex justify-center flex-col gap-60">
        <div>
          <header className="text-center text-3xl font-semibold">
            Welcome to CHATBOX
          </header>
          <p className="text-center text-lg text-gray-400 font-medium">
            The simple way to text,call and video chat with your friends.
          </p>
        </div>
        <div className="mx-auto flex flex-col gap-3">
          <Button
            message={"Login with my account"}
            bgColor="bg-blue-600"
            textColor="text-white"
            href={"/login"}
          />
          <Button
            message={"Sign up new account"}
            bgColor="bg-gray-300"
            textColor=""
            href={"/register"}
          />
        </div>
      </div>
    </main>
  );
}
