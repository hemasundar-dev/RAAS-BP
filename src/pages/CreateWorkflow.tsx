
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Plus, X } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useData } from '@/context/DataContext';
import { WorkflowStageTemplate } from '@/types';

const CreateWorkflow = () => {
  const navigate = useNavigate();
  const { currentUser, createWorkflowTemplate } = useData();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stages, setStages] = useState<Partial<WorkflowStageTemplate>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!currentUser || (currentUser.role !== 'employer' && currentUser.role !== 'hr')) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  const handleAddStage = () => {
    const newStage: Partial<WorkflowStageTemplate> = {
      name: '',
      description: '',
      type: 'resume_screening',
      order: stages.length + 1,
      required: true
    };
    
    setStages([...stages, newStage]);
  };
  
  const handleRemoveStage = (index: number) => {
    const updatedStages = [...stages];
    updatedStages.splice(index, 1);
    
    // Update order for remaining stages
    const reorderedStages = updatedStages.map((stage, i) => ({
      ...stage,
      order: i + 1
    }));
    
    setStages(reorderedStages);
  };
  
  const handleStageChange = (index: number, field: keyof WorkflowStageTemplate, value: any) => {
    const updatedStages = [...stages];
    updatedStages[index] = {
      ...updatedStages[index],
      [field]: value
    };
    setStages(updatedStages);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || stages.length === 0) {
      setError('Please fill in all required fields and add at least one stage');
      return;
    }
    
    // Validate stages
    const invalidStages = stages.filter(stage => !stage.name);
    if (invalidStages.length > 0) {
      setError('Please fill in all stage details');
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (currentUser?.role === 'employer' || currentUser?.role === 'hr') {
        await createWorkflowTemplate(currentUser.id, {
          name,
          description,
          stages: stages as WorkflowStageTemplate[],
          isActive: true
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to create workflow template. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create Interview Workflow</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Workflow Details</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Workflow Name*</Label>
                <Input
                  id="name"
                  placeholder="e.g., Standard Technical Interview Process"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose and flow of this interview process..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Interview Stages*</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddStage}
                    className="flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Stage
                  </Button>
                </div>
                
                {stages.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
                    <p className="text-gray-500 mb-4">No stages added yet</p>
                    <Button type="button" onClick={handleAddStage}>
                      Add Your First Stage
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stages.map((stage, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Stage {index + 1}</h3>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveStage(index)}
                              className="h-8 w-8 p-0 text-gray-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`stage-name-${index}`}>Stage Name*</Label>
                                <Input
                                  id={`stage-name-${index}`}
                                  placeholder="e.g., Resume Screening"
                                  value={stage.name || ''}
                                  onChange={(e) => handleStageChange(index, 'name', e.target.value)}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`stage-type-${index}`}>Stage Type*</Label>
                                <Select 
                                  value={stage.type} 
                                  onValueChange={(value) => handleStageChange(index, 'type', value)}
                                >
                                  <SelectTrigger id={`stage-type-${index}`}>
                                    <SelectValue placeholder="Select stage type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="resume_screening">Resume Screening</SelectItem>
                                    <SelectItem value="phone_interview">Phone Interview</SelectItem>
                                    <SelectItem value="technical_interview">Technical Interview</SelectItem>
                                    <SelectItem value="hr_interview">HR Interview</SelectItem>
                                    <SelectItem value="assessment">Assessment/Test</SelectItem>
                                    <SelectItem value="final_decision">Final Decision</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`stage-desc-${index}`}>Description</Label>
                              <Textarea
                                id={`stage-desc-${index}`}
                                placeholder="Describe what happens in this stage..."
                                value={stage.description || ''}
                                onChange={(e) => handleStageChange(index, 'description', e.target.value)}
                                rows={2}
                              />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id={`stage-required-${index}`}
                                checked={stage.required}
                                onCheckedChange={(checked) => handleStageChange(index, 'required', !!checked)}
                              />
                              <Label htmlFor={`stage-required-${index}`}>Required stage (cannot be skipped)</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full flex items-center" 
                  disabled={isLoading || stages.length === 0}
                >
                  {isLoading ? (
                    'Creating Workflow...'
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Create Workflow
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateWorkflow;
