import Image, { type StaticImageData } from "next/image";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: StaticImageData;
  href: string;
};

function ProjectCard({ title, description, tags, image, href }: Project) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border-[0.5px] border-line bg-surface no-underline transition-colors hover:border-white-700"
    >
      <div className="relative m-3 mb-0 aspect-16/10 overflow-hidden rounded-lg bg-white-300">
        {image && (
          <Image
            src={image}
            alt={`${title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="flex items-center gap-1 text-sm font-medium text-primary">
          {title}
          <svg
            className="project-arrow text-muted transition-colors duration-200 group-hover:text-accent"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </h3>

        <p className="text-sm leading-relaxed text-secondary">{description}</p>

        <ul className="mt-auto flex list-none flex-wrap gap-2 p-0 pt-1">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded bg-tint px-2 py-0.5 font-mono text-[11px] text-tint-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}

export default ProjectCard;
