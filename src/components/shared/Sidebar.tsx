
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  userRole?: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderMenu = () => {
    if (userRole === 'candidate') {
      return (
        <div className="space-y-1">
          <Link
            to="/dashboard"
            className={cn(
              "block px-4 py-2 rounded-md text-sm font-medium",
              isActive('/dashboard')
                ? "bg-raas-500 text-white"
                : "text-gray-700 hover:bg-raas-100"
            )}
          >
            Dashboard
          </Link>
          <Link
            to="/candidate/profile"
            className={cn(
              "block px-4 py-2 rounded-md text-sm font-medium",
              isActive('/candidate/profile')
                ? "bg-raas-500 text-white"
                : "text-gray-700 hover:bg-raas-100"
            )}
          >
            My Profile
          </Link>
          <Link
            to="/jobs"
            className={cn(
              "block px-4 py-2 rounded-md text-sm font-medium",
              isActive('/jobs')
                ? "bg-raas-500 text-white"
                : "text-gray-700 hover:bg-raas-100"
            )}
          >
            Browse Jobs
          </Link>
          <Link
            to="/applications"
            className={cn(
              "block px-4 py-2 rounded-md text-sm font-medium",
              isActive('/applications')
                ? "bg-raas-500 text-white"
                : "text-gray-700 hover:bg-raas-100"
            )}
          >
            My Applications
          </Link>
        </div>
      );
    } else if (userRole === 'employer' || userRole === 'hr') {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              General
            </h3>
            <div className="space-y-1">
              <Link
                to="/dashboard"
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium",
                  isActive('/dashboard')
                    ? "bg-raas-500 text-white"
                    : "text-gray-700 hover:bg-raas-100"
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/employer/profile"
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium",
                  isActive('/employer/profile')
                    ? "bg-raas-500 text-white"
                    : "text-gray-700 hover:bg-raas-100"
                )}
              >
                Company Profile
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Recruitment
            </h3>
            <div className="space-y-1">
              <Link
                to="/create-job"
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium",
                  isActive('/create-job')
                    ? "bg-raas-500 text-white"
                    : "text-gray-700 hover:bg-raas-100"
                )}
              >
                Post a Job
              </Link>
              <Link
                to="/applications"
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium",
                  isActive('/applications')
                    ? "bg-raas-500 text-white"
                    : "text-gray-700 hover:bg-raas-100"
                )}
              >
                Applications
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Workflow
            </h3>
            <div className="space-y-1">
              <Link
                to="/create-workflow"
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium",
                  isActive('/create-workflow')
                    ? "bg-raas-500 text-white"
                    : "text-gray-700 hover:bg-raas-100"
                )}
              >
                Create Workflow
              </Link>
            </div>
          </div>
        </div>
      );
    }
    
    // Default menu for non-authenticated users
    return (
      <div className="space-y-1">
        <Link
          to="/jobs"
          className={cn(
            "block px-4 py-2 rounded-md text-sm font-medium",
            isActive('/jobs')
              ? "bg-raas-500 text-white"
              : "text-gray-700 hover:bg-raas-100"
          )}
        >
          Browse Jobs
        </Link>
        <Link
          to="/login"
          className={cn(
            "block px-4 py-2 rounded-md text-sm font-medium",
            isActive('/login')
              ? "bg-raas-500 text-white"
              : "text-gray-700 hover:bg-raas-100"
          )}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={cn(
            "block px-4 py-2 rounded-md text-sm font-medium",
            isActive('/register')
              ? "bg-raas-500 text-white"
              : "text-gray-700 hover:bg-raas-100"
          )}
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="py-6 px-4">
        <h2 className="text-lg font-medium text-gray-900">Navigation</h2>
      </div>
      <nav className="px-2 pb-4">
        {renderMenu()}
      </nav>
    </div>
  );
};

export default Sidebar;
