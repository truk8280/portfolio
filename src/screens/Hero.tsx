function Hero() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-3xl lg:max-w-5xl pt-16 px-4 md:px-6"
    >
      <div className="max-w-140">
        <p className="mb-4 font-mono text-lg text-accent">// about</p>

        <h1 className="text-[32px] font-medium leading-tight text-primary">
          Kurt Kroll
        </h1>

        <p className="mt-6 text-lg leading-[1.7] text-secondary">
          I'm a full-stack developer who lives in React and data-heavy
          interfaces. I build simulation tools and research dashboards for
          fantasy sports turning messy player data into fast, readable UIs. I
          care about clean architecture, tight feedback loops, and interfaces
          that make complex decisions feel simple.
        </p>
      </div>
    </section>
  );
}

export default Hero;
