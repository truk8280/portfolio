const socials = [
  { label: "GitHub", href: "https://github.com/truk8280" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kurt-kroll" },
  { label: "Email", href: "mailto:kmkroll15@gmail.com" },
];

function Footer() {
  return (
    <footer className="mt-20 border-t-[0.5px] border-line">
      <div className="mx-auto flex flex-col sm:flex-row  items-center justify-between w-full max-w-3xl lg:max-w-5xl gap-3 py-6 px-4 md:px-8">
        <p className="text-xs text-muted">&copy; 2026 Kurt Kroll</p>
        <ul className="m-0 flex list-none items-center gap-6 p-0">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm text-accent no-underline transition-colors hover:text-accent-hover"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
