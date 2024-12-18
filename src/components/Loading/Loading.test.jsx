import "@testing-library/jest-dom/vitest";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./index";

describe("Loading Component", () => {
  test("render loading component", () => {
    render(<Loading />);
    const loadingElement = screen.getByTestId(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
