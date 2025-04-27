
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useData } from '@/context/DataContext';
import type { EmployerProfile as EmployerProfileType } from '@/types';

const EmployerProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateEmployerProfile } = useData();
  
  const [profile, setProfile] = useState<Partial<EmployerProfileType>>({
    companyName: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    about: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role !== 'employer' && currentUser.role !== 'hr') {
      navigate('/dashboard');
      return;
    }
    
    // Load existing profile if available
    if (currentUser.profile) {
      setProfile(currentUser.profile);
    }
  }, [currentUser, navigate]);
  
  const handleChange = (field: keyof EmployerProfileType, value: string) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!profile.companyName || !profile.industry || !profile.location) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }
    
    try {
      setIsLoading(true);
      
      await updateEmployerProfile(currentUser!.id, profile);
      
      setMessage({ type: 'success', text: 'Company profile updated successfully' });
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
        <h1 className="text-3xl font-bold mb-6">Company Profile</h1>
        
        {message.text && (
          <div className={`p-4 rounded-md mb-6 ${
            message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
          }`}>
            {message.text}
          </div>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name*</Label>
                  <Input
                    id="companyName"
                    value={profile.companyName || ''}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry*</Label>
                  <Input
                    id="industry"
                    value={profile.industry || ''}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size*</Label>
                  <Select 
                    value={profile.size || ''} 
                    onValueChange={(value) => handleChange('size', value)}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1001+">1001+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    value={profile.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={profile.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about">About the Company</Label>
                <Textarea
                  id="about"
                  placeholder="Tell potential candidates about your company..."
                  value={profile.about || ''}
                  onChange={(e) => handleChange('about', e.target.value)}
                  rows={6}
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Company Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;
