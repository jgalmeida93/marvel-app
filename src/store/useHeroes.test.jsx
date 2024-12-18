import "@testing-library/jest-dom/vitest";
import { describe, expect, vi, beforeEach, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { HeroesProvider, default as useHeroes } from "./useHeroes";

describe("useHeroes", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("initialize with empty heroes array", () => {
    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider,
    });

    expect(result.current.heroes).toEqual([]);
  });

  test("toggle hero like status", () => {
    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider,
    });

    const mockHero = {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "test", extension: "jpg" },
    };

    act(() => {
      result.current.toggleLike(mockHero);
    });

    expect(result.current.isHeroLiked(1)).toBe(true);

    act(() => {
      result.current.toggleLike(mockHero);
    });

    expect(result.current.isHeroLiked(1)).toBe(false);
  });

  test("fetch heroes successfully", async () => {
    const mockResponse = {
      data: {
        data: {
          results: [
            {
              id: 1,
              name: "Iron Man",
              thumbnail: { path: "test", extension: "jpg" },
            },
            {
              id: 2,
              name: "Thor",
              thumbnail: { path: "test", extension: "jpg" },
            },
          ],
          total: 2,
          limit: 20,
          offset: 0,
        },
      },
    };

    vi.stubGlobal("fetch", () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse.data),
      })
    );

    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider,
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.heroes).toHaveLength(2);
  });

  test("search heroes", async () => {
    const mockSearchResults = {
      data: {
        results: [{ id: 1, name: "Spider-Man" }],
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockSearchResults),
    });

    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider,
    });

    await act(async () => {
      result.current.searchHeroes("spider");
    });

    expect(result.current.searchMode).toBe(true);
  });

  test("persist liked heroes in localStorage", () => {
    const { result } = renderHook(() => useHeroes(), {
      wrapper: HeroesProvider,
    });

    const mockHero = {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "test", extension: "jpg" },
    };

    act(() => {
      result.current.toggleLike(mockHero);
    });

    const storedHeroes = JSON.parse(localStorage.getItem("likedHeroes"));
    expect(storedHeroes).toHaveLength(1);
    expect(storedHeroes[0].id).toBe(1);
  });
});
