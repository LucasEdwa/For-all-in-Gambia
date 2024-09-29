import React, { useState, useEffect } from "react";
import hero3Img from "../images/hero3.jpg"; // Static image for all, can be dynamic per project
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <div className="projects">
      <div className="w-full projects-container">
        <div className="projects-box">
          <h1 className="text-2xl text-center p-4  ">
            Projects to our beautifull city:{" "}
          </h1>
          <div className="grid grid-cols-3 p-4 mx-36 xs:m-0 projects-btn xs:flex xs:flex-col xs:w-screen">
            {projects.map((project) => {
              const { id, projectName, img, mission } = project;
              return (
                <div key={id} className="p-4 project ">
                  <img
                    src={img || hero3Img}
                    alt={projectName}
                    className="w-full h-48 object-cover  "
                  />
                  <div className="project-box">
                    <Link
                      to={`/projects/${id}`}
                      className="text-sm no-underline text-black hover:underline"
                    >
                      <h2 className="text-base break-words">{projectName}</h2>
                    </Link>
                    <p className="text-xs h-24 text-justify items-center text-black">
                      {mission}
                    </p>
                    <Link
                      to={`/projects/${id}`}
                      className="text-sm no-underline text-black hover:underline"
                    >
                      <FontAwesomeIcon icon={faLayerGroup} />
                      Läs mer
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
