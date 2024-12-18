import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, vi, beforeEach, afterEach, expect, test } from "vitest";
import { Login } from "./index";
import { signInWithGithub, signInWithGoogle } from "@services/auth";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("@services/auth", () => ({
  signInWithGithub: vi.fn(),
  signInWithGoogle: vi.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    // cleanup();
  });

  test("renders login component correctly", () => {
    render(<Login />);

    expect(screen.getByText("Welcome to Marvel App")).toBeDefined();
    expect(
      screen.getByText("Sign in to explore the Marvel universe")
    ).toBeDefined();
    expect(screen.getByText("Sign in with GitHub")).toBeDefined();
    expect(screen.getByText("Sign in with Google")).toBeDefined();
  });

  test("calls signInWithGithub when GitHub button is clicked", () => {
    render(<Login />);

    const githubButton = screen.getByTestId(/github-button/i);
    fireEvent.click(githubButton);

    expect(signInWithGithub).toHaveBeenCalledTimes(1);
  });

  test("calls signInWithGoogle when Google button is clicked", () => {
    render(<Login />);

    const googleButton = screen.getByTestId(/google-button/i);
    fireEvent.click(googleButton);

    expect(signInWithGoogle).toHaveBeenCalledTimes(1);
  });

  test("displays terms of service message", () => {
    render(<Login />);

    expect(
      screen.getByText(
        /By signing in, you agree to our Terms of Service and Privacy Policy/i
      )
    ).toBeDefined();
  });
});
