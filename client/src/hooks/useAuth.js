import { useAuth as useAuthContext } from '../app/providers'

// Re-export the auth context hook for convenience
export const useAuth = () => {
  return useAuthContext()
}

export default useAuth