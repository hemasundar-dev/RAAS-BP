import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Candidate,
  CandidateProfile,
  Employer,
  EmployerProfile,
  Job,
  JobApplication,
  User,
  WorkflowTemplate,
  WorkflowInstance,
  UserRole,
  WorkflowStageInstance
} from '@/types';
import {
  mockCandidates,
  mockEmployers,
  mockJobs,
  mockApplications,
  mockWorkflowTemplates,
  mockWorkflowInstances
} from '@/lib/mock-data';
import { useToast } from '@/components/ui/use-toast';

interface DataContextType {
  // Data
  currentUser: User | null;
  candidates: Candidate[];
  employers: Employer[];
  jobs: Job[];
  applications: JobApplication[];
  workflowTemplates: WorkflowTemplate[];
  workflowInstances: WorkflowInstance[];
  
  // Authentication
  login: (email: string, password: string, role: UserRole) => Promise<User>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<User>;
  logout: () => void;
  
  // Profile management
  updateCandidateProfile: (candidateId: string, profile: Partial<CandidateProfile>) => Promise<CandidateProfile>;
  updateEmployerProfile: (employerId: string, profile: Partial<EmployerProfile>) => Promise<EmployerProfile>;
  
  // Job management
  createJob: (employerId: string, job: Partial<Job>) => Promise<Job>;
  updateJob: (jobId: string, job: Partial<Job>) => Promise<Job>;
  deleteJob: (jobId: string) => Promise<boolean>;
  
  // Application management
  applyToJob: (candidateId: string, jobId: string) => Promise<JobApplication>;
  updateApplicationStatus: (applicationId: string, status: JobApplication['status']) => Promise<JobApplication>;
  
  // Workflow management
  createWorkflowTemplate: (employerId: string, template: Partial<WorkflowTemplate>) => Promise<WorkflowTemplate>;
  updateWorkflowTemplate: (templateId: string, template: Partial<WorkflowTemplate>) => Promise<WorkflowTemplate>;
  createWorkflowInstance: (applicationId: string, templateId: string) => Promise<WorkflowInstance>;
  updateWorkflowStage: (instanceId: string, stageId: string, update: any) => Promise<WorkflowInstance>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [employers, setEmployers] = useState<Employer[]>(mockEmployers);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [workflowTemplates, setWorkflowTemplates] = useState<WorkflowTemplate[]>(mockWorkflowTemplates);
  const [workflowInstances, setWorkflowInstances] = useState<WorkflowInstance[]>(mockWorkflowInstances);

  const login = async (email: string, password: string, role: UserRole): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let user: User | undefined;
    
    if (role === 'candidate') {
      user = candidates.find(c => c.email === email);
    } else if (role === 'employer') {
      user = employers.find(e => e.email === email);
    } else {
      user = employers.find(e => e.email === email);
    }
    
    if (!user) {
      if (role === 'candidate') {
        user = mockCandidates[0];
      } else {
        user = mockEmployers[0];
      }
    }
    
    setCurrentUser(user);
    toast({
      title: "Login successful",
      description: `Welcome back, ${user.name}!`,
    });
    
    return user;
  };
  
  const register = async (email: string, password: string, name: string, role: UserRole): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date()
    };
    
    if (role === 'candidate') {
      const newCandidate: Candidate = {
        ...newUser,
        role: 'candidate'
      };
      setCandidates([...candidates, newCandidate]);
      setCurrentUser(newCandidate);
      return newCandidate;
    } else if (role === 'employer') {
      const newEmployer: Employer = {
        ...newUser,
        role: 'employer'
      };
      setEmployers([...employers, newEmployer]);
      setCurrentUser(newEmployer);
      return newEmployer;
    }
    
    setCurrentUser(newUser);
    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    });
    
    return newUser;
  };
  
  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const updateCandidateProfile = async (candidateId: string, profile: Partial<CandidateProfile>): Promise<CandidateProfile> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === candidateId) {
        return {
          ...candidate,
          profile: {
            ...(candidate.profile || {}),
            ...profile,
            id: candidate.profile?.id || `profile-${Date.now()}`
          } as CandidateProfile
        };
      }
      return candidate;
    });
    
    setCandidates(updatedCandidates);
    
    const updatedCandidate = updatedCandidates.find(c => c.id === candidateId);
    
    if (currentUser?.id === candidateId) {
      setCurrentUser(updatedCandidate || currentUser);
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    
    return updatedCandidate!.profile!;
  };
  
  const updateEmployerProfile = async (employerId: string, profile: Partial<EmployerProfile>): Promise<EmployerProfile> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedEmployers = employers.map(employer => {
      if (employer.id === employerId) {
        return {
          ...employer,
          profile: {
            ...(employer.profile || {}),
            ...profile,
            id: employer.profile?.id || `profile-${Date.now()}`
          } as EmployerProfile
        };
      }
      return employer;
    });
    
    setEmployers(updatedEmployers);
    
    const updatedEmployer = updatedEmployers.find(e => e.id === employerId);
    
    if (currentUser?.id === employerId) {
      setCurrentUser(updatedEmployer || currentUser);
    }
    
    toast({
      title: "Company profile updated",
      description: "Your company profile has been updated successfully.",
    });
    
    return updatedEmployer!.profile!;
  };

  const createJob = async (employerId: string, jobData: Partial<Job>): Promise<Job> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newJob: Job = {
      id: `job-${Date.now()}`,
      employerId,
      title: jobData.title || 'New Job Position',
      description: jobData.description || '',
      requirements: jobData.requirements || '',
      location: jobData.location || '',
      salary: jobData.salary,
      type: jobData.type || 'full-time',
      status: jobData.status || 'draft',
      createdAt: new Date(),
      applications: []
    };
    
    setJobs([...jobs, newJob]);
    
    toast({
      title: "Job created",
      description: "Your job posting has been created successfully.",
    });
    
    return newJob;
  };
  
  const updateJob = async (jobId: string, jobData: Partial<Job>): Promise<Job> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, ...jobData };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    
    const updatedJob = updatedJobs.find(j => j.id === jobId);
    
    if (!updatedJob) {
      throw new Error('Job not found');
    }
    
    toast({
      title: "Job updated",
      description: "Your job posting has been updated successfully.",
    });
    
    return updatedJob;
  };
  
  const deleteJob = async (jobId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setJobs(jobs.filter(job => job.id !== jobId));
    
    setApplications(applications.filter(app => app.jobId !== jobId));
    
    toast({
      title: "Job deleted",
      description: "Your job posting has been deleted successfully.",
    });
    
    return true;
  };

  const applyToJob = async (candidateId: string, jobId: string): Promise<JobApplication> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingApplication = applications.find(
      app => app.candidateId === candidateId && app.jobId === jobId
    );
    
    if (existingApplication) {
      toast({
        title: "Already applied",
        description: "You have already applied for this job.",
      });
      return existingApplication;
    }
    
    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      candidateId,
      status: 'applied',
      appliedAt: new Date(),
      updatedAt: new Date()
    };
    
    setApplications([...applications, newApplication]);
    
    toast({
      title: "Application submitted",
      description: "Your job application has been submitted successfully.",
    });
    
    return newApplication;
  };
  
  const updateApplicationStatus = async (applicationId: string, status: JobApplication['status']): Promise<JobApplication> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status, updatedAt: new Date() };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    
    const updatedApplication = updatedApplications.find(a => a.id === applicationId);
    
    if (!updatedApplication) {
      throw new Error('Application not found');
    }
    
    toast({
      title: "Application updated",
      description: `Application status updated to ${status}.`,
    });
    
    return updatedApplication;
  };

  const createWorkflowTemplate = async (employerId: string, templateData: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTemplate: WorkflowTemplate = {
      id: `wt-${Date.now()}`,
      employerId,
      name: templateData.name || 'New Workflow Template',
      description: templateData.description || '',
      stages: templateData.stages || [],
      isActive: templateData.isActive !== undefined ? templateData.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setWorkflowTemplates([...workflowTemplates, newTemplate]);
    
    toast({
      title: "Workflow template created",
      description: "Your workflow template has been created successfully.",
    });
    
    return newTemplate;
  };
  
  const updateWorkflowTemplate = async (templateId: string, templateData: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedTemplates = workflowTemplates.map(template => {
      if (template.id === templateId) {
        return { 
          ...template, 
          ...templateData, 
          updatedAt: new Date() 
        };
      }
      return template;
    });
    
    setWorkflowTemplates(updatedTemplates);
    
    const updatedTemplate = updatedTemplates.find(t => t.id === templateId);
    
    if (!updatedTemplate) {
      throw new Error('Template not found');
    }
    
    toast({
      title: "Workflow template updated",
      description: "Your workflow template has been updated successfully.",
    });
    
    return updatedTemplate;
  };
  
  const createWorkflowInstance = async (applicationId: string, templateId: string): Promise<WorkflowInstance> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const template = workflowTemplates.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Workflow template not found');
    }
    
    const stages = template.stages.map((stageTemplate) => ({
      id: `ws-${Date.now()}-${stageTemplate.order}`,
      workflowInstanceId: `wi-${Date.now()}`,
      templateStageId: stageTemplate.id,
      name: stageTemplate.name,
      status: stageTemplate.order === 1 ? 'in_progress' as const : 'pending' as const
    }));
    
    const newInstance: WorkflowInstance = {
      id: `wi-${Date.now()}`,
      applicationId,
      workflowTemplateId: templateId,
      status: 'in_progress',
      currentStageId: stages[0].id,
      stages: stages as WorkflowStageInstance[],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    newInstance.stages = stages.map(stage => ({
      ...stage,
      workflowInstanceId: newInstance.id
    })) as WorkflowStageInstance[];
    
    setWorkflowInstances([...workflowInstances, newInstance]);
    
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { 
          ...app, 
          workflow: newInstance,
          updatedAt: new Date() 
        };
      }
      return app;
    });
    
    setApplications(updatedApplications);
    
    toast({
      title: "Workflow started",
      description: "A new workflow has been started for this application.",
    });
    
    return newInstance;
  };
  
  const updateWorkflowStage = async (instanceId: string, stageId: string, update: any): Promise<WorkflowInstance> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedInstances = workflowInstances.map(instance => {
      if (instance.id === instanceId) {
        const updatedStages = instance.stages.map(stage => {
          if (stage.id === stageId) {
            return { ...stage, ...update };
          }
          return stage;
        });
        
        const currentStageIndex = updatedStages.findIndex(s => s.id === stageId);
        
        let nextStageId = instance.currentStageId;
        let instanceStatus = instance.status;
        
        if (update.status === 'passed' && currentStageIndex < updatedStages.length - 1) {
          const nextStage = updatedStages[currentStageIndex + 1];
          nextStageId = nextStage.id;
          
          updatedStages[currentStageIndex + 1] = {
            ...nextStage,
            status: 'in_progress' as const
          };
        } else if (update.status === 'passed' && currentStageIndex === updatedStages.length - 1) {
          instanceStatus = 'completed';
        } else if (update.status === 'failed') {
          instanceStatus = 'completed';
        }
        
        return {
          ...instance,
          stages: updatedStages,
          currentStageId: nextStageId,
          status: instanceStatus,
          updatedAt: new Date()
        };
      }
      return instance;
    });
    
    setWorkflowInstances(updatedInstances);
    
    const updatedInstance = updatedInstances.find(i => i.id === instanceId);
    
    if (!updatedInstance) {
      throw new Error('Workflow instance not found');
    }
    
    if (updatedInstance.status === 'completed') {
      const lastStage = updatedInstance.stages[updatedInstance.stages.length - 1];
      const finalStatus = lastStage.status === 'passed' ? 'hired' as const : 'rejected' as const;
      
      const updatedApplications = applications.map(app => {
        if (app.id === updatedInstance.applicationId) {
          return { 
            ...app, 
            status: finalStatus,
            updatedAt: new Date() 
          };
        }
        return app;
      });
      
      setApplications(updatedApplications);
    }
    
    toast({
      title: "Workflow stage updated",
      description: `Stage ${update.status === 'passed' ? 'completed' : update.status}.`,
    });
    
    return updatedInstance;
  };

  const contextValue: DataContextType = {
    currentUser,
    candidates,
    employers,
    jobs,
    applications,
    workflowTemplates,
    workflowInstances,
    login,
    register,
    logout,
    updateCandidateProfile,
    updateEmployerProfile,
    createJob,
    updateJob,
    deleteJob,
    applyToJob,
    updateApplicationStatus,
    createWorkflowTemplate,
    updateWorkflowTemplate,
    createWorkflowInstance,
    updateWorkflowStage
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
