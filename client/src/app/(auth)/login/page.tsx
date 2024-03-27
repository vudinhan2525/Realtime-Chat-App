import ButtonNavigate from "@/components/Button/ButtonNavigate";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white relative min-h-[100vh] flex justify-center flex-col gap-60">
      <ButtonNavigate
        href="/"
        type="left"
        clsx="w-6 h-6"
        buttonClsx="flex absolute left-[2%] bg-gray-100 hover:bg-gray-200 transition-all px-4 py-4 rounded-full cursor-pointer top-[5%]"
      />
      <div className="flex justify-center items-center gap-20 flex-col">
        <header className="text-center text-3xl font-semibold">
          Welcome to CHATBOX
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
