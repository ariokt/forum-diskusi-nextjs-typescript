import AddThreadForm from "@/components/AddThreadForm"
import Navbar from "@/components/Navbar"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AddNewThread() {
  const cookieStore = cookies();
  const token = cookieStore.get('userToken');
  if (!token) {
    redirect('/login');
  }



  return (
    <>
      <main className="min-h-screen mx-auto max-w-[800px]">
        <Navbar />
        <div className="pt-24">
          <AddThreadForm token={token.value} />
        </div>
      </main>
    </>
  )
}