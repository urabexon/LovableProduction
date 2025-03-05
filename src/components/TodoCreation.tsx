
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TodoCreationProps {
  onAdd: (title: string) => void;
  isLoading: boolean;
}

const TodoCreation: React.FC<TodoCreationProps> = ({ onAdd, isLoading }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto mb-8 flex space-x-2 animate-fade-in"
    >
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 h-12 bg-background border border-border/50 focus:border-primary/50 transition-all duration-200"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        className="premium-button h-12 px-4 bg-primary hover:bg-primary/90 transition-all"
        disabled={isLoading || !title.trim()}
      >
        <Plus size={20} />
      </Button>
    </form>
  );
};

export default TodoCreation;
