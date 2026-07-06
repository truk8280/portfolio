import Nav from "./screens/Nav";
import Hero from "./screens/Hero";
import Projects from "./screens/Projects";
import Footer from "./screens/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Nav />
      <main>
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;
