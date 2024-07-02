import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
import Donation from "../components/donation/Donation";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <div className="home-page lg:w-full sx:w-screen xs:flex xs:flex-col">
      <Hero1 />
      <Hero2 />
      <Donation />
      <Projects />
    </div>
  );
}
