import ProjectCard, { type Project } from "../components/ProjectCard";
import footballAppImg from "../assets/football-app.webp";
import myLeaguesImg from "../assets/myleagues.webp";
import picksAndPropsImg from "../assets/picks-and-props.webp";
import dfsOptimizerImg from "../assets/dfs-optimizer.webp";
import nhlLineupsImg from "../assets/nhl-lineups.webp";
import partnersImg from "../assets/partners.webp";

function getDFSOptimizerHref() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (
    (month === 9 && day >= 1) ||
    month === 10 ||
    month === 11 ||
    month === 12
  ) {
    return "https://www.rotowire.com/daily/nfl/optimizer.php";
  }

  if (month === 1 || month === 2 || (month === 3 && day <= 31)) {
    return "https://www.rotowire.com/daily/nba/optimizer.php";
  }

  return "https://www.rotowire.com/daily/mlb/optimizer.php";
}

const projects: Project[] = [
  {
    title: "RotoWire Fantasy Football",
    description:
      "Architected and shipped this hybrid React Native app with 90% code reuse across iOS and Android. Served as technical lead for the team's React Native adoption, setting code-review standards and mentoring on component design patterns. An early adopter of AI-assisted development with Claude Code, integrating it into daily workflows to accelerate delivery.",
    tags: ["React Native", "IOS", "Android", "API Design"],
    image: footballAppImg,
    href: "https://play.google.com/store/apps/details?id=com.rotowire.football",
  },
  {
    title: "Picks & Props",
    description:
      "Co-developed this React Native app for iOS and Android and built all user-management screens: login, profile settings, push preferences, and an in-app help center. Integrated a new subscription provider that drove a 20% revenue increase, with PHP RESTful APIs supplying dynamic data across the app.",
    tags: ["React Native", "IOS", "Android", "API Design"],
    image: picksAndPropsImg,
    href: "https://www.rotowire.com/picks/",
  },
  {
    title: "DFS Optimizer",
    description:
      "Engineered the core algorithm, processing user-defined constraints and player data to generate statistically optimal DFS lineups.",
    tags: ["Hungarian Algorithm", "React", "Data Visualization"],
    image: dfsOptimizerImg,
    href: getDFSOptimizerHref(),
  },
  {
    title: "MyLeagues",
    description:
      "Built a streamlined league sync flow that pulls in third-party league info, teams, and players, processes that data, and outputs it to a league-specific dashboard stocked with the best fantasy tools for your roster.",
    tags: ["React", "Data Processing", "API Design"],
    image: myLeaguesImg,
    href: "https://www.rotowire.com/myleagues/",
  },
  {
    title: "NHL Advanced Lineups",
    description:
      "Designed and developed this tool to show confirmed NHL lineups with line-by-line stats, goalie splits, and goal-scoring and shot-volume matchup visualizations.",
    tags: ["React", "Data Visualization", "Full Stack"],
    image: nhlLineupsImg,
    href: "https://www.rotowire.com/hockey/advanced-lineups/",
  },
  {
    title: "B2B Data Partners",
    description:
      "Designed and developed customizable RESTful APIs for high-profile sports companies like ESPN, Yahoo, and CBS. Responses can toggle between JSON and XML, and API components are reusable across multiple partners to speed up new integrations.",
    tags: ["PHP", "RESTful APIs", "B2B"],
    image: partnersImg,
    href: "https://www.rotowire.com/partner/",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-3xl lg:max-w-5xl pt-16 px-4 md:px-6"
    >
      <p className="mb-6 font-mono text-lg text-accent">// projects</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
