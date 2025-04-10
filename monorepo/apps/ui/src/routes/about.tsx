import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { echoInput, useEcho } from "../features/about/use-api-echo";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const mEcho = useEcho();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validators: {
      onSubmit: echoInput,
    },
    onSubmit: async ({ value }) => {
      await mEcho.mutateAsync(value);
    },
  });

  return (
    <div className="flex flex-col gap-2 p-2">
      <span>Hello from About!</span>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <div className="flex flex-col gap-2">
          <form.Field
            name="firstName"
            children={(field) => {
              const error = field.state.meta.errors[0];
              return (
                <>
                  <label htmlFor={field.name} className="flex items-center gap-2">
                    <span>First Name:</span>
                    {error && (
                      <span className="font-semibold text-red-500 text-xs">({error.message})</span>
                    )}
                  </label>
                  <input
                    className="rounded-md border border-gray-300 p-2"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <form.Field
            name="lastName"
            children={(field) => {
              const error = field.state.meta.errors[0];
              return (
                <>
                  <label htmlFor={field.name} className="flex items-center gap-2">
                    <span>Last Name:</span>
                    {error && (
                      <span className="font-semibold text-red-500 text-xs">({error.message})</span>
                    )}
                  </label>
                  <input
                    className="rounded-md border border-gray-300 p-2"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <form.Field
            name="email"
            children={(field) => {
              const error = field.state.meta.errors[0];
              return (
                <>
                  <label htmlFor={field.name} className="flex items-center gap-2">
                    <span>Email:</span>
                    {error && (
                      <span className="font-semibold text-red-500 text-xs">({error.message})</span>
                    )}
                  </label>
                  <input
                    className="rounded-md border border-gray-300 p-2"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500">
                {isSubmitting ? "..." : "Submit"}
              </button>
              <button
                type="reset"
                onClick={() => form.reset()}
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500">
                Reset
              </button>
            </div>
          )}
        />
      </form>
    </div>
  );
}
