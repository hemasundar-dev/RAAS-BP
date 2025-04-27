
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  onApply?: () => void;
  showApplyButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, showApplyButton = true }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <div className="text-sm text-gray-500 mt-1">{job.location}</div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-raas-100 text-raas-800">
            {job.type}
          </span>
          {job.salary && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-gray-700 text-sm truncate-2">
          {job.description.substring(0, 150)}
          {job.description.length > 150 ? '...' : ''}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        {showApplyButton && (
          <Button onClick={onApply}>Apply Now</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
