import fs from "fs";
import path from "path";
import Project from "@/components/Project";

export default function Home() {
  // Isso roda apenas no servidor
  const gamesFolder = path.join(process.cwd(), "src", "app", "games");
  const files = fs.readdirSync(gamesFolder);

  const projects = files
    .map((arquivo) => {
      try {
        const data = fs.readFileSync(
          path.join(gamesFolder, arquivo, "info.json"),
          "utf-8"
        );
        const info = JSON.parse(data);
        return { ...info, folder: arquivo };
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return (
    <div className="home-page">
      <h1 className="title">React Projects</h1>
      <div className="projects">
        {projects.map((project, index) => (
          <Project
            key={index}
            name={project.name}
            description={project.description}
            link={project.folder}
          />
        ))}
      </div>
    </div>
  );
}
