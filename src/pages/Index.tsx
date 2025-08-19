import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 md:pt-24">
        <section id="home" aria-label="Hero section">
          <Hero />
        </section>
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
