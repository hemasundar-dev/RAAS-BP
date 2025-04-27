
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layouts/MainLayout';
import JobCard from '@/components/shared/JobCard';
import { useData } from '@/context/DataContext';

const Index = () => {
  const { jobs } = useData();
  
  // Get 3 most recent jobs
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-raas-600 to-raas-400 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Streamline Your Recruitment Process
            </h1>
            <p className="text-xl mb-8">
              TalentFlow connects employers with top talent through a powerful orchestration platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/jobs">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Find Jobs
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-white text-raas-600 hover:bg-gray-100">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-raas-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-raas-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Candidates</h3>
              <p className="text-gray-600">
                Create your profile, search for jobs that match your skills, and track your applications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-raas-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-raas-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Employers</h3>
              <p className="text-gray-600">
                Post jobs, manage applications, and design custom recruitment workflows.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-raas-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-raas-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Workflow Orchestration</h3>
              <p className="text-gray-600">
                Design custom interview stages, collect feedback, and make data-driven hiring decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Job Opportunities</h2>
            <Link to="/jobs" className="text-raas-600 hover:underline">
              View all jobs
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-raas-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Recruitment Process?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of companies and job seekers who are already using TalentFlow to simplify recruitment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="default" className="w-full sm:w-auto bg-white text-raas-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-raas-500">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
