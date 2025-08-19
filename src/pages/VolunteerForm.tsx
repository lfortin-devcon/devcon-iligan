import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase, type VolunteerApplication, type Member } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedEvent = searchParams.get('event');
  const volunteerType = searchParams.get('type');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    facebookLink: "",
    schoolOrganization: "",
    fieldOfInterest: "",
    event: "",
    volunteerType: "",
    committee: "",
    skills: [] as string[],
    teamPreferences: [] as string[],
    experience: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [memberSearch, setMemberSearch] = useState("");
  const [foundMember, setFoundMember] = useState<Member | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const eventDisplayNames = {
    'devcon-geekup': 'DEVCON GeekUp',
    'campus-devcon': 'Campus DEVCON'
  };

  const committeeOptions = {
    'devcon-geekup': [
      { value: 'registration', label: 'Registration & Check-in' },
      { value: 'logistics', label: 'Logistics & Setup' },
      { value: 'tech-support', label: 'Technical Support' },
      { value: 'photography', label: 'Photography & Media' },
      { value: 'networking', label: 'Networking & Hospitality' },
      { value: 'content', label: 'Content & Social Media' },
      { value: 'general', label: 'General Support' }
    ],
    'campus-devcon': [
      { value: 'coordination', label: 'School Coordination' },
      { value: 'workshop-assist', label: 'Workshop Assistant' },
      { value: 'student-mentor', label: 'Student Mentoring' },
      { value: 'tech-setup', label: 'Technical Setup' },
      { value: 'documentation', label: 'Documentation & Media' },
      { value: 'outreach', label: 'Student Outreach' },
      { value: 'general', label: 'General Support' }
    ]
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

  const fieldOfInterestOptions = [
    "Technology Education and Training",
    "Community Development and Outreach",
    "Mentorship and Coaching",
    "Technical Support and Project Management",
    "Entrepreneurship",
    "Marketing and Design",
    "Other"
  ];

  const teamPreferenceOptions = [
    "Community Engagement Team",
    "Sustainability and Finance Team",
    "Creatives and Marketing Team",
    "Technical and Operations Team",
    "People and Culture Team",
    "Entrepreneurs Team",
    "Developers Team",
    "Speakers Team",
    "Other"
  ];

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
    "Artificial Intelligence (AI)",
    "Machine Learning",
    "IoT (Internet of Things)",
    "Blockchain",
    "Cloud Computing",
    "AR/VR Development",
    "Robotics",
    "Data Science",
    "Big Data",
    "Edge Computing",
    "Other"
  ];


  useEffect(() => {
    if (selectedEvent) {
      setFormData(prev => ({
        ...prev,
        event: selectedEvent
      }));
    }
    if (volunteerType) {
      setFormData(prev => ({
        ...prev,
        volunteerType: volunteerType
      }));
    }
  }, [selectedEvent, volunteerType]);

  const searchMember = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFoundMember(null);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('email', searchQuery.trim())
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error searching member:', error);
        setFoundMember(null);
      } else if (data) {
        setFoundMember(data);
        setFormData(prev => ({
          ...prev,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone || "",
          experience: data.experience || ""
        }));
      } else {
        setFoundMember(null);
      }
    } catch (error) {
      console.error('Error searching member:', error);
      setFoundMember(null);
    } finally {
      setIsSearching(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Only validate personal info for new volunteers
    if (formData.volunteerType === 'new-volunteer') {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.facebookLink.trim()) newErrors.facebookLink = "Facebook link is required";
      if (!formData.schoolOrganization.trim()) newErrors.schoolOrganization = "School/organization is required";
      if (!formData.fieldOfInterest) newErrors.fieldOfInterest = "Field of interest is required";
      if (formData.teamPreferences.length === 0) newErrors.teamPreferences = "Please select at least one team preference";
    }
    if (!formData.volunteerType) newErrors.volunteerType = "Please select volunteer type";
    if (!formData.committee) newErrors.committee = "Please select a committee";
    if (formData.volunteerType === 'new-volunteer' && formData.skills.length === 0) newErrors.skills = "Please select at least one skill";
    if (formData.volunteerType === 'new-volunteer' && !formData.motivation.trim()) newErrors.motivation = "Motivation is required";
    if (formData.volunteerType === 'existing-member' && !foundMember) newErrors.memberSearch = "Please search and select your member profile";
    
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

  const handleTeamPreferenceToggle = (team: string) => {
    setFormData(prev => ({
      ...prev,
      teamPreferences: prev.teamPreferences.includes(team)
        ? prev.teamPreferences.filter(t => t !== team)
        : [...prev.teamPreferences, team]
    }));
    
    // Clear team preferences error when user selects a team
    if (errors.teamPreferences) {
      setErrors(prev => ({
        ...prev,
        teamPreferences: ""
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
        first_name: formData.volunteerType === 'existing-member' && foundMember ? foundMember.first_name : formData.firstName,
        last_name: formData.volunteerType === 'existing-member' && foundMember ? foundMember.last_name : formData.lastName,
        email: formData.volunteerType === 'existing-member' && foundMember ? foundMember.email : formData.email,
        phone: formData.volunteerType === 'existing-member' && foundMember ? foundMember.phone : formData.phone || null,
        facebook_link: formData.volunteerType === 'new-volunteer' ? formData.facebookLink : null,
        school_organization: formData.volunteerType === 'new-volunteer' ? formData.schoolOrganization : null,
        field_of_interest: formData.volunteerType === 'new-volunteer' ? formData.fieldOfInterest : null,
        team_preferences: formData.volunteerType === 'new-volunteer' ? formData.teamPreferences.join(', ') : null,
        event: formData.event,
        volunteer_type: formData.volunteerType,
        committee: formData.committee,
        skills: formData.volunteerType === 'new-volunteer' ? formData.skills.join(', ') : foundMember?.skills || null,
        experience: formData.volunteerType === 'existing-member' && foundMember ? foundMember.experience : formData.experience || null,
        motivation: formData.volunteerType === 'new-volunteer' ? formData.motivation : null,
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
            onClick={() => navigate(`/volunteer/type?event=${selectedEvent}`)}
            className="mb-6 font-brand font-medium text-devcon-dark-gray hover:text-devcon-purple"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to volunteer type selection
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
            {/* Member Search for Existing Members */}
            {formData.volunteerType === 'existing-member' && !foundMember && (
              <div>
                <label htmlFor="memberSearch" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                  Enter your email address *
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    id="memberSearch"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand"
                    placeholder="your.email@example.com"
                  />
                  <Button
                    type="button"
                    onClick={() => searchMember(memberSearch)}
                    disabled={isSearching || !memberSearch.trim()}
                    className="bg-devcon-green hover:bg-devcon-green/90 font-brand px-6"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-brand">
                  We'll look up your information using your email address
                </p>
                {errors.memberSearch && (
                  <p className="text-red-500 text-sm mt-2">{errors.memberSearch}</p>
                )}
              </div>
            )}

            {/* Show member info if found */}
            {foundMember && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-brand font-semibold text-green-800 mb-2">Member Found!</h3>
                <p className="font-brand text-green-700">
                  {foundMember.first_name} {foundMember.last_name} ({foundMember.email})
                </p>
              </div>
            )}

            {/* Personal Information - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
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
            )}

            {/* Contact Information - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
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
            )}

            {/* Facebook Link - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
            <div>
              <label htmlFor="facebookLink" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                Facebook Link *
              </label>
              <input
                type="url"
                id="facebookLink"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                  errors.facebookLink ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://facebook.com/yourprofile"
              />
              {errors.facebookLink && (
                <p className="text-red-500 text-sm mt-1">{errors.facebookLink}</p>
              )}
            </div>
            )}

            {/* School/Organization - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
            <div>
              <label htmlFor="schoolOrganization" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                What is the name your school/organization? *
              </label>
              <input
                type="text"
                id="schoolOrganization"
                name="schoolOrganization"
                value={formData.schoolOrganization}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                  errors.schoolOrganization ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your school or organization name"
              />
              {errors.schoolOrganization && (
                <p className="text-red-500 text-sm mt-1">{errors.schoolOrganization}</p>
              )}
            </div>
            )}

            {/* Field of Interest - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
            <div>
              <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                Field of Interest *
              </label>
              <select
                id="fieldOfInterest"
                name="fieldOfInterest"
                value={formData.fieldOfInterest}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                  errors.fieldOfInterest ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your field of interest</option>
                {fieldOfInterestOptions.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              {errors.fieldOfInterest && (
                <p className="text-red-500 text-sm mt-1">{errors.fieldOfInterest}</p>
              )}
            </div>
            )}

            {/* Committee Selection */}
            {formData.event && (formData.volunteerType === 'new-volunteer' || (formData.volunteerType === 'existing-member' && foundMember)) && (
              <div>
                <label htmlFor="committee" className="block text-sm font-medium text-devcon-dark-gray font-brand mb-2">
                  Preferred committee *
                </label>
                <select
                  id="committee"
                  name="committee"
                  value={formData.committee}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-devcon-purple focus:border-transparent font-brand ${
                    errors.committee ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a committee</option>
                  {committeeOptions[formData.event as keyof typeof committeeOptions]?.map((committee) => (
                    <option key={committee.value} value={committee.value}>
                      {committee.label}
                    </option>
                  ))}
                </select>
                {errors.committee && (
                  <p className="text-red-500 text-sm mt-1">{errors.committee}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2 font-brand">
                  Select the committee you'd most like to contribute to
                </p>
              </div>
            )}

            {/* Skills and Experience - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
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
            )}

            {/* Team Preferences - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
            <div>
              <label className="block text-sm font-medium text-devcon-dark-gray font-brand mb-4">
                I want to be in (choose as many as you want) *
              </label>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-xl ${
                errors.teamPreferences ? 'border-red-500' : 'border-gray-300'
              }`}>
                {teamPreferenceOptions.map((team) => (
                  <label key={team} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.teamPreferences.includes(team)}
                      onChange={() => handleTeamPreferenceToggle(team)}
                      className="rounded border-gray-300 text-devcon-purple focus:ring-devcon-purple"
                    />
                    <span className="text-sm font-brand text-gray-700">{team}</span>
                  </label>
                ))}
              </div>
              {formData.teamPreferences.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground font-brand mb-2">Selected teams:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.teamPreferences.map((team) => (
                      <span key={team} className="bg-devcon-purple/10 text-devcon-purple px-3 py-1 rounded-full text-sm font-brand">
                        {team}
                        <button
                          type="button"
                          onClick={() => handleTeamPreferenceToggle(team)}
                          className="ml-2 text-devcon-purple/60 hover:text-devcon-purple"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {errors.teamPreferences && (
                <p className="text-red-500 text-sm mt-1">{errors.teamPreferences}</p>
              )}
            </div>
            )}

            {/* Education Level - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
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
            )}

            {/* Motivation - Only for new volunteers */}
            {formData.volunteerType === 'new-volunteer' && (
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
            )}

            {/* Submit Button */}
            {(formData.volunteerType === 'new-volunteer' || (formData.volunteerType === 'existing-member' && foundMember)) && (
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;