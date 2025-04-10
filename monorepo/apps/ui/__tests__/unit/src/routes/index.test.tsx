import { expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";

import { Route } from "../../../../src/routes/index";
import { setupFileRoute } from "../../../config/setup";

test("dom test", () => {
  document.body.innerHTML = "<button>My button</button>";
  const button = document.querySelector("button");
  expect(button).toBeInTheDocument();
  button?.remove();
  expect(button).not.toBeInTheDocument();
});

test("can use testing library", () => {
  render(<span data-testid="random-text">random text</span>);
  const randomText = screen.getByTestId("random-text");
  expect(randomText).toBeInTheDocument();
});

test("can render the route component", () => {
  render(setupFileRoute(Route));
  const heading = screen.getByText("Welcome Home!");
  expect(heading).toBeInTheDocument();
});
