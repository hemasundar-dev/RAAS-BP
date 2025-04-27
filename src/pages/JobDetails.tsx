
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layouts/MainLayout';
import { useData } from '@/context/DataContext';
import { formatDistanceToNow } from 'date-fns';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, currentUser, applyToJob, applications } = useData();
  
  const [job, setJob] = useState(jobs.find(j => j.id === id));
  const [isApplied, setIsApplied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {
    if (!job) {
      navigate('/jobs');
      return;
    }
    
    if (currentUser) {
      // Check if user has already applied
      if (currentUser.role === 'candidate') {
        const applied = applications.some(
          app => app.jobId === job.id && app.candidateId === currentUser.id
        );
        setIsApplied(applied);
      }
      
      // Check if user is the job owner
      if (currentUser.role === 'employer') {
        setIsOwner(job.employerId === currentUser.id);
      }
    }
  }, [job, currentUser, applications, navigate]);
  
  const handleApply = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role !== 'candidate') {
      navigate('/dashboard');
      return;
    }
    
    await applyToJob(currentUser.id, job!.id);
    setIsApplied(true);
  };
  
  if (!job) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="text-gray-600 mb-4">{job.location}</div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="rounded-full">
                    {job.type}
                  </Badge>
                  
                  {job.salary && (
                    <Badge variant="outline" className="rounded-full">
                      {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                    </Badge>
                  )}
                  
                  <Badge variant="outline" className="rounded-full">
                    Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </Badge>
                </div>
              </div>
              
              <div>
                {isOwner ? (
                  <Link to="/applications">
                    <Button variant="outline">View Applications</Button>
                  </Link>
                ) : (
                  <Button
                    onClick={handleApply}
                    disabled={isApplied}
                  >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  {job.description.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <div className="prose max-w-none">
                  {job.requirements.split('\n').map((req, i) => (
                    <p key={i} className="mb-2">{req}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Interested in this job?</h3>
                  <p className="text-gray-600">Submit your application now and start your new career journey.</p>
                </div>
                
                <Button
                  onClick={handleApply}
                  disabled={isApplied}
                >
                  {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetails;
