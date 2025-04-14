import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../components/landing-page";
import { useApiHealthcheck } from "../domains/home/use-api-healthcheck";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const qApiHealthcheck = useApiHealthcheck();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {qApiHealthcheck.isLoading ? <span>Loading...</span> : null}
      {qApiHealthcheck.isError ? <span>Error</span> : null}
      {qApiHealthcheck.isSuccess ? <LandingPage /> : null}
    </div>
  );
}
