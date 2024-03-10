import Navbar from "@/components/Navbar"
import ThreadDetail from "@/components/ThreadDetail";
import { apiGetThreadDetail } from "@/utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getData(id: string, token: string) {
  try {
    const resp = await apiGetThreadDetail(id, token);
    return resp;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
}

export default async function Page({ params }:{ params: { id: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('userToken');
  if (!token) {
    redirect('/login');
  }
  const threadDetail = await getData(params.id, token.value);

  return (
    <>
      <main className="min-h-screen mx-auto max-w-[800px]">
        <Navbar />
        <div className="pt-24">
          <ThreadDetail threadDetail={threadDetail}  />
        </div>
      </main>
    </>
  )
}