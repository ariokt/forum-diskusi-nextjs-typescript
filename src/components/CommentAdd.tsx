'use client';
import { Spinner } from '@chakra-ui/react';
import Cookies from "universal-cookie";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { VscSend } from "react-icons/vsc";
import { apiCreateComment, apiGetThreadDetail } from '@/utils/utils';
import { useToast } from "@chakra-ui/react";

import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const quillModules = {
  toolbar: [
    ['image', 'video'],
  ],
};

const quillFormats = [
  'image',
  'video'
];

interface CommentAddProps {
  threadId: string;
  listComments: {
    displayedComments: any[];
    setDisplayedComments: React.Dispatch<React.SetStateAction<any[]>>;
  };
}

const CommentAdd: React.FC<CommentAddProps> = ({ threadId, listComments }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const toast = useToast();

  const handleEditorChange = (newContent: string): void => {
    setContent(newContent);
  };

  const handleSend = async (e:any) => {
    e.preventDefault();
    const token = await cookies.get('userToken');
    try {
      if (content) {
        setLoading(true);
        const data = { content };
        const response = await apiCreateComment(data, threadId, token);
        if (response.data.status === 'success') {
          const threadDetail = await apiGetThreadDetail(threadId, token);
          listComments.setDisplayedComments(threadDetail.comments);
          toast({
            position: 'top',
            title: 'Comment created successfully!',
            description: "Comment berhasil dibuat!",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        window.alert('Comment belum diisi!');
      }
    } catch (error: any) {
      window.alert('Comment gagal terkirim!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-md border-t p-4 max-w-[800px] z-50">
      <h5 className="mb-2 font-bold">Beri Komentar</h5>
      <form onSubmit={handleSend}>
        <QuillEditor
            value={content}
            placeholder='Write comment ...'
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] bg-white mb-2"
        />
        <div className='w-fit float-end md:float-start'>
          {
            loading ?
            <button className="p-2 bg-gray-500 text-white w-fit rounded mb-2 flex items-center" ><Spinner className='mr-2' size='sm' /> Send</button>
            :
            <button type="submit" className="p-2 bg-black text-white w-fit rounded mb-2 flex items-center" ><VscSend className='mr-2' /> Send</button>
          }
        </div>
      </form>
    </div>
  )
}

export default CommentAdd