
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TodoFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8 animate-fade-in">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
        <Search size={18} />
      </div>
      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 bg-secondary/50 border-none ring-0 focus:ring-1 focus-visible:ring-1 transition-all duration-200"
      />
    </div>
  );
};

export default TodoFilter;
