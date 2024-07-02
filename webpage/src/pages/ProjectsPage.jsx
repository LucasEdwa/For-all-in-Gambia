import Projects from "../components/Projects";
import birdGif from "../images/birdGif.gif";

export default function ProjectsPage() {
  return (
    <div className="container-project-page">
      <div className="flex flex-col items-center w-full gap-5 projectsPage">
        <h2 className="bg-transparent p-2 rounded mb-2 mt-2 text-center underline decoration-[#3e9090]">
          Läs om våra projekt
        </h2>

        <div className="relative flex flex-col items-center w-full gap-5">
          <p className=" bg-transparent p-2 text-[#3e9090] top-[16.7rem] rounded mb-2">
            Här hittar du information om de projekt som vi arbetar med.
          </p>
          <img
            className="w-[30rem] h-[8rem] object-cover rounded mb-2"
            src={birdGif}
            alt="bird"
          />
        </div>
      </div>
      <section className="flex flex-col items-center w-full gap-5 projects">
        <Projects />
      </section>
    </div>
  );
}
