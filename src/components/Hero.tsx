import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import TestimonialCard from "@/components/ui/testimonial-card";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" aria-label="DEVCON Iligan main introduction">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 right-0 w-full h-48 rounded-lg bg-devcon-yellow/10 blur-3xl"></div>
        <div className="absolute top-3/4 left-0 right-0 w-full h-72 rounded-lg bg-devcon-purple/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 right-0 w-full h-56 rounded-lg bg-devcon-green/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 text-center max-w-6xl">
        {/* Main Title */}
        <div className="mb-10 lg:mb-12">
          <div className="mb-4">
            <PointerHighlight 
              pointerClassName="h-4 w-4 lg:h-5 lg:w-5 text-devcon-purple"
              rectangleClassName="border-2 border-devcon-purple rounded-md"
              containerClassName="inline-block"
            >
              <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight text-devcon-dark-gray font-brand leading-tight px-3 py-1">
                DEVCON Iligan chapter
              </h1>
            </PointerHighlight>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-devcon-dark-gray font-brand leading-[0.9]">
            Building a future‑ready tech community
          </h2>
        </div>

        {/* Description */}
        <div className="mb-16 lg:mb-20">
          <p className="text-lg sm:text-xl md:text-2xl text-[#464646] mb-8 sm:mb-10 max-w-4xl mx-auto font-brand font-semibold text-center leading-relaxed px-4">
            We are the local chapter of Developers Connect (DEVCON) serving Iligan City and Lanao del Norte since 2022.
          </p>
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-brand leading-relaxed text-center">
              Our mission is to empower students, professionals, and educators to sync, support, and succeed through workshops, meetups, and hackathons—powered by the nationwide DEVCON network since 2009.
            </p>
          </div>
        </div>

        {/* Volunteer Section */}
        <div className="mb-16 lg:mb-20">
          <div className="flex justify-center">
            <Button 
              className="bg-[#EA641D] hover:bg-[#EA641D]/90 font-brand font-semibold text-base lg:text-lg px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-[#EA641D] focus:ring-offset-2"
              onClick={() => navigate('/volunteer')}
              aria-label="Join as a volunteer for DEVCON Iligan events"
            >
              Become a volunteer
            </Button>
          </div>
        </div>

        {/* Brand Elements */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/30 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-devcon-yellow shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-devcon-orange shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-devcon-purple shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-devcon-green shadow-sm"></div>
            </div>
            <span className="font-brand font-semibold text-devcon-dark-gray text-sm tracking-wide">
              Powered by community
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;