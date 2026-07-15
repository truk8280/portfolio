"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = { href: string; label: string };

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/timer", label: "Chaos Countdown" },
];

function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const normalize = (p: string) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  const isActive = (href: string) => normalize(pathname) === normalize(href);

  return (
    <nav className="sticky top-0 z-50 border-b-[0.5px] border-line bg-page">
      <div className="mx-auto flex w-full max-w-3xl lg:max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 font-mono text-lg font-medium text-primary no-underline"
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className="mt-px">
            kurtkroll<span className="text-accent">.dev</span>
          </span>
        </Link>

        <ul className="m-0 hidden list-none items-center p-0 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-block border-b-2 px-3 py-2 -my-2 text-[13px] no-underline transition-colors ${
                  isActive(link.href)
                    ? "border-accent text-primary"
                    : "border-transparent text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/KurtResume2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-green-600 ml-2 px-3 py-1.5 text-[13px] text-accent no-underline transition-colors hover:border-accent hover:text-accent-hover"
            >
              Resume
            </a>
          </li>
        </ul>

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

      {menuOpen && (
        <ul className="m-0 flex list-none flex-col gap-1 border-t-[0.5px] border-line px-4 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block -mx-2 px-2 py-3 text-sm no-underline transition-colors ${
                  isActive(link.href) ? "text-accent" : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/KurtResume2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-secondary no-underline"
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
