import { HeroesProvider } from "@/store/useHeroes";

export const TestWrapper = ({ children }) => {
  return <HeroesProvider>{children}</HeroesProvider>;
};
