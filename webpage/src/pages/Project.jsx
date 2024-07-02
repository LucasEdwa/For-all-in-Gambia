import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Announcements from "../components/Announcements";
function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2000/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data on fetch:", data); // Confirm the structure immediately after fetching
        setProject(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch project details");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>No project data found.</div>;

  const { description = {}, additionalText = {} } = project;

  console.log("Description Data:", description); // Log the data again right before using it

  return (
    <div className="flex flex-col items-start justify-center m-auto p-8  max-w-6xl xs:">
      <h1 className="text-4xl mb-5 bg-orange-200 p-2">{project.projectName}</h1>
      <h2 className="text-2xl mb-5">{project.organization}</h2>
      <h3 className="text-xl mb-5">{project.mission}</h3>
      <div className="mx-60 justify-center text-center gap-4 flex flex-col">
        {project.description.focusAreas.map((area, index) => (
          <div
            key={index}
            className="rounded w-full bg-gray-700 text-white p-4 gap-1 flex flex-col text-left "
          >
            {typeof area.description === "string" ? (
              <p className="text-base">{area.description}</p>
            ) : Array.isArray(area.description) &&
              typeof area.description[0] === "string" ? (
              area.description.map((item, idx) => (
                <p key={idx} className="text-base">
                  {item}
                </p>
              ))
            ) : (
              area.description.map((subArea, subIndex) => (
                <div className=" p-4 rounded-2xl" key={subIndex}>
                  <h5 className="text-lg mb-3 p-2">{subArea.component}</h5>
                  <p className="text-base">{subArea.description}</p>
                </div>
              ))
            )}
            {additionalText[area.component] && (
              <p className="text-base p-2">{additionalText[area.component]}</p>
            )}
          </div>
        ))}
      </div>
      <Announcements />
    </div>
  );
}

export default Project;
