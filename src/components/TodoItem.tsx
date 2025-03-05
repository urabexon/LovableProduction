
import React, { useState } from 'react';
import { Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, editTitle);
    } else {
      setEditTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <Card className="w-full p-4 mb-3 hover-scale glass animate-fade-in border border-border/50 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-10 bg-background/80"
              autoFocus
            />
          ) : (
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">{todo.title}</h3>
              <p className="text-xs text-muted-foreground">
                Updated {formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex space-x-1">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handleUpdate}
                className="h-8 w-8 bg-background/80 border-border/50 hover:bg-accent/80"
              >
                <Check size={16} className="text-green-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancel}
                className="h-8 w-8 bg-background/80 border-border/50 hover:bg-accent/80"
              >
                <X size={16} className="text-destructive" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 bg-background/80 border-border/50 hover:bg-accent/80"
              >
                <Edit2 size={16} className="text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="h-8 w-8 bg-background/80 border-border/50 hover:bg-accent/80"
              >
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;
