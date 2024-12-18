import "@testing-library/jest-dom/vitest";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "./index";

vi.mock("../Navbar/index.jsx", () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>,
}));

vi.mock("../HeroList/index.jsx", () => ({
  HeroList: () => <div data-testid="hero-list-mock">HeroList Mock</div>,
}));

describe("Home Component", () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
  test("renders without crashing", () => {
    render(<Home />);
    expect(document.querySelector(".min-h-screen")).toBeTruthy();
  });

  test("renders Navbar component", () => {
    render(<Home />);
    expect(screen.getByTestId("navbar-mock")).toBeTruthy();
  });

  test("renders HeroList component", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-list-mock")).toBeTruthy();
  });
});
