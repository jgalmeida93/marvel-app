import { HeroList } from "../HeroList/index";
import Navbar from "../Navbar/index";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroList />
      <main className="pt-16 px-4 sm:px-6 lg:px-8"></main>
    </div>
  );
}
