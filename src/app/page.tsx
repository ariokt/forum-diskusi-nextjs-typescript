import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import ThreadList from "@/components/ThreadList";
import { apiGetAllThreads, apiGetAllUsers } from "@/utils/utils";
import Link from "next/link";
import AddThreadLinkButton from "@/components/AddThreadLinkButton";

export const metadata: Metadata = {
  title: "Threads Dashboard",
  description: "The best website to make threads and communicate with other people",
};

async function getData() {
  try {
    const resThreads = await apiGetAllThreads();
    const resUsers = await apiGetAllUsers();
    return { threads: resThreads, users: resUsers };
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
}

export default async function Home() {
  const { threads, users } = await getData();

  const threadList = threads.map((thread: any) => ({
    ...thread,
    user: users.find((user: any) => user.id === thread.ownerId),
  }));

  return (
    <>
      <main className="min-h-screen mx-auto max-w-[800px]">
        <Navbar />
        <div className="pt-24">
          <ThreadList threads={threadList} />
        </div>
      </main>
      <AddThreadLinkButton />
    </>
  );
}
