export type UserRole = 'candidate' | 'employer' | 'hr' | 'interviewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  profile?: any; // Add generic profile property to base User type
}

export interface Candidate extends User {
  role: 'candidate';
  profile?: CandidateProfile;
  applications?: JobApplication[];
}

export interface CandidateProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  resumeUrl?: string;
  photoUrl?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  from: Date;
  to?: Date;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  from: Date;
  to?: Date;
  current: boolean;
}

export interface Employer extends User {
  role: 'employer';
  profile?: EmployerProfile;
  jobs?: Job[];
  subscription?: Subscription;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  about: string;
  logoUrl?: string;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'draft' | 'published' | 'closed';
  createdAt: Date;
  expiresAt?: Date;
  applications?: JobApplication[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'applied' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: Date;
  updatedAt: Date;
  workflow?: WorkflowInstance;
}

export interface Subscription {
  id: string;
  employerId: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'canceled' | 'expired';
  startDate: Date;
  endDate: Date;
  jobPostsAllowed: number;
  jobPostsUsed: number;
}

export interface WorkflowTemplate {
  id: string;
  employerId: string;
  name: string;
  description: string;
  stages: WorkflowStageTemplate[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStageTemplate {
  id: string;
  workflowTemplateId: string;
  name: string;
  description: string;
  type: 'resume_screening' | 'phone_interview' | 'technical_interview' | 'hr_interview' | 'assessment' | 'final_decision';
  order: number;
  required: boolean;
}

export interface WorkflowInstance {
  id: string;
  applicationId: string;
  workflowTemplateId: string;
  status: 'in_progress' | 'completed' | 'canceled';
  currentStageId: string;
  stages: WorkflowStageInstance[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStageInstance {
  id: string;
  workflowInstanceId: string;
  templateStageId: string;
  name: string;
  status: 'pending' | 'in_progress' | 'passed' | 'failed';
  feedback?: string;
  assignedTo?: string;
  scheduledAt?: Date;
  completedAt?: Date;
}
