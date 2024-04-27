'use client';
import Link from "next/link";
import ThreadsLogo from "@/images/threads-logo.png";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from '@chakra-ui/react'
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/app/providers";

interface UserData {
  id: string,
  name: string,
  email: string,
  avatar: string
}

export default function Navbar() {
  const cookies = new Cookies();
  const router = useRouter();

  const initialUserDetail: UserData = {
    id: '',
    name: '',
    email: '',
    avatar: ''
  };

  const [loading, setLoading] = useState(true); 
  const [userDetail, setUserDetail] = useState(initialUserDetail);

  const { loading : globalLoading } = useContext(LoadingContext);

  useEffect(() => {
    const userData = cookies.get('dataUser');
    setUserDetail(userData);
    setLoading(false);
  }, []); // Run this effect only once after the initial render

  const handleLogout = () => {
    cookies.remove('userToken');
    cookies.remove('dataUser');
    router.push('/login');
  }

  const handleHome = () => {
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="top-0 z-50 bg-white fixed w-full max-w-[800px] flex items-center justify-between py-6 px-8 mx-auto shadow-md">
      <div className="cursor-pointer" onClick={handleHome} ><Image alt="threads logo" src={ThreadsLogo} height={24} /></div>
      { globalLoading && 
        <div className="flex gap-2 border border-black rounded-md border-dotted p-2">
          <Spinner />
          <p>Loading...</p>
        </div> 
      }
      { (userDetail?.id && !loading) ?
        <Menu>
          <MenuButton>
            <img alt="profile pict" src={userDetail.avatar} className="rounded-full" width={40} />
          </MenuButton>
          <MenuList>
            <MenuItem as='a'>My Profile</MenuItem>
            <MenuItem as='a' onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
        :
        !loading ?
          <Link href={'/login'} className="border border-black rounded-md border-dotted p-2">Login</Link>
        :
          <div></div>
      }
    </nav>
  );
}