import { useSession } from "@/lib/auth-client";

export function useUser() {
  const { data, isPending, error } = useSession();

  return {
    user: data?.user || null,
    loading: isPending,
    error,
  };
}
