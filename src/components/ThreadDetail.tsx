'use client';
import parse from 'html-react-parser';
import { postedAt } from "@/utils";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { useRouter } from 'next/navigation';
import { useToast } from "@chakra-ui/react";
import { apiLoveThread, apiUnloveThread } from '@/utils/utils';
import CommentsList from './CommentsList';
import { redirect } from "next/navigation";
import CommentAdd from './CommentAdd';

export interface ThreadDetail {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  owner: { id: string, name: string, avatar: string };
  category: string,
  comments: any[],
  upVotesBy: any[],
  downVotesBy: any[],
}

function ThreadDetail({ threadDetail }: { threadDetail: ThreadDetail }) {

  if (!threadDetail) {
    redirect('/');
  }

  const { id, title, body, createdAt, owner, category, comments, upVotesBy } = threadDetail;
  const router = useRouter();
  const toast = useToast();
  const cookies = new Cookies();
  const dataUser = cookies.get('dataUser');
  const [isLiked, setIsLiked] = useState(false);
  const [displayedComments, setDisplayedComments] = useState(comments);

  useEffect(() => {
    if (dataUser && upVotesBy.includes(dataUser.id)) {
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
        await apiLoveThread(id, token);
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
      await apiUnloveThread(id, token);
    } catch (error) {
      setIsLiked(true);
      toast({
        position: 'top',
        title: 'Connection error!',
        description: "Please check your internet connection.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  
  return (
    <>
      <div className="p-4 shadow-md mb-60">
        <div className='flex gap-8 items-start mb-8'>
          <img alt="thread creator image" src={owner.avatar} width={60} className="rounded-full" />
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex gap-2 items-center">
                <p><b>{owner.name}</b></p>
                <div className="border border-dotted border-black p-1 rounded">{category}</div>
                <div className="cursor-pointer w-fit" >{ isLiked ? <FcLike onClick={handleClickUnlove} /> : <FcLikePlaceholder onClick={handleClickLove} /> }</div>
              </div>
              <p className="text-sm text-gray-500">{postedAt(createdAt)}</p>
            </div>
            <h2 className="font-medium">{title}</h2>
            <div>{parse(body)}</div>
          </div>
        </div>
        <div className="mb-4">
          <h5 className="mb-2 text-md font-bold">
            Komentar (
            {comments.length}
            )
          </h5>
          <CommentsList comments={displayedComments} threadId={id} />
        </div>
      </div>
      <CommentAdd threadId={id} listComments={{displayedComments, setDisplayedComments}} />
    </>
  );
}

export default ThreadDetail;