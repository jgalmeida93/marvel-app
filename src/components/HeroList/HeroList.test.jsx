import "@testing-library/jest-dom/vitest";
import { describe, expect, vi, beforeEach, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroList } from "./index";
import useHeroes from "@store/useHeroes";

vi.mock("../../store/useHeroes.jsx");

vi.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: vi.fn(), inView: true }),
}));

vi.mock("../HeroCard", () => ({
  HeroCard: ({ hero }) => <div>{hero.name}</div>,
}));

describe("HeroList", () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
  test("renders loading state correctly", () => {
    useHeroes.mockReturnValue({
      loading: true,
      hasMore: true,
      loadMore: vi.fn(),
      searchTerm: "",
      searchResults: [],
      heroes: [],
    });

    render(<HeroList />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders hero list correctly", () => {
    const mockHeroes = [
      { id: 1, name: "Spider-Man" },
      { id: 2, name: "Iron Man" },
    ];

    useHeroes.mockReturnValue({
      loading: false,
      hasMore: true,
      loadMore: vi.fn(),
      searchTerm: "",
      searchResults: [],
      heroes: mockHeroes,
    });

    render(<HeroList />);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
  });

  test("renders search results when search term exists", () => {
    const mockSearchResults = [{ id: 1, name: "Spider-Man" }];

    useHeroes.mockReturnValue({
      loading: false,
      hasMore: true,
      loadMore: vi.fn(),
      searchTerm: "spider",
      searchResults: mockSearchResults,
      heroes: [],
    });

    render(<HeroList />);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  test("shows no results message when search yields no results", () => {
    useHeroes.mockReturnValue({
      loading: false,
      hasMore: false,
      loadMore: vi.fn(),
      searchTerm: "nonexistent",
      searchResults: [],
      heroes: [],
    });

    render(<HeroList />);
    expect(screen.getByText(/No heroes found for/i)).toBeInTheDocument();
  });
});
