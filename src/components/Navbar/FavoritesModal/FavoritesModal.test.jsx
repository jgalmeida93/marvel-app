import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { FavoritesModal } from "./index";
import useHeroes from "../../../store/useHeroes";

vi.mock("../../../store/useHeroes.jsx");

describe("FavoritesModal", () => {
  const mockToggleLike = vi.fn();
  const mockHeroes = [
    {
      id: 1,
      name: "Iron Man",
      thumbnail: {
        path: "http://example.com/ironman",
        extension: "jpg",
      },
    },
    {
      id: 2,
      name: "Spider-Man",
      thumbnail: {
        path: "http://example.com/spiderman",
        extension: "jpg",
      },
    },
  ];

  beforeEach(() => {
    useHeroes.mockImplementation(() => ({
      toggleLike: mockToggleLike,
    }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders nothing when isOpen is false", () => {
    render(
      <FavoritesModal isOpen={false} onClose={() => {}} likedHeroes={[]} />
    );
    expect(
      screen.queryByRole("heading", { name: /favorite heroes/i })
    ).not.toBeInTheDocument();
  });

  test("renders modal with title when isOpen is true", () => {
    render(
      <FavoritesModal isOpen={true} onClose={() => {}} likedHeroes={[]} />
    );
    expect(
      screen.getByRole("heading", { name: /favorite heroes/i })
    ).toBeInTheDocument();
  });

  test('displays "No favorite heroes yet" when likedHeroes is empty', () => {
    render(
      <FavoritesModal isOpen={true} onClose={() => {}} likedHeroes={[]} />
    );
    expect(screen.getByText(/no favorite heroes yet/i)).toBeInTheDocument();
  });

  test("renders hero cards for each liked hero", () => {
    render(
      <FavoritesModal
        isOpen={true}
        onClose={() => {}}
        likedHeroes={mockHeroes}
      />
    );
    mockHeroes.forEach((hero) => {
      expect(screen.getByText(hero.name)).toBeInTheDocument();
    });
  });

  test("calls toggleLike when remove button is clicked", () => {
    render(
      <FavoritesModal
        isOpen={true}
        onClose={() => {}}
        likedHeroes={mockHeroes}
      />
    );
    const removeButtons = screen.getAllByTitle("Remove from favorites");
    fireEvent.click(removeButtons[0]);
    expect(mockToggleLike).toHaveBeenCalledWith(mockHeroes[0]);
  });

  test("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(
      <FavoritesModal isOpen={true} onClose={mockOnClose} likedHeroes={[]} />
    );
    const closeButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders pagination when heroes exceed heroesPerPage", () => {
    const manyHeroes = Array(10)
      .fill()
      .map((_, index) => ({
        id: index,
        name: `Hero ${index}`,
        thumbnail: {
          path: "http://example.com/hero",
          extension: "jpg",
        },
      }));

    render(
      <FavoritesModal
        isOpen={true}
        onClose={() => {}}
        likedHeroes={manyHeroes}
      />
    );
    const paginationButton = screen.getByRole("button", { name: "2" });
    expect(paginationButton).toBeInTheDocument();
  });

  test("changes page when pagination button is clicked", () => {
    const manyHeroes = Array(10)
      .fill()
      .map((_, index) => ({
        id: index,
        name: `Hero ${index}`,
        thumbnail: {
          path: "http://example.com/hero",
          extension: "jpg",
        },
      }));

    render(
      <FavoritesModal
        isOpen={true}
        onClose={() => {}}
        likedHeroes={manyHeroes}
      />
    );
    const paginationButton = screen.getByRole("button", { name: "2" });
    fireEvent.click(paginationButton);
    expect(screen.getByText("Hero 9")).toBeInTheDocument();
  });
});
