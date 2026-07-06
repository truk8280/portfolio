import { useEffect, useState } from "react";

type NavLink = { id: string; label: string };

const links: NavLink[] = [
  // TODO: Add nav links here.
];

function Nav() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b-[0.5px] border-line bg-page">
      <div className="mx-auto flex w-full max-w-3xl lg:max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <a
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-mono text-base font-medium text-primary no-underline"
        >
          kurtkroll<span className="text-accent">.dev</span>
        </a>

        {/* Desktop links */}
        <ul className="m-0 hidden list-none items-center gap-8 p-0 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`border-b-2 pb-1 text-[13px] no-underline transition-colors ${
                  active === link.id
                    ? "border-accent text-primary"
                    : "border-transparent text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/KurtResume2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-green-600 px-3 py-1.5 text-[13px] text-accent no-underline transition-colors hover:border-accent hover:text-accent-hover"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-1 text-secondary transition-colors hover:text-primary md:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <ul className="m-0 flex list-none flex-col gap-1 border-t-[0.5px] border-line px-4 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm no-underline transition-colors ${
                  active === link.id ? "text-primary" : "text-secondary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/KurtResume2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-accent no-underline"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Nav;
