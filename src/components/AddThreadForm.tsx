'use client'
import useInput from "@/hooks/useInput";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { apiCreateThread } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    [{ color: [] }],
    ['code-block'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'align',
  'color',
  'code-block',
];

const AddThreadForm: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const toast = useToast();
  const [title, handleInputTitle] = useInput('');
  const [category, handleInputCategory] = useInput('');
  const [body, setBody] = useState('');

  const handleEditorChange = (newContent: string): void => {
    setBody(newContent);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (title && body) {
        const data = { title, body, category }
        const response = await apiCreateThread(data, token);
        console.log(response);
        if (response.data.status === 'success') {
          toast({
            position: 'top',
            title: 'Thread created successfully!',
            description: "Thread berhasil dibuat!",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          router.push('/', { scroll: false });
        }
      } else {
        window.alert('Mohon lengkapi data terlebih dahulu!')
      }
    } catch (error: any) {
      window.alert(error.response.data.message);
    }
  }

  return (
    <div className="shadow-md py-4 px-8">
      <h1 className="text-lg font-bold mb-4">Create New Thread</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Title" className="w-full p-2 border rounded" value={title} onChange={handleInputTitle} required />
          <input type="text" placeholder="Category" className="w-full p-2 border rounded" value={category} onChange={handleInputCategory} />
        </div>
        <QuillEditor
          value={body}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="w-full h-[70%] bg-white"
        />
        <button type="submit" className="p-2 bg-black text-white w-fit rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddThreadForm;