
import { useState, useEffect, useCallback } from 'react';
import { Todo } from '@/types/todo';
import { useToast } from '@/components/ui/use-toast';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock implementation of API calls for frontend
  // In a real application, these would be API calls to a backend

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulating API call with localStorage
      const storedTodos = localStorage.getItem('todos');
      const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
      setTodos(parsedTodos);
      applyFilter(parsedTodos, filterText);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load todos",
        description: "Please try again later.",
      });
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterText, toast]);

  const applyFilter = (todoList: Todo[], filter: string) => {
    if (!filter) {
      setFilteredTodos(todoList);
    } else {
      const filtered = todoList.filter(todo => 
        todo.title.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
  };

  const addTodo = useCallback(async (title: string) => {
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedTodos = [...todos, newTodo];
      // Save to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      applyFilter(updatedTodos, filterText);
      
      toast({
        title: "Todo added",
        description: "Your task has been added successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add todo",
        description: "Please try again later.",
      });
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  }, [todos, filterText, toast]);

  const updateTodo = useCallback(async (id: string, title: string) => {
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      const updatedTodos = todos.map(todo => 
        todo.id === id 
          ? { ...todo, title, updatedAt: new Date().toISOString() } 
          : todo
      );
      
      // Save to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      applyFilter(updatedTodos, filterText);
      
      toast({
        title: "Todo updated",
        description: "Your task has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update todo",
        description: "Please try again later.",
      });
      console.error("Error updating todo:", error);
    } finally {
      setIsLoading(false);
    }
  }, [todos, filterText, toast]);

  const deleteTodo = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      
      // Save to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      applyFilter(updatedTodos, filterText);
      
      toast({
        title: "Todo deleted",
        description: "Your task has been removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete todo",
        description: "Please try again later.",
      });
      console.error("Error deleting todo:", error);
    } finally {
      setIsLoading(false);
    }
  }, [todos, filterText, toast]);

  const handleFilterChange = useCallback((text: string) => {
    setFilterText(text);
    applyFilter(todos, text);
  }, [todos]);

  // Load todos on initial mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos: filteredTodos,
    isLoading,
    filterText,
    addTodo,
    updateTodo,
    deleteTodo,
    handleFilterChange
  };
}
