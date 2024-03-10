import Image from "next/image";

function LoginWithSosmed({ children, image }: { children: React.ReactNode, image: string }) {
  return (
    <button className="w-full flex items-center justify-center font-medium rounded-full border border-neutral-30 py-4 px-2">
      <Image alt="Apple Login" src={ image } />
      <span className="text-xs pt-1">{ children }</span>
    </button>
  );
}

export default LoginWithSosmed; 