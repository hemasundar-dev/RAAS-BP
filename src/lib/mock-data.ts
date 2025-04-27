
import { 
  Candidate, 
  CandidateProfile, 
  Employer, 
  EmployerProfile, 
  Job,
  JobApplication,
  WorkflowTemplate,
  WorkflowInstance
} from '@/types';

// Mock data for demonstration purposes
export const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'candidate',
    createdAt: new Date('2023-01-15'),
    profile: {
      id: 'cp1',
      userId: 'c1',
      fullName: 'John Doe',
      phone: '+1234567890',
      location: 'San Francisco, CA',
      bio: 'Experienced software developer with a passion for frontend technologies.',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      experience: [
        {
          id: 'exp1',
          title: 'Frontend Developer',
          company: 'Tech Solutions Inc.',
          location: 'San Francisco, CA',
          from: new Date('2020-03-01'),
          current: true,
          description: 'Working on building responsive web applications using React and TypeScript.'
        },
        {
          id: 'exp2',
          title: 'Junior Developer',
          company: 'Startup XYZ',
          location: 'San Francisco, CA',
          from: new Date('2018-06-01'),
          to: new Date('2020-02-28'),
          current: false,
          description: 'Developed and maintained web applications using JavaScript and Node.js.'
        }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          from: new Date('2014-09-01'),
          to: new Date('2018-05-30'),
          current: false
        }
      ]
    }
  },
  {
    id: 'c2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'candidate',
    createdAt: new Date('2023-02-10'),
    profile: {
      id: 'cp2',
      userId: 'c2',
      fullName: 'Jane Smith',
      phone: '+9876543210',
      location: 'New York, NY',
      bio: 'Passionate UX/UI designer with a background in user research and interaction design.',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'User Research'],
      experience: [
        {
          id: 'exp3',
          title: 'UX Designer',
          company: 'Design Agency Co.',
          location: 'New York, NY',
          from: new Date('2019-04-01'),
          current: true,
          description: 'Creating user-centered designs and prototypes for various clients.'
        }
      ],
      education: [
        {
          id: 'edu2',
          institution: 'New York University',
          degree: 'Master of Fine Arts',
          field: 'Design',
          from: new Date('2017-09-01'),
          to: new Date('2019-05-30'),
          current: false
        }
      ]
    }
  }
];

export const mockEmployers: Employer[] = [
  {
    id: 'e1',
    email: 'hr@techcorp.com',
    name: 'Tech Corp',
    role: 'employer',
    createdAt: new Date('2022-12-01'),
    profile: {
      id: 'ep1',
      userId: 'e1',
      companyName: 'Tech Corp',
      industry: 'Technology',
      size: '100-500',
      location: 'San Francisco, CA',
      website: 'https://techcorp.example.com',
      about: 'Tech Corp is a leading technology company specializing in cloud solutions and AI-driven applications.'
    },
    subscription: {
      id: 's1',
      employerId: 'e1',
      plan: 'premium',
      status: 'active',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-01-01'),
      jobPostsAllowed: 10,
      jobPostsUsed: 3
    }
  },
  {
    id: 'e2',
    email: 'recruitment@designstudio.com',
    name: 'Design Studio',
    role: 'employer',
    createdAt: new Date('2023-01-05'),
    profile: {
      id: 'ep2',
      userId: 'e2',
      companyName: 'Design Studio',
      industry: 'Design',
      size: '10-50',
      location: 'New York, NY',
      website: 'https://designstudio.example.com',
      about: 'Design Studio is a creative agency focused on branding, web design, and user experience.'
    },
    subscription: {
      id: 's2',
      employerId: 'e2',
      plan: 'basic',
      status: 'active',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2024-02-01'),
      jobPostsAllowed: 5,
      jobPostsUsed: 1
    }
  }
];

export const mockJobs: Job[] = [
  {
    id: 'j1',
    employerId: 'e1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for a skilled Senior Frontend Developer to join our growing team. The ideal candidate will have strong experience with modern JavaScript frameworks and a passion for creating responsive, user-friendly web applications.',
    requirements: '- 5+ years of experience with JavaScript and React\n- Experience with TypeScript\n- Strong understanding of web standards and best practices\n- Excellent problem-solving skills',
    location: 'San Francisco, CA (Remote OK)',
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD'
    },
    type: 'full-time',
    status: 'published',
    createdAt: new Date('2023-03-15')
  },
  {
    id: 'j2',
    employerId: 'e1',
    title: 'DevOps Engineer',
    description: 'Tech Corp is seeking a DevOps Engineer to help build and maintain our cloud infrastructure. The successful candidate will work closely with our development team to automate deployment processes and ensure system reliability.',
    requirements: '- Experience with AWS or GCP\n- Knowledge of CI/CD pipelines\n- Familiarity with Docker and Kubernetes\n- Understanding of security best practices',
    location: 'San Francisco, CA',
    salary: {
      min: 130000,
      max: 160000,
      currency: 'USD'
    },
    type: 'full-time',
    status: 'published',
    createdAt: new Date('2023-03-20')
  },
  {
    id: 'j3',
    employerId: 'e1',
    title: 'Product Manager',
    description: 'Join our product team to help define and execute our product strategy. You will work closely with engineering, design, and sales teams to ensure we are building the right products for our customers.',
    requirements: '- 3+ years of experience in product management\n- Strong analytical skills\n- Excellent communication abilities\n- Technical background preferred',
    location: 'San Francisco, CA or Remote',
    salary: {
      min: 110000,
      max: 140000,
      currency: 'USD'
    },
    type: 'full-time',
    status: 'published',
    createdAt: new Date('2023-03-25')
  },
  {
    id: 'j4',
    employerId: 'e2',
    title: 'Senior UX Designer',
    description: 'Design Studio is looking for a Senior UX Designer to join our team. You will work on designing intuitive and engaging user experiences for our clients across various industries.',
    requirements: '- 5+ years of UX design experience\n- Proficiency in design tools like Figma or Adobe XD\n- Portfolio demonstrating strong UX skills\n- Experience conducting user research',
    location: 'New York, NY',
    salary: {
      min: 100000,
      max: 130000,
      currency: 'USD'
    },
    type: 'full-time',
    status: 'published',
    createdAt: new Date('2023-02-28')
  }
];

export const mockApplications: JobApplication[] = [
  {
    id: 'a1',
    jobId: 'j1',
    candidateId: 'c1',
    status: 'shortlisted',
    appliedAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-22')
  },
  {
    id: 'a2',
    jobId: 'j4',
    candidateId: 'c2',
    status: 'reviewing',
    appliedAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-05')
  }
];

export const mockWorkflowTemplates: WorkflowTemplate[] = [
  {
    id: 'wt1',
    employerId: 'e1',
    name: 'Standard Technical Interview Process',
    description: 'Our standard interview process for technical roles',
    stages: [
      {
        id: 'sts1',
        workflowTemplateId: 'wt1',
        name: 'Resume Screening',
        description: 'Initial review of candidate\'s resume',
        type: 'resume_screening',
        order: 1,
        required: true
      },
      {
        id: 'sts2',
        workflowTemplateId: 'wt1',
        name: 'Phone Interview',
        description: 'Brief phone interview to assess basic qualifications',
        type: 'phone_interview',
        order: 2,
        required: true
      },
      {
        id: 'sts3',
        workflowTemplateId: 'wt1',
        name: 'Technical Assessment',
        description: 'Coding challenge or technical test',
        type: 'assessment',
        order: 3,
        required: true
      },
      {
        id: 'sts4',
        workflowTemplateId: 'wt1',
        name: 'Technical Interview',
        description: 'In-depth technical interview with team members',
        type: 'technical_interview',
        order: 4,
        required: true
      },
      {
        id: 'sts5',
        workflowTemplateId: 'wt1',
        name: 'HR Interview',
        description: 'Final interview with HR to discuss company culture, benefits, etc.',
        type: 'hr_interview',
        order: 5,
        required: true
      },
      {
        id: 'sts6',
        workflowTemplateId: 'wt1',
        name: 'Final Decision',
        description: 'Final hiring decision',
        type: 'final_decision',
        order: 6,
        required: true
      }
    ],
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  }
];

export const mockWorkflowInstances: WorkflowInstance[] = [
  {
    id: 'wi1',
    applicationId: 'a1',
    workflowTemplateId: 'wt1',
    status: 'in_progress',
    currentStageId: 'wsi3',
    stages: [
      {
        id: 'wsi1',
        workflowInstanceId: 'wi1',
        templateStageId: 'sts1',
        name: 'Resume Screening',
        status: 'passed',
        feedback: 'Strong resume with relevant experience',
        assignedTo: 'hr@techcorp.com',
        completedAt: new Date('2023-03-22')
      },
      {
        id: 'wsi2',
        workflowInstanceId: 'wi1',
        templateStageId: 'sts2',
        name: 'Phone Interview',
        status: 'passed',
        feedback: 'Excellent communication skills, good technical knowledge',
        assignedTo: 'hr@techcorp.com',
        scheduledAt: new Date('2023-03-24'),
        completedAt: new Date('2023-03-24')
      },
      {
        id: 'wsi3',
        workflowInstanceId: 'wi1',
        templateStageId: 'sts3',
        name: 'Technical Assessment',
        status: 'in_progress',
        assignedTo: 'tech.lead@techcorp.com',
        scheduledAt: new Date('2023-03-27')
      },
      {
        id: 'wsi4',
        workflowInstanceId: 'wi1',
        templateStageId: 'sts4',
        name: 'Technical Interview',
        status: 'pending'
      },
      {
        id: 'wsi5',
        workflowInstanceId: 'wi1',
        templateStageId: 'sts5',
        name: 'HR Interview',
        status: 'pending'
      },
      {
        id: 'wsi6',
        workflowInstanceId: 'wi1',
        templateStageId: 'sts6',
        name: 'Final Decision',
        status: 'pending'
      }
    ],
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-03-24')
  }
];
