import { useQuery } from "@tanstack/react-query";

import { fetcher } from "../../services/fetcher";

export function useApiHealthcheck() {
  return useQuery({
    queryKey: ["useApiHealthcheck"],
    queryFn: async ({ signal }) => {
      const res = await fetcher.get("/", { signal });
      return res.data;
    },
  });
}
