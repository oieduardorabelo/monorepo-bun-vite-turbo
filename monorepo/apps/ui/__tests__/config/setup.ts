import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// biome-ignore lint/suspicious/noExplicitAny: no clear way to type this
export function setupFileRoute(route: any) {
  const RouteComponent = route.options.component;

  if (!RouteComponent) {
    throw new Error("Route component is undefined");
  }

  return createElement(QueryClientProvider, { client: queryClient }, createElement(RouteComponent));
}
