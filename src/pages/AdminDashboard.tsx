import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, ClipboardList, Download, Eye, Trash2, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, type VolunteerApplication, type Member } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'applications' | 'members' | 'analytics'>('applications');
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const eventDisplayNames = {
    'devcon-geekup': 'DEVCON GeekUp',
    'campus-devcon': 'Campus DEVCON'
  };

  const committeeDisplayNames = {
    'registration': 'Registration & Check-in',
    'logistics': 'Logistics & Setup',
    'tech-support': 'Technical Support',
    'photography': 'Photography & Media',
    'networking': 'Networking & Hospitality',
    'content': 'Content & Social Media',
    'coordination': 'School Coordination',
    'workshop-assist': 'Workshop Assistant',
    'student-mentor': 'Student Mentoring',
    'tech-setup': 'Technical Setup',
    'documentation': 'Documentation & Media',
    'outreach': 'Student Outreach',
    'general': 'General Support'
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [applicationsResponse, membersResponse] = await Promise.all([
        supabase.from('volunteer_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('members').select('*').order('created_at', { ascending: false })
      ]);

      if (applicationsResponse.error) {
        console.error('Error fetching applications:', applicationsResponse.error);
      } else {
        setApplications(applicationsResponse.data || []);
      }

      if (membersResponse.error) {
        console.error('Error fetching members:', membersResponse.error);
      } else {
        setMembers(membersResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application deleted successfully",
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSkillsAnalysis = () => {
    const skillCounts: Record<string, number> = {};
    const allApplications = [...applications, ...members];
    
    allApplications.forEach(item => {
      if (item.skills) {
        const skills = item.skills.split(',').map(skill => skill.trim());
        skills.forEach(skill => {
          if (skill) {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(skillCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15);
  };

  const getCommitteeDistribution = () => {
    const committeeCounts: Record<string, number> = {};
    applications.forEach(app => {
      if (app.committee) {
        const displayName = committeeDisplayNames[app.committee as keyof typeof committeeDisplayNames] || app.committee;
        committeeCounts[displayName] = (committeeCounts[displayName] || 0) + 1;
      }
    });
    return Object.entries(committeeCounts).sort(([,a], [,b]) => b - a);
  };

  const getEventStats = () => {
    const eventCounts = applications.reduce((acc, app) => {
      const eventName = eventDisplayNames[app.event as keyof typeof eventDisplayNames] || app.event;
      acc[eventName] = (acc[eventName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return eventCounts;
  };

  const getVolunteerTypeStats = () => {
    const typeCounts = applications.reduce((acc, app) => {
      const type = app.volunteer_type === 'new-volunteer' ? 'New Volunteers' : 'Existing Members';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return typeCounts;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-devcon-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-devcon-dark-gray font-brand">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-devcon-dark-gray font-brand mb-2">
                DEVCON Admin Dashboard
              </h1>
              <p className="text-lg text-[#464646] font-brand">
                Manage volunteer applications and community members
              </p>
            </div>
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="font-brand"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to home
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ClipboardList className="w-8 h-8 text-devcon-orange mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-brand">Total Applications</p>
                  <p className="text-2xl font-bold text-devcon-dark-gray font-brand">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-devcon-green mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-brand">Community Members</p>
                  <p className="text-2xl font-bold text-devcon-dark-gray font-brand">{members.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ClipboardList className="w-8 h-8 text-devcon-purple mr-4" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-brand">GeekUp Applications</p>
                  <p className="text-2xl font-bold text-devcon-dark-gray font-brand">
                    {applications.filter(app => app.event === 'devcon-geekup').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => setActiveTab('applications')}
            variant={activeTab === 'applications' ? 'default' : 'outline'}
            className="font-brand"
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Applications
          </Button>
          <Button
            onClick={() => setActiveTab('members')}
            variant={activeTab === 'members' ? 'default' : 'outline'}
            className="font-brand"
          >
            <Users className="w-4 h-4 mr-2" />
            Members
          </Button>
          <Button
            onClick={() => setActiveTab('analytics')}
            variant={activeTab === 'analytics' ? 'default' : 'outline'}
            className="font-brand"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-brand">Volunteer Applications</CardTitle>
                <Button
                  onClick={() => exportToCSV(applications, 'volunteer-applications.csv')}
                  variant="outline"
                  className="font-brand"
                  disabled={applications.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-brand">No volunteer applications yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Name</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Email</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Event</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Committee</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Type</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Applied</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 font-brand">{app.first_name} {app.last_name}</td>
                          <td className="py-3 font-brand text-sm">{app.email}</td>
                          <td className="py-3 font-brand text-sm">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              app.event === 'devcon-geekup' 
                                ? 'bg-devcon-orange/10 text-devcon-orange' 
                                : 'bg-devcon-green/10 text-devcon-green'
                            }`}>
                              {eventDisplayNames[app.event as keyof typeof eventDisplayNames]}
                            </span>
                          </td>
                          <td className="py-3 font-brand text-sm">
                            {committeeDisplayNames[app.committee as keyof typeof committeeDisplayNames] || app.committee}
                          </td>
                          <td className="py-3 font-brand text-sm">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              app.volunteer_type === 'new-volunteer'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {app.volunteer_type === 'new-volunteer' ? 'New' : 'Member'}
                            </span>
                          </td>
                          <td className="py-3 font-brand text-sm">
                            {app.created_at ? new Date(app.created_at).toLocaleDateString() : '-'}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const details = `
Name: ${app.first_name} ${app.last_name}
Email: ${app.email}
Phone: ${app.phone || 'Not provided'}
Event: ${eventDisplayNames[app.event as keyof typeof eventDisplayNames]}
Committee: ${committeeDisplayNames[app.committee as keyof typeof committeeDisplayNames] || app.committee}
Type: ${app.volunteer_type === 'new-volunteer' ? 'New Volunteer' : 'Existing Member'}
Skills: ${app.skills || 'None provided'}
Experience: ${app.experience || 'Not provided'}
Motivation: ${app.motivation || 'Not provided'}
Applied: ${app.created_at ? new Date(app.created_at).toLocaleString() : 'Unknown'}
                                  `.trim();
                                  alert(details);
                                }}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteApplication(app.id!)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-brand">Community Members</CardTitle>
                <Button
                  onClick={() => exportToCSV(members, 'community-members.csv')}
                  variant="outline"
                  className="font-brand"
                  disabled={members.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-brand">No community members yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Name</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Email</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Phone</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Experience</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Skills</th>
                        <th className="font-brand font-semibold text-devcon-dark-gray pb-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 font-brand">{member.first_name} {member.last_name}</td>
                          <td className="py-3 font-brand text-sm">{member.email}</td>
                          <td className="py-3 font-brand text-sm">{member.phone || '-'}</td>
                          <td className="py-3 font-brand text-sm">{member.experience || '-'}</td>
                          <td className="py-3 font-brand text-sm max-w-xs truncate" title={member.skills || ''}>
                            {member.skills || '-'}
                          </td>
                          <td className="py-3 font-brand text-sm">
                            {member.created_at ? new Date(member.created_at).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Skills Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="font-brand flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Skills Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Top Skills */}
                  <div>
                    <h3 className="font-brand font-semibold text-devcon-dark-gray mb-4">Most Popular Skills</h3>
                    <div className="space-y-3">
                      {getSkillsAnalysis().map(([skill, count], index) => (
                        <div key={skill} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center text-white mr-3 ${
                              index < 3 ? 'bg-devcon-orange' : index < 6 ? 'bg-devcon-green' : 'bg-devcon-purple'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-brand text-sm">{skill}</span>
                          </div>
                          <span className="font-brand font-semibold text-devcon-dark-gray">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Categories */}
                  <div>
                    <h3 className="font-brand font-semibold text-devcon-dark-gray mb-4">Skills by Category</h3>
                    <div className="space-y-4">
                      {(() => {
                        const skills = getSkillsAnalysis();
                        const programmingSkills = skills.filter(([skill]) => 
                          ['JavaScript', 'Python', 'Java', 'C++', 'PHP', 'React', 'Node.js'].includes(skill)
                        );
                        const emergingTech = skills.filter(([skill]) => 
                          ['Artificial Intelligence (AI)', 'Machine Learning', 'IoT (Internet of Things)', 'Blockchain', 'Cloud Computing', 'AR/VR Development', 'Robotics', 'Data Science', 'Big Data', 'Edge Computing'].includes(skill)
                        );
                        const designSkills = skills.filter(([skill]) => 
                          ['UI/UX Design', 'Graphic Design', 'Photography', 'Video Editing'].includes(skill)
                        );

                        return (
                          <>
                            <div className="p-4 bg-blue-50 rounded-xl">
                              <h4 className="font-brand font-semibold text-blue-800 mb-2">Programming & Development</h4>
                              <p className="font-brand text-blue-700">{programmingSkills.reduce((sum, [,count]) => sum + count, 0)} people</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-xl">
                              <h4 className="font-brand font-semibold text-purple-800 mb-2">Emerging Technologies</h4>
                              <p className="font-brand text-purple-700">{emergingTech.reduce((sum, [,count]) => sum + count, 0)} people</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl">
                              <h4 className="font-brand font-semibold text-green-800 mb-2">Design & Media</h4>
                              <p className="font-brand text-green-700">{designSkills.reduce((sum, [,count]) => sum + count, 0)} people</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Committee & Event Analytics */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Committee Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-brand flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Committee Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getCommitteeDistribution().map(([committee, count]) => (
                      <div key={committee} className="flex items-center justify-between">
                        <span className="font-brand text-sm">{committee}</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className="bg-devcon-purple h-2 rounded-full"
                              style={{ width: `${(count / applications.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-brand font-semibold text-devcon-dark-gray text-sm">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event & Type Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-brand flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Registration Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Event Stats */}
                    <div>
                      <h4 className="font-brand font-semibold text-devcon-dark-gray mb-3">By Event</h4>
                      <div className="space-y-2">
                        {Object.entries(getEventStats()).map(([event, count]) => (
                          <div key={event} className="flex items-center justify-between">
                            <span className="font-brand text-sm">{event}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-brand ${
                              event.includes('GeekUp') 
                                ? 'bg-devcon-orange/10 text-devcon-orange' 
                                : 'bg-devcon-green/10 text-devcon-green'
                            }`}>
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Volunteer Type Stats */}
                    <div>
                      <h4 className="font-brand font-semibold text-devcon-dark-gray mb-3">By Volunteer Type</h4>
                      <div className="space-y-2">
                        {Object.entries(getVolunteerTypeStats()).map(([type, count]) => (
                          <div key={type} className="flex items-center justify-between">
                            <span className="font-brand text-sm">{type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-brand ${
                              type === 'New Volunteers'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Management */}
            <Card>
              <CardHeader>
                <CardTitle className="font-brand">Skills Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Emerging Tech Group */}
                  <div className="p-4 border border-purple-200 rounded-xl bg-purple-50/50">
                    <h4 className="font-brand font-semibold text-purple-800 mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Emerging Tech
                    </h4>
                    <div className="space-y-2">
                      {getSkillsAnalysis()
                        .filter(([skill]) => ['Artificial Intelligence (AI)', 'Machine Learning', 'IoT (Internet of Things)', 'Blockchain', 'Cloud Computing', 'AR/VR Development', 'Robotics', 'Data Science', 'Big Data', 'Edge Computing'].includes(skill))
                        .map(([skill, count]) => (
                          <div key={skill} className="flex justify-between items-center text-sm">
                            <span className="font-brand text-purple-700">{skill}</span>
                            <span className="font-brand font-semibold text-purple-800">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Development Group */}
                  <div className="p-4 border border-blue-200 rounded-xl bg-blue-50/50">
                    <h4 className="font-brand font-semibold text-blue-800 mb-3 flex items-center">
                      <PieChart className="w-4 h-4 mr-2" />
                      Development
                    </h4>
                    <div className="space-y-2">
                      {getSkillsAnalysis()
                        .filter(([skill]) => ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'PHP', 'HTML/CSS', 'Web Development', 'Mobile Development', 'DevOps'].includes(skill))
                        .map(([skill, count]) => (
                          <div key={skill} className="flex justify-between items-center text-sm">
                            <span className="font-brand text-blue-700">{skill}</span>
                            <span className="font-brand font-semibold text-blue-800">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Other Skills Group */}
                  <div className="p-4 border border-green-200 rounded-xl bg-green-50/50">
                    <h4 className="font-brand font-semibold text-green-800 mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Other Skills
                    </h4>
                    <div className="space-y-2">
                      {getSkillsAnalysis()
                        .filter(([skill]) => !['Artificial Intelligence (AI)', 'Machine Learning', 'IoT (Internet of Things)', 'Blockchain', 'Cloud Computing', 'AR/VR Development', 'Robotics', 'Data Science', 'Big Data', 'Edge Computing', 'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'PHP', 'HTML/CSS', 'Web Development', 'Mobile Development', 'DevOps'].includes(skill))
                        .map(([skill, count]) => (
                          <div key={skill} className="flex justify-between items-center text-sm">
                            <span className="font-brand text-green-700">{skill}</span>
                            <span className="font-brand font-semibold text-green-800">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Export Skills Data */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        const skillsData = getSkillsAnalysis().map(([skill, count]) => ({
                          skill,
                          count,
                          percentage: ((count / (applications.length + members.length)) * 100).toFixed(1) + '%'
                        }));
                        exportToCSV(skillsData, 'skills-analysis.csv');
                      }}
                      variant="outline"
                      className="font-brand"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Skills Data
                    </Button>
                    <Button
                      onClick={() => {
                        const committeeData = getCommitteeDistribution().map(([committee, count]) => ({
                          committee,
                          count,
                          percentage: ((count / applications.length) * 100).toFixed(1) + '%'
                        }));
                        exportToCSV(committeeData, 'committee-distribution.csv');
                      }}
                      variant="outline"
                      className="font-brand"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Committee Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;