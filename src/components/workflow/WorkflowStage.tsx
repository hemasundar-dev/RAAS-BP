
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { WorkflowStageInstance } from '@/types';
import { Check, X } from 'lucide-react';

interface WorkflowStageProps {
  stage: WorkflowStageInstance;
  isCurrentStage: boolean;
  onUpdateStage: (stageId: string, update: Partial<WorkflowStageInstance>) => void;
}

const WorkflowStage: React.FC<WorkflowStageProps> = ({ stage, isCurrentStage, onUpdateStage }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState(stage.feedback || '');

  const getStatusColor = () => {
    switch (stage.status) {
      case 'passed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'in_progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  const handlePassStage = () => {
    if (feedback.trim() === '') {
      return;
    }
    onUpdateStage(stage.id, { status: 'passed', feedback });
    setIsFeedbackOpen(false);
  };
  
  const handleFailStage = () => {
    if (feedback.trim() === '') {
      return;
    }
    onUpdateStage(stage.id, { status: 'failed', feedback });
    setIsFeedbackOpen(false);
  };

  return (
    <div className={`border rounded-lg p-4 ${isCurrentStage ? 'border-raas-500 bg-raas-50' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full mr-3 ${getStatusColor()}`} />
          <h3 className="font-medium">{stage.name}</h3>
        </div>
        
        <div className="text-sm text-gray-500">
          {stage.status === 'pending' && 'Pending'}
          {stage.status === 'in_progress' && 'In Progress'}
          {stage.status === 'passed' && 'Passed'}
          {stage.status === 'failed' && 'Failed'}
        </div>
      </div>
      
      {stage.feedback && (
        <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
          <strong>Feedback:</strong> {stage.feedback}
        </div>
      )}
      
      {isCurrentStage && stage.status === 'in_progress' && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="default"
            className="mr-2"
            onClick={() => setIsFeedbackOpen(true)}
          >
            Add Feedback & Complete
          </Button>
        </div>
      )}

      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback for {stage.name}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full"
              placeholder="Enter detailed feedback about the candidate's performance in this stage..."
              rows={5}
            />
            {feedback.trim() === '' && (
              <p className="text-sm text-red-500 mt-1">Feedback is required</p>
            )}
          </div>
          
          <DialogFooter>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsFeedbackOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleFailStage}
                disabled={feedback.trim() === ''}
                className="flex items-center"
              >
                <X className="mr-1 h-4 w-4" /> Fail Stage
              </Button>
              <Button
                variant="default"
                onClick={handlePassStage}
                disabled={feedback.trim() === ''}
                className="flex items-center"
              >
                <Check className="mr-1 h-4 w-4" /> Pass Stage
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowStage;
