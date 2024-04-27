// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { createContext, useMemo, useState } from 'react'

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({loading: false, setLoading: () => {}});

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  const loadingContext = useMemo(() => {
    return {
      loading,
      setLoading
    }
  }, [loading]);

  return (
    <ChakraProvider>
      <LoadingContext.Provider value={loadingContext}>
        {children}
      </LoadingContext.Provider>
    </ChakraProvider>
  )
}