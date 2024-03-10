'use client'
import handleErrorLoginRegister from "@/helpers/handleErrorLoginRegister";
import useInput from "@/hooks/useInput";
import { apiGetUserDetail, apiLogin } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Cookies from 'universal-cookie';

function FormLogin() {
  const cookies = new Cookies();

  const [email, handleInputEmail] = useInput('');
  const [password, handleInputPassword] = useInput('');

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickEye = (): void => {
    setShowPassword(!showPassword);
  }

  const handleLoginButton = async () => {
    if (handleErrorLoginRegister(email, password)) {
      window.alert('Mohon periksa kembali email dan password!');
    } else {
      try {
        const response = await apiLogin(email, password);
        if (response.data.status === 'success') {
          cookies.set('userToken', response.data.data.token, {secure: true});
          const dataUser = await apiGetUserDetail(response.data.data.token);
          if (dataUser) {
            cookies.set('dataUser', dataUser, {secure: true});
            router.push('/', { scroll: false });
          }
        }
      } catch (error: any) {
        window.alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {handleErrorLoginRegister(email, password) && <div className="text-sm bg-red-400 text-white w-fit p-2 mx-auto rounded">{handleErrorLoginRegister(email, password)}</div>}
      <div className="flex flex-col gap-4">
        <div className="w-full border border-gray-200 rounded-lg flex">
          <input name="apkek" autoComplete="off" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Email akun Anda" type="text" onChange={handleInputEmail} />
        </div>
        <div className="w-full border border-gray-200 rounded-lg flex items-center">
          <input autoComplete="new-password" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Password akun Anda" type={showPassword ? 'text' : 'password'} onChange={handleInputPassword} />
          <span className="border-l-2 h-fit px-6 cursor-pointer" onClick={handleClickEye}>{showPassword ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}</span>
        </div>
      </div>
      <button className="px-16 rounded-full text-md font-bold block text-center py-3 text-sm md:text-base bg-success-50 text-white w-full bg-[#2d3e50]" onClick={handleLoginButton}>Masuk</button>
      <div className="text-center text-sm">Belum punya akun? <Link href={'/register'} className="font-bold text-[#2d3e50]">Daftar di sini</Link></div>
    </div>
  );
}

export default FormLogin;