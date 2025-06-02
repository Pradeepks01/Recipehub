
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Users, Search, Filter, Star } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  tags: string[];
  collaborators: string[];
  author: string;
  lastModified: string;
  cookTime: number;
  rating: number;
  isPublic: boolean;
}

interface DashboardProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onCreateNew: () => void;
}

const Dashboard = ({ onSelectRecipe, onCreateNew }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - in real app this would come from backend
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Grandma\'s Chocolate Chip Cookies',
      description: 'The perfect chewy chocolate chip cookies with a secret ingredient that makes them irresistible.',
      servings: 24,
      tags: ['Dessert', 'Baking', 'Family'],
      collaborators: ['sarah@email.com', 'mike@email.com'],
      author: 'Alice Johnson',
      lastModified: '2 hours ago',
      cookTime: 45,
      rating: 4.8,
      isPublic: true
    },
    {
      id: '2',
      title: 'Spicy Thai Basil Stir Fry',
      description: 'Authentic Thai flavors with fresh basil, chilies, and your choice of protein.',
      servings: 4,
      tags: ['Thai', 'Spicy', 'Quick'],
      collaborators: ['tom@email.com'],
      author: 'Chen Wei',
      lastModified: '1 day ago',
      cookTime: 25,
      rating: 4.6,
      isPublic: false
    },
    {
      id: '3',
      title: 'Rustic Sourdough Bread',
      description: 'A collaborative effort to perfect the art of sourdough with detailed fermentation notes.',
      servings: 8,
      tags: ['Bread', 'Fermentation', 'Advanced'],
      collaborators: ['baker1@email.com', 'baker2@email.com', 'baker3@email.com'],
      author: 'David Miller',
      lastModified: '3 days ago',
      cookTime: 720,
      rating: 4.9,
      isPublic: true
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'my-recipes') return matchesSearch && recipe.author === 'Alice Johnson';
    if (selectedFilter === 'collaborations') return matchesSearch && recipe.collaborators.length > 0;
    if (selectedFilter === 'public') return matchesSearch && recipe.isPublic;
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Dashboard</h1>
        <p className="text-muted-foreground">Discover, create, and collaborate on amazing recipes</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes, ingredients, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
            size="sm"
          >
            All Recipes
          </Button>
          <Button
            variant={selectedFilter === 'my-recipes' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('my-recipes')}
            size="sm"
          >
            My Recipes
          </Button>
          <Button
            variant={selectedFilter === 'collaborations' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('collaborations')}
            size="sm"
          >
            Collaborations
          </Button>
          <Button
            variant={selectedFilter === 'public' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('public')}
            size="sm"
          >
            Public
          </Button>
        </div>

        <Button onClick={onCreateNew} className="bg-primary hover:bg-primary/90">
          Create New Recipe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card 
            key={recipe.id} 
            className="glass-effect hover:bg-accent/50 transition-all duration-200 cursor-pointer group"
            onClick={() => onSelectRecipe(recipe)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {recipe.title}
                </CardTitle>
                <div className="flex items-center space-x-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{recipe.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {recipe.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cookTime < 60 ? `${recipe.cookTime}m` : `${Math.floor(recipe.cookTime / 60)}h ${recipe.cookTime % 60}m`}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{recipe.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{recipe.author}</span>
                </div>
                <span className="text-xs text-muted-foreground">{recipe.lastModified}</span>
              </div>
              
              {recipe.collaborators.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {recipe.collaborators.length} collaborator{recipe.collaborators.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recipes found matching your criteria.</p>
          </div>
          <Button onClick={onCreateNew} className="bg-primary hover:bg-primary/90">
            Create Your First Recipe
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
