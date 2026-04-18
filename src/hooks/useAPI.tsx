import { requestFn } from '@openapi-qraft/react'
import { createContext, useContext, useMemo } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { createAPIClient } from '#/api'

const APIContext = createContext<{
  api: ReturnType<typeof createApiClientInstance>
}>(null!)

function createApiClientInstance(queryClient: QueryClient) {
  return createAPIClient({
    requestFn,
    queryClient,
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }).api
}

const APIProvider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) => {
  const api = useMemo(() => createApiClientInstance(queryClient), [queryClient])

  return <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>
}

const useAPI = () => {
  const context = useContext(APIContext)
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider')
  }
  return context
}

export { APIProvider, useAPI }
