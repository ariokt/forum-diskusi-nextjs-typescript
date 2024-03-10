'use client'
import handleErrorLoginRegister from "@/helpers/handleErrorLoginRegister";
import useInput from "@/hooks/useInput";
import { apiRegister } from "@/utils/utils";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";

function FormRegister() {
  const [name, handleInputName] = useInput(''); 
  const [email, handleInputEmail] = useInput('');
  const [password, handleInputPassword] = useInput('');
  const [konfirmasiPassword, handleInputKonfirmasiPassword] = useInput('');


  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickEye = (): void => {
    setShowPassword(!showPassword);
  }

  const handleRegisterButton = async () => {
    if (handleErrorLoginRegister(email, password, konfirmasiPassword)) {
      window.alert('Mohon periksa kembali email dan password!');
    } else {
      try {
        const response = await apiRegister(name, email, password);
        if (response.statusText === 'Created') {
          window.alert('Akun berhasil dibuat');
          router.push('/login', { scroll: false });
        }
      } catch (error: any) {
        window.alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {handleErrorLoginRegister(email, password, konfirmasiPassword) && <div className="text-sm bg-red-400 text-white w-fit p-2 mx-auto rounded">{handleErrorLoginRegister(email, password, konfirmasiPassword)}</div>}
        <div className="w-full border border-gray-200 rounded-lg flex">
          <input className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Nama" onChange={handleInputName} />
        </div>
        <div className="w-full border border-gray-200 rounded-lg flex">
          <input className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Email Anda" onChange={handleInputEmail} />
        </div>
        <div className="w-full border border-gray-200 rounded-lg flex items-center">
          <input autoComplete="new-password" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Password Anda" type={showPassword ? 'text' : 'password'} onChange={handleInputPassword} />
          <span className="border-l-2 h-fit px-6 cursor-pointer" onClick={handleClickEye}>{showPassword ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}</span>
        </div>
        <div className="w-full border border-gray-200 rounded-lg flex items-center">
          <input autoComplete="new-password" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Ulangi Password" type={showPassword ? 'text' : 'password'} onChange={handleInputKonfirmasiPassword} />
          <span className="border-l-2 h-fit px-6 cursor-pointer" onClick={handleClickEye}>{showPassword ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}</span>
        </div>
      </div>
      <button className="px-16 rounded-full text-md font-bold block text-center py-3 text-sm md:text-base bg-success-50 text-white w-full bg-[#2d3e50]" onClick={handleRegisterButton}>Daftar</button>
      <div className="text-center text-sm">Sudah punya akun? <Link href={'/login'} className="font-bold text-[#2d3e50]">Masuk di sini</Link></div>
    </div>
  );
}

export default FormRegister;