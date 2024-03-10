import GoogleImage from "@/images/IconGoogle.svg";
import AppleImage from "@/images/IconApple.svg";
import LoginWithSosmed from "@/components/LoginWithSosmed";
import FormRegister from "@/components/FormRegister";
import EraspaceImage from "@/images/astronot.png";
import Image from "next/image";
import Link from "next/link";
import ThreadsLogo from "@/images/threads-logo.png";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen justify-center">
      <Link href={'/'} className="w-fit mx-auto"><Image alt="threads logo" src={ThreadsLogo} height={24} /></Link>
      <div className="relative flex w-fit mx-auto items-center">
        <div className="mx-auto min-w-[90%] md:min-w-[480px] rounded-lg shadow-lg p-8">
          <h1 className="text-center font-bold text-lg mb-8">Daftar</h1>
          <div className="mb-7 flex gap-4">
            <LoginWithSosmed image={GoogleImage}>Masuk Dengan Google</LoginWithSosmed>
            <LoginWithSosmed image={AppleImage}>Masuk Dengan Apple</LoginWithSosmed>
          </div>
          <div className="flex gap-2 items-center mb-7">
            <span className="border-t w-full"></span>
            <div className="w-full text-[0.8rem] text-center">Atau, buat akun</div>
            <span className="border-t w-full"></span>
          </div>
          <FormRegister />
        </div>
        <Image alt="Eraspace" src={EraspaceImage} className="absolute right-0 hidden md:block translate-x-[13.5rem]" width={240} height={240} />
      </div>
    </main>
  )
}