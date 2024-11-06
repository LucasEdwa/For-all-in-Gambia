import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
import Donation from "../components/donation/Donation";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <div className="home-page ">
      <Hero1 />
      <Hero2 />
      <Donation />
      <Projects />
    </div>
  );
}
