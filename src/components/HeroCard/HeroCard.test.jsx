import "@testing-library/jest-dom/vitest";
import { describe, expect, vi, beforeEach, test } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { HeroCard } from "./index";
import useHeroes from "../../store/useHeroes";

vi.mock("../../store/useHeroes.jsx");

describe("HeroCard", () => {
  const mockHero = {
    id: 1,
    name: "Spider-Man",
    thumbnail: {
      path: "path/to/image",
      extension: "jpg",
    },
  };

  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  test("renders hero card with correct information", () => {
    useHeroes.mockReturnValue({
      isHeroLiked: () => false,
      toggleLike: vi.fn(),
    });

    render(<HeroCard hero={mockHero} />);

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByAltText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "path/to/image.jpg");
  });

  test("displays liked state correctly when hero is liked", () => {
    useHeroes.mockReturnValue({
      isHeroLiked: () => true,
      toggleLike: vi.fn(),
    });

    render(<HeroCard hero={mockHero} />);

    const likeButton = screen.getByRole("button");
    expect(likeButton).toHaveClass("text-red-500");
  });

  test("displays unliked state correctly when hero is not liked", () => {
    useHeroes.mockReturnValue({
      isHeroLiked: () => false,
      toggleLike: vi.fn(),
    });

    render(<HeroCard hero={mockHero} />);

    const likeButton = screen.getByRole("button");
    expect(likeButton).toHaveClass("text-gray-400");
  });

  test("calls toggleLike when like button is clicked", () => {
    const mockToggleLike = vi.fn();
    useHeroes.mockReturnValue({
      isHeroLiked: () => false,
      toggleLike: mockToggleLike,
    });

    render(<HeroCard hero={mockHero} />);

    const likeButton = screen.getByRole("button");
    fireEvent.click(likeButton);

    expect(mockToggleLike).toHaveBeenCalledWith(mockHero);
    expect(mockToggleLike).toHaveBeenCalledTimes(1);
  });
});
