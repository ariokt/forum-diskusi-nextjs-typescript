'use client';
import { postedAt } from "@/utils";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useToast } from "@chakra-ui/react";
import { apiLoveComment, apiUnloveComment, } from "@/utils/utils";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  downVotesBy: string[];
  upVotesBy: string[];
  owner: { id: string; name: string; avatar: string };
}

interface CommentsItem {
  comment: Comment;
  lastIndex: Boolean;
  threadId: string;
}

const CommentsItem: React.FC<CommentsItem> = ({ comment, lastIndex, threadId }) => {
  const cookies = new Cookies();
  const router = useRouter();
  const dataUser = cookies.get('dataUser');
  const toast = useToast();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (dataUser && comment.upVotesBy.includes(dataUser.id)) {
      setIsLiked(true);
    }
  }, []);

  const handleClickLove = async () => {
    if (!dataUser) {
      router.push('/login');
    } else {
      const token = await cookies.get('userToken');
      try {
        setIsLiked(true);
        await apiLoveComment(threadId, comment.id, token);
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
      await apiUnloveComment(threadId, comment.id, token);
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
    <div className="px-4 py-1 flex gap-8 items-stretch" >
      <div>
        <img alt="thread creator image" src={comment.owner.avatar} width={60} className="rounded-full" />
        {!lastIndex && <div className="min-h-8 border-r border-slate-300 w-fit mx-auto" style={{height:"100%"}} />}
      </div>
      <div className="flex flex-col gap-1 w-full overflow-hidden">
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-2 items-center">
            <p><b>{comment.owner.name}</b></p>
            <div className="cursor-pointer w-fit" >{ isLiked ? <FcLike onClick={handleClickUnlove} /> : <FcLikePlaceholder onClick={handleClickLove} /> }</div>
          </div>
          <p className="text-sm text-gray-500" suppressHydrationWarning>{postedAt(comment.createdAt)}</p>
        </div>
        <div>
          <div>{parse(comment.content)}</div>
          <hr className="mt-6" />
        </div>
      </div>
    </div>
  );
}

export default CommentsItem;