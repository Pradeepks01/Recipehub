
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Clock, Users, Save, Share2, X } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface Step {
  id: string;
  instruction: string;
  timerMinutes?: number;
}

interface RecipeEditorProps {
  onSave: (recipe: any) => void;
  onCancel: () => void;
  initialRecipe?: any;
}

const RecipeEditor = ({ onSave, onCancel, initialRecipe }: RecipeEditorProps) => {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [servings, setServings] = useState(initialRecipe?.servings || 4);
  const [tags, setTags] = useState<string[]>(initialRecipe?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients || [
      { id: '1', name: '', amount: 0, unit: 'cups' }
    ]
  );
  const [steps, setSteps] = useState<Step[]>(
    initialRecipe?.steps || [
      { id: '1', instruction: '', timerMinutes: undefined }
    ]
  );

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      unit: 'cups'
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const addStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      instruction: '',
      timerMinutes: undefined
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const updateStep = (id: string, field: keyof Step, value: any) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    const recipe = {
      id: initialRecipe?.id || Date.now().toString(),
      title,
      description,
      servings,
      tags,
      ingredients: ingredients.filter(ing => ing.name.trim()),
      steps: steps.filter(step => step.instruction.trim()),
      author: 'Alice Johnson', // Mock user
      lastModified: 'Just now',
      isPublic: false
    };
    onSave(recipe);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {initialRecipe ? 'Edit Recipe' : 'Create New Recipe'}
          </h1>
          <p className="text-muted-foreground">Build and share your culinary masterpiece</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Recipe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recipe Title</label>
                <Input
                  placeholder="Enter a catchy recipe name..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe your recipe, its inspiration, or special techniques..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Servings:</label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{servings}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setServings(servings + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={ingredient.amount || ''}
                    onChange={(e) => updateIngredient(ingredient.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-20"
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                    className="px-3 py-2 bg-background border border-input rounded-md text-sm w-24"
                  >
                    <option value="cups">cups</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                    <option value="lbs">lbs</option>
                    <option value="oz">oz</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="pieces">pieces</option>
                  </select>
                  <Input
                    placeholder="Ingredient name"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length === 1}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button onClick={addIngredient} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm text-muted-foreground w-6 mt-2">{index + 1}.</span>
                    <Textarea
                      placeholder="Describe this step in detail..."
                      value={step.instruction}
                      onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeStep(step.id)}
                      disabled={steps.length === 1}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="ml-8 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Timer (minutes)"
                      type="number"
                      value={step.timerMinutes || ''}
                      onChange={(e) => updateStep(step.id, 'timerMinutes', parseInt(e.target.value) || undefined)}
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">Optional timer</span>
                  </div>
                </div>
              ))}
              <Button onClick={addStep} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1"
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collaboration */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Invite Collaborators
              </Button>
              <p className="text-xs text-muted-foreground">
                Share this recipe with others to collaborate in real-time
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeEditor;
