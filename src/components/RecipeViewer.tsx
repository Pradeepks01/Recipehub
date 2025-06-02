
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, Clock, Play, Pause, RotateCcw, Plus, Minus, Edit, Share2 } from 'lucide-react';
import { Recipe } from '@/types/Recipe';

interface RecipeViewerProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
}

const RecipeViewer = ({ recipe, onBack, onEdit }: RecipeViewerProps) => {
  const [currentServings, setCurrentServings] = useState(recipe.servings);
  const [activeTimer, setActiveTimer] = useState<{ stepId: string; timeLeft: number; isRunning: boolean } | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer?.isRunning && activeTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setActiveTimer(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
      }, 1000);
    } else if (activeTimer?.timeLeft === 0) {
      // Timer finished - show notification
      console.log('Timer finished!');
      setActiveTimer(null);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  // Ensure ingredients array exists before mapping
  const scaledIngredients = (recipe.ingredients || []).map(ingredient => ({
    ...ingredient,
    amount: (ingredient.amount * currentServings) / recipe.servings
  }));

  const startTimer = (stepId: string, minutes: number) => {
    setActiveTimer({
      stepId,
      timeLeft: minutes * 60,
      isRunning: true
    });
  };

  const toggleTimer = () => {
    setActiveTimer(prev => prev ? { ...prev, isRunning: !prev.isRunning } : null);
  };

  const resetTimer = (stepId: string, minutes: number) => {
    setActiveTimer({
      stepId,
      timeLeft: minutes * 60,
      isRunning: false
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={onBack} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <p className="text-lg text-muted-foreground">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{recipe.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>by {recipe.author}</span>
            </div>
            {recipe.collaborators.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{recipe.collaborators.length} collaborator{recipe.collaborators.length !== 1 ? 's' : ''}</span>
              </div>
            )}
            <span>Updated {recipe.lastModified}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Ingredients */}
          <Card className="glass-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ingredients</CardTitle>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Servings:</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentServings(Math.max(1, currentServings - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{currentServings}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentServings(currentServings + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scaledIngredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex items-center gap-3 py-2">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <span className="font-medium w-16">
                      {ingredient.amount % 1 === 0 ? ingredient.amount : ingredient.amount.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground w-12">{ingredient.unit}</span>
                    <span className="flex-1">{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {(recipe.steps || []).map((step, index) => (
                  <div key={step.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-base leading-relaxed">{step.instruction}</p>
                        {step.timerMinutes && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">
                                  Timer: {step.timerMinutes} minute{step.timerMinutes !== 1 ? 's' : ''}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {activeTimer?.stepId === step.id ? (
                                  <>
                                    <span className="text-lg font-mono font-bold text-primary">
                                      {formatTime(activeTimer.timeLeft)}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={toggleTimer}
                                    >
                                      {activeTimer.isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => resetTimer(step.id, step.timerMinutes!)}
                                    >
                                      <RotateCcw className="h-3 w-3" />
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => startTimer(step.id, step.timerMinutes!)}
                                    className="bg-primary hover:bg-primary/90"
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Start Timer
                                  </Button>
                                )}
                              </div>
                            </div>
                            {activeTimer?.stepId === step.id && (
                              <Progress 
                                value={((step.timerMinutes! * 60 - activeTimer.timeLeft) / (step.timerMinutes! * 60)) * 100} 
                                className="mt-2"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {index < recipe.steps.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Cooking Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Step {currentStep + 1} of {recipe.steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / recipe.steps.length) * 100)}%</span>
                </div>
                <Progress value={((currentStep + 1) / recipe.steps.length) * 100} />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrentStep(Math.min(recipe.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === recipe.steps.length - 1}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Timer */}
          {activeTimer && (
            <Card className="glass-effect border-primary/50">
              <CardHeader>
                <CardTitle className="text-primary">Active Timer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-mono font-bold text-primary">
                    {formatTime(activeTimer.timeLeft)}
                  </div>
                  <Progress 
                    value={((recipe.steps.find(s => s.id === activeTimer.stepId)?.timerMinutes! * 60 - activeTimer.timeLeft) / (recipe.steps.find(s => s.id === activeTimer.stepId)?.timerMinutes! * 60)) * 100} 
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={toggleTimer}
                      className="flex-1"
                    >
                      {activeTimer.isRunning ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                      {activeTimer.isRunning ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Collaborators */}
          {recipe.collaborators.length > 0 && (
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Collaborators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recipe.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{collaborator.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{collaborator}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeViewer;
