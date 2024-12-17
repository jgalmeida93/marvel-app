import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroesProvider } from "./store/useHeroes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroesProvider>
      <App />
    </HeroesProvider>
  </StrictMode>
);
