import fs from 'fs';
import path from 'path';
import Project from "@/components/Project";

export default function Home() {
  const gamesFolder = path.join(process.cwd(), 'src', 'app', 'games');
  const files = fs.readdirSync(gamesFolder);

  return (
    <div className="home-page">
      <h1 className="title">React Projects</h1>
      <div className="projects">
        {files.map((arquivo, index) => {
          let data;
          try {
            data = fs.readFileSync(path.join(gamesFolder, arquivo, 'info.json'), 'utf-8');
          } catch {
            return
          }
          const info = JSON.parse(data);
          return (
            <Project key={index} name={info.name} description={info.description} link={arquivo} />
          )
        })}
      </div>
    </div>
  );
}
