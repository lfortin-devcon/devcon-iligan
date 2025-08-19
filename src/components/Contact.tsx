import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Facebook, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  
  const contactInfo = [
    {
      icon: Facebook,
      title: "Message us",
      content: "DEVCON Iligan FB page",
      link: "https://facebook.com/devconiligan",
      color: "text-devcon-purple"
    },
    {
      icon: Building,
      title: "Visit us",
      content: "iDEYA at MSU-IIT",
      address: "Mindanao State University - Iligan Institute of Technology",
      color: "text-devcon-orange"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Iligan City, Lanao del Norte",
      color: "text-devcon-green"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="devcon-subtitle mb-6 text-devcon-dark-gray">
            Get in touch
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-brand leading-relaxed">
            Have questions about DEVCON Iligan? Message us via our Facebook page or visit us at iDEYA 
            in MSU-IIT. We're here to help with volunteer opportunities, event inquiries, and collaboration.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {contactInfo.map((contact, index) => (
            <Card key={index} className="border-2 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <contact.icon className={`w-6 h-6 ${contact.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="devcon-heading text-xs mb-3 text-devcon-dark-gray">
                  {contact.title}
                </h3>
                {contact.link ? (
                  <a 
                    href={contact.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground font-brand hover:text-devcon-purple transition-colors cursor-pointer focus:text-devcon-purple"
                    aria-label={`Visit ${contact.content}`}
                  >
                    {contact.content}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground font-brand">
                    {contact.content}
                  </p>
                )}
                {contact.address && (
                  <p className="text-xs text-muted-foreground/80 font-brand mt-2">
                    {contact.address}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-devcon-purple/10 via-devcon-orange/10 to-devcon-green/10 rounded-2xl p-12">
          <h3 className="devcon-subtitle mb-6 text-devcon-dark-gray">
            Ready to collaborate?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 font-brand max-w-2xl mx-auto">
            Host a meetup, run a workshop, or support a hackathon in Iligan. Let’s build the future together.
          </p>
          <div className="flex justify-center">
            <Button 
              className="bg-[#EA641D] hover:bg-[#EA641D]/90 text-white font-brand font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/volunteer')}
            >
              Volunteer today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;