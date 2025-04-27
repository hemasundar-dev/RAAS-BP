
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useData } from '@/context/DataContext';
import { Job, JobApplication, Candidate, WorkflowInstance } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const Applications = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    applications, 
    jobs, 
    candidates, 
    updateApplicationStatus,
    workflowTemplates,
    createWorkflowInstance,
    workflowInstances
  } = useData();
  
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role === 'candidate') {
      // Show only candidate's applications
      const candidateApps = applications.filter(app => app.candidateId === currentUser.id);
      setFilteredApplications(candidateApps);
    } else if (currentUser.role === 'employer' || currentUser.role === 'hr') {
      // Show applications for employer's jobs
      const employerJobIds = jobs
        .filter(job => job.employerId === currentUser.id)
        .map(job => job.id);
      
      const employerApps = applications.filter(app => employerJobIds.includes(app.jobId));
      setFilteredApplications(employerApps);
    }
  }, [currentUser, applications, jobs, navigate]);
  
  const getJob = (jobId: string): Job | undefined => {
    return jobs.find(job => job.id === jobId);
  };
  
  const getCandidate = (candidateId: string): Candidate | undefined => {
    return candidates.find(candidate => candidate.id === candidateId);
  };
  
  const getWorkflowInstance = (applicationId: string): WorkflowInstance | undefined => {
    return workflowInstances.find(instance => instance.applicationId === applicationId);
  };
  
  const handleStatusChange = async (applicationId: string, status: JobApplication['status']) => {
    await updateApplicationStatus(applicationId, status);
  };
  
  const handleCreateWorkflow = async (applicationId: string) => {
    // Just use the first workflow template for this demo
    if (workflowTemplates.length > 0) {
      await createWorkflowInstance(applicationId, workflowTemplates[0].id);
    }
  };
  
  const filteredByStatus = statusFilter === 'all' 
    ? filteredApplications 
    : filteredApplications.filter(app => app.status === statusFilter);
  
  const renderApplicationsList = () => {
    if (filteredByStatus.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No applications found</p>
          {currentUser?.role === 'candidate' && (
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          )}
        </div>
      );
    }
    
    return filteredByStatus.map(app => {
      const job = getJob(app.jobId);
      const candidate = getCandidate(app.candidateId);
      const workflowInstance = getWorkflowInstance(app.id);
      
      return (
        <Card key={app.id} className="mb-4">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  {currentUser?.role === 'candidate' ? job?.title : candidate?.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {currentUser?.role === 'candidate' ? job?.location : job?.title}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`
                    ${app.status === 'applied' ? 'bg-blue-100 text-blue-800' : ''}
                    ${app.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${app.status === 'shortlisted' ? 'bg-green-100 text-green-800' : ''}
                    ${app.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                    ${app.status === 'hired' ? 'bg-purple-100 text-purple-800' : ''}
                  `}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                  
                  <Badge variant="outline">
                    Applied {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
                  </Badge>
                  
                  {job?.type && (
                    <Badge variant="outline">{job.type}</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                {currentUser?.role === 'employer' || currentUser?.role === 'hr' ? (
                  <div className="space-y-2">
                    <Select 
                      defaultValue={app.status}
                      onValueChange={(value) => handleStatusChange(app.id, value as JobApplication['status'])}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {!workflowInstance ? (
                      <Button 
                        variant="outline" 
                        onClick={() => handleCreateWorkflow(app.id)}
                        disabled={workflowTemplates.length === 0}
                      >
                        Start Workflow
                      </Button>
                    ) : (
                      <Link to={`/workflow/${workflowInstance.id}`}>
                        <Button variant="outline">
                          View Workflow
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div>
                    {workflowInstance && (
                      <Link to={`/workflow/${workflowInstance.id}`}>
                        <Button variant="outline">
                          View Progress
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{currentUser?.role === 'candidate' ? 'My Applications' : 'Applications'}</h1>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          {renderApplicationsList()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
