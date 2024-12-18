import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Navbar from "@components/Navbar";
import { TestWrapper } from "@/test/utils";
import * as auth from "../../services/auth";

describe("Navbar", () => {
  afterEach(() => {
    cleanup();
  });
  test("renders the Marvel App logo", () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );
    expect(screen.getByText("Marvel App")).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );
    expect(screen.getByPlaceholderText("Search heroes...")).toBeInTheDocument();
  });

  test("handles search input with debounce", async () => {
    vi.useFakeTimers();
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    const searchInput = getByPlaceholderText("Search heroes...");
    fireEvent.change(searchInput, { target: { value: "Spider" } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    vi.useRealTimers();
  });

  // test("opens favorites modal when clicking favorites button", () => {
  //   render(
  //     <TestWrapper>
  //       <Navbar />
  //     </TestWrapper>
  //   );

  //   const favoritesButton = screen.getByText(/Favorites/i);
  //   fireEvent.click(favoritesButton);

  //   // Update this assertion based on your modal implementation
  //   expect(screen.getByRole("dialog")).toBeInTheDocument();
  // });

  test("closes favorites modal", () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    const favoritesButton = screen.getByText(/Favorites/i);
    fireEvent.click(favoritesButton);

    const closeButton = screen.getByTestId(/close-btn/i);
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls logout when clicking logout button", () => {
    const logoutSpy = vi.spyOn(auth, "logout");

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(logoutSpy).toHaveBeenCalled();
  });
});
