import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Users, GraduationCap, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventSelection = () => {
  const navigate = useNavigate();

  const handleEventSelect = (eventType: string) => {
    navigate(`/volunteer/form?event=${eventType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-devcon-dark-gray font-brand mb-6">
              Choose your event
            </h1>
            <p className="text-xl text-[#464646] font-brand font-semibold max-w-3xl mx-auto leading-relaxed">
              Select which DEVCON event you'd like to volunteer for
            </p>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* DEVCON GeekUp Card */}
          <Card className="bg-devcon-orange w-full h-auto shadow-lg border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <CardContent className="h-full flex flex-col p-6">
              <div className="text-left flex-grow">
                <h2 className="text-2xl font-extrabold text-white font-brand mb-4 drop-shadow-sm">
                  DEVCON GeekUp
                </h2>
                <p className="text-white/90 font-brand text-sm leading-relaxed mb-6">
                  Monthly community meetups bringing together developers, designers, and tech enthusiasts.
                </p>
                
                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-white/80" />
                    <span className="font-brand font-semibold text-white">March 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="font-brand text-white/90">6:00 PM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-white/80" />
                    <span className="font-brand text-white/90">Iligan City Convention Center</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => handleEventSelect('devcon-geekup')}
                  className="w-full bg-white hover:bg-white/90 text-devcon-orange font-brand font-bold text-base py-3 rounded-lg transition-colors duration-200"
                >
                  Volunteer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Campus DEVCON Card */}
          <Card className="bg-devcon-green w-full h-auto shadow-lg border-0 rounded-2xl hover:shadow-xl transition-shadow duration-300">
            <CardContent className="h-full flex flex-col p-6">
              <div className="text-left flex-grow">
                <h2 className="text-2xl font-extrabold text-white font-brand mb-4 drop-shadow-sm">
                  Campus DEVCON
                </h2>
                <p className="text-white/90 font-brand text-sm leading-relaxed mb-6">
                  Bringing tech education to schools and universities across the Philippines.
                </p>
                
                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-white/80" />
                    <span className="font-brand font-semibold text-white">March 20-22, 2024</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="font-brand text-white/90">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-white/80" />
                    <span className="font-brand text-white/90">Various Universities</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => handleEventSelect('campus-devcon')}
                  className="w-full bg-white hover:bg-white/90 text-devcon-green font-brand font-bold text-base py-3 rounded-lg transition-colors duration-200"
                >
                  Volunteer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-base text-muted-foreground font-brand max-w-2xl mx-auto leading-relaxed">
            Both events offer unique opportunities to contribute to the Philippine tech community. 
            Choose the one that aligns with your interests and availability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventSelection;