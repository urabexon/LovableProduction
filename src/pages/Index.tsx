
import React, { useRef, useEffect } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoCreation from '@/components/TodoCreation';
import TodoFilter from '@/components/TodoFilter';
import TodoItem from '@/components/TodoItem';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { 
    todos, 
    isLoading, 
    filterText, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    handleFilterChange 
  } = useTodos();
  
  const listRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll to new todo when added
  useEffect(() => {
    if (listRef.current && todos.length > 0) {
      const lastTodo = listRef.current.lastElementChild;
      if (lastTodo) {
        setTimeout(() => {
          lastTodo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    }
  }, [todos.length]);

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 bg-background">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-12 text-center animate-fade-in space-y-2">
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-2">
            Todo List
          </div>
          <h1 className="text-4xl font-medium">Task Management</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Organize your tasks with a clean, minimalist interface designed for focus and productivity.
          </p>
        </div>

        <TodoCreation onAdd={addTodo} isLoading={isLoading} />
        <TodoFilter value={filterText} onChange={handleFilterChange} />

        <div
          ref={listRef}
          className="relative w-full"
        >
          {isLoading && todos.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
                <div className="h-4 w-24 bg-muted rounded mb-2.5"></div>
                <div className="h-3 w-16 bg-muted rounded"></div>
              </div>
            </div>
          ) : todos.length === 0 ? (
            <Card className="p-8 text-center border border-border/50 bg-secondary/30 animate-fade-in">
              <p className="text-muted-foreground">
                {filterText ? 'No matching tasks found' : 'No tasks yet. Add your first task above!'}
              </p>
            </Card>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
