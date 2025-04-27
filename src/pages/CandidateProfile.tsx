
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useData } from '@/context/DataContext';
import type { CandidateProfile as CandidateProfileType, WorkExperience, Education } from '@/types';

const CandidateProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateCandidateProfile } = useData();
  
  const [profile, setProfile] = useState<Partial<CandidateProfileType>>({
    fullName: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
    education: []
  });
  
  const [skillsInput, setSkillsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role !== 'candidate') {
      navigate('/dashboard');
      return;
    }
    
    // Load existing profile if available
    if (currentUser.profile) {
      setProfile(currentUser.profile);
      if (currentUser.profile.skills) {
        setSkillsInput(currentUser.profile.skills.join(', '));
      }
    }
  }, [currentUser, navigate]);
  
  const handleChange = (field: keyof CandidateProfileType, value: any) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };
  
  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      from: new Date(),
      current: true,
      description: ''
    };
    
    setProfile({
      ...profile,
      experience: [...(profile.experience || []), newExperience]
    });
  };
  
  const handleUpdateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    if (!profile.experience) return;
    
    const updatedExperience = [...profile.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setProfile({
      ...profile,
      experience: updatedExperience
    });
  };
  
  const handleRemoveExperience = (index: number) => {
    if (!profile.experience) return;
    
    const updatedExperience = [...profile.experience];
    updatedExperience.splice(index, 1);
    
    setProfile({
      ...profile,
      experience: updatedExperience
    });
  };
  
  const handleAddEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      from: new Date(),
      current: false,
      to: new Date()
    };
    
    setProfile({
      ...profile,
      education: [...(profile.education || []), newEducation]
    });
  };
  
  const handleUpdateEducation = (index: number, field: keyof Education, value: any) => {
    if (!profile.education) return;
    
    const updatedEducation = [...profile.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setProfile({
      ...profile,
      education: updatedEducation
    });
  };
  
  const handleRemoveEducation = (index: number) => {
    if (!profile.education) return;
    
    const updatedEducation = [...profile.education];
    updatedEducation.splice(index, 1);
    
    setProfile({
      ...profile,
      education: updatedEducation
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!profile.fullName || !profile.location) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Convert skills from comma-separated string to array
      const skills = skillsInput.split(',').map(skill => skill.trim()).filter(Boolean);
      
      await updateCandidateProfile(currentUser!.id, {
        ...profile,
        skills
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {message.text && (
          <div className={`p-4 rounded-md mb-6 ${
            message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name*</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName || ''}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={profile.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your career goals..."
                  value={profile.bio || ''}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., JavaScript, React, Node.js, Project Management"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Work Experience</CardTitle>
              <Button type="button" variant="outline" onClick={handleAddExperience}>
                Add Experience
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!profile.experience || profile.experience.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
                  <p className="text-gray-500 mb-4">No work experience added yet</p>
                  <Button type="button" onClick={handleAddExperience}>
                    Add Work Experience
                  </Button>
                </div>
              ) : (
                profile.experience.map((exp, index) => (
                  <div key={exp.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Position {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                        <Input
                          id={`job-title-${index}`}
                          value={exp.title}
                          onChange={(e) => handleUpdateExperience(index, 'title', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(index, 'location', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`from-${index}`}>From</Label>
                        <Input
                          id={`from-${index}`}
                          type="date"
                          value={exp.from instanceof Date ? exp.from.toISOString().split('T')[0] : ''}
                          onChange={(e) => handleUpdateExperience(index, 'from', new Date(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`to-${index}`}>To</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`to-${index}`}
                            type="date"
                            value={exp.to instanceof Date ? exp.to.toISOString().split('T')[0] : ''}
                            onChange={(e) => handleUpdateExperience(index, 'to', new Date(e.target.value))}
                            disabled={exp.current}
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`current-${index}`}
                              checked={exp.current}
                              onChange={(e) => handleUpdateExperience(index, 'current', e.target.checked)}
                              className="rounded border-gray-300 text-raas-600 shadow-sm focus:border-raas-300 focus:ring focus:ring-raas-200 focus:ring-opacity-50"
                            />
                            <Label htmlFor={`current-${index}`}>Current</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Textarea
                        id={`description-${index}`}
                        value={exp.description}
                        onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Education</CardTitle>
              <Button type="button" variant="outline" onClick={handleAddEducation}>
                Add Education
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!profile.education || profile.education.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
                  <p className="text-gray-500 mb-4">No education added yet</p>
                  <Button type="button" onClick={handleAddEducation}>
                    Add Education
                  </Button>
                </div>
              ) : (
                profile.education.map((edu, index) => (
                  <div key={edu.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(index, 'institution', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`field-${index}`}>Field of Study</Label>
                      <Input
                        id={`field-${index}`}
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(index, 'field', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-from-${index}`}>From</Label>
                        <Input
                          id={`edu-from-${index}`}
                          type="date"
                          value={edu.from instanceof Date ? edu.from.toISOString().split('T')[0] : ''}
                          onChange={(e) => handleUpdateEducation(index, 'from', new Date(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`edu-to-${index}`}>To</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`edu-to-${index}`}
                            type="date"
                            value={edu.to instanceof Date ? edu.to.toISOString().split('T')[0] : ''}
                            onChange={(e) => handleUpdateEducation(index, 'to', new Date(e.target.value))}
                            disabled={edu.current}
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`edu-current-${index}`}
                              checked={edu.current}
                              onChange={(e) => handleUpdateEducation(index, 'current', e.target.checked)}
                              className="rounded border-gray-300 text-raas-600 shadow-sm focus:border-raas-300 focus:ring focus:ring-raas-200 focus:ring-opacity-50"
                            />
                            <Label htmlFor={`edu-current-${index}`}>Current</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CandidateProfilePage;
