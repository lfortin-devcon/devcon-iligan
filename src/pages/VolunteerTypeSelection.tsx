import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserPlus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VolunteerTypeSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedEvent = searchParams.get('event');

  const eventDisplayNames = {
    'devcon-geekup': 'DEVCON GeekUp',
    'campus-devcon': 'Campus DEVCON'
  };

  const eventColorClass = selectedEvent === 'devcon-geekup'
    ? 'text-devcon-orange'
    : selectedEvent === 'campus-devcon'
    ? 'text-devcon-green'
    : '';

  const handleVolunteerTypeSelect = (volunteerType: string) => {
    navigate(`/volunteer/form?event=${selectedEvent}&type=${volunteerType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/volunteer")}
            className="mb-8 font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to event selection
          </Button>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-devcon-dark-gray font-brand mb-6">
              Volunteer for {""}
              <span className={eventColorClass}>
                {eventDisplayNames[selectedEvent as keyof typeof eventDisplayNames]}
              </span>
            </h1>
            <p className="text-xl text-[#464646] font-brand font-semibold max-w-3xl mx-auto leading-relaxed">
              Are you new to DEVCON or an existing community member?
            </p>
          </div>
        </div>

        {/* Volunteer Type Buttons */}
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          <Button 
            onClick={() => handleVolunteerTypeSelect('new-volunteer')}
            className="w-full bg-devcon-purple hover:bg-devcon-purple/90 text-white font-brand font-bold text-lg py-6 rounded-xl transition-colors duration-200"
          >
            <UserPlus className="w-6 h-6 mr-3" />
            New Volunteer
          </Button>
          
          <Button 
            onClick={() => handleVolunteerTypeSelect('existing-member')}
            className="w-full bg-devcon-green hover:bg-devcon-green/90 text-white font-brand font-bold text-lg py-6 rounded-xl transition-colors duration-200"
          >
            <Users className="w-6 h-6 mr-3" />
            Existing Member
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-base text-muted-foreground font-brand max-w-2xl mx-auto leading-relaxed">
            Don't worry if you're not sure - we welcome volunteers of all experience levels and backgrounds!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerTypeSelection;