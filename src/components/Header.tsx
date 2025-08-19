import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 pt-[env(safe-area-inset-top)]">
        <div
          className={`max-w-6xl mx-auto transition-all duration-300 relative ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg"
              : "bg-white/90 backdrop-blur-sm shadow-md"
          } rounded-full px-4 py-3 sm:px-6 sm:py-4 mt-2 md:mt-4`}
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.1}
            borderWidth={2}
          />
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/devcon-logo.svg" 
                alt="DEVCON Iligan Logo" 
                className="h-6 lg:h-8"
              />
              <span className="font-brand font-extrabold text-devcon-dark-gray text-sm lg:text-base leading-none">
                ILIGAN
              </span>
            </div>

            {/* Navigation and Actions */}
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
                <a
                  href="#home"
                  className="font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple transition-colors duration-200 text-sm lg:text-base focus:text-devcon-purple"
                  aria-label="Go to home section"
                >
                  HOME
                </a>
                <a
                  href="#about"
                  className="font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple transition-colors duration-200 text-sm lg:text-base focus:text-devcon-purple"
                  aria-label="Go to about section"
                >
                  ABOUT
                </a>
                <a
                  href="#contact"
                  className="font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple transition-colors duration-200 text-sm lg:text-base focus:text-devcon-purple"
                  aria-label="Go to contact section"
                >
                  CONTACT
                </a>
              </nav>

              {/* Join Community Button */}
              <Button 
                variant="outline" 
                className="hidden md:inline-flex font-brand font-medium text-sm lg:text-base px-6 py-2 rounded-full border-devcon-dark-gray/20 hover:bg-devcon-purple hover:text-white hover:border-devcon-purple transition-all duration-200"
                onClick={() => window.open('https://facebook.com/devconiligan', '_blank')}
              >
                JOIN US
              </Button>

              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button aria-label="Open menu" variant="ghost" className="md:hidden p-2 hover:bg-devcon-dark-gray/10 rounded-full">
                    <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                      <div className="w-full h-0.5 bg-devcon-dark-gray"></div>
                      <div className="w-full h-0.5 bg-devcon-dark-gray"></div>
                      <div className="w-full h-0.5 bg-devcon-dark-gray"></div>
                    </div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="pt-[env(safe-area-inset-top)]">
                  <nav className="mt-6 flex flex-col gap-4">
                    <a
                      href="#home"
                      className="font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple transition-colors duration-200 text-base"
                    >
                      HOME
                    </a>
                    <a
                      href="#about"
                      className="font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple transition-colors duration-200 text-base"
                    >
                      ABOUT
                    </a>
                    <a
                      href="#contact"
                      className="font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple transition-colors duration-200 text-base"
                    >
                      CONTACT
                    </a>
                  </nav>
                  <div className="mt-8">
                    <Button 
                      variant="outline" 
                      className="w-full font-brand font-medium text-base px-6 py-3 rounded-full border-devcon-dark-gray/20 hover:bg-devcon-purple hover:text-white hover:border-devcon-purple transition-all duration-200"
                      onClick={() => window.open('https://facebook.com/devconiligan', '_blank')}
                    >
                      JOIN US
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;