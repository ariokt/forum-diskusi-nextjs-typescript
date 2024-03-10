import { useState } from "react";

function useInput(defaultValue: string): any[] {
  const [input, setInput] = useState(defaultValue);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  return [input, handleInput];
}

export default useInput;