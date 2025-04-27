
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from '@/context/DataContext';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CandidateProfilePage from "./pages/CandidateProfile";
import EmployerProfilePage from "./pages/EmployerProfile";
import Applications from "./pages/Applications";
import WorkflowDetail from "./pages/WorkflowDetail";
import CreateWorkflow from "./pages/CreateWorkflow";
import CreateJob from "./pages/CreateJob";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/candidate/profile" element={<CandidateProfilePage />} />
            <Route path="/employer/profile" element={<EmployerProfilePage />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/workflow/:id" element={<WorkflowDetail />} />
            <Route path="/create-workflow" element={<CreateWorkflow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
