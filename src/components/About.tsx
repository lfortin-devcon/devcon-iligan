import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, Lightbulb, Network, Target, Award, Zap, Globe } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Cutting-edge tech",
      description: "Hands-on workshops and training on AI, web, mobile, cloud, and open source.",
      color: "text-devcon-purple"
    },
    {
      icon: Users,
      title: "Community driven",
      description: "Monthly meetups and networking that connect students, pros, and educators.",
      color: "text-devcon-orange"
    },
    {
      icon: Lightbulb,
      title: "Innovation focus",
      description: "Hackathons and challenges that tackle real problems with real impact.",
      color: "text-devcon-yellow"
    },
    {
      icon: Network,
      title: "National network",
      description: "Powered by DEVCON's nationwide community and DEVCON Summit access.",
      color: "text-devcon-green"
    }
  ];

  const offerings = [
    {
      icon: Zap,
      title: "Workshops & Training",
      description: "Hands-on sessions on emerging technologies to keep you ahead of the curve",
      color: "text-devcon-purple"
    },
    {
      icon: Users,
      title: "Community Meetups",
      description: "Regular networking events connecting developers, students, and professionals",
      color: "text-devcon-orange"
    },
    {
      icon: Award,
      title: "Hackathons & Challenges",
      description: "Tech competitions that solve real-world problems with innovative solutions",
      color: "text-devcon-yellow"
    },
    {
      icon: Globe,
      title: "DEVCON Summit Access",
      description: "Connect with top speakers covering AI, software, open source, Web3, and more",
      color: "text-devcon-green"
    }
  ];

  const stats = [
    {
      number: "2k+",
      label: "Attendees reached",
      color: "text-devcon-purple"
    },
    {
      number: "2022",
      label: "Founded",
      color: "text-devcon-orange"
    },
    {
      number: "2009",
      label: "DEVCON network since",
      color: "text-devcon-green"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 space-y-16">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="devcon-subtitle mb-6 text-devcon-dark-gray">
            About DEVCON Iligan
          </h2>
        </div>

        {/* Introduction Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="mb-4 bg-devcon-purple/10 text-devcon-purple border-devcon-purple/20">
                Philippines' Largest Tech Community
              </Badge>
            </div>
            <div className="text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto font-brand leading-relaxed space-y-6">
              <p className="text-center">
                DEVCON Iligan is the local chapter of <strong>Developers Connect (DEVCON)</strong> — the Philippines'
                largest volunteer tech community and nonprofit for developers, IT enthusiasts, and
                future tech leaders.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`devcon-heading text-3xl lg:text-4xl ${stat.color} mb-2`}>
                      {stat.number}
                    </div>
                    <p className="font-brand font-semibold text-muted-foreground text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-center">
                Since our founding in 2022, we serve Iligan City and Lanao del Norte with a clear goal: 
                build a strong, inclusive, and future‑ready tech community. We've reached 
                <span className="devcon-heading text-devcon-purple ml-1">2k+ attendees</span> across programs and events.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="border-2 border-devcon-purple/20 bg-gradient-to-br from-devcon-purple/5 to-transparent">
          <CardHeader className="text-center pb-4">
            <Target className="w-8 h-8 text-devcon-purple mx-auto mb-2" />
            <CardTitle className="devcon-heading text-devcon-dark-gray">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-center text-base lg:text-lg text-muted-foreground font-brand leading-relaxed mb-6">
              To empower local developers, students, professionals, and educators by providing a platform 
              to collaborate, share knowledge, and grow together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge className="bg-devcon-purple/10 text-devcon-purple border-devcon-purple/20 hover:bg-devcon-purple/20">
                <Zap className="w-3 h-3 mr-1" />
                Sync
              </Badge>
              <Badge className="bg-devcon-orange/10 text-devcon-orange border-devcon-orange/20 hover:bg-devcon-orange/20">
                <Users className="w-3 h-3 mr-1" />
                Support
              </Badge>
              <Badge className="bg-devcon-green/10 text-devcon-green border-devcon-green/20 hover:bg-devcon-green/20">
                <Award className="w-3 h-3 mr-1" />
                Succeed
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* National Network Connection */}
        <Card className="border-2 border-border/50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Network className="w-12 h-12 text-devcon-green mx-auto mb-4" />
              <h3 className="devcon-heading text-xl text-devcon-dark-gray mb-4">
                Part of the National DEVCON Network
              </h3>
            </div>
            <div className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto font-brand leading-relaxed space-y-4">
              <p>
                As part of the national DEVCON network, DEVCON Iligan benefits from the experience and
                reach of a community that has been organizing tech unconferences, hackathons, and
                innovation challenges across the country since <strong>2009</strong>.
              </p>
              <p>
                We bring the same spirit of innovation and collaboration to Northern Mindanao, tailored 
                to the unique needs and talents of our local community.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <div>
          <h3 className="devcon-heading text-2xl text-center text-devcon-dark-gray mb-8">
            What We Offer
          </h3>
          <p className="text-center text-muted-foreground font-brand mb-8 max-w-2xl mx-auto">
            Through partnerships with schools, local tech groups, government agencies, and industry leaders, 
            DEVCON Iligan provides:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {offerings.map((offering, index) => (
              <Card key={index} className="border-2 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <offering.icon className={`w-8 h-8 ${offering.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div>
                      <h4 className="devcon-heading text-base mb-2 text-devcon-dark-gray">
                        {offering.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-brand leading-relaxed">
                        {offering.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-2 border-devcon-orange/20 bg-gradient-to-br from-devcon-orange/5 to-transparent">
          <CardContent className="p-8 text-center">
            <h4 className="devcon-heading text-xl text-devcon-dark-gray mb-4">
              Join Our Community
            </h4>
            <p className="text-base lg:text-lg text-muted-foreground font-brand leading-relaxed max-w-2xl mx-auto">
              Whether you're a student exploring the tech world, a professional seeking growth, or
              someone passionate about innovation, DEVCON Iligan is your local gateway to the wider
              tech movement in the Philippines.
            </p>
          </CardContent>
        </Card>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <feature.icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="devcon-heading text-sm mb-3 text-devcon-dark-gray">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-brand leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;