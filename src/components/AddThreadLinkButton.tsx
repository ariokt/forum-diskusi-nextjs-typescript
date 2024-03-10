'use client'
import { useRouter } from "next/navigation";
import { FaPlusCircle } from "react-icons/fa";
import Cookies from "universal-cookie";

function AddThreadLinkButton() {
  const cookies = new Cookies();
  const router = useRouter();
  const dataUser = cookies.get('dataUser');

  const handleClick = () => {
    if (!dataUser) {
      router.push('/login');
    } else {
      router.push(`/add-new-thread`)
    }
  }

  return (
    <div className="bottom-4 right-4 fixed cursor-pointer" onClick={handleClick}><FaPlusCircle size={40} /></div>
  )
}

export default AddThreadLinkButton