import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import RecipeEditor from '@/components/RecipeEditor';
import RecipeViewer from '@/components/RecipeViewer';
import LoginModal from '@/components/LoginModal';
import { Recipe } from '@/types/Recipe';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setSelectedRecipe(null);
    setEditingRecipe(null);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('view-recipe');
  };

  const handleCreateNew = () => {
    setEditingRecipe(null);
    setCurrentView('create');
  };

  const handleEditRecipe = () => {
    setEditingRecipe(selectedRecipe);
    setCurrentView('create');
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    console.log('Saving recipe:', recipe);
    setCurrentView('dashboard');
    setEditingRecipe(null);
  };

  const handleCancelEdit = () => {
    setCurrentView(selectedRecipe ? 'view-recipe' : 'dashboard');
    setEditingRecipe(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedRecipe(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <svg className="h-12 w-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
                RecipeHub
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The collaborative recipe platform where culinary creativity meets technology. 
                Create, scale, and share recipes with built-in timers and real-time collaboration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="glass-effect p-6 rounded-lg text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Collaborate</h3>
                <p className="text-sm text-muted-foreground">Work together on recipes in real-time</p>
              </div>
              
              <div className="glass-effect p-6 rounded-lg text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0L6 8m12-4l2 4M6 8l2 8h8l2-8M6 8H4m14 0h2" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Smart Scaling</h3>
                <p className="text-sm text-muted-foreground">Automatically adjust ingredients for any serving size</p>
              </div>
              
              <div className="glass-effect p-6 rounded-lg text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Built-in Timers</h3>
                <p className="text-sm text-muted-foreground">Step-by-step cooking with integrated timing</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Start Cooking Together
              </button>
              <p className="text-sm text-muted-foreground">
                Join thousands of home cooks sharing their culinary creativity
              </p>
            </div>
          </div>
        </div>
        
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      <main className="min-h-[calc(100vh-4rem)]">
        {currentView === 'dashboard' && (
          <Dashboard
            onSelectRecipe={handleSelectRecipe}
            onCreateNew={handleCreateNew}
          />
        )}
        
        {currentView === 'create' && (
          <RecipeEditor
            onSave={handleSaveRecipe}
            onCancel={handleCancelEdit}
            initialRecipe={editingRecipe}
          />
        )}
        
        {currentView === 'view-recipe' && selectedRecipe && (
          <RecipeViewer
            recipe={selectedRecipe}
            onBack={handleBackToDashboard}
            onEdit={handleEditRecipe}
          />
        )}
        
        {currentView === 'collaborations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Collaborations</h2>
              <p className="text-muted-foreground mb-8">
                Manage your collaborative recipes and invitations
              </p>
              <button
                onClick={handleCreateNew}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
              >
                Create Collaborative Recipe
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
