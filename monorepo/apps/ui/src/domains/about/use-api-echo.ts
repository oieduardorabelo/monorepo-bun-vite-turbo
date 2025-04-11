import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { fetcher } from "../../services/fetcher";

export const echoInput = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export const echoOutput = echoInput;

export function useEcho() {
  return useMutation({
    mutationFn: async (formData: z.infer<typeof echoInput>) => {
      const res = await fetcher.post<z.infer<typeof echoOutput>>("/echo", formData);
      return res.data;
    },
  });
}
