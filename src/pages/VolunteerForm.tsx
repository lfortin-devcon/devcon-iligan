import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase, type VolunteerApplication } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedEvent = searchParams.get('event');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    event: "",
    skills: [] as string[],
    experience: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const eventDisplayNames = {
    'devcon-geekup': 'DEVCON GeekUp',
    'campus-devcon': 'Campus DEVCON'
  };

  const eventTextColorClass = selectedEvent === 'devcon-geekup'
    ? 'text-devcon-orange'
    : selectedEvent === 'campus-devcon'
    ? 'text-devcon-green'
    : '';

  const submitButtonClasses = selectedEvent === 'devcon-geekup'
    ? 'bg-devcon-orange hover:bg-devcon-orange/90'
    : selectedEvent === 'campus-devcon'
    ? 'bg-devcon-green hover:bg-devcon-green/90'
    : 'bg-[#EA641D] hover:bg-[#EA641D]/90';

  const availableSkills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Node.js",
    "PHP",
    "HTML/CSS",
    "UI/UX Design",
    "Graphic Design",
    "Project Management",
    "Event Planning",
    "Public Speaking",
    "Content Writing",
    "Social Media Management",
    "Photography",
    "Video Editing",
    "Marketing",
    "Data Analysis",
    "Database Management",
    "Mobile Development",
    "Web Development",
    "DevOps",
    "Cybersecurity",
    "Other"
  ];


  useEffect(() => {
    if (selectedEvent) {
      setFormData(prev => ({
        ...prev,
        event: selectedEvent
      }));
    }
  }, [selectedEvent]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.event) newErrors.event = "Please select an event";
    if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill";
    if (!formData.motivation.trim()) newErrors.motivation = "Motivation is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    
    // Clear skills error when user selects a skill
    if (errors.skills) {
      setErrors(prev => ({
        ...prev,
        skills: ""
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const applicationData: VolunteerApplication = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        event: formData.event,
        skills: formData.skills.join(', '),
        experience: formData.experience || null,
        motivation: formData.motivation,
        availability: null,
      };

      const { error } = await supabase
        .from('volunteer_applications')
        .insert([applicationData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for volunteering. We'll be in touch soon.",
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-devcon-dark-gray font-brand mb-2">
            Thank you for volunteering!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 font-brand leading-relaxed">
            Your application has been submitted successfully. We'll review your information and get back to you within 2-3 business days.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-devcon-purple hover:bg-devcon-purple/90 font-brand font-semibold px-8 py-3"
          >
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/volunteer")}
            className="mb-6 font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to event selection
          </Button>
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-devcon-dark-gray font-brand mb-3">
              {selectedEvent ? (
                <>
                  Volunteer form for {""}
                  <span className={`${eventTextColorClass}`}>
                    {eventDisplayNames[selectedEvent as keyof typeof eventDisplayNames]}
                  </span>
                </>
              ) : (
                'Volunteer form'
              )}
            </h1>
            <p className="text-lg lg:text-xl text-[#464646] font-brand font-medium max-w-4xl mx-auto leading-relaxed">
              Join DEVCON's mission to empower the Philippine tech community
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand"
                  placeholder="+63 912 345 6789"
                />
              </div>
            </div>

            {/* Event Selection */}
            <div>
              <label htmlFor="event" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                Select event to volunteer for *
              </label>
              <select
                id="event"
                name="event"
                value={formData.event}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                  errors.event ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose an event</option>
                <option value="devcon-geekup">DEVCON GeekUp</option>
                <option value="campus-devcon">Campus DEVCON</option>
              </select>
              {errors.event ? (
                <p className="text-red-500 text-sm mt-1">{errors.event}</p>
              ) : (
                <p className="text-sm text-muted-foreground mt-2 font-brand">
                  Select which DEVCON event you'd like to volunteer for
                </p>
              )}
            </div>

            {/* Skills and Experience */}
            <div>
              <label className="block text-sm font-medium text-devcon-dark-gray font-brand mb-4">
                Technical skills (select all that apply) *
              </label>
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-xl ${
                errors.skills ? 'border-red-500' : 'border-gray-300'
              }`}>
                {availableSkills.map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="rounded border-gray-300 text-devcon-purple focus:ring-devcon-purple"
                    />
                    <span className="text-sm font-brand text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
              {formData.skills.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground font-brand mb-2">Selected skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span key={skill} className="bg-devcon-purple/10 text-devcon-purple px-3 py-1 rounded-full text-sm font-brand">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className="ml-2 text-devcon-purple/60 hover:text-devcon-purple"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
              )}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                Education level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand"
              >
                <option value="">Select your education level</option>
                <option value="high-school">High School</option>
                <option value="1st-year">1st Year College</option>
                <option value="2nd-year">2nd Year College</option>
                <option value="3rd-year">3rd Year College</option>
                <option value="4th-year">4th Year College</option>
                <option value="graduate">College Graduate</option>
                <option value="masters">Master's Degree</option>
                <option value="professional">Professional/Working</option>
              </select>
            </div>

            {/* Motivation */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                Why do you want to volunteer with DEVCON? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand resize-none ${
                  errors.motivation ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us about your motivation to volunteer and how you'd like to contribute..."
              />
              {errors.motivation && (
                <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>
              )}
            </div>


            {/* Submit Button */}
            <div className="text-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`${submitButtonClasses} font-brand font-semibold text-base px-10 py-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isSubmitting ? 'Submitting application' : 'Submit volunteer application'}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit application
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;