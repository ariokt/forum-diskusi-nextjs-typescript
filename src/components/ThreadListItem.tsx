'use client';
import { postedAt } from "@/utils";
import parse from 'html-react-parser';
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";
import { apiLoveThread, apiUnloveThread } from "@/utils/utils";
import { useToast } from "@chakra-ui/react";


export interface Thread {
  id: string;
  body: string;
  category: string;
  createdAt: string;
  downVotesBy: string[];
  upVotesBy: string[];
  ownerId: string;
  title: string;
  totalComments: number;
  user: { id: string; name: string; email: string; avatar: string };
}

interface ThreadListItemProps {
  thread: Thread;
}

const ThreadListItem: React.FC<ThreadListItemProps> = ({ thread }) => {
  const cookies = new Cookies();
  const router = useRouter();
  const toast = useToast();
  const dataUser = cookies.get('dataUser');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (dataUser && thread.upVotesBy.includes(dataUser.id)) {
      setIsLiked(true);
    }
  }, []);
  
  const handleClickThread = (id: string): void => {
    if (!dataUser) {
      router.push('/login');
    } else {
      router.push(`/threads/${id}`)
    }
  }

  const handleClickLove = async () => {
    if (!dataUser) {
      router.push('/login');
    } else {
      const token = await cookies.get('userToken');
      try {
        setIsLiked(true);
        await apiLoveThread(thread.id, token);
      } catch (error) {
        setIsLiked(false);
        toast({
          position: 'top',
          title: 'Connection error!',
          description: "Please check your internet connection.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  const handleClickUnlove = async () => {
    const token = await cookies.get('userToken');
    try {
      setIsLiked(false);
      await apiUnloveThread(thread.id, token);
    } catch (error) {
      setIsLiked(true);
      toast({
        position: 'top',
        title: 'Connection error!',
        description: "Please check your internet connection.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <div className="p-4 flex gap-8 items-start" >
      <img alt="thread creator image" src={thread.user.avatar} width={60} className="rounded-full" />
      <div className="flex flex-col gap-1 w-full overflow-hidden">
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-2 items-center">
            <p><b>{thread.user.name}</b></p>
            <div className="border border-dotted border-black p-1 rounded">{thread.category}</div>
            <div className="cursor-pointer w-fit" >{ isLiked ? <FcLike onClick={handleClickUnlove} /> : <FcLikePlaceholder onClick={handleClickLove} /> }</div>
          </div>
          <p className="text-sm text-gray-500" suppressHydrationWarning>{postedAt(thread.createdAt)}</p>
        </div>
        <div className="cursor-pointer" onClick={() => handleClickThread(thread.id)}>
          <h2 className="font-medium">{thread.title}</h2>
          <div>{parse(thread.body)}</div>
          <hr className="mt-6" />
        </div>
      </div>
    </div>
  );
}

export default ThreadListItem;