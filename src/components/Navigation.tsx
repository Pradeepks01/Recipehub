
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Plus, Search, Users, Clock } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user: { name: string; email: string } | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navigation = ({ currentView, onViewChange, user, onLogin, onLogout }: NavigationProps) => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                RecipeHub
              </span>
            </div>
            
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onViewChange('dashboard')}
                  className="flex items-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button
                  variant={currentView === 'create' ? 'default' : 'ghost'}
                  onClick={() => onViewChange('create')}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Recipe</span>
                </Button>
                <Button
                  variant={currentView === 'collaborations' ? 'default' : 'ghost'}
                  onClick={() => onViewChange('collaborations')}
                  className="flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Collaborations</span>
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Chef</span>
                </Badge>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" onClick={onLogout} size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin} className="bg-primary hover:bg-primary/90">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
