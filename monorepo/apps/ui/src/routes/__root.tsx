import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AxiosError } from "axios";
import { Toaster, toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60 * 1000, // 1 minute
      retry: false,
      staleTime: 60 * 2000, // 2 minutes
      throwOnError: false,
    },
    mutations: {
      retry: false,
      throwOnError: false,
      // biome-ignore lint/suspicious/noExplicitAny: Zod Schemas are stringified, can't be typed
      onSuccess(data: any) {
        if (data.message) {
          toast.success(data.message);
        }
      },
      onError(error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          return;
        }

        toast.error("We hit an snag. Please try again later.");
      },
    },
  },
});

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <Toaster expand richColors closeButton position="top-right" />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
