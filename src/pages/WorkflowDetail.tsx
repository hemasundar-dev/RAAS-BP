
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WorkflowStage from '@/components/workflow/WorkflowStage';
import { useData } from '@/context/DataContext';
import { WorkflowInstance, WorkflowStageInstance, Job, Candidate } from '@/types';

const WorkflowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, workflowInstances, updateWorkflowStage, jobs, applications, candidates } = useData();
  
  const [workflow, setWorkflow] = useState<WorkflowInstance | undefined>(
    workflowInstances.find(w => w.id === id)
  );
  
  const [application, setApplication] = useState<any>(null);
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [candidate, setCandidate] = useState<Candidate | undefined>(undefined);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!workflow) {
      navigate('/applications');
      return;
    }
    
    // Get application details
    const app = applications.find(a => a.id === workflow.applicationId);
    if (app) {
      setApplication(app);
      
      // Get job and candidate details
      const jobData = jobs.find(j => j.id === app.jobId);
      const candidateData = candidates.find(c => c.id === app.candidateId);
      
      setJob(jobData);
      setCandidate(candidateData);
    }
  }, [currentUser, workflow, applications, jobs, candidates, navigate]);
  
  const handleUpdateStage = async (stageId: string, update: Partial<WorkflowStageInstance>) => {
    if (!workflow) return;
    
    try {
      const updatedWorkflow = await updateWorkflowStage(workflow.id, stageId, update);
      setWorkflow(updatedWorkflow);
    } catch (error) {
      console.error('Failed to update workflow stage:', error);
    }
  };
  
  if (!workflow || !job || !application) {
    return null;
  }

  // Sort stages by order (we're using the indices in the array for now)
  const sortedStages = [...workflow.stages].sort((a, b) => {
    const aIndex = workflow.stages.findIndex(s => s.id === a.id);
    const bIndex = workflow.stages.findIndex(s => s.id === b.id);
    return aIndex - bIndex;
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Interview Process</h1>
          <p className="text-gray-600">
            {candidate?.name} - {job.title}
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Status: {workflow.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                {workflow.status === 'completed' ? (
                  <div className="bg-green-600 h-2.5 rounded-full w-full"></div>
                ) : (
                  <div className="bg-raas-500 h-2.5 rounded-full" style={{ 
                    width: `${Math.round((sortedStages.findIndex(s => s.id === workflow.currentStageId) + 1) / sortedStages.length * 100)}%` 
                  }}></div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Position</p>
                <p>{job.title}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Candidate</p>
                <p>{candidate?.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Location</p>
                <p>{job.location}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Application Date</p>
                <p>{new Date(application.appliedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Interview Stages</h2>
          
          {sortedStages.map((stage) => (
            <WorkflowStage
              key={stage.id}
              stage={stage}
              isCurrentStage={stage.id === workflow.currentStageId}
              onUpdateStage={handleUpdateStage}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowDetail;
