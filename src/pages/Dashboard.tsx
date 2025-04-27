
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useData } from '@/context/DataContext';

const Dashboard = () => {
  const { currentUser, jobs, applications, workflowTemplates } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null;
  }
  
  const renderCandidateDashboard = () => {
    const candidateApplications = applications.filter(app => app.candidateId === currentUser.id);
    const activeApplicationsCount = candidateApplications.filter(app => app.status !== 'hired' && app.status !== 'rejected').length;
    
    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {currentUser.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your job applications and profile</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{candidateApplications.length}</p>
              <p className="text-sm text-gray-500">Total applications</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeApplicationsCount}</p>
              <p className="text-sm text-gray-500">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Job Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{jobs.length}</p>
              <p className="text-sm text-gray-500">Available jobs</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {candidateApplications.length > 0 ? (
                <div className="space-y-4">
                  {candidateApplications.slice(0, 3).map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return job ? (
                      <div key={app.id} className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-500">{job.location}</p>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${app.status === 'hired' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              app.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ) : null;
                  })}
                  
                  <div className="pt-2">
                    <Link to="/applications">
                      <Button variant="outline" size="sm">View All Applications</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                  <Link to="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Profile</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-raas-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  A complete profile increases your chances of getting hired.
                </p>
                
                <Link to="/candidate/profile">
                  <Button variant="outline" size="sm">Update Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };
  
  const renderEmployerDashboard = () => {
    const employerJobs = jobs.filter(job => job.employerId === currentUser.id);
    const employerApplications = applications.filter(app => {
      const job = jobs.find(j => j.id === app.jobId);
      return job && job.employerId === currentUser.id;
    });
    
    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {currentUser.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{employerJobs.length}</p>
              <p className="text-sm text-gray-500">Active jobs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{employerApplications.length}</p>
              <p className="text-sm text-gray-500">Total received</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">To Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {employerApplications.filter(app => app.status === 'applied').length}
              </p>
              <p className="text-sm text-gray-500">New applications</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{workflowTemplates.length}</p>
              <p className="text-sm text-gray-500">Active templates</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Recent Applications</CardTitle>
              <Link to="/applications">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {employerApplications.length > 0 ? (
                <div className="space-y-4">
                  {employerApplications.slice(0, 5).map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    const candidate = currentUser?.role === 'employer' 
                      ? { name: 'John Doe' } // Simulated data
                      : { name: 'Jane Smith' }; // Simulated data
                      
                    return job ? (
                      <div key={app.id} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-sm text-gray-500">{job.title}</p>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${app.status === 'hired' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              app.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No applications received yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Your Jobs</CardTitle>
              <Link to="/create-job">
                <Button size="sm">Post New Job</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {employerJobs.length > 0 ? (
                <div className="space-y-4">
                  {employerJobs.slice(0, 5).map(job => (
                    <div key={job.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                      <div>
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                  <Link to="/create-job">
                    <Button>Post a Job</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {currentUser.role === 'candidate' && renderCandidateDashboard()}
        {(currentUser.role === 'employer' || currentUser.role === 'hr') && renderEmployerDashboard()}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
